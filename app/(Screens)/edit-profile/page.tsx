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
    <div className="bg-[#F8FAFC] dark:bg-[#151e16] min-h-screen p-6" dir="rtl">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => router.back()} className="flex items-center justify-center w-10 h-10 bg-white dark:bg-[#1e2a20] rounded-full shadow-sm">
            <span className="text-2xl transform rotate-180 material-symbols-outlined text-[#006d34] dark:text-[#00d26a]">arrow_back</span>
          </button>
          <h1 className="text-lg font-bold text-slate-800 dark:text-[#f3fcef]">تعديل الملف الشخصي</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-600 dark:text-[#dce5d9] mb-1">الاسم الكامل</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#dce5d9] dark:border-[#2a3e2e] bg-white dark:bg-[#1e2a20] text-slate-800 dark:text-[#f3fcef] focus:outline-none focus:border-[#006d34] dark:focus:border-[#00d26a]"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 dark:text-[#dce5d9] mb-1">رقم الهاتف</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#dce5d9] dark:border-[#2a3e2e] bg-white dark:bg-[#1e2a20] text-slate-800 dark:text-[#f3fcef] focus:outline-none focus:border-[#006d34] dark:focus:border-[#00d26a]"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 dark:text-[#dce5d9] mb-1">العنوان</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#dce5d9] dark:border-[#2a3e2e] bg-white dark:bg-[#1e2a20] text-slate-800 dark:text-[#f3fcef] focus:outline-none focus:border-[#006d34] dark:focus:border-[#00d26a]"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 dark:text-[#dce5d9] mb-1">الصورة الشخصية</label>
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop')" }} />
              <button type="button" className="px-4 py-2 text-sm font-semibold text-[#006d34] dark:text-[#00d26a] border border-[#006d34]/30 dark:border-[#00d26a]/30 rounded-xl hover:bg-[#006d34]/5 dark:hover:bg-[#00d26a]/10">
                تغيير الصورة
              </button>
            </div>
          </div>

          <button type="submit" className="w-full py-3 bg-[#006d34] dark:bg-[#00d26a] text-white dark:text-[#151e16] rounded-xl font-semibold hover:bg-[#005226] dark:hover:bg-[#00b85c] transition-colors">
            حفظ التغييرات
          </button>
        </form>
      </div>
    </div>
  );
}
