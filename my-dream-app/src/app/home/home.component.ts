import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
//import 'rxjs/add/operator/takeUntil';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  products = [];
  destroy$: Subject<boolean> = new Subject<boolean>(); 
  
  constructor(private apiService: ApiService) { }

  ngOnInit() {
  /***
    this.apiService.sendGetRequest().subscribe((data: any[])=>{  
	console.log(data);  
	this.products = data;  
	})
  ***/
    this.apiService.sendGetRequest().pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>)=>{  
	console.log(res);  
	this.products = res.body;  
    })  
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

  public firstPage() {
    this.products = [];
    this.apiService.sendGetRequestToUrl(this.apiService.first).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
      console.log(res);
      this.products = res.body;
    })
  }
  public previousPage() {

    if (this.apiService.prev !== undefined && this.apiService.prev !== '') {
      this.products = [];
      this.apiService.sendGetRequestToUrl(this.apiService.prev).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
        console.log(res);
        this.products = res.body;
      })
    }

  }
  public nextPage() {
    if (this.apiService.next !== undefined && this.apiService.next !== '') {
      this.products = [];
      this.apiService.sendGetRequestToUrl(this.apiService.next).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
        console.log(res);
        this.products = res.body;
      })
    }
  }
  public lastPage() {
    this.products = [];
    this.apiService.sendGetRequestToUrl(this.apiService.last).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
      console.log(res);
      this.products = res.body;
    })
  }
}
