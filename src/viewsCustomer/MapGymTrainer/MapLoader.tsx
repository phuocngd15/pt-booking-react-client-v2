import React, { useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { stylesSilver } from '@/viewsCustomer/MapGymTrainer/constant';

const GoogleMap = () => {
  const locations = [
    {
      position: { lat: 10.984571001127811, lng: 106.66716863206851 },
      contentString: 'Location 1',
      label: 'A',
    },
    {
      position: { lat: 10.980915601259877, lng: 106.67333310905951 },
      contentString: 'Location 2',
      label: 'B',
    },
    // Add more locations as needed...
  ];

  useEffect(() => {
    const loadMap = () => {
      const center = locations[0].position;
      const defaultZoom = 15;
      const loader = new Loader({
        apiKey: 'key',
        version: 'weekly',
      });

      loader.load().then((e) => {
        console.log('e', e);
        const map = new window.google.maps.Map(document.getElementById('map'), {
          zoom: defaultZoom,
          center,
          streetViewControl: false,
          mapTypeControl: false,
        });
        map.setOptions({ styles: stylesSilver });
        const markers = [];
        locations.forEach((location) => {
          const { position, contentString, label } = location;

          const infoWindow = new window.google.maps.InfoWindow({
            content: contentString,
            ariaLabel: label,
          });

          const marker = new window.google.maps.Marker({
            position,
            label,
            map,
          });

          marker.addListener('click', () => {
            infoWindow.open({
              anchor: marker,
              map,
            });
          });
          // markers.push(marker);
        });

        // Ẩn tất cả các nhãn trên bản đồ
        // Hide markers for locations not in the locations array
        // const bounds = new window.google.maps.LatLngBounds();
        // markers?.forEach((marker) => {
        //   bounds.extend(marker.getPosition());
        // });
        // map.fitBounds(bounds);
        // map.setZoom(Math.min(map.getZoom(), defaultZoom));
      });
    };

    loadMap();
  }, []);

  return <div id="map" style={{ height: '400px' }} />;
};

export default GoogleMap;
