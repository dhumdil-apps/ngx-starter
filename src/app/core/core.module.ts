import { NgModule } from '@angular/core';

// HttpModule is depracated but HttpClientModule is buggy... so replace it once it's fixed
// https://github.com/angular/angular/issues/18680
import { HttpModule } from '@angular/http';

import { HttpGetService } from './services/http-get.service';
import { I18nService } from './services/i18n.service';
import { LangService } from './services/lang.service';
import { MetaService } from './services/meta.service';
import { ScrollService } from './services/scroll.service';
import { UrlService } from './services/url.service';

import { AppService } from './singleton-services/app.service';
import { LocalStorageService } from './singleton-services/local-storage.service';

@NgModule({
  imports: [
    HttpModule
  ],
  providers: [
    HttpGetService,
    I18nService,
    LangService,
    MetaService,
    ScrollService,
    UrlService,

    AppService,
    LocalStorageService
  ],
  declarations: []
})

export class CoreModule {}
