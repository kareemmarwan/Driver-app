'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleMap, Marker } from '@react-google-maps/api';
import GoogleMapsProvider from '@/lib/maps/GoogleMapsProvider';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const defaultCenter = { lat: 31.5017, lng: 34.4668 };

const SAVED_LOCATIONS = [
  { id: 1, title: 'ساحة السرايا المركزية', desc: 'وسط مدينة غزة', icon: 'location_on', color: 'bg-primary/10 text-primary', position: { lat: 31.5060, lng: 34.4620 } },
  { id: 2, title: 'هايبر ماركت كيرفور', desc: 'شارع النصر، غزة', icon: 'store', color: 'bg-primary/5 text-text-secondary', position: { lat: 31.5150, lng: 34.4520 } },
];

const RECENT_LOCATIONS: { id: number; title: string; desc: string }[] = [];

export default function PickupLocationPage() {
  const router = useRouter();
  const [sheetHeight, setSheetHeight] = useState('45vh');
  const [searchQuery, setSearchQuery] = useState('');
  const [center, setCenter] = useState(defaultCenter);

  const handleSearchFocus = () => {
    setSheetHeight('85vh');
  };

  const handleConfirmPickup = () => {
    console.log('تم تأكيد موقع الاستلام الحالي بنجاح.');
  };

  const onMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setCenter({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    }
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden antialiased bg-background text-text-primary" dir="rtl">
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between w-full max-w-md px-4 py-2 mx-auto bg-white shadow-sm">
        <button onClick={() => router.back()} className="flex items-center justify-center w-10 h-10 transition-colors rounded-full bg-surface hover:bg-primary/5 active:scale-95 text-primary">
          <span className="transform rotate-180 material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-base font-bold text-primary">طلب توصيل جديد</h1>
        <div className="flex items-center justify-center w-10 h-10 font-mono text-sm font-bold text-primary">1/3</div>
      </header>

      <main className="relative w-full h-full">
        <GoogleMapsProvider>
          <div className="absolute inset-0 z-0 overflow-hidden">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={14}
              onClick={onMapClick}
              options={{
                disableDefaultUI: false,
                zoomControl: true,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              }}
            >
              <Marker position={center} draggable title="موقع الاستلام" />
              {SAVED_LOCATIONS.map((loc) => (
                <Marker
                  key={loc.id}
                  position={loc.position}
                  title={loc.title}
                  icon={{
                    url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
                    scaledSize: new google.maps.Size(32, 32),
                  }}
                />
              ))}
            </GoogleMap>
          </div>
        </GoogleMapsProvider>

        <div className="absolute z-10 flex flex-col items-center -translate-x-1/2 -translate-y-1/2 pointer-events-none top-1/2 left-1/2">
          <div className="bg-primary text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg mb-2 flex items-center gap-1">
            استلام من هنا
          </div>
          <div className="relative">
            <div className="flex items-center justify-center w-12 h-12 border-4 border-white rounded-full shadow-xl bg-primary">
              <span className="text-2xl text-white material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                location_on
              </span>
            </div>
            <div className="absolute w-4 h-4 rotate-45 -translate-x-1/2 border-b-4 border-r-4 border-white -bottom-1 left-1/2 bg-primary" />
          </div>
          <div className="w-4 h-1 bg-black/20 rounded-full blur-[2px] mt-2" />
        </div>

        <button
          aria-label="موقعي الحالي"
          onClick={() => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (pos) => setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude })
              );
            }
          }}
          className="absolute bottom-[48%] left-4 z-30 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg text-text-primary hover:bg-surface transition-all active:scale-90"
        >
          <span className="text-2xl material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
            my_location
          </span>
        </button>

        <div
          className="absolute bottom-0 left-0 right-0 max-w-md mx-auto bg-white rounded-t-3xl shadow-[0px_-12px_40px_rgba(0,0,0,0.12)] z-40 flex flex-col overflow-hidden transition-all duration-300"
          style={{ height: sheetHeight }}
        >
          <div
            className="flex justify-center w-full py-3 cursor-pointer"
            onClick={() => setSheetHeight(sheetHeight === '45vh' ? '85vh' : '45vh')}
          >
            <div className="w-12 h-1.5 bg-border rounded-full" />
          </div>

          <div className="flex-1 px-4 space-y-6 overflow-y-auto no-scrollbar">
            <div className="relative">
              <span className="absolute -translate-y-1/2 material-symbols-outlined right-4 top-1/2 text-text-secondary">search</span>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleSearchFocus}
                className="w-full pl-4 pr-12 text-sm text-right border-none shadow-sm outline-none h-14 bg-surface rounded-xl focus:ring-2 focus:ring-primary"
                placeholder="ابحث عن موقع الاستلام..."
                type="text"
              />
            </div>

            <div>
              <h3 className="text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-3 px-1">المواقع المحفوظة</h3>
              <div className="grid grid-cols-2 gap-3">
                {SAVED_LOCATIONS.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => { setSheetHeight('45vh'); setSearchQuery(loc.title); setCenter(loc.position); }}
                    className="flex items-center gap-3 p-3 text-right transition-colors bg-white border border-border/50 rounded-2xl hover:bg-surface group"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${loc.color}`}>
                      <span className="text-xl material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{loc.icon}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-text-primary">{loc.title}</p>
                      <p className="text-[10px] text-text-secondary truncate mt-0.5">{loc.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pb-4">
              <h3 className="text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-2 px-1">عمليات البحث الأخيرة</h3>
              <div className="space-y-1">
                {RECENT_LOCATIONS.map((recent) => (
                  <div
                    key={recent.id}
                    onClick={() => { setSheetHeight('45vh'); setSearchQuery(recent.title); }}
                    className="flex items-center gap-4 px-1 py-3 border-b cursor-pointer border-border/50 active:bg-surface"
                  >
                    <span className="text-xl material-symbols-outlined text-disabled shrink-0">history</span>
                    <div className="flex-1 min-w-0 text-right">
                      <p className="text-xs font-bold text-text-primary">{recent.title}</p>
                      <p className="text-[10px] text-text-secondary mt-0.5">{recent.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 bg-white border-t border-border/50 pb-safe">
            <button
              onClick={handleConfirmPickup}
              className="flex items-center justify-center w-full text-sm font-bold text-white transition-transform shadow-md h-14 bg-primary rounded-xl shadow-primary/10 active:scale-95"
            >
              تأكيد موقع الاستلام
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
