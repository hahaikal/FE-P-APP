'use client';

import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Settings } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">P-APP</h1>
              <p className="text-xs text-gray-500">Prediksi Sepak Bola</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/" 
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              Dashboard
            </Link>
            <Link 
              href="/admin/status" 
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Status Data
            </Link>
            <Link 
              href="/admin/add-match" 
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              Tambah Match
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="hidden sm:flex">
              Live
            </Badge>
            <Button variant="outline" size="sm" className="md:hidden">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}