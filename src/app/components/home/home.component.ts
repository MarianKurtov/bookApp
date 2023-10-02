import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { BookService } from '../../services/book.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Book } from '../../interfaces/book';
import { AddBookComponent } from '../../dialogs/add-book/add-book.component';
import { Description } from '../../interfaces/description';
import { BookDialogComponent } from '../../dialogs/book-dialog/book-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  private books: Book[] = [];
  private bookDescription: string = '';
  searchValue: string = '';
  displayedColumns = ['title', 'author', 'ISBN', 'bookCover'];
  pageSlice: Book[] = [];
  dataSource : any;

  @ViewChild(MatSort) sort!: MatPaginator;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor( public dialog: MatDialog, private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  private loadBooks(): void {
    this.bookService.getBooks().subscribe((response: Book[]) => {
      if (response) {
        this.books = response;
        this.dataSource = new MatTableDataSource(this.books);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    }, (error: any) => {
      alert(error.message)
    });
  }

  private getBookDescriptionByTitle(title: string): any {
    return this.bookService.getBookDescription(title);
  }

  addBook(): void {
    let dialogData = this.dialog.open(AddBookComponent, {
      width : '50%',
      height: '600px',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        title: 'Book Title'
      }
    });

    dialogData.afterClosed().subscribe(() => {
      this.loadBooks();
    })
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.books.length){
      endIndex = this.books.length
    }
    this.pageSlice = this.books.slice(startIndex, endIndex);
  }

  openDialog(title: string, author: string, bookCover: string, ISBN: string): void {
    this.getBookDescriptionByTitle(title).subscribe((description: Description[]) => {
      this.bookDescription = description[0].description;

      this.dialog.open(BookDialogComponent, {
        width : '400px',
        height: '850px',
        enterAnimationDuration: '1000ms',
        exitAnimationDuration: '1000ms',
        data:  {
          title: title,
          author: author,
          bookCover: bookCover,
          ISBN: ISBN,
          bookDescription: this.bookDescription
        }});
    });
  }
}
