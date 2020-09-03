import { Component, ViewChild, ElementRef } from '@angular/core';
import { tileLayer, latLng, circle, polygon, Layer, Map, Util, LatLng } from 'leaflet';
import { environment } from 'src/environments/environment';
import { ServiciosMapaService } from './services/servicios-mapa.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ServiciosMapaService]
})
export class AppComponent {


  constructor(private _serviciosMapaService: ServiciosMapaService,
    private _modalService: NgbModal) {

    for (let i = 0; i < 700; i++) {
      this.fotos[i] = i;
    }
  }


  title = 'ombues-mapa-fraybentos';
  fotos = [700];
  fotosAMostrar = [];
  urlImg: any;
  closeResult = '';
  @ViewChild('content') content: ElementRef;

  // layers
  osm = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  });


  ombues_fraybentos = tileLayer.wms(environment.url_wms_ombues_fraybentos, {
    layers: 'fraybentos',
    transparent: true,
    format: 'image/png',
    maxZoom: 21,

  });

  options = {
    layers: [
      this.osm,
      this.ombues_fraybentos
    ],
    zoom: 7,
    center: latLng([-32.431723, -56.319552])
  };

  layersControl = {
    baseLayers: {
      'Open Street Map': this.osm,
    },
    overlays: {
      'Ombues': this.ombues_fraybentos,
      'Big Circle': circle([46.95, -122], { radius: 5000 }),
      'Big Square': polygon([[46.8, -121.55], [46.9, -121.55], [46.9, -121.7], [46.8, -121.7]]),

    }
  }
  private _url: string;

  private map: Map;

  onMapReady(map: Map) {
    this.map = map;
  }

  clickEvent(item) {
    // console.log(item);
    //console.log(item.layerPoint);

    // Construct a GetFeatureInfo request URL given a point
    var point = this.map.latLngToContainerPoint(item.latlng),
      size = this.map.getSize(),

      // this crs is used to show layer added to map
      crs = this.map.options.crs,

      // these are the SouthWest and NorthEast points 
      // projected from LatLng into used crs
      sw = crs.project(this.map.getBounds().getSouthWest()),
      ne = crs.project(this.map.getBounds().getNorthEast()),

      params = {
        request: 'GetFeatureInfo',
        service: 'WMS',

        // this is the code of used crs
        srs: crs.code,
        version: this.ombues_fraybentos.wmsParams.version,
        format: this.ombues_fraybentos.wmsParams.format,

        // these are bbox defined by SouthWest and NorthEast coords
        bbox: sw.x + ',' + sw.y + ',' + ne.x + ',' + ne.y,
        height: size.y,
        width: size.x,
        layers: this.ombues_fraybentos.wmsParams.layers,
        query_layers: this.ombues_fraybentos.wmsParams.layers,
        info_format: 'application/json'
      };

    params[params.version === '1.3.0' ? 'i' : 'x'] = point.x;
    params[params.version === '1.3.0' ? 'j' : 'y'] = point.y;

    this._url = environment.url_wms_ombues_fraybentos + Util.getParamString(params, this._url, true);

    this._serviciosMapaService.get(this._url).subscribe(
      (data: any) => {

        console.log(data.features[0].properties);
        this.armarListadoImagenesMostrar(data.features[0].properties.imagenes);

        this._modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });

      });
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

  armarListadoImagenesMostrar(idImagenes: string) {
    this.fotosAMostrar = [];
    let idSeparados = idImagenes.split(",");
    idSeparados.forEach(element => {
      let direccion = '../assets/fraybentos-attach/' + element + '.jpeg';
      this.fotosAMostrar.push(direccion);
    });
  }
}
