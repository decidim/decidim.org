// Vendor bundle entry point
// Bundles Leaflet and Leaflet.markercluster for use in the map

import L from 'leaflet';
import 'leaflet.markercluster';

// Import Leaflet CSS (esbuild will handle this)
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

// Make Leaflet available globally for map.js
window.L = L;
