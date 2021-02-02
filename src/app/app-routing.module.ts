import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

// Send unauthorized users to login
const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo(['/home']);
 
// Automatically log in users
const redirectLoggedInToChat = () => redirectLoggedInTo(['/chat']);

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
    loadChildren: () => import('./form-cliente/form-cliente.module').then( m => m.FormClientePageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'cliente',
    loadChildren: () => import('./cliente/cliente.module').then( m => m.ClientePageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },

  {
    path: 'registro-cliente',
    loadChildren: () => import('./registro-cliente/registro-cliente.module').then( m => m.RegistroClientePageModule)
  },
  {
    path: 'lista-empresa',
    loadChildren: () => import('./empresas/lista-empresa/lista-empresa.module').then( m => m.ListaEmpresaPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {

    path: 'form-empresa',
    loadChildren: () => import('./empresas/form-empresa/form-empresa.module').then( m => m.FormEmpresaPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  
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
    loadChildren: () => import('./inicio-cliente/inicio-cliente.module').then( m => m.InicioClientePageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'inicio-empresa',
    loadChildren: () => import('./empresas/inicio-empresa/inicio-empresa.module').then( m => m.InicioEmpresaPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
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
    loadChildren: () => import('./empresas/form-servico/form-servico.module').then( m => m.FormServicoPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'servico',
    loadChildren: () => import('./empresas/servico/servico.module').then( m => m.ServicoPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'avaliacao-empresa',
    loadChildren: () => import('./avaliacao-empresa/avaliacao-empresa.module').then( m => m.AvaliacaoEmpresaPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'exibir-servico',
    loadChildren: () => import('./exibir-servico/exibir-servico.module').then( m => m.ExibirServicoPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },  {
    path: 'exibir-avaliacao',
    loadChildren: () => import('./exibir-avaliacao/exibir-avaliacao.module').then( m => m.ExibirAvaliacaoPageModule)
  },






];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
