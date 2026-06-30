'use client';
import Link from 'next/link';
import { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleMap, Marker, Autocomplete } from '@react-google-maps/api';
import GoogleMapsProvider from '@/lib/maps/GoogleMapsProvider';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const defaultCenter = { lat: 31.5017, lng: 34.4668 }; // Gaza center

export default function LocationPicker() {
  const router = useRouter();
  const [addressDetails, setAddressDetails] = useState('شارع الرشيد، مقابل الفندق، غزة');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSheetExpanded, setIsSheetExpanded] = useState(false);
  const [position, setPosition] = useState(defaultCenter);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const onMarkerDragEnd = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    }
  }, []);

  const onPlaceChanged = useCallback(() => {
    const place = autocompleteRef.current?.getPlace();
    if (place?.geometry?.location) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setPosition({ lat, lng });
      setSearchQuery(place.formatted_address || place.name || '');
    }
  }, []);

  const onLoad = useCallback((autocomplete: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autocomplete;
  }, []);

  return (
    <GoogleMapsProvider>
    <div className="relative w-full h-[calc(100vh-80px)] bg-background text-text-primary overflow-hidden font-cairo pb-24" dir="rtl">
      <header className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between w-full h-16 px-4 bg-white border-b shadow-sm border-border/50">
        <button onClick={() => router.back()} className="flex items-center justify-center w-10 h-10 transition-colors duration-150 rounded-full bg-surface hover:bg-primary/5 active:scale-95 text-primary">
          <span className="transform rotate-180 material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-base font-bold text-primary">تحديد موقع التسليم</h1>
        <div className="flex items-center justify-center w-10">
          <span className="font-mono text-sm font-bold text-primary">2/3</span>
        </div>
      </header>

      <div className="absolute inset-0 z-0 w-full h-full">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={position}
          zoom={14}
          options={{
            disableDefaultUI: false,
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          <Marker
            position={position}
            draggable
            onDragEnd={onMarkerDragEnd}
            title="اسحب لتحديد الموقع"
          />
        </GoogleMap>
      </div>

      <button
        aria-label="الموقع الحالي"
        onClick={() => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (pos) => setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
              () => {},
              { enableHighAccuracy: true, timeout: 5000 }
            );
          }
        }}
        className="absolute top-[42%] left-4 z-30 w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-lg text-text-primary hover:bg-surface transition-all active:scale-90 border border-border/50"
      >
        <span className="text-xl material-symbols-outlined text-primary">my_location</span>
      </button>

      <div
        className={`absolute left-0 right-0 bg-white rounded-t-[28px] shadow-[0px_-12px_40px_rgba(239,43,45,0.06)] border-t border-border/50 z-30 flex flex-col transition-all duration-300 ${
          isSheetExpanded ? 'bottom-0 h-[68vh]' : 'bottom-0 h-[38vh]'
        }`}
      >
        <div
          className="flex justify-center w-full py-3 cursor-pointer touch-none"
          onClick={() => setIsSheetExpanded(!isSheetExpanded)}
        >
          <div className="w-12 h-1 rounded-full bg-border"></div>
        </div>

        <div className="flex-1 px-4 pb-2 space-y-4 overflow-y-auto no-scrollbar">
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className="relative">
              <span className="absolute text-xl -translate-y-1/2 material-symbols-outlined right-4 top-1/2 text-text-secondary">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSheetExpanded(true)}
                className="w-full h-12 pl-4 text-xs border pr-11 bg-surface border-border/50 rounded-xl focus:border-primary focus:ring-0 text-text-primary"
                placeholder="ابحث عن منطقة للتسليم..."
              />
            </div>
          </Autocomplete>

          <div className="bg-primary/5 border border-primary/10 rounded-xl p-3 flex gap-2.5 items-start">
            <span className="material-symbols-outlined text-primary text-lg mt-0.5">near_me</span>
            <div className="flex-1">
              <p className="text-[10px] font-bold text-primary">تفاصيل عنوان التوصيل الحالي</p>
              <input
                type="text"
                value={addressDetails}
                onChange={(e) => setAddressDetails(e.target.value)}
                className="w-full bg-transparent border-none p-0 text-xs font-bold text-text-primary mt-0.5 focus:ring-0 outline-none"
                placeholder="اكتب رقم البناية، المعلم، أو تفاصيل الشقة..."
              />
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-bold text-text-secondary mb-2 px-1">الأماكن المحفوظة</h3>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => setPosition({ lat: 31.5088, lng: 34.4487 })}
                className="flex items-center gap-2 p-2.5 bg-white border border-border/50 rounded-xl hover:bg-surface text-right"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 shrink-0">
                  <span className="text-lg material-symbols-outlined text-primary">home</span>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-text-primary">المنزل</p>
                  <p className="text-[9px] text-text-secondary truncate w-24">شارع الرمال، غزة</p>
                </div>
              </button>

              <button
                onClick={() => setPosition({ lat: 31.5245, lng: 34.4515 })}
                className="flex items-center gap-2 p-2.5 bg-white border border-border/50 rounded-xl hover:bg-surface text-right"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-surface shrink-0">
                  <span className="text-lg material-symbols-outlined text-text-secondary">work</span>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-text-primary">المكتب</p>
                  <p className="text-[9px] text-text-secondary truncate w-24">برج السعيد، ط 5</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="p-3 bg-white border-t border-border/50">
          <Link
            href="/Cart"
            className="flex items-center justify-center w-full h-12 text-sm font-bold text-white transition-all shadow-lg bg-primary rounded-xl shadow-primary/20 active:scale-98"
          >
            تأكيد موقع التسليم والمتابعة
          </Link>
        </div>
      </div>
    </div>
    </GoogleMapsProvider>
  );
}
