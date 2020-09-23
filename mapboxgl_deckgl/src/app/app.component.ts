// src/app/app.component.ts
import { Component, AfterViewInit } from ‘@angular/core’;
import { environment } from ‘src/environments/environment’;
import * as mapboxgl from ‘mapbox-gl’;
import { Deck } from ‘@deck.gl/core’;
import { GeoJsonLayer, ArcLayer } from ‘@deck.gl/layers’;

@Component({…}) 
export class AppComponent implements AfterViewInit{
ngAfterViewInit() {
(mapboxgl as any).accessToken = environment.mapboxToken; // configure the mapbox token
const AIR_PORTS = 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson';
const INITIAL_VIEW_STATE = {
  latitude: 51.47,
  longitude: 0.45,
  zoom: 4,
  bearing: 0,
  pitch: 30
};
const map = new mapboxgl.Map({
container: 'map', // should be the div id
style: 'mapbox://styles/mapbox/dark-v10',
interactive: false, // deck.gl will be in charge of interaction and event handling
  center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
  zoom: INITIAL_VIEW_STATE.zoom,
  bearing: INITIAL_VIEW_STATE.bearing,
  pitch: INITIAL_VIEW_STATE.pitch
});
const deck = new Deck({
  canvas: ‘deck-canvas’,
  width: ‘100%’,
  height: ‘100%’,
  initialViewState: INITIAL_VIEW_STATE,
  controller: true,
  onViewStateChange: ({ viewState }) => {
  map.jumpTo({
  center: [viewState.longitude, viewState.latitude],
  zoom: viewState.zoom,
  bearing: viewState.bearing,
  pitch: viewState.pitch
  });
  },
  layers: [
  new ArcLayer({
  id: 'arcs',
  data: AIR_PORTS,
  dataTransform: d => d.features.filter(f => f.properties.scalerank < 4),
  getSourcePosition: f => [-0.4531566, 51.4709959], // London
  getTargetPosition: f => f.geometry.coordinates,
  getSourceColor: [0, 128, 200],
  getTargetColor: [200, 0, 80],
  getWidth: 1
  })
  ]
  });  
}
}
