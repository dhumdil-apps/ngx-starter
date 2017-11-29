import { Injectable } from '@angular/core';

import { LocalStorageService } from '@app/core/services/local-storage.service';

import { Languages, Language } from '@app/languages.model';

const config =
{
  'local-storage-id': 'app-language',
  'routes': {}
};

@Injectable()
export class AppService
{
  constructor(private localStorage: LocalStorageService)
  {}

  public initializeLanguage(languages: Language[]): Language
  {
    // Check the Local Storage for language 
    const localStorageLanguage = this.localStorage.getItem(config['local-storage-id']);

    if (localStorageLanguage)
    {
      const language = this.selectLanguage(localStorageLanguage, languages);

      if (language !== undefined)
      {
        console.log('lang (source: local-storage):', language.id);
        this.updateLanguage(language.id);
        return (language);
      }
    }
  
    // Initialize default language
    return (this.getDefaultLanguage(languages));
  }

  private getDefaultLanguage(languages: Language[]): Language
  {
    // Check users browser language preferences
    const browserLanguage = window.navigator.language;

    if (browserLanguage)
    {
      const language = this.selectLanguage(browserLanguage, languages);

      if (language !== undefined)
      {
        console.log('(source: browser) language:', language.id);
        this.updateLanguage(language.id);
        return (language);
      }
    }

    // Just set the first available language as default
    console.log('(source: json) language:', languages[0].id);
    this.updateLanguage(languages[0].id);
    return (languages[0]);
  }

  private selectLanguage(language: string, languages: Language[]): Language
  {
    for (let i = 0; i < languages.length; i++)
    {
      if (language === languages[i].id)
      {
        return (languages[i]);
      }
    }
    return (undefined);
  }

  public updateLanguage(language: string): void
  {
    this.localStorage.setItem(config['local-storage-id'], language);
    window.document.documentElement.lang = language;
  }

  public getRoute(module: string): string
  {
    switch (module)
    {
      default: return ('/');
    }
  }
}
