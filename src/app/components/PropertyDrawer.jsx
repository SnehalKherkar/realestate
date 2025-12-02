"use client";
import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

export default function PropertyDrawer({ property, onClose = ()=>{}, onEnquire = ()=>{} }) {
  if(!property) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{opacity:0,x:40}} 
        animate={{opacity:1,x:0}} 
        exit={{opacity:0,x:40}}
        transition={{duration:0.28}} 
        style={{ position:'fixed', right:0, top:72, width:'100%', maxWidth:420, height:'80vh', zIndex:1500 }}
      >
        <Box sx={{ bgcolor:'background.paper', boxShadow: '-6px 0 18px rgba(0,0,0,0.08)', height:'100%', p:2, overflow:'auto' }}>
          <Box sx={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <Typography variant="h6">{property.title}</Typography>
            <Button onClick={onClose}>Close</Button>
          </Box>
          <Typography sx={{ mt:1, fontWeight:700 }}>₹{Number(property.price).toLocaleString()}</Typography>
          <Typography variant="body2">{property.area} sq ft • {property.locality}, {property.city}</Typography>
          <Typography variant="caption">{property.type} • {property.saleMode} • {property.usage}</Typography>
          <Box sx={{ mt:2 }}>
            {(property.images||[]).map((src,i)=> ( <img key={i} src={src} alt="" style={{ width:'100%', marginBottom:8, borderRadius:12, objectFit:'cover' }} /> ))}
          </Box>
          <Typography sx={{ whiteSpace:'pre-wrap' }}>{property.description}</Typography>
          <Box sx={{ mt:2 }}>
            <Button variant="contained" onClick={()=>onEnquire(property)}>Send Enquiry</Button>
          </Box>
        </Box>
      </motion.div>
    </AnimatePresence>
  );
}
