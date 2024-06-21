import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingleCategoryComponent } from './pages/single-category/single-category.component';
import { SinglePostComponent } from './pages/single-post/single-post.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { TermAndConditionComponent } from './pages/term-and-condition/term-and-condition.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {path : '' , component : HomeComponent},
  {path : 'category', component: SingleCategoryComponent},
  {path : 'post' , component : SinglePostComponent},
  {path : 'about', component :AboutUsComponent },
  {path : 'term-condition' , component : TermAndConditionComponent},
  {path : 'contact' , component : ContactUsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
