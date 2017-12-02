import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/retry';

import { AppCommunicationService } from '@app/app-communication.service';
import { I18nService } from '@app/core/i18n.service';
import { PageService } from '@app/core/page.service';

import { Home } from './home.model';

const config =
{
  'json': 'assets/home/home.json',
  'title': 'Home | www.bajas.sk',
  'description': '...',
  'err_message': 'Ooops, something went wrong!'
};

@Component({
  selector: 'app-home',
  templateUrl: 'home.view.html',
  styleUrls: ['home.style.scss']
})

export class HomeComponent implements OnInit, OnDestroy
{
  public home: Home;
  public languageId: string;

  private subscription: Subscription;

  constructor(
    private cdr: ChangeDetectorRef,
    private http: HttpClient,
    private i18nService: I18nService,
    private pageService: PageService,
    private appCommunicationService: AppCommunicationService
  ) {
    this.languageId = undefined;
    this.home = new Home();

    this.pageService.updateTitle(config.title);
    this.pageService.updateDescription(config.description);

    this.subscription = this.appCommunicationService.onChangeLanguage$
      .subscribe((languageId: string) =>
      {
        console.log('Language verifyed!', languageId);
        this.languageId = languageId;
        this.cdr.detectChanges();
      }
    );
  }

  ngOnInit()
  {
    this.appCommunicationService.verifyLanguage();

    this.http.get(config.json)
      .retry(3)
      .subscribe((json) =>
      {
        console.log('Json loaded!', json);
        this.home.initialize(json);
        this.cdr.detectChanges();
      },
      (e) =>
      {
        console.log(config.err_message, e);
      }
    );
  }

  public i18n(obj: any, key: string): any
  {
    if (this.languageId !== undefined)
    {
      return this.i18nService.tryI18n(obj, key, this.languageId);
    }
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }
}
