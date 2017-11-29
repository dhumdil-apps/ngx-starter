import { Injectable } from '@angular/core';

import { Features } from '@app/features.model';
import { Language, Languages } from '@app/languages.model';

@Injectable()
export class UrlService
{
  public detectedUrlLanguage(url: string, features: Features, languages: Languages): Language
  {
    let route;

    if (url === '')
    {
      return (languages.active);
    }

    for (let i = 0; i < features.list.length; i++)
    {
      for (let j = 0; j < languages.list.length; j++)
      {

        try
        {
          route = features.list[i]['routeI18n'][languages.list[j].id];

          if (route === undefined)
          {
            throw 'undefined';
          }
        }
        catch (e)
        {
          route = '';
        }

        if (route === url)
        {
          return (languages.list[j]);
        }

      }
    }

    return (languages.active);
  }
}
