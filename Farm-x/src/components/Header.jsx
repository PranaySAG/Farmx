import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
// const [latLng, setLatLng] = useState({ lat: 20.5937, lng: 78.9629 });
function MapClickHandler({ setLatLng }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setLatLng({ lat, lng });
    },
  });
  return null;
}

function MapUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 10);
  }, [center]);
  return null;
}
// useEffect(() => {
//   navigator.geolocation.getCurrentPosition((pos) => {
//     setLatLng({ lat: pos.coords.latitude, lng: pos.coords.longitude });
//   });
// }, []);


const MapLocationPicker = () => {
  const [latLng, setLatLng] = useState({ lat: 20.5937, lng: 78.9629 }); // Default: India center
  const [searchText, setSearchText] = useState('');

  const handleSearch = async () => {
    const apiKey = '7b674c67753544d9a619e1018a46bc5c';
    try {
      const res = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${searchText}&key=${apiKey}`
      );
      const loc = res.data.results[0].geometry;
      setLatLng({ lat: loc.lat, lng: loc.lng });
    } catch (error) {
      alert('Location not found or API error.');
    }
  };

  return (
    <div style={{ padding: '10px' }}>
      <h3>Select Location</h3>
      <input
        type="text"
        placeholder="Search city or village..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ padding: '6px', width: '60%' }}
      />
      <button onClick={handleSearch} style={{ marginLeft: '10px', padding: '6px 12px' }}>
        Search
      </button>

      <MapContainer center={[latLng.lat, latLng.lng]} zoom={6} style={{ height: '400px', marginTop: '20px' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[latLng.lat, latLng.lng]} />
        <MapClickHandler setLatLng={setLatLng} />
        <MapUpdater center={[latLng.lat, latLng.lng]} />
      </MapContainer>

      <p style={{ marginTop: '10px' }}>
        📍 Selected Location: <strong>{latLng.lat.toFixed(4)}, {latLng.lng.toFixed(4)}</strong>
      </p>
    </div>
  );
};

export default MapLocationPicker;
