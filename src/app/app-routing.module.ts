import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login-cliente',
    pathMatch: 'full'
  },
  {
    path: 'form-cliente',
    loadChildren: () => import('./form-cliente/form-cliente.module').then( m => m.FormClientePageModule)
  },
  {
    path: 'cliente',
    loadChildren: () => import('./cliente/cliente.module').then( m => m.ClientePageModule)
  },

  {
    path: 'registro-cliente',
    loadChildren: () => import('./registro-cliente/registro-cliente.module').then( m => m.RegistroClientePageModule)
  },
  {
    path: 'lista-empresa',
    loadChildren: () => import('./empresas/lista-empresa/lista-empresa.module').then( m => m.ListaEmpresaPageModule)
  },
  {

    path: 'form-empresa',
  
    loadChildren: () => import('./empresas/form-empresa/form-empresa.module').then( m => m.FormEmpresaPageModule)
  
  },
  {
    path: 'login-cliente',
    loadChildren: () => import('./login-cliente/login-cliente.module').then( m => m.LoginClientePageModule)
  },
  {
    path: 'registro-empresa',
    loadChildren: () => import('./empresas/registro-empresa/registro-empresa.module').then( m => m.RegistroEmpresaPageModule)
  },
  {
    path: 'login-empresa',
    loadChildren: () => import('./empresas/login-empresa/login-empresa.module').then( m => m.LoginEmpresaPageModule)
  },  {
    path: 'inicio-empresa',
    loadChildren: () => import('./empresas/inicio-empresa/inicio-empresa.module').then( m => m.InicioEmpresaPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
