import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { Home } from '../models/home';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl = 'https://localhost:7247/api/';

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<ListResponseModel<Product>> {
    let newPath = this.apiUrl + "Product/getall"
    return this.httpClient.get<ListResponseModel<Product>>(newPath);
  }
  getHomeProducts(): Observable<ListResponseModel<Home>> {
    let newPath = this.apiUrl + "Product/getallhomeproduct"
    return this.httpClient.get<ListResponseModel<Home>>(newPath);
  }
  getAllByCategoryId(categoryId:number):Observable<ListResponseModel<Home>>{
    let newPath = this.apiUrl + "Product/getallhomecategoryproduct?categoryId=" + categoryId
    return this.httpClient.get<ListResponseModel<Home>>(newPath)
  }

}
