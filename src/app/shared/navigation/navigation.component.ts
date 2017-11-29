import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';

import { I18nService } from '@app/core/services/i18n.service';

import { Features } from '@app/features.model';
import { Languages } from '@app/languages.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.view.html',
  styleUrls: ['./navigation.style.scss']
})

export class NavigationComponent implements AfterViewInit
{
  public loaded: boolean;
  public active: boolean;

  @Input() features: Features;
  @Input() languages: Languages;

  @Output() onSelectLanguage = new EventEmitter();

  constructor(
    private i18nService: I18nService
  ) {
    this.init();
  }

  ngAfterViewInit()
  {
    this.initialize();
  }

  private init(): void
  {
    this.active = false;
    this.loaded = false;
  }

  private initialize(): void
  {
    this.loaded = true;
  }

  public toggleNavigation(): void
  {
    this.active = !this.active;
  }

  public i18n(obj: any, key: string): any
  {
    return this.i18nService.tryI18n(obj, key, this.languages.active.id);
  }

  public selectLanguage(ev: any): void
  {
    this.onSelectLanguage.emit(ev);
  }
}
