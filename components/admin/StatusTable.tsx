'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle, XCircle, Edit, Trash2 } from 'lucide-react';
import { EditScoreModal } from './EditScoreModal';
import { DeleteMatchModal } from './DeleteMatchModal';

interface StatusTableProps {
  data: Array<{
    id: string;
    match: string;
    kickoffTime: string;
    oddsSnapshots: number;
    finalScore: string | null;
    status: string;
  }>;
  type: 'complete' | 'incomplete' | 'empty';
}

export function StatusTable({ data, type }: StatusTableProps) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<any>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'incomplete':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'empty':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'complete':
        return <Badge className="bg-green-100 text-green-700 text-xs">Lengkap</Badge>;
      case 'incomplete':
        return <Badge className="bg-yellow-100 text-yellow-700 text-xs">Kurang Lengkap</Badge>;
      case 'empty':
        return <Badge className="bg-red-100 text-red-700 text-xs">Kosong</Badge>;
      default:
        return null;
    }
  };

  const handleEditScore = (match: any) => {
    setSelectedMatch(match);
    setEditModalOpen(true);
  };

  const handleDeleteMatch = (match: any) => {
    setSelectedMatch(match);
    setDeleteModalOpen(true);
  };

  const handleSaveScore = async (matchId: string, score: string) => {
    // Simulate API call to PUT /api/v1/matches/{match_id}/score
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert(`Skor berhasil diperbarui: ${score}`);
    // In real app, refresh the data or update state
  };

  const handleConfirmDelete = async (matchId: string) => {
    // Simulate API call to DELETE /api/v1/matches/{match_id}
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Pertandingan berhasil dihapus');
    // In real app, refresh the data or update state
  };

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
        <p className="text-gray-500">Tidak ada data untuk kategori ini</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pertandingan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Waktu Kick-off
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Odds Snapshots
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Skor Akhir
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(item.status)}
                    <div>
                      <div className="text-sm font-medium text-gray-900">{item.match}</div>
                      <div className="text-sm text-gray-500">ID: {item.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{item.kickoffTime}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{item.oddsSnapshots}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {item.finalScore || '-'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(item.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditScore(item)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteMatch(item)}
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Modals */}
      {selectedMatch && (
        <>
          <EditScoreModal
            isOpen={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            match={selectedMatch}
            onSave={handleSaveScore}
          />
          <DeleteMatchModal
            isOpen={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            match={selectedMatch}
            onDelete={handleConfirmDelete}
          />
        </>
      )}
    </div>
  );
}