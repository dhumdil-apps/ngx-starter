import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { HttpGetService } from '@app/core/services/http-get.service';
import { I18nService } from '@app/core/services/i18n.service';
import { PageService } from '@app/core/services/page.service';
import { ScrollService } from '@app/core/services/scroll.service';

import { LanguageCommunicationService } from '@app/core/communication/language-communication.service';

import { Feature } from '@app/features.model';
import { Home } from './home.model';
import { Languages } from '@app/languages.model';

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

export class HomeComponent implements OnInit, OnDestroy
{
  public home: Home;
  public languages: Languages;

  private subscription: Subscription;

  @ViewChild('scrollEl') scrollEl;

  constructor(
    private httpGetService: HttpGetService,
    private i18nService: I18nService,
    private pageService: PageService,
    private scrollService: ScrollService,
    private languageCommunicationService: LanguageCommunicationService
  ) {
    this.init();
  }

  ngOnInit()
  {
    this.initialize();
  }

  private init(): void
  {
    this.home = new Home();
    this.pageService.updateTitle(config.title);
    this.pageService.updateDescription(config.description);

    this.subscription = this.languageCommunicationService.onUpdateLanguage$.subscribe(
      (languages) =>
      {
        this.languages = languages;
      }
    );
  }

  private initialize(): void
  {
    this.languageCommunicationService.verifyLanguage();

    this.httpGetService.getJson(config.json).subscribe(
      (json) =>
      {
        this.home.initialize(json);
      },
      (e) =>
      {
        console.log("Ooops, something went wrong!");
      }
    );
  }

  public i18n(obj: any, key: string): any
  {
    return this.i18nService.tryI18n(obj, key, this.languages.active.id);
  }

  // TODO
  public scrollTo(position: number)
  {
    this.scrollService.scrollTo(this.scrollEl, position);
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }
}
