import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'form-empresa',
    loadChildren: () => import('./empresas/form-empresa/form-empresa.module').then( m => m.FormEmpresaPageModule)
  },
  {
    path: 'lista-empresa',
    loadChildren: () => import('./empresas/lista-empresa/lista-empresa.module').then( m => m.ListaEmpresaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
