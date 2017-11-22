import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// lazy load all the 'Feature modules' (example: TestModule):
const routes: Routes = [
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    // Use this option when combining with backend router:
    // RouterModule.forRoot(routes, { useHash: true })
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule
{}
