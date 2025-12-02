"use client";
import React, { useRef, useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Auto-fit map
function MapAutoFit({ properties, userLocation, skipFit }) {
  const map = useMap();
  useEffect(() => {
    if (!map || skipFit) return;
    const bounds = [];
    properties.forEach((p) => { if (p.lat && p.lng) bounds.push([p.lat, p.lng]); });
    if (userLocation) bounds.push([userLocation.lat, userLocation.lng]);
    if (bounds.length) map.fitBounds(bounds, { padding: [50,50] });
    else map.setView([19.076, 72.8777], 10);
  }, [properties, userLocation, map, skipFit]);
  return null;
}

export default function MapView({ properties, userLocation, onLocate, onViewDetails, onEnquire }) {
  const mapRef = useRef();
  const [skipFit, setSkipFit] = useState(false);

  const handleSearchNearMe = () => {
    if (!navigator.geolocation) { alert("Browser does not support location."); return; }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        if(onLocate) onLocate(loc);
        if(mapRef.current){
          setSkipFit(true);
          mapRef.current.setView([loc.lat, loc.lng], 13);
          setTimeout(()=> setSkipFit(false), 500);
        }
      },
      () => alert("Unable to access your location.")
    );
  };

  return (
    <div style={{ height: "600px", width: "100%", position: "relative" }}>
      <button
        onClick={handleSearchNearMe}
        style={{
          position: "absolute", top: 10, right: 10, zIndex:9999,
          background:"#1976d2", color:"white", padding:"8px 14px",
          borderRadius:6, border:"none", cursor:"pointer", fontWeight:500,
          boxShadow:"0 4px 12px rgba(0,0,0,0.2)"
        }}
      >
        Search Near Me
      </button>

      <MapContainer
        center={userLocation ? [userLocation.lat,userLocation.lng] : [19.076,72.8777]}
        zoom={10} scrollWheelZoom style={{height:"100%", width:"100%"}} whenCreated={(map) => mapRef.current = map}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapAutoFit properties={properties} userLocation={userLocation} skipFit={skipFit} />

        {userLocation && <>
          <Marker position={[userLocation.lat, userLocation.lng]}>
            <Popup>You are here</Popup>
          </Marker>
          <Circle center={[userLocation.lat, userLocation.lng]} radius={5000} pathOptions={{ color:"blue" }} />
        </>}

        {properties.map(p => (
          <Marker key={p.id} position={[p.lat, p.lng]}>
            <Popup>
              <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
                <b>{p.title}</b>
                <span>₹{p.price.toLocaleString()}</span>
                <span>{p.city}, {p.locality}</span>
                <div style={{ display:'flex', gap:4 }}>
                  <button onClick={()=>onViewDetails(p)} style={popupBtnStyle}>View Details</button>
                  <button onClick={()=>onEnquire(p)} style={popupBtnStyle}>Enquire</button>
                </div>
              </div>
            </Popup>
            <Circle center={[p.lat, p.lng]} radius={150} />
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

const popupBtnStyle = {
  background:"#1976d2", color:"white", border:"none", borderRadius:4, padding:"4px 8px", cursor:"pointer"
};
