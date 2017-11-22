import { Injectable } from '@angular/core';

@Injectable()
export class I18nService
{
  public i18n(obj: any, key: string, lang: string): any
  {
    try
    {
      return (obj[key + '-i18n'][lang]);
    }
    catch (e)
    {
      return (obj[key]);
    }
  }
}
