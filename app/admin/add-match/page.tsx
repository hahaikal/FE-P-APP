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
import api from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export default function AddMatchPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    home_team: '',
    away_team: '',
    commence_time: '',
    sport_key: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Format waktu ke ISO string dengan Z (UTC)
      const commenceTimeISO = new Date(formData.commence_time).toISOString();

      const token = localStorage.getItem('accessToken');
      console.log('Access token before POST:', token);

      await api.post('/api/v1/matches/manual', {
        ...formData,
        commence_time: commenceTimeISO,
      });
      
      toast({
        title: "Sukses!",
        description: "Pertandingan baru berhasil ditambahkan.",
      });
      
      router.push('/admin/status');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Gagal",
        description: "Gagal menambahkan pertandingan. Periksa kembali data Anda.",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = formData.home_team && formData.away_team && formData.commence_time && formData.sport_key;

  return (
    <Container className="py-8">
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

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Data Pertandingan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="home_team">Tim Tuan Rumah</Label>
              <Input id="home_team" name="home_team" type="text" placeholder="Contoh: Real Madrid" value={formData.home_team} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="away_team">Tim Tamu</Label>
              <Input id="away_team" name="away_team" type="text" placeholder="Contoh: Barcelona" value={formData.away_team} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sport_key">Sport Key</Label>
              <Input id="sport_key" name="sport_key" type="text" placeholder="Contoh: soccer_spain_la_liga" value={formData.sport_key} onChange={handleInputChange} required />
              <p className="text-sm text-gray-500">Format: soccer_country_league</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="commence_time">Waktu Kick-off</Label>
              <Input id="commence_time" name="commence_time" type="datetime-local" value={formData.commence_time} onChange={handleInputChange} required />
            </div>
            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={!isFormValid || isLoading} className="bg-blue-600 hover:bg-blue-700 text-white">
                {isLoading ? 'Menyimpan...' : 'Simpan Pertandingan'}
              </Button>
              <Link href="/admin/status"><Button type="button" variant="outline">Batal</Button></Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}