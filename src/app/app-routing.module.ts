import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './pages/admin/admin.component';
import {LoginComponent} from './pages/login/login.component';
import {HomeComponent} from './pages/home/home.component';
import {UserComponent} from './pages/user/user.component';
import {UserAdminGuardService} from './shared/user-admin-guard.service';
import {UserUnknownGuardService} from './shared/user-unknown-guard.service';
import {UserValidGuardService} from './shared/user-valid-guard.service';

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  canActivate: [UserUnknownGuardService]
}, {
  path: 'user',
  component: UserComponent,
  canActivate: [UserUnknownGuardService]
},
{
  path: 'admin',
  component: AdminComponent,
  canActivate: [UserUnknownGuardService]
},
{
  path: 'login',
  component: LoginComponent
}, {
  path: '**',
  redirectTo: '/',
  pathMatch: 'full'
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {useHash: true, scrollPositionRestoration: 'enabled'})
  ],
  exports: [
    RouterModule
  ],
  providers: [
    UserUnknownGuardService,
    UserValidGuardService,
    UserAdminGuardService,
  ],
  declarations: []
})
export class AppRoutingModule {
}
