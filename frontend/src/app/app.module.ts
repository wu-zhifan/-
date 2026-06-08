import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// 页面组件
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataEntryComponent } from './data-entry/data-entry.component';
import { SystemConfigComponent } from './system-config/system-config.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { DataReportComponent } from './data-report/data-report.component';
import { DataAlertComponent } from './data-alert/data-alert.component';
import { OperationLogComponent } from './operation-log/operation-log.component';
import { SystemMonitorComponent } from './system-monitor/system-monitor.component';
import { DataOverviewComponent } from './data-overview/data-overview.component';
import { AiAssistantComponent } from './ai-assistant/ai-assistant.component';

// 公共组件
import { SearchComponent } from './components/search/search.component';
import { TablePaginationComponent } from './components/table-pagination/table-pagination.component';
import { ChartComponent } from './components/chart/chart.component';

// 管道
import { DateFormatPipe } from './pipes/date-format.pipe';
import { NumberFormatPipe } from './pipes/number-format.pipe';

// 路由配置
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'data-entry', component: DataEntryComponent },
  { path: 'data-overview', component: DataOverviewComponent },
  { path: 'data-report', component: DataReportComponent },
  { path: 'data-alert', component: DataAlertComponent },
  { path: 'operation-log', component: OperationLogComponent },
  { path: 'system-monitor', component: SystemMonitorComponent },
  { path: 'system-config', component: SystemConfigComponent },
  { path: 'user-management', component: UserManagementComponent },
  { path: 'ai-assistant', component: AiAssistantComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    DataEntryComponent,
    DataOverviewComponent,
    SystemConfigComponent,
    UserManagementComponent,
    DataReportComponent,
    DataAlertComponent,
    OperationLogComponent,
    SystemMonitorComponent,
    AiAssistantComponent,
    SearchComponent,
    TablePaginationComponent,
    ChartComponent,
    DateFormatPipe,
    NumberFormatPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
