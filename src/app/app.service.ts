import { Injectable } from '@angular/core';
import { LocalStorageService } from '@app/core/services/local-storage.service';

const config =
{
  'local-storage-id': 'app-language'
};

@Injectable()
export class AppService
{
  constructor(private localStorage: LocalStorageService)
  {}

  public getAppLanguage(language: any): string
  {
    try
    {
      const localStorageLanguage = this.localStorage.getItem(config['local-storage-id']);

      if (localStorageLanguage)
      {
        if (this.isAvailableLanguage(localStorageLanguage, language.available))
        {
          console.log('lang (source: local-storage):', localStorageLanguage);
          this.updateLanguage(localStorageLanguage);
          return (localStorageLanguage);
        }
      }
    }
    catch (e)
    {
      console.log("Ooops, something went wrong...");
    }

    return (this.initializeLanguage(language));
  }

  private initializeLanguage(language: any): string
  {
    try
    {
      const browserLanguage = window.navigator.language;

      if (browserLanguage)
      {
        if (this.isAvailableLanguage(browserLanguage, language.available))
        {
          console.log('(source: browser) language:', browserLanguage);
          this.updateLanguage(browserLanguage);
          return (browserLanguage);
        }
      }
    }
    catch (e)
    {
      console.log("Ooops, something went wrong...");
    }

    console.log('(source: json) language:', language.default);
    this.updateLanguage(language.default);
    return (language.default);
  }

  private isAvailableLanguage(language: string, languages: any): boolean
  {
    for (let i = 0; i < languages.length; i++)
    {
      if (language === languages[i].id)
      {
        return (true);
      }
    }
    return (false);
  }

  public updateLanguage(language: string): void
  {
    this.localStorage.setItem(config['local-storage-id'], language);
    window.document.documentElement.lang = language;
  }
}
