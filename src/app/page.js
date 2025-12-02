"use client";
import React, { useEffect, useState } from "react";
import Filters from "./components/Filters";
import MapView from "./components/MapView";
import ListView from "./components/ListView";
import PropertyDrawer from "./components/PropertyDrawer";
import EnquiryModal from "./components/EnquiryModal";
import axios from "axios";
import { Container, Box, ToggleButtonGroup, ToggleButton, Stack, Typography } from "@mui/material";

export default function Page() {
  const [filters, setFilters] = useState({});
  const [properties, setProperties] = useState([]);
  const [view, setView] = useState("map");
  const [selected, setSelected] = useState(null);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load all properties initially
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const res = await axios.get("/api/properties");
        const normalized = (res.data || []).map((p) => ({ ...p, lat: Number(p.lat), lng: Number(p.lng) }));
        setProperties(normalized);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    }
    loadData();
  }, []);

  // Load filtered properties when filters change
  useEffect(() => {
    async function loadFiltered() {
      try {
        setLoading(true);
        const qs = new URLSearchParams(filters).toString();
        const res = await axios.get("/api/properties?" + qs);
        const normalized = (res.data || []).map((p) => ({ ...p, lat: Number(p.lat), lng: Number(p.lng) }));
        setProperties(normalized);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    }
    loadFiltered();
  }, [filters]);

  function handleViewChange(_, v) { if (v) setView(v); }

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          height: { xs: "100%", md: "100%" },
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 3,
          mb: 4,
        }}
      >
        <Box
          sx={{
            bgcolor: "rgba(0,0,0,0.5)",
            p: { xs: 1, md: 4 },
            borderRadius: 3,
            width: { xs: "100%", md: "100%" },
          }}
        >
          <Typography sx={{fontSize: {xs: "25px", sm: "35px", md: "50px"},}} variant="h3" color="white" align="center" gutterBottom>
            Find Your Dream Property
          </Typography>
          <Typography variant="body1" color="white" align="center" mb={2}>
            Search, explore, and connect with verified properties
          </Typography>
          <Filters onChange={setFilters} />
        </Box>
      </Box>

      {/* View Toggle */}
      <Stack direction="row" spacing={2} justifyContent="center" mb={3}>
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={handleViewChange}
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <ToggleButton value="map" sx={{ px: 4, py: 1 }}>Map View</ToggleButton>
          <ToggleButton value="list" sx={{ px: 4, py: 1 }}>List View</ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      {/* Map / List Views */}
      {view === "map" ? (
        <MapView
          properties={properties}
          userLocation={userLocation}
          onLocate={setUserLocation}
          onViewDetails={setSelected}
          onEnquire={(p) => { setSelected(p); setShowEnquiry(true); }}
        />
      ) : (
        <ListView properties={properties} onViewDetails={setSelected} />
      )}

      {/* Property Drawer */}
      <PropertyDrawer
        property={selected}
        onClose={() => setSelected(null)}
        onEnquire={(p) => { setSelected(p); setShowEnquiry(true); }}
      />

      {/* Enquiry Modal */}
      {showEnquiry && (
        <EnquiryModal
          property={selected}
          onClose={() => setShowEnquiry(false)}
          onSuccess={() => setShowEnquiry(false)}
        />
      )}

      {/* Footer */}
      <Box sx={{ mt: 6, py: 4, textAlign: "center", bgcolor: "grey.100", borderRadius: 3 }}>
        <Typography variant="body1">© 2025 Real Estate Portal. All rights reserved.</Typography>
      </Box>
    </Container>
  );
}
