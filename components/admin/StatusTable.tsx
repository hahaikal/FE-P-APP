'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { CheckCircle, AlertCircle, XCircle, Edit, Trash2, MoreVertical, PlusCircle, List } from 'lucide-react';
import { EditScoreModal } from './EditScoreModal';
import { DeleteMatchModal } from './DeleteMatchModal';
import { EditOddsModal } from './EditOddsModal';
import { OddsSnapshotList } from './OddsSnapshotList'; // Import baru
import { Match } from '@/types';
import api from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface StatusTableProps {
  data: Match[];
  type: 'complete' | 'incomplete' | 'empty';
  refetchData: () => void;
}

export function StatusTable({ data, type, refetchData }: StatusTableProps) {
  const [editScoreModalOpen, setEditScoreModalOpen] = useState(false);
  const [editOddsModalOpen, setEditOddsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [oddsListModalOpen, setOddsListModalOpen] = useState(false); // State baru
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const { toast } = useToast();

  // ... (fungsi getStatusIcon dan getStatusBadge tidak berubah)
  const getStatusIcon = (match: Match) => {
    const oddsCount = match.odds_snapshots.length;
    const hasScore = match.result_home_score !== null && match.result_away_score !== null;
    if (hasScore && oddsCount >= 3) return <CheckCircle className="w-4 h-4 text-green-600" />;
    if (oddsCount === 0) return <XCircle className="w-4 h-4 text-red-600" />;
    return <AlertCircle className="w-4 h-4 text-yellow-600" />;
  };

  const getStatusBadge = (match: Match) => {
    const oddsCount = match.odds_snapshots.length;
    const hasScore = match.result_home_score !== null && match.result_away_score !== null;
    if (hasScore && oddsCount >= 3) return <Badge className="bg-green-100 text-green-700 text-xs">Lengkap</Badge>;
    if (oddsCount === 0) return <Badge className="bg-red-100 text-red-700 text-xs">Kosong</Badge>;
    return <Badge className="bg-yellow-100 text-yellow-700 text-xs">Kurang Lengkap</Badge>;
  };

  const handleOpenModal = (match: Match, modal: 'score' | 'odds' | 'delete' | 'listOdds') => {
    setSelectedMatch(match);
    if (modal === 'score') setEditScoreModalOpen(true);
    if (modal === 'odds') setEditOddsModalOpen(true);
    if (modal === 'delete') setDeleteModalOpen(true);
    if (modal === 'listOdds') setOddsListModalOpen(true); // Handler baru
  };

  // ... (fungsi handleSaveScore, handleSaveOdds, handleConfirmDelete tidak berubah)
  const handleSaveScore = async (matchId: number, homeScore: number, awayScore: number) => {
    try {
      await api.put(`/api/v1/matches/${matchId}/score`, { result_home_score: homeScore, result_away_score: awayScore });
      toast({ title: "Sukses", description: "Skor pertandingan berhasil diperbarui." });
      refetchData();
    } catch (error) {
      toast({ variant: "destructive", title: "Gagal", description: "Gagal memperbarui skor." });
    }
  };

  const handleSaveOdds = async (matchId: number, oddsData: any) => {
    try {
      await api.post(`/api/v1/matches/${matchId}/odds/manual`, oddsData);
      toast({ title: "Sukses", description: "Data odds berhasil ditambahkan." });
      refetchData();
    } catch (error) {
      toast({ variant: "destructive", title: "Gagal", description: "Gagal menambahkan data odds." });
    }
  };

  const handleConfirmDelete = async (matchId: number) => {
    try {
      await api.delete(`/api/v1/matches/${matchId}`);
      toast({ title: "Sukses", description: "Pertandingan berhasil dihapus." });
      refetchData();
    } catch (error) {
      toast({ variant: "destructive", title: "Gagal", description: "Gagal menghapus pertandingan." });
    }
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
          {/* ... (thead tidak berubah) ... */}
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pertandingan</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waktu Kick-off</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Odds Snapshots</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skor Akhir</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                {/* ... (kolom lain tidak berubah) ... */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(item)}
                    <div>
                      <div className="text-sm font-medium text-gray-900">{`${item.home_team} vs ${item.away_team}`}</div>
                      <div className="text-sm text-gray-500">ID: {item.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{format(new Date(item.commence_time), "EEEE, dd MMM yyyy - HH:mm 'WIB'", { locale: id })}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{item.odds_snapshots.length}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {item.result_home_score !== null ? `${item.result_home_score} - ${item.result_away_score}` : '-'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(item)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Buka menu</span>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleOpenModal(item, 'listOdds')}>
                        <List className="mr-2 h-4 w-4" />
                        <span>Lihat & Kelola Odds</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleOpenModal(item, 'odds')}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        <span>Tambah Odds Manual</span>
                      </DropdownMenuItem>
                       <DropdownMenuItem onClick={() => handleOpenModal(item, 'score')}>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit Skor Akhir</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50" onClick={() => handleOpenModal(item, 'delete')}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Hapus Pertandingan</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {selectedMatch && (
        <>
          <EditScoreModal isOpen={editScoreModalOpen} onClose={() => setEditScoreModalOpen(false)} match={selectedMatch} onSave={handleSaveScore} />
          <EditOddsModal isOpen={editOddsModalOpen} onClose={() => setEditOddsModalOpen(false)} match={selectedMatch} onSave={handleSaveOdds} />
          <DeleteMatchModal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} match={selectedMatch} onDelete={handleConfirmDelete} />
          <OddsSnapshotList isOpen={oddsListModalOpen} onClose={() => setOddsListModalOpen(false)} match={selectedMatch} refetchData={refetchData} />
        </>
      )}
    </div>
  );
}