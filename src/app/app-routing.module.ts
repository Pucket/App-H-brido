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
  },  {
    path: 'form-cliente',
    loadChildren: () => import('./form-cliente/form-cliente.module').then( m => m.FormClientePageModule)
  },
  {
    path: 'cliente',
    loadChildren: () => import('./cliente/cliente.module').then( m => m.ClientePageModule)
  },
<<<<<<< HEAD
=======
  {
    path: 'form-empresa',
    loadChildren: () => import('./empresas/form-empresa/form-empresa.module').then( m => m.FormEmpresaPageModule)
  },
  {
    path: 'lista-empresa',
    loadChildren: () => import('./empresas/lista-empresa/lista-empresa.module').then( m => m.ListaEmpresaPageModule)
  },
];
>>>>>>> ffab4cc6af6dcdb472f9ecdc4bc5ae32f81907ff

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
