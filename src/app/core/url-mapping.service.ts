import { Injectable } from '@angular/core';

const config =
{
  // 'about': '01/'
};

@Injectable()
export class UrlMappingService
{
  public getUrl(module: string, url: string): string
  {
    switch (module)
    {
      // case 'about': return (config.about + url);
      default: return ('/');
    }
  }
}
