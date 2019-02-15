import { Component, OnInit } from '@angular/core';
import {
  NavController,
  AlertController,
  MenuController,
  ToastController,
  PopoverController,
  ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { map, startWith, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SearchResult } from 'src/app/model/searchResult';
import { Subject } from 'rxjs';

// Modals
import { SearchFilterPage } from '../../pages/modal/search-filter/search-filter.page';
import { ImagePage } from './../modal/image/image.page';

const searchUrl="https://lvg9oskwyg.execute-api.eu-west-1.amazonaws.com/lukaszs-hackaton/search";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchBooksPage implements OnInit {
  results = new SearchResult();
  searchKey: string = '';

  books: any = [
    { 'id': 0, 'title': 'Thinking in java', 'author': 'Wojciech', 'description': 'blalal ' },
    { 'id': 1, 'title': '.NET', 'author': 'Przemyslaw', 'description': 'Woddsdv jciech' },
{ 'id': 2, 'title': 'Started', 'author': 'Marcin', 'description': 'ghnh cfdgd dfdgfdfg' }
];

constructor(public navCtrl: NavController,
    public modalCtrl: ModalController, private http: HttpClient) { }
    private searchQuery = new Subject<string>();

  ngOnInit() {
    this.searchQuery.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      switchMap((query: string) => this.search(query)),
    ).subscribe((results) => {
      this.results = results;
    });  
  }

  editProfile() {
    this.navCtrl.navigateForward('edit-profile');
  }

  logout() {
    this.navCtrl.navigateRoot('/');
  }

  async searchFilter () {
    const modal = await this.modalCtrl.create({
      component: SearchFilterPage
    });
    return await modal.present();
  }

  public search (query: string): Observable<SearchResult> {
    console.log("Search started");

    // if (!query.trim()) {
    //   console.log("sdsd");
    //   return of(new SearchResult());
    // }

    return this.http.get<SearchResult>(`${searchUrl}/${query}`).pipe(
      tap(items => console.debug(items)),
      catchError(this.handleError<SearchResult>('search', new SearchResult()))
    )
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => { 
      console.error(error);

      return of(result as T);
    };
  }

  public executeSearch(): void {
    console.log("Sdsd");
    console.log(this.searchKey);
    this.searchQuery.next(this.searchKey);
  }

  async bookDetails(book: any) {
    const modal = await this.modalCtrl.create({
      component: ImagePage,
      componentProps: { value: book }
    });
    return await modal.present();
  }

}
