import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CredentialsComponent} from './core/credentials/credentials.component';
import {BrandComponent} from './core/brand/brand.component';


const routes: Routes = [
  {
    path: '',
    component: CredentialsComponent
  }, {
    path: 'brand',
    component: BrandComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
