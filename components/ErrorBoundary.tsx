"use client";
import { Component, ErrorInfo, ReactNode } from "react";

interface Props { children: ReactNode; }

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

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div dir="rtl" className="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-center">
          <span className="material-symbols-outlined text-6xl text-error mb-4">error</span>
          <h1 className="text-xl font-bold text-text-primary mb-2">عذراً، حدث خطأ غير متوقع</h1>
          <p className="text-text-secondary mb-4">نعمل على حل المشكلة، يرجى المحاولة مرة أخرى</p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="px-6 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
          >
            إعادة المحاولة
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
