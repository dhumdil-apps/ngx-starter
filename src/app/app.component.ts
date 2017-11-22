import { Component, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';

import { HttpGetService } from '@app/core/services/http-get.service';
import { I18nService } from '@app/core/services/i18n.service';
import { LangService } from '@app/core/services/lang.service';
import { ScrollService } from '@app/core/services/scroll.service';
import { UrlService } from '@app/core/services/url.service';

import { AppService } from '@app/core/singleton-services/app.service';

import { App } from '@app/app.model';

const config =
{
  'json': 'assets/app.json'
};

@Component({
  selector: 'app-root',
  templateUrl: './app.view.html',
  styleUrls: ['./app.style.scss'],
  providers: [LangService]
})

export class AppComponent implements OnInit
{
  public app = new App();

  @ViewChild('scrollEl') scrollEl;

  constructor(
    private cdr: ChangeDetectorRef,
    private httpGet: HttpGetService,
    private i18nService: I18nService,
    private scrollService: ScrollService,
    private urlService: UrlService,
    private appService: AppService,
    private langService: LangService
  ) {
    this.init();
  }

  ngOnInit()
  {
    this.initializeApp();
  }

  private init(): void
  {
    this.langService.languageChanged$.subscribe(lang =>
    {
      console.log('Language changed:', this.app.lang, '->', lang);
      this.selectLanguage(lang);
    });

    this.langService.languageVerify$.subscribe(() =>
    {
      console.log('Verifing app status');
      this.langService.updateApp(this.app);
    });
  }

  private initializeApp(): void
  {
    this.httpGet
      .get(config.json)
      .subscribe(
        json =>
        {
          try
          {
            this.app.initialize(json);
            this.app.lang = this.appService.getLang(this.app.languages);

            if (this.app.lang === '')
            {
              this.handleError('Error loading the language!', this.app);
            }
            else
            {
              this.app.loaded = true;
              this.cdr.detectChanges();
            }
          }
          catch (e)
          {
            this.handleError(e.message, this.app);
          }
        },
        e =>
        {
          this.handleError(e.message, e);
        }
      );
  }

  public handleError(msg: string, obj: any): void
  {
    console.log("Ooops, something went wrong!");
    // console.log(msg, obj);
  }

  public toggleNavigation(): void
  {
    this.app.navigation.isActive ? this.closeNavigation() : this.openNavigation();
  }

  public i18n(obj: any, key: string): any
  {
    return this.i18nService.i18n(obj, key, this.app.lang);
  }

  public openNavigation(): void
  {
    this.app.navigation.isActive = true;
  }

  public closeNavigation(): void
  {
    this.app.navigation.isActive = false;
  }

  public parseUrl(type: string, id: string): string
  {
    return (this.urlService.getUrl(type, id));
  }

  public selectLink(): void
  {
    this.closeNavigation();
    this.scrollService.scrollTo(this.scrollEl, 0);
  }

  public selectLanguage(lang: string): void
  {
    this.app.lang = lang;
    this.appService.updateLang(lang);
    this.langService.updateApp(this.app);
  }
}
