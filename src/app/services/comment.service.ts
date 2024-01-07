import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../models/comment';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

//https://localhost:7247/api/Comment/getbyproductid?id=2
  apiUrl = 'https://localhost:7247/api/Comment/getall';

  constructor(private httpClient: HttpClient) { }

  getComments():Observable<ListResponseModel<Comment>> {
    return this.httpClient.get<ListResponseModel<Comment>>(this.apiUrl);
  }
  getByProductId(id:number):Observable<ListResponseModel<Comment>>{
    let newPath = this.apiUrl +"https://localhost:7247/api/Comment/getbyproductid?id=" + id
    return this.httpClient.get<ListResponseModel<Comment>>(newPath);
  }
}
