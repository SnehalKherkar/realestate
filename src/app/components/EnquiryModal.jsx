"use client";
import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export default function EnquiryModal({ property, onClose = ()=>{}, onSuccess = ()=>{} }) {
  const [form, setForm] = useState({ name:'', mobile:'', email:'', message:'' });
  const [loading, setLoading] = useState(false);

  useEffect(()=> { setForm({ name:'', mobile:'', email:'', message:'' }); }, [property]);

  if(!property) return null;

  async function submit(e){
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...form, propertyId: property.id };
      const res = await axios.post('/api/enquiry', payload);
      if(res.data.ok){
        alert('Enquiry submitted');
        onClose();
        onSuccess();
      } else {
        alert('Error: ' + (res.data.error || 'Unknown'));
      }
    } catch(err){
      alert('Request failed: ' + String(err));
    } finally { setLoading(false); }
  }

  return (
    <AnimatePresence>
      <motion.div 
        initial={{scale:0.98, opacity:0}} 
        animate={{scale:1, opacity:1}} 
        exit={{scale:0.98, opacity:0}}
        transition={{duration:0.2}} 
        style={{ position:'fixed', inset:0, display:'flex', alignItems:'center', justifyContent:'center', zIndex:1600, background:'rgba(0,0,0,0.35)' }}
      >
        <Box component="form" onSubmit={submit} sx={{ width:{ xs:'95%', sm:420 }, bgcolor:'background.paper', p:3, borderRadius:2 }}>
          <Typography variant="h6">Enquire about: {property.title}</Typography>
          <TextField fullWidth label="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required sx={{ mt:1 }} />
          <TextField fullWidth label="Mobile" value={form.mobile} onChange={e=>setForm({...form, mobile:e.target.value})} required sx={{ mt:1 }} />
          <TextField fullWidth label="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required sx={{ mt:1 }} />
          <TextField fullWidth label="Message" value={form.message} onChange={e=>setForm({...form, message:e.target.value})} multiline rows={3} sx={{ mt:1 }} />
          <Box sx={{ display:'flex', justifyContent:'flex-end', gap:1, mt:2 }}>
            <Button variant="outlined" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={loading}>{loading ? 'Sending...' : 'Send'}</Button>
          </Box>
        </Box>
      </motion.div>
    </AnimatePresence>
  );
}
