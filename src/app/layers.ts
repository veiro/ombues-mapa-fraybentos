import { tileLayer } from 'leaflet';
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
        maxZoom: 22,

    });

    static ombues_fraybentos = tileLayer.wms(environment.url_wms_ombues_fraybentos, {
        layers: 'fraybentos',
        transparent: true,
        format: 'image/png',
        maxZoom: 21,

    });
}