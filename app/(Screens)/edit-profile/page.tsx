"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {
  const router = useRouter();
  const [name, setName] = useState("كريم مروان");
  const [phone, setPhone] = useState("059-123-4567");
  const [address, setAddress] = useState("غزة، الرمال، شارع الشهداء");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/ProfilePage");
  };

  return (
    <div className="bg-background min-h-screen p-6" dir="rtl">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center rounded-full bg-surface hover:bg-primary/5 transition-colors active:scale-95 text-primary">
            <span className="transform rotate-180 material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-lg font-bold text-text-primary">تعديل الملف الشخصي</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-text-secondary mb-1">الاسم الكامل</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border/50 bg-white text-text-primary focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm text-text-secondary mb-1">رقم الهاتف</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border/50 bg-white text-text-primary focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm text-text-secondary mb-1">العنوان</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border/50 bg-white text-text-primary focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm text-text-secondary mb-1">الصورة الشخصية</label>
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop')" }} />
              <button type="button" className="px-4 py-2 text-sm font-semibold text-primary border border-primary/30 rounded-xl hover:bg-primary/5">
                تغيير الصورة
              </button>
            </div>
          </div>

          <button type="submit" className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors">
            حفظ التغييرات
          </button>
        </form>
      </div>
    </div>
  );
}
