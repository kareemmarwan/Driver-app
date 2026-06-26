'use client';
import { ReactNode } from 'react';
import ErrorBoundary from './ErrorBoundary';

export default function ErrorBoundaryWrapper({ children }: { children: ReactNode }) {
  return <ErrorBoundary>{children}</ErrorBoundary>;
}
