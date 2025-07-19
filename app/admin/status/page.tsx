import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusTable } from '@/components/admin/StatusTable';
import { CheckCircle, AlertCircle, XCircle, BarChart3, Plus } from 'lucide-react';
import Link from 'next/link';

// Dummy data for status overview
const statusData = {
  complete: [
    {
      id: '1',
      match: 'Real Madrid vs Barcelona',
      kickoffTime: 'Sabtu, 19 Juli 2025 - 21:00 WIB',
      oddsSnapshots: 5,
      finalScore: '2-1',
      status: 'complete'
    },
    {
      id: '2',
      match: 'Manchester City vs Liverpool',
      kickoffTime: 'Minggu, 20 Juli 2025 - 23:30 WIB',
      oddsSnapshots: 4,
      finalScore: '1-1',
      status: 'complete'
    },
    {
      id: '3',
      match: 'Bayern Munich vs Borussia Dortmund',
      kickoffTime: 'Senin, 21 Juli 2025 - 02:30 WIB',
      oddsSnapshots: 6,
      finalScore: '3-0',
      status: 'complete'
    }
  ],
  incomplete: [
    {
      id: '4',
      match: 'PSG vs Marseille',
      kickoffTime: 'Selasa, 22 Juli 2025 - 02:00 WIB',
      oddsSnapshots: 3,
      finalScore: null,
      status: 'incomplete'
    },
    {
      id: '5',
      match: 'Juventus vs AC Milan',
      kickoffTime: 'Rabu, 23 Juli 2025 - 02:45 WIB',
      oddsSnapshots: 2,
      finalScore: null,
      status: 'incomplete'
    }
  ],
  empty: [
    {
      id: '6',
      match: 'Chelsea vs Arsenal',
      kickoffTime: 'Kamis, 24 Juli 2025 - 02:00 WIB',
      oddsSnapshots: 0,
      finalScore: null,
      status: 'empty'
    },
    {
      id: '7',
      match: 'Atletico Madrid vs Valencia',
      kickoffTime: 'Jumat, 25 Juli 2025 - 02:30 WIB',
      oddsSnapshots: 0,
      finalScore: null,
      status: 'empty'
    }
  ]
};

export default function AdminStatusPage() {
  const totalMatches = statusData.complete.length + statusData.incomplete.length + statusData.empty.length;
  const completionRate = Math.round((statusData.complete.length / totalMatches) * 100);

  return (
    <Container className="py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Status Kelengkapan Data Pertandingan
            </h1>
            <p className="text-gray-600">
              Monitor kesehatan dan kelengkapan data untuk semua pertandingan dalam sistem
            </p>
          </div>
          <Link href="/admin/add-match">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
              <Plus className="w-4 h-4" />
              Tambah Pertandingan
            </Button>
          </Link>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pertandingan</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMatches}</div>
            <p className="text-xs text-muted-foreground">
              Pertandingan terdaftar
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Lengkap</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{statusData.complete.length}</div>
            <p className="text-xs text-muted-foreground">
              {completionRate}% dari total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Kurang Lengkap</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{statusData.incomplete.length}</div>
            <p className="text-xs text-muted-foreground">
              Perlu pembaruan
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Kosong</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{statusData.empty.length}</div>
            <p className="text-xs text-muted-foreground">
              Belum ada data
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Status Tables */}
      <div className="space-y-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <h2 className="text-xl font-bold text-gray-900">Data Lengkap</h2>
            <Badge className="bg-green-100 text-green-700">
              {statusData.complete.length} Pertandingan
            </Badge>
          </div>
          <StatusTable data={statusData.complete} type="complete" />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            <h2 className="text-xl font-bold text-gray-900">Data Kurang Lengkap</h2>
            <Badge className="bg-yellow-100 text-yellow-700">
              {statusData.incomplete.length} Pertandingan
            </Badge>
          </div>
          <StatusTable data={statusData.incomplete} type="incomplete" />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <XCircle className="w-5 h-5 text-red-600" />
            <h2 className="text-xl font-bold text-gray-900">Data Kosong</h2>
            <Badge className="bg-red-100 text-red-700">
              {statusData.empty.length} Pertandingan
            </Badge>
          </div>
          <StatusTable data={statusData.empty} type="empty" />
        </div>
      </div>
    </Container>
  );
}