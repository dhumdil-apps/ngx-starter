import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { I18nService } from './services/i18n.service';
import { LocalStorageService } from './services/local-storage.service';
import { PageService } from './services/page.service';
import { ScrollService } from './services/scroll.service';
import { UrlService } from './services/url.service';

import { LanguageService } from './communication/language-communication.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    I18nService,
    LocalStorageService,
    PageService,
    ScrollService,
    UrlService,

    LanguageService
  ],
  declarations: []
})

export class CoreModule
{}
