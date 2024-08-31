import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomeComponent } from './components/home/home.component';
import { StructuredComponent } from './components/home/structured/structured.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginPageComponent
  },{
    path: "",
    component: HomeComponent
  },
  // { path: 'structured', component: StructuredComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
