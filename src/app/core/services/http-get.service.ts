import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpGetService
{
  constructor(private http: Http)
  {}

  public get(url: string): any
  {
    return this.http
      .get(url)
      .pipe(map(res => res.json()));
  }
}
