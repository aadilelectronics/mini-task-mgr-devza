import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { EntityDataModule, EntityDataService, EntityDefinitionService } from '@ngrx/data';

import { InputTextModule } from 'primeng-lts/inputtext';
import { ConfirmationService, MessageService } from 'primeng-lts/api';
import { ButtonModule } from 'primeng-lts/button';
import { CalendarModule } from 'primeng-lts/calendar';
import { RippleModule } from 'primeng-lts/ripple';
import { ToastModule } from 'primeng-lts/toast';
import { TableModule } from 'primeng-lts/table';
import { DropdownModule } from 'primeng-lts/dropdown';
import { DragDropModule } from 'primeng-lts/dragdrop';
import { DialogService, DynamicDialogModule } from 'primeng-lts/dynamicdialog';
import { ToolbarModule } from 'primeng-lts/toolbar';
import { OverlayPanelModule } from 'primeng-lts/overlaypanel';
import { ChartModule } from 'primeng-lts/chart';
import { CardModule } from 'primeng-lts/card';
import { ProgressSpinnerModule } from 'primeng-lts/progressspinner';
import { ConfirmDialogModule } from 'primeng-lts/confirmdialog';

import { UserStatisticsComponent } from './components/user-stats/user-stats.component';
import { TaskComponent } from './components/task/task.component';
import { TaskManagerComponent } from './components/task-manager/task-manager.component';
import { StatisticsComponent } from './components/stats/stats.component';
import { UserDataService } from './services/user-data.service';
import { TaskDataService } from './services/task-data.service';
import { entityMetadataMap } from './store/store.metadata';
import { LoadingComponent } from './components/loading/loading.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    HomeComponent,
    UserStatisticsComponent,
    TaskComponent,
    TaskManagerComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 10, logOnly: environment.production }),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot({}),
    InputTextModule,
    ButtonModule,
    CalendarModule,
    RippleModule,
    ToastModule,
    TableModule,
    DropdownModule,
    DragDropModule,
    DynamicDialogModule,
    ToolbarModule,
    OverlayPanelModule,
    ChartModule,
    CardModule,
    ProgressSpinnerModule,
    ConfirmDialogModule
  ],
  providers: [MessageService, DialogService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule {
  // ?-------------------------------------------------------------------------
  constructor(
    private entDefService: EntityDefinitionService,
    private entDataService: EntityDataService,
    private userDataService: UserDataService,
    private taskDataService: TaskDataService
  ) {
    this.entDefService.registerMetadataMap(entityMetadataMap);
    this.entDataService.registerService('Users', this.userDataService);
    this.entDataService.registerService('Tasks', this.taskDataService);
  }
}
