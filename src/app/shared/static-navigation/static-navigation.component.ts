import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';

import { I18nService } from '@app/core/services/i18n.service';
import { UrlMappingService } from '@app/core/url-mapping.service';

@Component({
  selector: 'app-static-navigation',
  templateUrl: './static-navigation.view.html',
  styleUrls: ['./static-navigation.style.scss']
})

export class StaticNavigationComponent implements AfterViewInit
{
  public loaded: boolean;
  public active: boolean;
  public brand: any;

  @Input() language;
  @Input() navigation;

  @Output() onScrollTo = new EventEmitter();

  constructor(
    private i18nService: I18nService,
    private urlMappingService: UrlMappingService
  )
  {
    this.loaded = false;
  }

  ngAfterViewInit()
  {
    console.log(this.navigation.brand);
    this.brand = this.navigation.brand;
    this.loaded = true;
  }

  public toggleNavigation(): void
  {
    this.active ? this.closeNavigation() : this.openNavigation();
  }

  public openNavigation(): void
  {
    this.onScrollTo.emit(0);
    this.active = true;
  }

  public closeNavigation(): void
  {
    this.active = false;
  }

  public parseUrl(type: string, id: string): string
  {
    return (this.urlMappingService.getUrl(type, id));
  }

  // TODO
  public selectLink(link: any): void
  {
    this.closeNavigation();
    // handle scroll:
    // this.onScrollTo.emit('position');
  }

  // TODO
  public getType(module: string): string
  {
    // types: link, redirect, scroll
    return 'link';
  }

  public i18n(obj: any, key: string): any
  {
    return this.i18nService.tryI18n(obj, key, this.language);
  }
}
