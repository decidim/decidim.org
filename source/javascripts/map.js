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

  // Corporate color
  const CORPORATE_RED = '#e11d1d';
  const CORPORATE_RED_HOVER = '#c20a0a';

  /**
   * Create a custom SVG pin marker icon
   */
  function createPinIcon() {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="44">
        <path fill="${CORPORATE_RED}" fill-rule="evenodd"
          d="M12 1C7.03 1 3 5.03 3 10c0 6.75 9 13 9 13s9-6.25 9-13c0-4.97-4.03-9-9-9z
            M12 6 a4 4 0 1 0 0.001 0z
            M12 8.5 a1.5 1.5 0 1 0 0.001 0z"/>
      </svg>
    `;
    return L.divIcon({ className: '', html: svg, iconSize: [36, 44], iconAnchor: [18, 44], popupAnchor: [0, -44] });
  }

  function createCountIcon(count) {
    const size = count > 99 ? 44 : 36;
    const html = `
      <div style="
        width:${size}px;
        height:${size}px;
        background:${CORPORATE_RED};
        border-radius:50%;
        display:flex;
        align-items:center;
        justify-content:center;
        color:white;
        font-family:sans-serif;
        font-size:${count > 99 ? 13 : 15}px;
        font-weight:700;
        outline: 2px solid ${CORPORATE_RED};
        outline-offset: 3px;
      ">${count}</div>
    `;

    return L.divIcon({
      className: '',
      html,
      iconSize: [size, size],
      iconAnchor: [size/2, size/2],
      popupAnchor: [0, -(size/2 + 4)]
    });
  }

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
        return createCountIcon(cluster.getChildCount());
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
        title: installation.title,
        icon: createPinIcon()
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
        <span class="inline-block pr-2.5 py-1 text-xs font-medium rounded-full ${typeClass} mb-3">
          ${typeLabel}
        </span>
        <a href="${escapeHtml(installation.url)}"
           target="_blank"
           rel="noopener noreferrer"
           class="text-sm block truncate transition-colors"
           style="color: #ff3333;"
           onmouseover="this.style.color='#c20a0a'"
           onmouseout="this.style.color='#ff3333'">
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
