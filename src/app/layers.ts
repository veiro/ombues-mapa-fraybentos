//import { latLng, latLngBounds, tileLayer } from 'leaflet';
import { environment } from 'src/environments/environment';
import * as L from 'leaflet';
/// <reference path="../plugins/leaflet-tilelayer-wmts.d.ts"/>
import '../../node_modules/leaflet-tilelayer-wmts/dist/leaflet-tilelayer-wmts.js';



export abstract class Layers {
    static osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    });

    static mapaPolitico = L.tileLayer('https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    });

    static ortoMosaico = L.tileLayer.wms(environment.url_wms_ombues_fraybentos+"?tiled=true", {
        layers: 'ortomosaico2',
        transparent: true,
        format: 'image/png',
        minZoom: 1,
        maxZoom: 21,
    });

    static ombues_fraybentos = L.tileLayer.wms(environment.url_wms_ombues_fraybentos, {
        layers: 'fraybentos',
        transparent: true,
        format: 'image/png',
        maxZoom: 21,

    });

    static url_servicio_ideuy = "https://mapas.ide.uy/geoserver-raster/gwc/service/wmts"
    static ideuy_ortofoto = L.tileLayer.WMTS( Layers.url_servicio_ideuy,
        {
            layer: 'layerIGNScanStd',
            style: "",
            format: "image/jpeg",
            version : '1.0.0' }
       );
    
}