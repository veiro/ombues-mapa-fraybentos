import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { HttpClientModule } from '@angular/common/http';

import {ServiciosMapaService} from './services/servicios-mapa.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {CrystalLightboxModule} from '@crystalui/angular-lightbox';
import {DatosVacioPipe}from './utils/datos-vacio-pipe';

@NgModule({
  declarations: [
    AppComponent,
    DatosVacioPipe
  ],
  imports: [
    CrystalLightboxModule,
    BrowserModule,
    AppRoutingModule,
    LeafletModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [ServiciosMapaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
