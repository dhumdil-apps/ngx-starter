import { Component, ChangeDetectorRef, OnInit, AfterViewInit, HostListener } from '@angular/core';

import { AppService } from '@app/app.service';
import { HttpGetService } from '@app/core/services/http-get.service';

import { LanguageCommunicationService } from '@app/core/communication/language-communication.service';

import { Language, Languages } from '@app/languages.model';
import { Features } from '@app/features.model';

const config =
{
  'json': 'assets/app/app.json'
};

@Component({
  selector: 'app-root',
  templateUrl: './app.view.html',
  styleUrls: ['./app.style.scss'],
  providers: [
    LanguageCommunicationService
  ]
})

export class AppComponent implements OnInit, AfterViewInit
{
  public loaded: boolean;
  public height: number;

  public features: Features;
  public languages: Languages;

  @HostListener('window:resize') onResize()
  {
    this.handleResize();
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private httpGet: HttpGetService,
    private appService: AppService,
    private languageCommunicationService: LanguageCommunicationService
  ) {
    this.init();
  }

  ngOnInit()
  {
    this.initialize();
  }

  ngAfterViewInit()
  {
    this.handleResize();
    this.cdr.detectChanges();
  }

  private init(): void
  {
    this.loaded = false;
    this.height = 0;
    this.languages = new Languages();
    this.features = new Features();

    this.languageCommunicationService.onChangeLanguage$.subscribe(
      (language) =>
      {
        this.selectLanguage(language);
      }
    );

    this.languageCommunicationService.onVerifyLanguage$.subscribe(
      () =>
      {
        this.languageCommunicationService.updateLanguage(this.languages);
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
  
            if (this.languages.active.id !== undefined)
            {
              this.loaded = true;
              window.document.getElementById('logo').className = 'active';
            }
  
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

  private handleResize(): void
  {
    this.height = window.innerHeight;
  }

  public selectLanguage(language: Language): void
  {
    console.log('Language changed:', this.languages.active.id, '->', language.id);
    this.languages.active = language;
    this.appService.updateLanguage(language.id);
    this.languageCommunicationService.updateLanguage(this.languages);
    this.cdr.detectChanges();
  }
}
