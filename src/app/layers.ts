import { latLng, latLngBounds, tileLayer } from 'leaflet';
import { environment } from 'src/environments/environment';

export abstract class Layers {
    static osm = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    });

    static mapaPolitico = tileLayer('https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    });

    static ortoMosaico = tileLayer.wms(environment.url_wms_ombues_fraybentos+"?tiled=true", {
        layers: 'ortomosaico_fraybentos',
        transparent: true,
        format: 'image/jpeg',
        minZoom: 17,
        maxZoom: 22,
       // bounds: latLngBounds([[-6493487.9815,-3914302.0000],[-6486828.4054,-3910279.5014]])
    });

    static ombues_fraybentos = tileLayer.wms(environment.url_wms_ombues_fraybentos, {
        layers: 'fraybentos',
        transparent: true,
        format: 'image/png',
        maxZoom: 21,

    });
}