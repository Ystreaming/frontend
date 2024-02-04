import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ListSubscriptionComponent } from './list-subscription/list-subscription.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NavBarComponent,
    ListSubscriptionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
  exports: [
    NavBarComponent,
    ListSubscriptionComponent
  ]
})
export class SharedModule { }
