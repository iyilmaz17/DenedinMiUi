import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Commentt } from '../models/comment';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

//https://localhost:7247/api/Comment/getbyproductid?id=2
  apiUrl = 'https://localhost:7247/api/Comment/getall';

  constructor(private httpClient: HttpClient) { }

  getComments():Observable<ListResponseModel<Commentt>> {
    return this.httpClient.get<ListResponseModel<Commentt>>(this.apiUrl);
  }
  getByProductId(id:number):Observable<SingleResponseModel<Commentt>>{
    let newPath = "https://localhost:7247/api/Comment/getbyproductid?id=" + id
    return this.httpClient.get<SingleResponseModel<Commentt>>(newPath);
  }
  // getCommentByProductId(id:number):Observable<ListResponseModel<Commentt>>{
  //   let newPath = "https://localhost:7247/api/Comment/getallbyproductid?id=" + id
  //   return this.httpClient.get<ListResponseModel<Commentt>>(newPath);
  // }
  getAllCommentByProductId(id:number):Observable<ListResponseModel<Commentt>>{
    let newPath = "https://localhost:7247/api/Comment/getallbyproductid?id=" + id
    return this.httpClient.get<ListResponseModel<Commentt>>(newPath);
  }
}
