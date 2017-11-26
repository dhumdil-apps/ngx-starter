import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService
{
  public getItem(key: string): any
  {
    return JSON.parse(localStorage.getItem(key));
  }

  public setItem(key: string, value: any): void
  {

    if (key && value)
    {
      localStorage.setItem(key, JSON.stringify(value));
    }
    else
    {
      console.log("Ooops, something went wrong...");
      console.log("key: " + key);
      console.log("value: ", value);
    }
  }
}
