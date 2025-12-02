"use client";

import dynamic from "next/dynamic";

// dynamically import map without SSR
const MapComponent = dynamic(() => import("./MapInner"), {
  ssr: false,
});

export default function MapViewWrapper(props) {
  return <MapComponent {...props} />;
}
