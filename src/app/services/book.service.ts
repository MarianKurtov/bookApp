import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments';
import { Book } from '../interfaces/book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(public httpClient: HttpClient) {}

  getBooks() : Observable<Book[]> {
    return this.httpClient.get<Book[]>(environment.JsonServer + '/books');
  }

  saveBook(data: any) : any {
    return this.httpClient.post(environment.JsonServer + '/books', data);
  }

  saveDescription(data: any) {
    console.log(data)
    return this.httpClient.post(environment.JsonServer + '/description', data);
  }

  checkISBNA(ISBN: string): any {
    return this.httpClient.get<any>(environment.JsonServer + `/books?ISBN=${ISBN}`);
  }

  getBookDescription(title: string): any {
    title = title.replace(' ', '%20');
    return this.httpClient.get<any>(environment.JsonServer + `/description?title=${title}`)
  }
}
