import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  inputData: any;
  insertBookForm!: FormGroup;

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      private dialog: MatDialogRef<AddBookComponent>,
      private formBuilder: FormBuilder,
      private bookService: BookService,
      private _snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.inputData = this.data;
    this.insertBookForm = this.formBuilder.group({
      title:           ['', [Validators.required]],
      author:          ['', [Validators.required]],
      ISBN:            ['', [Validators.pattern('^[0-9]{13}$'), Validators.required]],
      bookCover:       ['', [Validators.required]],
      bookDescription: ['', [Validators.required]]
    });
  }

  closeDialog(): void {
    this.dialog.close();
  }

  submitForm(): void {
    this.bookService.checkISBNA(this.insertBookForm.value.ISBN).subscribe((response: any) => {

      if (response.length != 0) {
        this._snackBar.open('Sorry but we already have this ISBN! (ISBN must be unique');
      } else {
        this.bookService.saveDescription({
          title: this.insertBookForm.value.title,
          description: this.insertBookForm.value.bookDescription
            }).subscribe(console.log);

        this.bookService.saveBook({
          title: this.insertBookForm.value.title,
          author: this.insertBookForm.value.author,
          ISBN: this.insertBookForm.value.ISBN,
          bookCover: this.insertBookForm.value.bookCover
        }).subscribe(()=> {
          this.closeDialog();
          this._snackBar.open('Successfully added this book!')
        });
      }
    });
  }
}
