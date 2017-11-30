import { Component, ChangeDetectorRef, OnInit } from '@angular/core';

import { AppService } from '@app/app.service';
import { HttpGetService } from '@app/core/services/http-get.service';

import { LanguageService } from '@app/core/communication/language-communication.service';

import { Language, Languages } from '@app/languages.model';
import { Features } from '@app/features.model';

const config =
{
  'json': 'assets/app/app.json'
};

@Component({
  selector: 'app-root',
  template:
  `
  <div *ngIf="loaded">

    <app-navigation
      [languages]        = "languages"
      [features]         = "features"
      (onSelectLanguage) = "selectLanguage($event)"
    ></app-navigation>

    <router-outlet></router-outlet>

  </div>
  `,
  providers: [
    LanguageService
  ]
})

export class AppComponent implements OnInit
{
  public loaded: boolean;
  public height: number;

  public features: Features;
  public languages: Languages;

  constructor(
    private cdr: ChangeDetectorRef,
    private httpGet: HttpGetService,
    private appService: AppService,
    private languageService: LanguageService
  ) {
    this.init();
  }

  ngOnInit()
  {
    this.initialize();
  }

  private init(): void
  {
    this.loaded = false;

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

  private initialize(): void
  {
    this.httpGet.getJson(config.json).subscribe(
      (json) =>
      {
        try
        {
          this.languages.initialize(json.data.languages);
          this.features.initialize(json.data.features);

          if (this.languages.list.length > 0)
          {
            this.languages.active = this.appService.initializeLanguage(this.languages.list);
            this.loaded = (this.languages.active.id !== undefined);
            this.cdr.detectChanges();
          }
        }
        catch (e)
        {
          console.log("Ooops, something went wrong...");
        }
      },
      (e) =>
      {
        console.log("Ooops, something went wrong...");
      }
    );
  }

  public selectLanguage(language: Language): void
  {
    console.log('Language changed:', this.languages.active.id, '->', language.id);
    this.languages.active = language;
    this.appService.updateLanguage(language.id);
    this.languageService.updateLanguage(this.languages);
    this.cdr.detectChanges();
  }
}
