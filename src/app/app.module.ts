import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment.development';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { CategoryNavbarComponent } from './layout/category-navbar/category-navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { SingleCategoryComponent } from './pages/single-category/single-category.component';
import { SinglePostComponent } from './pages/single-post/single-post.component';
import { TermAndConditionComponent } from './pages/term-and-condition/term-and-condition.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { SubscriptionFormComponent } from './subscription-form/subscription-form.component';
import { CommentFormComponent } from './comments/comment-form/comment-form.component';
import { CommentListComponent } from './comments/comment-list/comment-list.component';
import { PostCardComponent } from './layout/post-card/post-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CategoryNavbarComponent,
    FooterComponent,
    HomeComponent,
    SingleCategoryComponent,
    SinglePostComponent,
    TermAndConditionComponent,
    ContactUsComponent,
    SubscriptionFormComponent,
    CommentFormComponent,
    CommentListComponent,
    PostCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaceCongfig)
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
