import { Injectable } from '@angular/core';

@Injectable()
export class I18nService
{
  public tryI18n(obj: any, key: string, language: string): any
  {
    try
    {
      if (obj[key + 'I18n'] !== undefined)
      {
        return (obj[key + 'I18n'][language]);
      }
      else if (obj[key] !== undefined)
      {
        return (obj[key]);
      }
      else
      {
        throw 'undefined';
      }
    }
    catch (e)
    {
      console.log("Ooops, something went wrong!");
      return (undefined);
    }
  }
}
