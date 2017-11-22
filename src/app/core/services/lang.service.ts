import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class LangService
{
  private appUpdated = new Subject<any>();
  private languageChanged = new Subject<string>();
  private languageVerify = new Subject<string>();

  appUpdated$ = this.appUpdated.asObservable();
  languageChanged$ = this.languageChanged.asObservable();
  languageVerify$ = this.languageVerify.asObservable();

  /**
   * Parent to children
   */
  updateApp(app: any)
  {
    this.appUpdated.next(app);
  }

  /**
   * Children to parent
   */
  changeLanguage(lang: string)
  {
    this.languageChanged.next(lang);
  }

  verifyLanguage()
  {
    this.languageVerify.next();
  }

  /**
   * Features
   */
  public detectedUrlLangChange(url: string, type: string, app: any): string
  {
    let languages = [];
    let links = [];

    app.languages.forEach((lang) => languages.push(lang.id));

    app.links.forEach((link) =>
    {
      if (link.type === type)
      {
        links.push(link);
      }
    });

    try
    {
      const n = links.length;
      const m = languages.length;

      for (let i = 0; i < n; i++)
      {
        if (links[i].id === undefined)
        {
          for (let j = 0; j < m; j++)
          {
            if (links[i]['id-i18n'][languages[j]] === url)
            {
              return (languages[j]);
            }
          }
        }
        else
        {
          console.log('No i18n found.');
          return ('');
        }
      }
    }
    catch (e)
    {
      console.log('Unexpected error', e);
    }
    return ('');
  }
}
