'use client';
import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div dir="rtl" className="flex flex-col items-center justify-center min-h-screen p-4 bg-[#F8FAFC] text-center">
          <span className="material-symbols-outlined text-6xl text-red-400 mb-4">error_outline</span>
          <h1 className="text-xl font-bold text-[#151e16] mb-2">عذراً، حدث خطأ غير متوقع</h1>
          <p className="text-[#5f5e5e] mb-4">نعمل على حل المشكلة، يرجى المحاولة مرة أخرى</p>
          <button
            onClick={() => { this.setState({ hasError: false }); window.location.reload(); }}
            className="px-6 py-2 bg-[#006d34] text-white rounded-xl hover:bg-[#005226] transition-colors"
          >
            إعادة تحميل
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
