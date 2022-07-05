import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import { ProductosComponent } from './admin/productos/productos.component';
import { ScannerComponent } from './admin/scanner/scanner.component';
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'producto',
    component: ProductosComponent
  },
  {
    path: 'scanner',
    component: ScannerComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
