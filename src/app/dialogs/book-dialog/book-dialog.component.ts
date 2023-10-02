import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-book-dialog',
  templateUrl: './book-dialog.component.html',
  styleUrls: ['./book-dialog.component.css']
})
export class BookDialogComponent {
  title;
  author;
  bookCover;
  ISBN;
  bookDescription;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = data.title;
    this.author = data.author;
    this.bookCover = data.bookCover;
    this.ISBN = data.ISBN;
    this.bookDescription = data.bookDescription;
  }
}
