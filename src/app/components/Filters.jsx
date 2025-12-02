"use client";
import React, { useState, useEffect } from "react";
import { Card, Grid, MenuItem, TextField, Button, Box, useTheme, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";

const types = ["", "Land","Plot","Flat","Villa","Office","Shop","Warehouse"];

export default function Filters({ onChange }) {
  const [state, setState] = useState({ type:'', saleMode:'', usage:'', minPrice:'', maxPrice:'', q:'' });
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const t = setTimeout(() => onChange(state), 250);
    return () => clearTimeout(t);
  }, [state, onChange]);

  const setF = (k,v) => setState(prev => ({...prev, [k]: v}));
  const clearAll = () => setState({ type:'', saleMode:'', usage:'', minPrice:'', maxPrice:'', q:'' });

  return (
    <motion.div initial={{opacity:0, y:-8}} animate={{opacity:1, y:0}} transition={{duration:0.3}}>
      <Card sx={{ p:3, mb:3, borderRadius: 4, boxShadow: "0 6px 20px rgba(0,0,0,0.1)" }}>
        <Grid container spacing={2}>
          <Grid xs={12} sm={6} md={3}>
            <TextField select fullWidth label="Type" value={state.type} onChange={e => setF('type', e.target.value)} variant="outlined">
              {types.map(t => <MenuItem key={t} value={t}>{t || 'All'}</MenuItem>)}
            </TextField>
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            <TextField select fullWidth label="Sale Mode" value={state.saleMode} onChange={e => setF('saleMode', e.target.value)} variant="outlined">
              <MenuItem value=''>All</MenuItem>
              <MenuItem value='Fresh'>Fresh</MenuItem>
              <MenuItem value='Resale'>Resale</MenuItem>
            </TextField>
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            <TextField select fullWidth label="Usage" value={state.usage} onChange={e => setF('usage', e.target.value)} variant="outlined">
              <MenuItem value=''>All</MenuItem>
              <MenuItem value='Residential'>Residential</MenuItem>
              <MenuItem value='Commercial'>Commercial</MenuItem>
            </TextField>
          </Grid>

          <Grid xs={6} sm={3} md={1.5}>
            <TextField fullWidth label="Min Price" type="number" value={state.minPrice} onChange={e => setF('minPrice', e.target.value)} placeholder="0" variant="outlined" />
          </Grid>

          <Grid xs={6} sm={3} md={1.5}>
            <TextField fullWidth label="Max Price" type="number" value={state.maxPrice} onChange={e => setF('maxPrice', e.target.value)} placeholder="50,000,000" variant="outlined" />
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            <TextField fullWidth label="Search (city/locality/title)" value={state.q} onChange={e => setF('q', e.target.value)} placeholder="Andheri, Pune..." variant="outlined" />
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            <Box sx={{ display:'flex', gap:1, justifyContent: isSm ? 'center' : 'flex-end' }}>
              <Button 
                variant="outlined" 
                color="secondary" 
                sx={{ height: '56px', borderRadius: 3, px:3, transition: '0.3s', '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' } }}
                fullWidth={isSm} 
                onClick={clearAll}
              >
                Clear
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </motion.div>
  );
}
