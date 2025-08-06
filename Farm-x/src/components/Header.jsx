import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';

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

const MapLocationPicker = () => {
  const [latLng, setLatLng] = useState({ lat: 20.5937, lng: 78.9629 });
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

  const getCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setLatLng({ lat: latitude, lng: longitude });
        },
        (err) => {
          alert('Unable to retrieve your location. Please enable location services.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  return (
    <motion.div
      className="p-4 max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.h2
        className="text-xl md:text-2xl font-bold mb-4 text-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        📍 Select Your Location
      </motion.h2>

      <motion.div
        className="flex flex-col md:flex-row gap-4 md:items-center mb-4"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <input
          type="text"
          placeholder="Search city or village..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="flex gap-2">
          <motion.button
            onClick={handleSearch}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
          >
            🔍 Search
          </motion.button>
          <motion.button
            onClick={getCurrentLocation}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm"
          >
            📌 Use Current Location
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        className="h-[350px] md:h-[500px] w-full rounded-lg overflow-hidden shadow-md"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <MapContainer
          center={[latLng.lat, latLng.lng]}
          zoom={6}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[latLng.lat, latLng.lng]} />
          <MapClickHandler setLatLng={setLatLng} />
          <MapUpdater center={[latLng.lat, latLng.lng]} />
        </MapContainer>
      </motion.div>

      <motion.p
        className="text-center mt-4 text-base md:text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        📌 Selected Location: <strong>{latLng.lat.toFixed(4)}, {latLng.lng.toFixed(4)}</strong>
      </motion.p>
    </motion.div>
  );
};

export default MapLocationPicker;
