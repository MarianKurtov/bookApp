import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../interfaces/book';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(books: Book[], searchValue: string): Book[] {
    if (!books || !searchValue){
      return books;
    }
    return books.filter( books =>
        books.author.toLowerCase().includes(searchValue.toLowerCase()) ||
        books.title.toLowerCase().includes(searchValue.toLowerCase()));
  }
}
