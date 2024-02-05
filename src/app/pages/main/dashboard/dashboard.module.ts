import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { StatisticsComponent } from './statistics/statistics.component';
import { ContentComponent } from './content/content.component';
import { SettingsComponent } from './settings/settings.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CreateChannelComponent } from './create-channel/create-channel.component';

@NgModule({
  declarations: [
    DashboardComponent,
    StatisticsComponent,
    ContentComponent,
    SettingsComponent,
    ConfirmDialogComponent,
    CreateChannelComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
