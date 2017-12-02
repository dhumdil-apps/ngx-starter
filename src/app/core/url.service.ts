import { Injectable } from '@angular/core';

import { Feature } from '@app/features.model';

@Injectable()
export class UrlService
{
  public detectedUrlLanguage(url: string, feature: Feature, languages: string[]): string
  {
    try
    {
      console.log('url:', url);
      console.log('feature:', feature);
      console.log('languages:', languages);
      let route;

      if (feature['routeI18n'] === undefined)
      {
        if (feature['route'] !== url)
        {
          throw 'undefined';
        }
      }
      else
      {
        for (let i = 0; i < languages.length; i++)
        {
          route = feature['routeI18n'][languages[i]];

          if (route === url)
          {
            console.log('Language detected: ', languages[i]);
            return (languages[i]);
          }

          if (route === undefined)
          {
            throw 'undefined';
          }
        }
      }
    }
    catch (e)
    {
      console.log('undefined language!');
      return (undefined);
    }

    console.log('Language not detected!');
    return ('');
  }
}
