import { latLng, latLngBounds, tileLayer } from 'leaflet';
import { environment } from 'src/environments/environment';

export abstract class Layers {
    static osm = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    });

    static mapaPolitico = tileLayer('https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    });

    static ortoMosaico = tileLayer.wms(environment.url_wms_ombues_fraybentos + "?tiled=true", {
        layers: 'ortomosaico2',
        transparent: true,
        format: 'image/png',
        minZoom: 1,
        maxZoom: 22,
    });

    static ombues_fraybentos = tileLayer.wms(environment.url_wms_ombues_fraybentos, {
        layers: 'fraybentos',
        transparent: true,
        format: 'image/png',
        maxZoom: 21,

    });


    static ideuy_ortofoto = tileLayer('https://mapas.ide.uy/geoserver-raster/gwc/service/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=' +
        'ortofotos%3AORTOFOTOS_2019' + '&STYLE=&TILEMATRIXSET=EPSG%3A3857&TILEMATRIX=EPSG%3A3857%3A{z}&TILEROW={y}&TILECOL={x}&FORMAT=image%2Fjpeg',
        {  maxZoom: 21,});

}