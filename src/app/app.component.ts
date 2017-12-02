import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/retry';

import { AppCommunicationService } from '@app/app-communication.service';
import { AppService } from '@app/app.service';
import { I18nService } from '@app/core/i18n.service';

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
    AppCommunicationService
  ]
})

export class AppComponent implements OnInit
{
  public features: Features;
  public languages: Languages;
  public loaded: boolean;
  public navigationState: string;

  constructor(
    private appCommunicationService: AppCommunicationService,
    private appService: AppService,
    private cdr: ChangeDetectorRef,
    private http: HttpClient,
    private i18nService: I18nService
  ) {
    this.loaded = false;
    this.navigationState = '';

    this.languages = new Languages();
    this.features = new Features();

    this.appCommunicationService.onSelectLanguage$
      .subscribe((languageId: string) =>
      {
        for (let i = 0; i < this.languages.list.length; i++)
        {
          if (this.languages.list[i].id === languageId)
          {
            this.selectLanguage(this.languages.list[i]);
            break;
          }
        }
      }
    );

    this.appCommunicationService.onVerifyLanguage$
      .subscribe(() =>
      {
        this.appCommunicationService.changeLanguage(this.languages.active.id);
      }
    );
  }

  ngOnInit()
  {
    this.http.get(config.json)
      .retry(3)
      .subscribe((json) =>
      {
        try
        {
          this.languages.initialize(json['data']['languages']);
          this.features.initialize(json['data']['features']);

          if (this.languages.list.length > 0 && this.languages.active.id !== undefined)
          {
            this.languages.active = this.appService.initializeLanguage(this.languages.list);
            this.loaded = true;
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
        console.log(config.error_message, e);
      });
  }

  public i18n(obj: any, key: string): any
  {
    return this.i18nService.tryI18n(obj, key, this.languages.active.id);
  }

  public selectLanguage(language: Language): void
  {
    if (this.languages.active.id !== language.id)
    {
      console.log('Language changed:', this.languages.active.id, '->', language.id);
      this.languages.active = language;
      this.appService.updateLanguage(language.id);
      this.appCommunicationService.changeLanguage(this.languages.active.id);
      this.cdr.detectChanges();
    }
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

  public toggleMenu(): void
  {
    this.navigationState = (this.navigationState === 'active') ? '' : 'active';
  }
}
