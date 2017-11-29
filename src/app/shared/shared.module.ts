import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FeatureComponent } from './navigation/feature/feature.component';
import { LanguageComponent } from './navigation/language/language.component';
import { HamburgerComponent } from './navigation/hamburger/hamburger.component';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    FeatureComponent,
    HamburgerComponent,
    LanguageComponent,
    NavigationComponent
  ],
  exports: [
    FeatureComponent,
    HamburgerComponent,
    LanguageComponent,
    NavigationComponent
  ]
})

export class SharedModule
{}
