import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { I18nService } from './i18n.service';
import { LocalStorageService } from './local-storage.service';
import { PageService } from './page.service';
import { ScrollService } from './scroll.service';
import { UrlService } from './url.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    I18nService,
    LocalStorageService,
    PageService,
    ScrollService,
    UrlService
  ],
  declarations: []
})

export class CoreModule
{}
