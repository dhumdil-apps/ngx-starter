import { NgModule } from '@angular/core';

// HttpModule is depracated, but 'HttpClientModule' is 'buggy'...
// so replace this with 'HttpClientModule' once it's fixed
// https://github.com/angular/angular/issues/18680
import { HttpModule } from '@angular/http';

import { HttpGetService } from './services/http-get.service';
import { I18nService } from './services/i18n.service';
import { LocalStorageService } from './services/local-storage.service';
import { PageService } from './services/page.service';
import { ScrollService } from './services/scroll.service';
import { UrlService } from './services/url.service';

import { AppCommunicationService } from './communication/app-communication.service';
import { LanguageCommunicationService } from './communication/language-communication.service';

import { UrlMappingService } from './url-mapping.service';

@NgModule({
  imports: [
    HttpModule
  ],
  providers: [
    HttpGetService,
    I18nService,
    LocalStorageService,
    PageService,
    ScrollService,
    UrlService,

    AppCommunicationService,
    LanguageCommunicationService,

    UrlMappingService
  ],
  declarations: []
})

export class CoreModule
{}
