import React, { useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { stylesSilver } from '@/viewsCustomer/MapGymTrainer/constant';
//reference https://jsfiddle.net/pw9kt2sg/1/
//https://console.cloud.google.com/apis/credentials?project=pt-booking-001
//https://jsfiddle.net/geocodezip/kwxazdgp/7/
export interface GeneralLocationInfo {
  position: {};
  contentString: string;
  label: string;
}

const GoogleMap = ({ locations }: { locations: GeneralLocationInfo[] }) => {
  let map: any;
  let marker: any;
  let infowindow: any;

  const VIETNAM_BOUNDS = {
    north: 23.4,
    south: 8.18,
    west: 102.14,
    east: 109.46,
  };
  const mapOptions = {
    zoom: 15,
    styles: stylesSilver,
    streetViewControl: false,
    mapTypeControl: false,
    restriction: {
      latLngBounds: VIETNAM_BOUNDS,
      strictBounds: false,
    },
  };

  // re pan when have new location //3.1656120,101.6504025, ;
  function pan(latlon: {}) {
    // const coords = latlon.split(",");
    // const panPoint = new window?.google?.maps?.LatLng(coords[0], coords[1]);
    // marker?.setPosition(panPoint);
    // // shadow.setPosition(panPoint);
    // map?.panTo(panPoint);
    // map?.setZoom(15);
  }

  function initMap() {
    const { Map, InfoWindow, Marker } = window.google.maps;
    //const { AdvancedMarkerElement, PinElement } = window.google.maps.Marker;

    map = new Map(document.getElementById('map'), mapOptions);

    const markers: any[] = [];

    locations.forEach((location) => {
      const { position, contentString, label } = location;
      console.log("position",position)
      const infoWindow = new InfoWindow({
        content: contentString,
        ariaLabel: label,
      });

      const marker = new Marker({
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
      markers.push(marker);
    });

    const bounds = new window.google.maps.LatLngBounds();
    markers?.forEach((marker) => {
      bounds.extend(marker.getPosition());
    });
    map.fitBounds(bounds);
    map.setZoom(Math.min(map.getZoom(), 15));
  }

  useEffect(() => {
    const loadGoogleMap = () => {
      const configLoader = {
        apiKey: 'AIzaSyDR9VfH6Vb_s5n76UE6mq-4dfrWOyjQKxU',
        version: 'weekly',
      };
      const loader = new Loader(configLoader);

      loader.load().then((e) => {
        if (!window.google?.maps) return;

        initMap();
      });
    };

    loadGoogleMap();
  }, [locations]);

  return <div id="map" style={{ height: '400px' }} />;
};

export default GoogleMap;
