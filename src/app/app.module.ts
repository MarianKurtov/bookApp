import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BookDialogComponent } from './dialogs/book-dialog/book-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { CdkColumnDef } from '@angular/cdk/table';
import { AppComponent } from './app.component';
import { AddBookComponent } from './dialogs/add-book/add-book.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    BookDialogComponent,
    HomeComponent,
    SearchFilterPipe,
    AddBookComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatCardModule,
        MatGridListModule,
        MatToolbarModule,
        MatPaginatorModule,
        HttpClientModule,
        MatInputModule,
        ReactiveFormsModule,
        FormsModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        MatSortModule,
        MatSnackBarModule
    ],
  providers: [CdkColumnDef],
  bootstrap: [AppComponent]
})
export class AppModule { }
