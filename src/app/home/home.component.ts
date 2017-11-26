import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { HttpGetService } from '@app/core/services/http-get.service';
import { I18nService } from '@app/core/services/i18n.service';
import { PageService } from '@app/core/services/page.service';

import { LanguageCommunicationService } from '@app/core/communication/language-communication.service';
import { AppCommunicationService } from '@app/core/communication/app-communication.service';

import { App } from '@app/app.model';
import { Home } from './home.model';

const config =
{
  'json': 'assets/home/home.json',
  'title': 'Home | www.bajas.sk',
  'description': '...'
};

@Component({
	selector: 'app-home',
	templateUrl: 'home.view.html',
  styleUrls: ['home.style.scss']
})

export class HomeComponent implements OnInit
{
  public app: App;
  public home: Home;
  private subscription: Subscription;

  constructor(
    private httpGetService: HttpGetService,
    private i18nService: I18nService,
    private pageService: PageService,

    private appCommunicationService: AppCommunicationService,
    private languageCommunicationService: LanguageCommunicationService
  )
  {
    this.home = new Home();
    this.pageService.updateTitle(config.title);
    this.pageService.updateDescription(config.description);

    this.subscription = this.appCommunicationService.onAppUpdate$.subscribe(
      (app) => this.app = app
    );
  }

  ngOnInit()
  {
    this.languageCommunicationService.verifyLanguage();

    this.httpGetService.getJson(config.json).subscribe(
      (json) =>
      {
        this.home.initialize(json);

        if (!this.home.loaded)
        {
          console.log("Ooops, something went wrong!");
        }
      },
      (e) =>
      {
        console.log("Ooops, something went wrong!");
      }
    );
  }

  public i18n(obj: any, key: string): any
  {
    return this.i18nService.tryI18n(obj, key, this.app.language.default);
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }
}
