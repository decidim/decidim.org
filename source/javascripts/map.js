/**
 * Installation Map with Leaflet and Marker Clustering
 * Displays Decidim installations on an interactive map with filtering
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    tileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    tileAttribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
    minZoom: 2
  };

  // State
  let map = null;
  let markersLayer = null;
  let allInstallations = [];
  let markers = [];

  /**
   * Initialize the map
   */
  function init() {
    const mapContainer = document.querySelector('[data-map-container]');
    const dataElement = document.getElementById('map-installations-data');
    
    if (!mapContainer || !dataElement) {
      return;
    }

    // Parse installations data
    try {
      allInstallations = JSON.parse(dataElement.textContent);
    } catch (e) {
      console.error('Failed to parse map data:', e);
      return;
    }

    if (!allInstallations.length) {
      return;
    }

    // Initialize Leaflet map
    map = L.map(mapContainer, {
      maxZoom: CONFIG.maxZoom,
      minZoom: CONFIG.minZoom,
      scrollWheelZoom: false
    });

    // Add tile layer
    L.tileLayer(CONFIG.tileUrl, {
      attribution: CONFIG.tileAttribution,
      maxZoom: CONFIG.maxZoom
    }).addTo(map);

    // Create marker cluster group
    markersLayer = L.markerClusterGroup({
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
      maxClusterRadius: 80,
      iconCreateFunction: function(cluster) {
        const count = cluster.getChildCount();
        let size = 'small';
        if (count >= 100) size = 'large';
        else if (count >= 10) size = 'medium';
        
        return L.divIcon({
          html: '<div class="flex items-center justify-center w-10 h-10 bg-red-500 rounded-full text-white font-bold shadow-lg border-2 border-white">' + count + '</div>',
          className: 'marker-cluster marker-cluster-' + size,
          iconSize: L.point(40, 40)
        });
      }
    });

    // Create markers for all installations
    createMarkers(allInstallations);
    
    // Add markers layer to map
    map.addLayer(markersLayer);
    
    // Fit bounds to show all markers
    fitBounds();

    // Set up filter listeners
    setupFilterListeners();
  }

  /**
   * Create markers from installations data
   */
  function createMarkers(installations) {
    markers = [];
    
    installations.forEach(function(installation) {
      if (!installation.lat || !installation.lng) {
        return;
      }

      const marker = L.marker([installation.lat, installation.lng], {
        title: installation.title
      });

      // Create popup content with Tailwind styling
      const popupContent = createPopupContent(installation);
      marker.bindPopup(popupContent, {
        maxWidth: 300,
        minWidth: 200,
        className: 'installation-popup'
      });

      // Store installation data on marker for filtering
      marker.installationData = installation;
      markers.push(marker);
      markersLayer.addLayer(marker);
    });
  }

  /**
   * Create popup HTML content
   */
  function createPopupContent(installation) {
    const typeLabels = {
      'city': 'City',
      'region': 'Region',
      'org': 'Organization',
      'university': 'University'
    };
    
    const typeLabel = typeLabels[installation.type] || installation.type;
    const typeColors = {
      'city': 'bg-blue-100 text-blue-700',
      'region': 'bg-green-100 text-green-700',
      'org': 'bg-purple-100 text-purple-700',
      'university': 'bg-orange-100 text-orange-700'
    };
    const typeClass = typeColors[installation.type] || 'bg-gray-100 text-gray-700';

    return `
      <div class="p-4 min-w-[220px] max-w-[280px]">
        <h3 class="font-bold text-gray-900 mb-2 text-base leading-tight">
          ${escapeHtml(installation.title)}
        </h3>
        <span class="inline-block px-2.5 py-1 text-xs font-medium rounded-full ${typeClass} mb-3">
          ${typeLabel}
        </span>
        <a href="${escapeHtml(installation.url)}" 
           target="_blank" 
           rel="noopener noreferrer" 
           class="text-red-500 hover:text-red-600 hover:underline text-sm block truncate transition-colors">
          ${escapeHtml(installation.url)}
        </a>
      </div>
    `;
  }

  /**
   * Escape HTML to prevent XSS
   */
  function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Fit map bounds to show all markers
   */
  function fitBounds() {
    if (markers.length === 0) {
      // Default view if no markers
      map.setView([45, 10], 4);
      return;
    }

    const group = new L.featureGroup(markers);
    map.fitBounds(group.getBounds().pad(0.1));
  }

  /**
   * Filter markers by type
   */
  function filterMarkers(type) {
    if (!markersLayer) return;

    // Clear current markers
    markersLayer.clearLayers();

    // Filter and add markers
    const filteredMarkers = type === 'all' 
      ? markers 
      : markers.filter(function(marker) {
          return marker.installationData.type === type;
        });

    filteredMarkers.forEach(function(marker) {
      markersLayer.addLayer(marker);
    });

    // Refit bounds to show filtered markers
    if (filteredMarkers.length > 0) {
      const group = new L.featureGroup(filteredMarkers);
      map.fitBounds(group.getBounds().pad(0.1));
    }
  }

  /**
   * Set up event listeners for tab filtering
   */
  function setupFilterListeners() {
    // Find the tab list
    const tabList = document.querySelector('[role="tablist"]');
    if (!tabList) return;

    const tabs = tabList.querySelectorAll('[role="tab"]');
    
    tabs.forEach(function(tab, index) {
      // Click handler
      tab.addEventListener('click', function() {
        handleTabChange(index);
      });

      // Keyboard handler
      tab.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleTabChange(index);
        }
      });
    });
  }

  /**
   * Handle tab change
   */
  function handleTabChange(index) {
    const typeMap = {
      0: 'all',
      1: 'region',
      2: 'city',
      3: 'org',
      4: 'university'
    };

    const type = typeMap[index] || 'all';
    filterMarkers(type);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
