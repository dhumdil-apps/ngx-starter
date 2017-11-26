import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';

import { I18nService } from '@app/core/services/i18n.service';

@Component({
  selector: 'app-static-navigation',
  templateUrl: './static-navigation.view.html',
  styleUrls: ['./static-navigation.style.scss']
})

export class StaticNavigationComponent implements AfterViewInit
{
  public loaded: boolean;
  public active: boolean;

  @Input() language;
  @Input() navigation;

  @Output() onScrollTo = new EventEmitter();
  @Output() onSelectLanguage = new EventEmitter();

  constructor(private i18nService: I18nService)
  {
    this.loaded = false;
  }

  ngAfterViewInit()
  {
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

  public i18n(obj: any, key: string): any
  {
    return this.i18nService.tryI18n(obj, key, this.language.default);
  }

  // TODO: this.onScrollTo.emit('position');
  public selectLink(link: any): void
  {
    this.closeNavigation();
  }

  public selectLanguageEv(language: string): void
  {
    this.onSelectLanguage.emit(language);
  }
}
