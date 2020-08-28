import { Component } from '@angular/core';
import { tileLayer, latLng, circle, polygon, Layer } from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ombues-mapa-fraybentos';

  // layers
  osm = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }); 

  ombues_fraybentos = tileLayer.wms('http://localhost:8080/geoserver/ombues_fraybentos/wms?', {
        layers: 'fraybentos',
        transparent:true,
        format: 'image/png',
        maxZoom: 21,
   
});

  options = {
    layers: [
      this.osm,
      this.ombues_fraybentos
    ],
    zoom: 7,
    center: latLng([ -32.431723, -56.319552 ])
  };

  layersControl = {
    baseLayers: {
      'Open Street Map': this.osm,     
    },
    overlays: {
      'Ombues' : this.ombues_fraybentos,
      'Big Circle': circle([ 46.95, -122 ], { radius: 5000 }),
      'Big Square': polygon([[ 46.8, -121.55 ], [ 46.9, -121.55 ], [ 46.9, -121.7 ], [ 46.8, -121.7 ]]),
      
    }
  }
}
