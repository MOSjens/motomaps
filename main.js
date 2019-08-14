import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from '/ol/source/OSM';
import XYZ from 'ol/source/XYZ';

const raster = new Tile({
	source: new OSM()
});

new Map({
  target: 'map',
  layers: [raster],
  view: new View({
    center: [962819.917537, 6310344.861740], //Coordinates of Bad Schönborn
    zoom: 12
  })
});
