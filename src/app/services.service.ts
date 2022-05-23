import { Injectable } from '@angular/core';
import {HttpClient,HttpClientModule} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http:HttpClient) { }

  postProduct(data: any){
    return this.http.post<any>("https://624d2af5d71863d7a8143760.mockapi.io/products/",data)
  }
  getProduct(){
    return this.http.get<any>("https://624d2af5d71863d7a8143760.mockapi.io/products")
  }
  deleteProduct(id:number){
    return this.http.delete<any>("https://624d2af5d71863d7a8143760.mockapi.io/products/"+id)
  }
  updateProduct(data:any,id:number){
    return this.http.put<any>("https://624d2af5d71863d7a8143760.mockapi.io/products/"+id,data)
  }
}