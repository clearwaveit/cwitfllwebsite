"use client";

import { useEffect, useRef } from "react";

interface Location {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

interface GoogleMapSectionProps {
  locations?: Location[];
  apiKey?: string;
  className?: string;
}

type GoogleMapsMarkerLike = {
  setMap: (map: object | null) => void;
  getPosition?: () => { toJSON?: () => { lat: number; lng: number } } | null;
  addListener: (eventName: string, handler: () => void) => void;
};

type GoogleMapsNamespace = {
  maps?: {
    Map: new (element: HTMLElement, options: object) => {
      fitBounds: (bounds: object, padding?: object) => void;
      setCenter: (coords: { lat: number; lng: number }) => void;
      setZoom: (zoom: number) => void;
    };
    Marker: new (options: object) => GoogleMapsMarkerLike;
    InfoWindow: new (options: { content: string }) => {
      open: (map?: object, anchor?: object) => void;
      close: () => void;
    };
    LatLngBounds: new () => {
      extend: (latLng: object) => void;
    };
    LatLng: new (lat: number, lng: number) => object;
    Size: new (width: number, height: number) => object;
    Point: new (x: number, y: number) => object;
    Animation: {
      DROP: object;
    };
  };
};

declare global {
  interface Window {
    google?: GoogleMapsNamespace;
    initMap?: () => void;
  }
}

export default function GoogleMapSection({
  locations,
  apiKey = "", // User can add their API key here or via env variable
  className = "",
}: GoogleMapSectionProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<object | null>(null);
  const markersRef = useRef<GoogleMapsMarkerLike[]>([]);
  
  // Get API key from prop or environment variable (for client components, use NEXT_PUBLIC_ prefix)
  const googleMapsApiKey = apiKey || (typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY : '') || '';

  // Default locations based on provided addresses
  const defaultLocations: Location[] = [
    {
      name: "Dubai",
      address: "World Trade Center area, Dubai, UAE",
      latitude: 25.2235, // Dubai World Trade Centre coordinates
      longitude: 55.2804,
    },
    {
      name: "London",
      address: "East London, London, UK",
      latitude: 51.5074, // East London area coordinates
      longitude: -0.0750,
    },
    {
      name: "New York",
      address: "New York, NY, USA",
      latitude: 40.7128, // New York coordinates
      longitude: -74.0060,
    },
  ];

  const mapLocations = locations || defaultLocations;

  useEffect(() => {
    if (!mapRef.current) return;

    // If no API key provided, use embed fallback
    // Note: Google Maps embed only shows one location, so we'll show the first one
    // For multiple markers, API key is required
    if (!googleMapsApiKey) {
      console.warn("No Google Maps API key provided. Using embed fallback (shows only first location). For multiple markers, please provide an API key.");
      const firstLocation = mapLocations[0];
      const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(firstLocation.address)}&output=embed`;
      
      if (mapRef.current) {
        mapRef.current.innerHTML = `<iframe src="${embedUrl}" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
      }
      return;
    }

    // Load Google Maps script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&callback=initMap`;
    script.async = true;
    script.defer = true;

    // Initialize map function
    window.initMap = () => {
      if (!mapRef.current || !window.google?.maps) {
        console.error("Google Maps API not loaded or map container not found");
        return;
      }
      const googleMaps = window.google!.maps!;

      // Calculate center point to show all locations
      const centerLat = mapLocations.reduce((sum, loc) => sum + loc.latitude, 0) / mapLocations.length;
      const centerLng = mapLocations.reduce((sum, loc) => sum + loc.longitude, 0) / mapLocations.length;

      // Create map
      const map = new googleMaps.Map(mapRef.current, {
        center: { lat: centerLat, lng: centerLng },
        zoom: 2, // Start with lower zoom to see all markers
        styles: [
          {
            featureType: "all",
            elementType: "geometry",
            stylers: [{ color: "#1d2c4d" }],
          },
          {
            featureType: "all",
            elementType: "labels.text.fill",
            stylers: [{ color: "#8ec3b9" }],
          },
        ],
      });

      mapInstanceRef.current = map;

      // Clear existing markers first
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];

      // Different marker colors for each location
      const markerColors = [
        "#FF0000", // Red
        "#00FF00", // Green
        "#0000FF", // Blue
        "#FFFF00", // Yellow
        "#FF00FF", // Magenta
        "#00FFFF", // Cyan
        "#FFA500", // Orange
        "#800080", // Purple
      ];

      console.log(`Creating ${mapLocations.length} markers for locations:`, mapLocations.map(l => l.name));

      // Create bounds object to fit all markers
      const bounds = new googleMaps.LatLngBounds();

      // Add markers for each location with different colors
      mapLocations.forEach((location, index) => {
        console.log(`Adding marker ${index + 1}: ${location.name} at ${location.latitude}, ${location.longitude}`);
        
        // Create custom icon with different color for each marker
        const iconColor = markerColors[index % markerColors.length];

        // Use pin icon with different colors
        const pinIcon = {
          url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
            <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 0C12.27 0 6 6.27 6 14c0 10.5 14 26 14 26s14-15.5 14-26C34 6.27 27.73 0 20 0z" fill="${iconColor}"/>
              <circle cx="20" cy="14" r="6" fill="#FFFFFF"/>
            </svg>
          `)}`,
          scaledSize: new googleMaps.Size(40, 40),
          anchor: new googleMaps.Point(20, 40),
        };

        const marker = new googleMaps.Marker({
          position: { lat: location.latitude, lng: location.longitude },
          map: map,
          title: location.name,
          animation: googleMaps.Animation.DROP,
          icon: pinIcon, // Use custom colored icon
          label: {
            text: (index + 1).toString(),
            color: "#FFFFFF",
            fontSize: "12px",
            fontWeight: "bold",
          },
        });

        // Add position to bounds
        bounds.extend(new googleMaps.LatLng(location.latitude, location.longitude));

        // Create info window for hover
        const infoWindow = new googleMaps.InfoWindow({
          content: `
            <div style="padding: 8px; color: #000;">
              <h3 style="margin: 0 0 4px 0; font-weight: bold; font-size: 16px;">${location.name}</h3>
              <p style="margin: 0; font-size: 14px; color: #666;">${location.address}</p>
            </div>
          `,
        });

        // Show info window on marker hover
        marker.addListener("mouseover", () => {
          infoWindow.open(map, marker);
        });

        // Hide info window when mouse leaves
        marker.addListener("mouseout", () => {
          infoWindow.close();
        });

        // Also show info window on click
        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });

        markersRef.current.push(marker);
      });

      // Fit bounds to show all markers with padding - do this after all markers are created
      if (markersRef.current.length > 0 && mapLocations.length > 1) {
        // Use setTimeout to ensure all markers are rendered before fitting bounds
        setTimeout(() => {
          map.fitBounds(bounds, { top: 100, right: 100, bottom: 100, left: 100 });
        }, 100);
      } else if (markersRef.current.length === 1) {
        // If only one marker, center on it with a reasonable zoom
        map.setCenter({ lat: mapLocations[0].latitude, lng: mapLocations[0].longitude });
        map.setZoom(10);
      }
      
      // Log for debugging
      console.log(`Successfully added ${markersRef.current.length} markers to the map`);
      console.log(`Markers:`, markersRef.current.map((m, i) => ({
        name: mapLocations[i].name,
        position: (m.getPosition as () => { toJSON?: () => unknown } | null | undefined)?.()?.toJSON?.()
      })));
    };

    // Check if script already loaded
    if (document.querySelector(`script[src*="maps.googleapis.com"]`)) {
      if (window.google && window.google.maps) {
        window.initMap();
      }
    } else {
      document.head.appendChild(script);
    }

    return () => {
      // Cleanup
      if (markersRef.current) {
        markersRef.current.forEach((marker) => marker.setMap(null));
      }
      if (window.initMap) {
        window.initMap = undefined;
      }
    };
  }, [mapLocations, googleMapsApiKey]);

  return (
    <section className={`relative md:min-h-[800px] h-[400px] md:py-20 py-10 bg-black overflow-hidden ${className}`}>
      <div className="relative z-10 mx-auto px-3 md:px-0">
        <div className="w-full md:h-[800px] h-[400px] overflow-hidden rounded-lg">
          <div ref={mapRef} className="w-full h-full" style={{ minHeight: "400px" }} />
        </div>
      </div>
    </section>
  );
}

