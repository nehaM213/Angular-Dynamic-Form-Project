import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MasterFormComponent } from './master-form/master-form.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AddFormComponent } from './add-form/add-form.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ViewFormComponent } from './view-form/view-form.component';
import { ServiceHttp } from './services/service-http.service';
import { ValidationService } from './services/validation.service';
import { UpdateFormComponent } from './update-form/update-form.component';
import { JwPaginationComponent } from 'jw-angular-pagination';
import { NgxPaginationModule } from 'ngx-pagination';
import { TemplateViewComponent } from './template-view/template-view.component';
import { NgxSortableModule } from 'ngx-sortable';

// import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TabsModule } from 'ngx-tabs';
import { MasterTemplateComponent } from './master-template/master-template.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { UpdateTemplateComponent } from './update-template/update-template.component';
import { ViewParticularTemplateComponent } from './view-particular-template/view-particular-template.component';

@NgModule({
  declarations: [
    AppComponent,
    MasterFormComponent,
    AddFormComponent,
    ViewFormComponent,
    UpdateFormComponent,
    JwPaginationComponent,
    TemplateViewComponent,
    MasterTemplateComponent,
    UpdateTemplateComponent,
    ViewParticularTemplateComponent,
  ],
  imports: [
    TabsModule,

    NgxPaginationModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    RouterModule.forRoot([
      { path: 'master-form', component: MasterFormComponent },
      { path: 'template-view', component: TemplateViewComponent },
      { path: 'template-view/:response', component: TemplateViewComponent },
      { path: 'master-form/:response', component: MasterFormComponent },
      { path: 'add-form', component: AddFormComponent, },
      { path: 'view-form/:formId', component: ViewFormComponent },
      { path: 'update-form/:formId', component: UpdateFormComponent },
      { path: 'master-template', component: MasterTemplateComponent },
      { path: 'update-template/:templateId', component: UpdateTemplateComponent },
      { path: 'view-particular-template/:templateId', component: ViewParticularTemplateComponent },
    ]),
    BrowserAnimationsModule,
    NgxSortableModule,
    DragDropModule,
    // BsDropdownModule,
    // NgbModule,
  ],
  providers: [ServiceHttp, ValidationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
