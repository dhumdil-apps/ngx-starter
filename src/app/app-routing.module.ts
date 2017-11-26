import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Lazy load all the 'Feature Modules' (for a smaller main-bundle size)
const routes: Routes =
[
  {
    path: '',
    loadChildren: 'app/home/home.module#HomeModule'
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    // When combining with backend router, use this option:
    // RouterModule.forRoot(routes, { useHash: true })
    // otherwise this one:
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule
{}
