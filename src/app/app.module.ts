import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConsultaComponent } from './view/consulta/consulta.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import { MaterialModule } from './material';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';





@NgModule({
  declarations: [
    AppComponent,
    ConsultaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MaterialModule,
    FormsModule, 
    NgxPaginationModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
