'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Plus, Calendar } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AddMatchPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    homeTeam: '',
    awayTeam: '',
    commenceTime: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call to POST /api/v1/matches/manual
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message (in real app, use toast notification)
      alert('Pertandingan berhasil ditambahkan!');
      
      // Redirect back to admin status page
      router.push('/admin/status');
    } catch (error) {
      alert('Gagal menambahkan pertandingan. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = formData.homeTeam && formData.awayTeam && formData.commenceTime;

  return (
    <Container className="py-8">
      {/* Header */}
      <div className="mb-8">
        <Link href="/admin/status">
          <Button variant="ghost" className="gap-2 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Status Data
          </Button>
        </Link>
        
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <Plus className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tambah Pertandingan Manual</h1>
            <p className="text-gray-600">Masukkan data pertandingan baru ke dalam sistem</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Data Pertandingan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Home Team */}
            <div className="space-y-2">
              <Label htmlFor="homeTeam">Tim Tuan Rumah</Label>
              <Input
                id="homeTeam"
                name="homeTeam"
                type="text"
                placeholder="Contoh: Real Madrid"
                value={formData.homeTeam}
                onChange={handleInputChange}
                required
                className="w-full"
              />
            </div>

            {/* Away Team */}
            <div className="space-y-2">
              <Label htmlFor="awayTeam">Tim Tamu</Label>
              <Input
                id="awayTeam"
                name="awayTeam"
                type="text"
                placeholder="Contoh: Barcelona"
                value={formData.awayTeam}
                onChange={handleInputChange}
                required
                className="w-full"
              />
            </div>

            {/* Commence Time */}
            <div className="space-y-2">
              <Label htmlFor="commenceTime">Waktu Kick-off</Label>
              <Input
                id="commenceTime"
                name="commenceTime"
                type="datetime-local"
                value={formData.commenceTime}
                onChange={handleInputChange}
                required
                className="w-full"
              />
              <p className="text-sm text-gray-500">
                Pilih tanggal dan waktu kick-off pertandingan
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={!isFormValid || isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isLoading ? 'Menyimpan...' : 'Simpan Pertandingan'}
              </Button>
              
              <Link href="/admin/status">
                <Button type="button" variant="outline">
                  Batal
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Info Box */}
      <div className="mt-8 max-w-2xl">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 mb-2">Informasi</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Pertandingan yang ditambahkan akan muncul di dashboard utama</li>
            <li>• Data odds akan diambil secara otomatis oleh sistem</li>
            <li>• Anda dapat mengedit skor akhir setelah pertandingan selesai</li>
          </ul>
        </div>
      </div>
    </Container>
  );
}