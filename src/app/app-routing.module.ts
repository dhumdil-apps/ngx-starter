import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Lazy load all the features here
const routes: Routes =
[
  {
    path: '',
    loadChildren: 'app/features/home/home.module#HomeModule'
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule
{}
