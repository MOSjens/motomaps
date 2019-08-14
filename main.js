import {Map, View} from 'ol';
import OSM from 'ol/source/OSM';
import GPX from 'ol/format/GPX';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';

	const raster = new Tile({
        source: new OSM()
        });

      const style = {
        'Point': new Style({
          image: new CircleStyle({
            fill: new Fill({
              color: 'rgba(255,255,0,0.4)'
            }),
            radius: 5,
            stroke: new Stroke({
              color: '#ff0',
              width: 1
            })
          })
        }),
        'LineString': new Style({
          stroke: new Stroke({
            color: '#f00',
            width: 3
          })
        }),
        'MultiLineString': new Style({
          stroke: new Stroke({
            color: '#0f0',
            width: 3
          })
        })
      };
      const vector = new VectorLayer({
        source: new VectorSource({
         url: 'gpx/2019-05-18_09-53_Sat.gpx',
          format: new GPX()
        }),
        style: function(feature) {
          return style[feature.getGeometry().getType()];
        }
      });
      const map = new Map({
        layers: [raster],     //, vector],
        target: document.getElementById('map'),
        view: new View({
          center: [962819.917537, 6310344.861740], //Coordinates of Bad Schönborn
          zoom: 12
        })
      });
      const displayFeatureInfo = function(pixel) {
        const features = [];
        map.forEachFeatureAtPixel(pixel, function(feature) {
          features.push(feature);
        });
        if (features.length > 0) {
          const info = [];
          let i, ii;
          for (i = 0, ii = features.length; i < ii; ++i) {
            info.push(features[i].get('desc'));
          }
          document.getElementById('info').innerHTML = info.join(', ') || '(unknown)';
          map.getTarget().style.cursor = 'pointer';
        } else {
          document.getElementById('info').innerHTML = '&nbsp;';
          map.getTarget().style.cursor = '';
        }
      };
      map.on('pointermove', function(evt) {
        if (evt.dragging) {
          return;
        }
        const pixel = map.getEventPixel(evt.originalEvent);
        displayFeatureInfo(pixel);
      });
      map.on('click', function(evt) {
        displayFeatureInfo(evt.pixel);
      });
