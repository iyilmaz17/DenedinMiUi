import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Observable } from 'rxjs';
import { Image } from '../models/image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  apiUrl = 'https://localhost:7247/api/';

  constructor(private httpClient: HttpClient) { }

  getById(productId:number):Observable<SingleResponseModel<Image>>{
    let newPath = this.apiUrl + "Image/getbyid?productId=" + productId
    return this.httpClient.get<SingleResponseModel<Image>>(newPath)
  }
}
