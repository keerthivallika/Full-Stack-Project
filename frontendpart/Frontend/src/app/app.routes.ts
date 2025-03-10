import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AddProductComponent } from './add-product/add-product.component';
import { UserDetailsComponent } from './user-details/user-details.component';

export const routes: Routes = [
    {path:'register', component:RegisterComponent},
    {path:'login', component:LoginComponent},
    {path:'user-details',component:UserDetailsComponent},
    {path:'product-list', component:ProductListComponent},
    {path:'add-product', component:AddProductComponent},
    {path:'', redirectTo:'/login', pathMatch: 'full'}
];
