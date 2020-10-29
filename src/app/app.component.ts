import { Component, ViewChild, ElementRef } from '@angular/core';
import { tileLayer, latLng, circle, polygon, Layer, Map, Util, LatLng } from 'leaflet';
import { environment } from 'src/environments/environment';
import { ServiciosMapaService } from './services/servicios-mapa.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Layers } from './layers'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ServiciosMapaService]
})
export class AppComponent {

  constructor(private _serviciosMapaService: ServiciosMapaService,
    private _modalService: NgbModal) { }

  fotosAMostrar = [];
  closeResult = '';
  puntoSeleccionado = null;
  @ViewChild('content') content: ElementRef;

  // layers
  osm = Layers.osm;
  mapaPolitico = Layers.mapaPolitico;
  ombues_fraybentos = Layers.ombues_fraybentos;
  ortomosaico = Layers.ortoMosaico;

  options = {
    layers: [
      //this.osm,
      this.ombues_fraybentos,
      this.ortomosaico,
      this.mapaPolitico
    ],
    zoom: 7,
    center: latLng([-32.431723, -56.319552])
  };

  layersControl = {
    baseLayers: {
      //'Open Street Map': this.osm,  
      'Mapa politico': this.mapaPolitico,
    },
    overlays: {   
     'Ortomosaico fraybentos' :  this.ortomosaico,
      'Ombues': this.ombues_fraybentos,
    }
  }

  private map: Map;

  // metodo para cargar en this.map el objeto mapa para operar con el.
  onMapReady(map: Map) {
    this.map = map;    
  }

  // metodo para abrir el modal
  onClickOnMapEvent(item) {
    let url = this.getUrlForGetFeatureInfo(item);

    this._serviciosMapaService.get(url).subscribe(
      (data: any) => {

        console.log(data.features[0].properties);
        this.puntoSeleccionado = data.features[0].properties;
        console.log('this.puntoSeleccionado',this.puntoSeleccionado);
        this.armarListadoImagenesMostrar(data.features[0].properties.imagenes);

        this._modalService.open(this.content, { size: 'lg', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });

      });
  }

  private getUrlForGetFeatureInfo(item: any) {
    let point = this.map.latLngToContainerPoint(item.latlng);
    let size = this.map.getSize();
    let crs = this.map.options.crs;
    let sw = crs.project(this.map.getBounds().getSouthWest());
    let ne = crs.project(this.map.getBounds().getNorthEast());
    let params = {
      request: 'GetFeatureInfo',
      service: 'WMS',
      srs: crs.code,
      version: this.ombues_fraybentos.wmsParams.version,
      format: this.ombues_fraybentos.wmsParams.format,
      bbox: sw.x + ',' + sw.y + ',' + ne.x + ',' + ne.y,
      height: size.y,
      width: size.x,
      layers: this.ombues_fraybentos.wmsParams.layers,
      query_layers: this.ombues_fraybentos.wmsParams.layers,
      info_format: 'application/json'
    };
    params['x'] = point.x;
    params['y'] = point.y;

    let url = environment.url_wms_ombues_fraybentos + Util.getParamString(params, "", true);
    return url;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  private armarListadoImagenesMostrar(idImagenes: string) {
    this.fotosAMostrar = [];
    let idSeparados = idImagenes.split(",");
    idSeparados.forEach(element => {
      let direccion = 'assets/fraybentos-attach/' + element + '.jpeg';
      this.fotosAMostrar.push(direccion);
    });
  }
}
