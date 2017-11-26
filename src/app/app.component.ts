import { Component, ChangeDetectorRef, OnInit, AfterViewInit, ViewChild, HostListener } from '@angular/core';

import { AppService } from '@app/app.service';
import { HttpGetService } from '@app/core/services/http-get.service';
import { ScrollService } from '@app/core/services/scroll.service';

import { AppCommunicationService } from '@app/core/communication/app-communication.service';
import { LanguageCommunicationService } from '@app/core/communication/language-communication.service';

import { App } from '@app/app.model';

const config =
{
  'json': 'assets/app.json'
};

@Component({
  selector: 'app-root',
  templateUrl: './app.view.html',
  styleUrls: ['./app.style.scss'],
  providers: [
    AppCommunicationService,
    LanguageCommunicationService
  ]
})

export class AppComponent implements OnInit, AfterViewInit
{
  public app = new App();

  @ViewChild('scrollEl') scrollEl;

  @HostListener('window:resize') onResize()
  {
    this.handleResize();
  }

  constructor(
    private cdr: ChangeDetectorRef,

    private httpGet: HttpGetService,
    private appService: AppService,
    private scrollService: ScrollService,

    private appCommunicationService: AppCommunicationService,
    private languageCommunicationService: LanguageCommunicationService
  )
  {
    this.languageCommunicationService.onChangeLanguage$.subscribe(
      (language) =>
      {
        this.selectLanguage(language);
      }
    );
    this.languageCommunicationService.onVerifyLanguage$.subscribe(
      () =>
      {
        this.appCommunicationService.updateApp(this.app);
      }
    );
  }

  ngOnInit()
  {
    this.httpGet.getJson(config.json).subscribe(
      (json) =>
      {
        this.app.initialize(json);
        this.app.language.default = this.appService.getAppLanguage(this.app.language);
        this.app.loaded = (this.app.language.default !== '');
        window.document.getElementById('logo').className = 'active';
        this.cdr.detectChanges();
      },
      (e) =>
      {
        console.log("Ooops, something went wrong...");
      }
    );
  }

  ngAfterViewInit()
  {
    this.handleResize();
    this.cdr.detectChanges();
  }

  private handleResize(): void
  {
    this.app.width = window.innerWidth;
    this.app.height = window.innerHeight;
  }

  public selectLanguage(language: string): void
  {
    console.log('App language changed:', this.app.language.default, '->', language);
    this.app.language.default = language;
    this.appService.updateLanguage(language);
    this.appCommunicationService.updateApp(this.app);
  }

  public handleScroll(): void
  {
    console.log(this.scrollEl.navtiveElement.scrollTop);
  }

  public scrollTo(position: number)
  {
    this.scrollService.scrollTo(this.scrollEl, position);
  }
}
