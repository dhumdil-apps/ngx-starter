import { Injectable } from '@angular/core';

@Injectable()
export class I18nService
{
  public tryI18n(obj: any, key: string, language: string): any
  {
    try
    {
      // console.log('I18n found.');
      return (obj[key + '-i18n'][language]);
    }
    catch (e)
    {
      // console.log('No i18n found.');
      return (obj[key]);
    }
  }
}
