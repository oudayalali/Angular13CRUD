import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postProduct( data : any){
    return this.http.post<any>("https://crud-json-server-api.herokuapp.com/product/",data)
  }
  getProduct(){
    return this.http.get<any>("https://crud-json-server-api.herokuapp.com/product/");
  }
  putProduct(data:any,id: number){
    return this.http.put<any>("https://crud-json-server-api.herokuapp.com/product/"+id,data)
  }
  deleteProduct(id:any){
    return this.http.delete<any>("https://crud-json-server-api.herokuapp.com/product/"+id);
  }
}
