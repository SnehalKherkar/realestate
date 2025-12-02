"use client";
import React from "react";
import { Grid, Card, CardContent, Typography, Box, CardMedia, Button } from "@mui/material";
import { motion } from "framer-motion";

export default function ListView({ properties = [], onViewDetails = ()=>{} }) {
  if (!properties.length) return <Typography>No properties found.</Typography>;

  return (
    <Grid container spacing={2}>
      {properties.map(p => (
        <Grid item xs={12} sm={6} md={4} key={p.id || p.title}>
          <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
            <Card 
              sx={{ 
                borderRadius: 3, 
                boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
                display: "flex",
                flexDirection: "column",
                height: "100%" // ensures cards are equal height
              }}
            >
              {p.images && p.images[0] && (
                <CardMedia 
                  component="img" 
                  height="160" 
                  image={p.images[0]} 
                  alt={p.title} 
                  sx={{ borderTopLeftRadius: 3, borderTopRightRadius: 3 }}
                />
              )}
              <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                <Typography variant="h6">{p.title}</Typography>
                <Typography variant="body2" color="text.secondary">{p.locality}, {p.city}</Typography>
                <Typography sx={{ mt: 1, fontWeight: 700 }}>₹{Number(p.price).toLocaleString()}</Typography>
                <Typography variant="caption">{p.area} sq ft • {p.type} • {p.saleMode}</Typography>
                <Box sx={{ mt: "auto" }}>
                  <Button size="small" variant="outlined" onClick={() => onViewDetails(p)}>View</Button>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
}
