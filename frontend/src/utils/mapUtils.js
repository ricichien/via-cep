// utils/mapUtils.js
let map, infoWindow, markers = [];

export const initMap = (container) => {
  const center = { lat: -22.909938, lng: -43.176899 }; // Sede RJ

  map = new window.google.maps.Map(container, {
    center,
    zoom: 15,
    mapTypeId: 'roadmap',
    mapTypeControl: false,
    fullscreenControl: false,
    streetViewControl: false
  });

  infoWindow = new window.google.maps.InfoWindow();
};

/**
 * Remove todos os marcadores do mapa.
 */
export const clearMarkers = () => {
  markers.forEach(marker => marker.setMap(null));
  markers = [];
};

/**
 * Cria e adiciona um marcador ao mapa.
 * @param {Object} position - Objeto contendo lat e lng.
 * @param {string} title - Título para exibir no InfoWindow.
 */
export const addMarker = (position, title) => {
  const marker = new window.google.maps.Marker({
    position,
    map,
    title
  });

  marker.addListener('click', () => {
    infoWindow.setContent(title);
    infoWindow.open(map, marker);
  });

  markers.push(marker);
};

/**
 * Centraliza o mapa na posição fornecida.
 * @param {Object} position - Objeto contendo lat e lng.
 */
export const panTo = (position) => {
  map.panTo(position);
  map.setZoom(16);
};
