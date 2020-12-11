import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  // tslint:disable-next-line: max-line-length
  { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  // tslint:disable-next-line: max-line-length
  { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }  },
  // tslint:disable-next-line: max-line-length
  { path: 'deployments', loadChildren: './pages/deployments/deployments.module#DeploymentsPageModule', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }  },
  // tslint:disable-next-line: max-line-length
  { path: 'usermanagement', loadChildren: './pages/usermanagement/usermanagement.module#UsermanagementPageModule', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  // tslint:disable-next-line: max-line-length
  { path: 'system-monitoring', loadChildren: './pages/system-monitoring/system-monitoring.module#SystemMonitoringPageModule', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  // tslint:disable-next-line: max-line-length
  { path: 'testing', loadChildren: './pages/testing/testing.module#TestingPageModule', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  { path: 'deployment', loadChildren: './modals/deployment/deployment.module#DeploymentPageModule' },
  { path: 'mobile-deployment', loadChildren: './modals/mobile-deployment/mobile-deployment.module#MobileDeploymentPageModule' },
  { path: 'project-list', loadChildren: './pages/project-list/project-list.module#ProjectListPageModule' },
  { path: 'project-view', loadChildren: './modals/project-view/project-view.module#ProjectViewPageModule' },
  { path: 'project-create', loadChildren: './modals/project-create/project-create.module#ProjectCreatePageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
