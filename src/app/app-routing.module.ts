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
  },
  {
    path: 'inicio-cliente',
    loadChildren: () => import('./inicio-cliente/inicio-cliente.module').then( m => m.InicioClientePageModule)
  },
  {
    path: 'inicio-empresa',
    loadChildren: () => import('./empresas/inicio-empresa/inicio-empresa.module').then( m => m.InicioEmpresaPageModule)
  },
  {
    path: 'redefir-senha-cliente',
    loadChildren: () => import('./redefir-senha-cliente/redefir-senha-cliente.module').then( m => m.RedefirSenhaClientePageModule)
  },
  {
    path: 'redefinir-senha-empresa',
    loadChildren: () => import('./redefinir-senha-empresa/redefinir-senha-empresa.module').then( m => m.RedefinirSenhaEmpresaPageModule)
  },
  {
    path: 'form-servico',
    loadChildren: () => import('./empresas/form-servico/form-servico.module').then( m => m.FormServicoPageModule)
  },
  {
    path: 'servico',
    loadChildren: () => import('./empresas/servico/servico.module').then( m => m.ServicoPageModule)
  },  {
    path: 'avaliacao-empresa',
    loadChildren: () => import('./avaliacao-empresa/avaliacao-empresa.module').then( m => m.AvaliacaoEmpresaPageModule)
  },
  {
    path: 'exibir-servico',
    loadChildren: () => import('./exibir-servico/exibir-servico.module').then( m => m.ExibirServicoPageModule)
  },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
