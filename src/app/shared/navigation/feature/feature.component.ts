import { Component, ChangeDetectorRef, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';

import { I18nService } from '@app/core/services/i18n.service';
import { AppService } from '@app/app.service';

import { Feature } from '@app/features.model';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.view.html',
  styleUrls: ['./feature.style.scss']
})

export class FeatureComponent implements AfterViewInit
{
  public loaded: boolean;

  @Input() active: boolean;
  @Input() feature: Feature;
  @Input() language: string;

  @Output() onClick = new EventEmitter();

  constructor(
    private cdr: ChangeDetectorRef,
    private i18nService: I18nService,
    private appService: AppService
  ) {
    this.init();
  }

  ngAfterViewInit()
  {
    this.initialize();
  }

  private init(): void
  {
    this.loaded = false;
  }

  private initialize(): void
  {
    this.loaded = true;
    this.cdr.detectChanges();
  }

  public clickEv(): void
  {
    this.onClick.emit();
  }

  public parsedRoute(url: string): string
  {
    return (this.appService.getRoute(this.feature.module) + this.i18n(this.feature, 'route'));
  }

  public i18n(obj: any, key: string): any
  {
    return this.i18nService.tryI18n(obj, key, this.language);
  }
}
