'use client';

import { useState, useEffect, useCallback } from 'react';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusTable } from '@/components/admin/StatusTable';
import { CheckCircle, AlertCircle, XCircle, BarChart3, Plus, Loader2, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import api from '@/lib/api';
import { Match, StatusOverview } from '@/types';

export default function AdminStatusPage() {
  const [statusData, setStatusData] = useState<StatusOverview | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get<StatusOverview>('/api/v1/matches/status_overview');
      
      // Fungsi untuk mengurutkan pertandingan berdasarkan commence_time
      const sortMatches = (matches: Match[]) => {
        return matches.sort((a, b) => new Date(a.commence_time).getTime() - new Date(b.commence_time).getTime());
      };

      // Mengurutkan setiap kategori sebelum menyimpannya ke state
      const sortedData: StatusOverview = {
        complete: sortMatches(response.data.complete),
        incomplete: sortMatches(response.data.incomplete),
        empty: sortMatches(response.data.empty),
      };
      
      setStatusData(sortedData);
    } catch (err) {
      setError('Gagal memuat data status. Silakan coba lagi.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const totalMatches = statusData ? statusData.complete.length + statusData.incomplete.length + statusData.empty.length : 0;
  const completionRate = totalMatches > 0 ? Math.round(((statusData?.complete.length || 0) / totalMatches) * 100) : 0;

  return (
    <Container className="py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Status Kelengkapan Data Pertandingan
            </h1>
            <p className="text-gray-600">
              Monitor kesehatan dan kelengkapan data untuk semua pertandingan dalam sistem
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={fetchData} disabled={isLoading}>
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
            <Link href="/admin/add-match">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                <Plus className="w-4 h-4" />
                Tambah Pertandingan
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pertandingan</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? <Loader2 className="animate-spin" /> : totalMatches}</div>
            <p className="text-xs text-muted-foreground">Pertandingan terdaftar</p>
          </CardContent>
        </Card>
        {/* Other cards */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Lengkap</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{isLoading ? <Loader2 className="animate-spin" /> : statusData?.complete.length}</div>
            <p className="text-xs text-muted-foreground">{completionRate}% dari total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Kurang Lengkap</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{isLoading ? <Loader2 className="animate-spin" /> : statusData?.incomplete.length}</div>
            <p className="text-xs text-muted-foreground">Perlu pembaruan</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Kosong</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{isLoading ? <Loader2 className="animate-spin" /> : statusData?.empty.length}</div>
            <p className="text-xs text-muted-foreground">Belum ada data</p>
          </CardContent>
        </Card>
      </div>

      {/* Status Tables */}
      {isLoading && (
        <div className="flex justify-center items-center p-16">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
        </div>
      )}
      {error && <p className="text-center text-red-600">{error}</p>}
      {!isLoading && !error && statusData && (
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <h2 className="text-xl font-bold text-gray-900">Data Lengkap</h2>
              <Badge className="bg-green-100 text-green-700">{statusData.complete.length} Pertandingan</Badge>
            </div>
            <StatusTable data={statusData.complete} type="complete" refetchData={fetchData} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <h2 className="text-xl font-bold text-gray-900">Data Kurang Lengkap</h2>
              <Badge className="bg-yellow-100 text-yellow-700">{statusData.incomplete.length} Pertandingan</Badge>
            </div>
            <StatusTable data={statusData.incomplete} type="incomplete" refetchData={fetchData} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-4">
              <XCircle className="w-5 h-5 text-red-600" />
              <h2 className="text-xl font-bold text-gray-900">Data Kosong</h2>
              <Badge className="bg-red-100 text-red-700">{statusData.empty.length} Pertandingan</Badge>
            </div>
            <StatusTable data={statusData.empty} type="empty" refetchData={fetchData} />
          </div>
        </div>
      )}
    </Container>
  );
}