import { Injectable } from '@angular/core';

const config =
{
  'brand': '',
  'news': '01/',
  'video-album': '02/',
  'photo-album': '03/',
  'contact': ''
};

@Injectable()
export class UrlMappingService
{
  public getUrl(module: string): string
  {
    switch (module)
    {
      case 'brand': return (config['brand']);
      case 'news': return (config['news']);
      case 'video-album': return (config['video-album']);
      case 'photo-album': return (config['photo-album']);
      case 'contact': return (config['contact']);
      default: return ('');
    }
  }
}
