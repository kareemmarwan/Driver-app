'use client';
import Link from 'next/link';
import { useState, useRef, useCallback } from 'react';
import { GoogleMap, Marker, Autocomplete } from '@react-google-maps/api';
import GoogleMapsProvider from '@/lib/maps/GoogleMapsProvider';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const defaultCenter = { lat: 31.5017, lng: 34.4668 }; // Gaza center

export default function LocationPicker() {
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
    <div className="relative w-full h-[calc(100vh-80px)] bg-[#F8FAFC] text-[#2d3732] overflow-hidden font-cairo pb-24" dir="rtl">
      <header className="absolute top-0 left-0 right-0 w-full z-40 bg-white shadow-[0px_4px_20px_rgba(0,109,52,0.03)] flex justify-between items-center px-4 h-16 border-b border-[#bbcbba]/10">
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 hover:bg-[#006d34]/5 transition-colors active:scale-95 duration-150 text-[#006d34]">
          <span className="transform rotate-180 material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-base font-bold text-[#006d34]">تحديد موقع التسليم</h1>
        <div className="flex items-center justify-center w-10">
          <span className="font-mono text-sm font-bold text-[#006d34]">2/3</span>
        </div>
      </header>

      <GoogleMapsProvider>
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
      </GoogleMapsProvider>

      <button
        aria-label="الموقع الحالي"
        onClick={() => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (pos) => setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude })
            );
          }
        }}
        className="absolute top-[42%] left-4 z-30 w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-lg text-[#2d3732] hover:bg-slate-50 transition-all active:scale-90 border border-[#bbcbba]/20"
      >
        <span className="material-symbols-outlined text-[#006d34] text-xl">my_location</span>
      </button>

      <div
        className={`absolute left-0 right-0 bg-white rounded-t-[28px] shadow-[0px_-12px_40px_rgba(0,109,52,0.08)] border-t border-[#bbcbba]/30 z-30 flex flex-col transition-all duration-300 ${
          isSheetExpanded ? 'bottom-0 h-[68vh]' : 'bottom-0 h-[38vh]'
        }`}
      >
        <div
          className="flex justify-center w-full py-3 cursor-pointer touch-none"
          onClick={() => setIsSheetExpanded(!isSheetExpanded)}
        >
          <div className="w-12 h-1 bg-[#bbcbba]/60 rounded-full"></div>
        </div>

        <div className="flex-1 px-4 pb-2 space-y-4 overflow-y-auto no-scrollbar">
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className="relative">
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[#7f8e7e] text-xl">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSheetExpanded(true)}
                className="w-full h-12 pr-11 pl-4 text-xs bg-slate-50 border border-[#bbcbba]/20 rounded-xl focus:border-[#006d34] focus:ring-0 text-[#2d3732]"
                placeholder="ابحث عن منطقة للتسليم..."
              />
            </div>
          </Autocomplete>

          <div className="bg-[#006d34]/5 border border-[#006d34]/10 rounded-xl p-3 flex gap-2.5 items-start">
            <span className="material-symbols-outlined text-[#006d34] text-lg mt-0.5">near_me</span>
            <div className="flex-1">
              <p className="text-[10px] font-bold text-[#006d34]">تفاصيل عنوان التوصيل الحالي</p>
              <input
                type="text"
                value={addressDetails}
                onChange={(e) => setAddressDetails(e.target.value)}
                className="w-full bg-transparent border-none p-0 text-xs font-bold text-[#2d3732] mt-0.5 focus:ring-0 outline-none"
                placeholder="اكتب رقم البناية، المعلم، أو تفاصيل الشقة..."
              />
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-bold text-[#7f8e7e] mb-2 px-1">الأماكن المحفوظة</h3>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => setPosition({ lat: 31.5088, lng: 34.4487 })}
                className="flex items-center gap-2 p-2.5 bg-white border border-[#bbcbba]/25 rounded-xl hover:bg-slate-50 text-right"
              >
                <div className="w-8 h-8 rounded-lg bg-[#006d34]/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#006d34] text-lg">home</span>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#2d3732]">المنزل</p>
                  <p className="text-[9px] text-[#7f8e7e] truncate w-24">شارع الرمال، غزة</p>
                </div>
              </button>

              <button
                onClick={() => setPosition({ lat: 31.5245, lng: 34.4515 })}
                className="flex items-center gap-2 p-2.5 bg-white border border-[#bbcbba]/25 rounded-xl hover:bg-slate-50 text-right"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 shrink-0">
                  <span className="material-symbols-outlined text-[#7f8e7e] text-lg">work</span>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#2d3732]">المكتب</p>
                  <p className="text-[9px] text-[#7f8e7e] truncate w-24">برج السعيد، ط 5</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="p-3 bg-white border-t border-[#bbcbba]/10">
          <Link
            href="/Cart"
            className="w-full h-12 bg-gradient-to-tr from-[#006d34] to-[#00d26a] text-white text-sm font-bold rounded-xl flex items-center justify-center shadow-[0px_6px_15px_rgba(0,210,106,0.15)] active:scale-98 transition-all"
          >
            تأكيد موقع التسليم والمتابعة
          </Link>
        </div>
      </div>
    </div>
  );
}
