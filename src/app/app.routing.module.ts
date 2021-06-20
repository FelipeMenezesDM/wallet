import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListPayeeComponent } from './components/listas/list-payee/list-payee.component';

const routes: Routes = [
  { path: '', component: AppComponent, children:[{ path: '', component: DashboardComponent }] },
  { path: 'user', component: AuthComponent },
  { path: 'pay', component: ListPayeeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }