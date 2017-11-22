import { Injectable } from '@angular/core';
import { LocalStorageService } from '@app/core/singleton-services/local-storage.service';

const config = {
  'local-storage-id': 'app-lang'
};

@Injectable()
export class AppService
{
  constructor(private localStorage: LocalStorageService)
  {}

  public getLang(langs: any): string
  {
    const localStorageLang = this.localStorage.getItem(config['local-storage-id']);

    if (localStorageLang)
    {
      if (this.isAvailableLang(localStorageLang, langs))
      {
        console.log('lang (source: local-storage):', localStorageLang);
        this.updateLang(localStorageLang);
        return (localStorageLang);
      }
    }
    return (this.initLang(langs));
  }

  private isAvailableLang(lang: string, langs: any): boolean
  {
    for (let i = 0; i < langs.length; i++)
    {
      if (lang === langs[i].id)
      {
        return (true);
      }
    }
    return (false);
  }

  private initLang(langs: any): string
  {
    try
    {
      const browserLang = window.navigator.language;

      if (browserLang)
      {
        if (this.isAvailableLang(browserLang, langs))
        {
          console.log('lang (source: browser):', browserLang);
          this.updateLang(browserLang);
          return (browserLang);
        }
      }

      console.log('lang (source: json):', langs[0].id);
      this.updateLang(langs[0].id);
      return (langs[0].id);
    }
    catch (e)
    {
      console.log('error', e);
      return ('');
    }
  }

  public updateLang(lang: string): void
  {
    this.localStorage.setItem(config['local-storage-id'], lang);
    window.document.documentElement.lang = lang;
  }
}
