import { Container } from '@/components/ui/container';
import { TrendingUp } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <Container>
        <div className="py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">P-APP</h3>
                <p className="text-xs text-gray-500">Prediksi Sepak Bola</p>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-600">
                © 2025 P-APP. Platform prediksi pertandingan sepak bola.
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Dibuat dengan teknologi AI dan machine learning terdepan
              </p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}