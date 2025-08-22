'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Match, OddsSnapshot } from '@/types';
import { Trash2 } from 'lucide-react';
import { DeleteOddsModal } from './DeleteOddsModal';
import api from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { format, isValid } from 'date-fns';
import { id as localeId } from 'date-fns/locale';

interface OddsSnapshotListProps {
  isOpen: boolean;
  onClose: () => void;
  match: Match | null;
  refetchData: () => void;
}

export function OddsSnapshotList({ isOpen, onClose, match, refetchData }: OddsSnapshotListProps) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedOdds, setSelectedOdds] = useState<OddsSnapshot | null>(null);
  const { toast } = useToast();

  const openDeleteModal = (odds: OddsSnapshot) => {
    setSelectedOdds(odds);
    setDeleteModalOpen(true);
  };

  const handleDeleteOdds = async (oddsId: number) => {
    try {
      await api.delete(`/api/v1/odds/${oddsId}`);
      toast({ title: "Sukses", description: "Snapshot odds berhasil dihapus." });
      refetchData();
    } catch (error) {
      toast({ variant: "destructive", title: "Gagal", description: "Gagal menghapus snapshot odds." });
      console.error('Error deleting odds:', error);
    }
  };

  if (!match) return null;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Daftar Odds Snapshot</DialogTitle>
            <DialogDescription>
              Kelola data odds untuk pertandingan: <strong>{`${match.home_team} vs ${match.away_team}`}</strong>
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 max-h-[60vh] overflow-y-auto">
            {match.odds_snapshots.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bookmaker</TableHead>
                    <TableHead>Waktu</TableHead>
                    <TableHead>Home</TableHead>
                    <TableHead>Draw</TableHead>
                    <TableHead>Away</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {match.odds_snapshots.map((odds) => (
                    <TableRow key={odds.id}>
                      <TableCell>{odds.bookmaker}</TableCell>
                      <TableCell>
                        {odds.timestamp && isValid(new Date(odds.timestamp))
                          ? format(new Date(odds.timestamp), "dd MMM, HH:mm 'WIB'", { locale: localeId }) // PERBAIKAN
                          : '-'}
                      </TableCell>
                      <TableCell>{odds.price_home.toFixed(2)}</TableCell>
                      <TableCell>{odds.price_draw.toFixed(2)}</TableCell>
                      <TableCell>{odds.price_away.toFixed(2)}</TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => openDeleteModal(odds)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-center text-gray-500 py-8">Belum ada data odds untuk pertandingan ini.</p>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <DeleteOddsModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        oddsSnapshot={selectedOdds}
        onDelete={handleDeleteOdds}
      />
    </>
  );
}