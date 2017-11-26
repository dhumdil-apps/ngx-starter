import { Injectable } from '@angular/core';

import { App } from '@app/app.model';

@Injectable()
export class UrlService
{
  public detectedUrlLanguage(url: string, type: string, app: App): string
  {
    try
    {
      let links = app.navigation.links.filter(
        (link) =>
        {
          return (link.type === type);
        }
      );
      let languages = app.language.available.map((language) => language.id);

      for (let i = 0; i < links.length; i++)
      {
        if (links[i].id === undefined)
        {
          for (let j = 0; j < languages.length; j++)
          {
            if (links[i]['url-i18n'][languages[j]] === url)
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
      console.log("Ooops, something went wrong...");
    }

    return ('');
  }
}
