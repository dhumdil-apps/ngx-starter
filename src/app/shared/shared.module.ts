import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LanguageComponent } from './language/language.component';
import { HamburgerComponent } from './hamburger/hamburger.component';
import { LinkComponent } from './link/link.component';
import { StaticNavigationComponent } from './static-navigation/static-navigation.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    LanguageComponent,
    HamburgerComponent,
    LinkComponent,
    StaticNavigationComponent
  ],
  exports: [
    LanguageComponent,
    HamburgerComponent,
    LinkComponent,
    StaticNavigationComponent,
  ]
})

export class SharedModule
{}
