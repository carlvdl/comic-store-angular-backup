import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

// import {Country} from './country';
// import {COUNTRIES} from './countries';
import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {SortDirection} from '../sortable.directive';
import {Grading} from '../models/grading';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {User} from '../models/user';
// import {SortDirection} from './sortable.directive';

interface SearchResult {
  gradings: Grading[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
}

function compare(v1, v2) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(gradings: Grading[], column: string, direction: string): Grading[] {
  if (direction === '') {
    return gradings;
  } else {
    return [...gradings].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(grading: Grading, term: string, pipe: PipeTransform) {
  return grading.code.toLowerCase().includes(term.toLowerCase())
    || pipe.transform(grading.code).includes(term)
    || pipe.transform(grading.description).includes(term);
}

@Injectable({providedIn: 'root'})
export class GradingService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  _gradings$ = new BehaviorSubject<Grading[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private http:HttpClient, private pipe: DecimalPipe){
    console.log('------------1--------');
    this.findGradings('','',0,3).subscribe(response =>{
      this._gradings$.next(response.body);
      // this.total$ = parseInt(response.headers.get('x-total-count'));
    })

    // this.findGradings('','',0,3).subscribe(response =>{
    //   this._gradings$.next(response.body);
    //   console.log('===x===');
    //   console.log('this._gradings$--> ');
    //   console.log(this._gradings$);
    //
    //   // this.total$ = parseInt(response.headers.get('x-total-count'));
    // })
  }

  // constructor(private pipe: DecimalPipe, private http: HttpClient) {
  //   this._search$.pipe(
  //     tap(() => this._loading$.next(true)),
  //     debounceTime(200),
  //     switchMap(() => this._search()),
  //     delay(200),
  //     tap(() => this._loading$.next(false))
  //   ).subscribe(result => {
  //     this._gradings$.next(result.gradings);
  //     this._total$.next(result.total);
  //   });
  //
  //   this._search$.next();
  // }

  // get gradings$() { return this._gradings$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: string) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  findGradings(filter: string, sortOrder: string, pageNumber: number, pageSize: number): Observable<HttpResponse<Grading[]>> {
    return this.http.get<Grading[]>(
      'http://localhost:5000/gradings',
      {
        observe: 'response',
        params: new HttpParams()
          .set('filter', filter)
          .set('sortOrder', sortOrder)
          .set('pageNumber', pageNumber.toString())
          .set('pageSize', pageSize.toString())
      });
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    console.log('------------1--------');
    let gradingsResponse = this.findGradings('','',0,3).subscribe(response =>{
      this._gradings$.next(response.body);
      console.log('===x===');
      console.log('this._gradings$--> ');
      console.log(this._gradings$);

      // this.total$ = parseInt(response.headers.get('x-total-count'));
    })
    console.log('------------2--------');

    // 1. sort
    // let gradings = sort(COUNTRIES, sortColumn, sortDirection);
    let gradings = sort(this._gradings$.getValue(), sortColumn, sortDirection);

    // 2. filter
    gradings = gradings.filter(grading => matches(grading, searchTerm, this.pipe));
    const total = gradings.length;

    // 3. paginate
    gradings = gradings.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({gradings, total});
  }
}
