import { Component, ChangeDetectorRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/retry';

import { AppService } from '@app/app.service';
import { I18nService } from '@app/core/services/i18n.service';

import { LanguageService } from '@app/core/communication/language-communication.service';

import { Language, Languages } from '@app/languages.model';
import { Feature, Features } from '@app/features.model';

const config =
{
  'json': 'assets/app/app.json',
  'error_message': "Ooops, something went wrong..."
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.view.html',
  styleUrls: ['app.style.scss'],
  providers: [
    LanguageService
  ]
})

export class AppComponent implements OnInit
{
  public loaded: boolean;
  public navigationState: string;

  public features: Features;
  public languages: Languages;

  @ViewChild('appNavigation') appNavigation;

  constructor(
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private http: HttpClient,
    private i18nService: I18nService,
    private appService: AppService,
    private languageService: LanguageService
  ) { this.init(); }

  ngOnInit() { this.onInit(); }

  private init(): void
  {
    this.loaded = false;
    this.navigationState = '';

    this.languages = new Languages();
    this.features = new Features();

    this.languageService.onChangeLanguage$.subscribe(
      (language) =>
      {
        this.selectLanguage(language);
      }
    );

    this.languageService.onVerifyLanguage$.subscribe(
      () =>
      {
        this.languageService.updateLanguage(this.languages);
      }
    );
  }

  private onInit(): void
  {
    this.http.get(config.json).retry(3).subscribe(
      (json) =>
      {
        try
        {
          this.languages.initialize(json['data']['languages']);
          this.features.initialize(json['data']['features']);

          if (this.languages.list.length > 0)
          {
            this.languages.active = this.appService.initializeLanguage(this.languages.list);
            this.loaded = (this.languages.active.id !== undefined);
            this.cdr.detectChanges();
          }
        }
        catch (e)
        {
          console.log(config.error_message, e);
        }
      },
      (e) =>
      {
        console.log(config.error_message);
      }
    );
  }

  public i18n(obj: any, key: string): any
  {
    return this.i18nService.tryI18n(obj, key, this.languages.active.id);
  }

  public selectLanguage(language: Language): void
  {
    if (this.languages.active.id !== language.id)
    {
      // console.log('Language changed:', this.languages.active.id, '->', language.id);
      this.languages.active = language;
      this.appService.updateLanguage(language.id);
      this.languageService.updateLanguage(this.languages);
      this.cdr.detectChanges();
    }
  }

  public selectFeature(): void
  {
    this.close();
  }

  public parseRoute(feature: Feature): string
  {
    return (this.appService.getRoute(feature.module) + this.i18n(feature, 'route'));
  }

  public featureStatus(id: number): string
  {
    return ((id === this.features.active.id) ? 'feature_active' : '');
  }

  public languageStatus(id: string): string
  {
    return ((id === this.languages.active.id) ? 'language_active' : '');
  }

  public toggle(): void
  {
    if (this.navigationState === '')
    {
      this.renderer.addClass(this.appNavigation.nativeElement, 'active');
      this.navigationState = 'active';
    }
    else
    {
      this.renderer.removeClass(this.appNavigation.nativeElement, 'active');
      this.navigationState = '';
    }
  }

  public open(): void
  {
    this.navigationState = 'active';
    this.renderer.addClass(this.appNavigation.nativeElement, 'active');
  }

  public close(): void
  {
    this.navigationState = '';
    this.renderer.removeClass(this.appNavigation.nativeElement, 'active');
  }
}
