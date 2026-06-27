"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      phone,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("رقم الهاتف أو كلمة المرور غير صحيحة");
      setLoading(false);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen flex flex-col items-center justify-center p-6" dir="rtl">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#006d34] mb-2">دري فري</h1>
          <p className="text-[#5f5e5e]">تسجيل الدخول</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-[#5f5e5e] mb-1">رقم الهاتف</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="059xxxxxxx"
              className="w-full px-4 py-3 rounded-xl border border-[#dce5d9] bg-white text-[#151e16] focus:outline-none focus:border-[#006d34] transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-[#5f5e5e] mb-1">كلمة المرور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-[#dce5d9] bg-white text-[#151e16] focus:outline-none focus:border-[#006d34] transition-colors"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#006d34] text-white rounded-xl font-semibold hover:bg-[#005226] transition-colors disabled:opacity-50"
          >
            {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </button>
        </form>

        <p className="text-center mt-6 text-[#5f5e5e] text-sm">
          ليس لديك حساب؟{" "}
          <Link href="/register" className="text-[#006d34] font-semibold hover:underline">
            إنشاء حساب جديد
          </Link>
        </p>

        <p className="text-center mt-4 text-[#5f5e5e] text-xs">
          للمعاينة: استخدم 123 / 123
        </p>
      </div>
    </div>
  );
}
