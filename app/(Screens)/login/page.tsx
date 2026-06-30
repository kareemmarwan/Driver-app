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
    <div className="bg-background min-h-screen flex flex-col items-center justify-center p-6" dir="rtl">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">دري فري</h1>
          <p className="text-text-secondary">تسجيل الدخول</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-text-secondary mb-1">رقم الهاتف</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="059xxxxxxx"
              className="w-full px-4 py-3 rounded-xl border border-border/50 bg-white text-text-primary focus:outline-none focus:border-primary transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-text-secondary mb-1">كلمة المرور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-border/50 bg-white text-text-primary focus:outline-none focus:border-primary transition-colors"
              required
            />
          </div>

          {error && (
            <p className="text-error text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50"
          >
            {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </button>
        </form>

        <p className="text-center mt-6 text-text-secondary text-sm">
          ليس لديك حساب؟{" "}
          <Link href="/register" className="text-primary font-semibold hover:underline">
            إنشاء حساب جديد
          </Link>
        </p>

        <p className="text-center mt-4 text-text-secondary text-xs">
          للمعاينة: استخدم 123 / 123
        </p>
      </div>
    </div>
  );
}
