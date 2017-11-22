import { Injectable } from '@angular/core';

const config =
{
  'about': '01/'
};

@Injectable()
export class UrlService
{
  public getUrl(type: string, id: string): string
  {
    switch (type)
    {
      case 'about': return (config.about + id);
      default: return ('');
    }
  }
}
