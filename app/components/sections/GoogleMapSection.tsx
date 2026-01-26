"use client";

interface GoogleMapSectionProps {
  address?: string;
  latitude?: number;
  longitude?: number;
  zoom?: number;
  className?: string;
}

export default function GoogleMapSection({
  address = "New York, NY, USA",
  latitude = 40.7128,
  longitude = -74.0060,
  zoom = 15,
  className = "",
}: GoogleMapSectionProps) {
  // Use Google Maps embed URL (works without API key for basic embedding)
  // You can use either address search or coordinates
  const mapUrl = address
    ? `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`
    : `https://www.google.com/maps?q=${latitude},${longitude}&z=${zoom}&output=embed`;

  return (
    <section className={`relative md:min-h-[800px] h-[400px] md:py-20 py-10 bg-black overflow-hidden ${className}`}>
      <div className="relative z-10 mx-auto px-3 md:px-0">
        
        <div className="w-full md:h-[800px] h-[400px] overflow-hidden">
          <iframe
            src={mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
            title="Google Maps"
          />
        </div>
      </div>
    </section>
  );
}

