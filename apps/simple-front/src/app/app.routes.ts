import { Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/register.component';
import { LoginComponent } from './features/auth/login.component';
import { SendResetComponent } from './features/auth/send-reset.component';
import { ResetPasswordComponent } from './features/auth/reset-password.component';
import { MeComponent } from './features/user/me.component';
import { MyProductsComponent } from './features/product/pages/my-products.component';
import { EveryoneProductsComponent } from './features/product/pages/everyone-products.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'everyone', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'send-reset', component: SendResetComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'me', component: MeComponent, canActivate: [AuthGuard] },
  { path: 'my', component: MyProductsComponent, canActivate: [AuthGuard] },
  { path: 'everyone', component: EveryoneProductsComponent },
];
