'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { AlertTriangle } from 'lucide-react';
import { OddsSnapshot } from '@/types';
import { format, isValid } from 'date-fns';
import { id as localeId } from 'date-fns/locale'; // PERBAIKAN

interface DeleteOddsModalProps {
  isOpen: boolean;
  onClose: () => void;
  oddsSnapshot: OddsSnapshot | null;
  onDelete: (oddsId: number) => void;
}

export function DeleteOddsModal({ isOpen, onClose, oddsSnapshot, onDelete }: DeleteOddsModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (!oddsSnapshot) return;
    setIsLoading(true);
    try {
      await onDelete(oddsSnapshot.id);
      onClose();
    } catch (error) {
      console.error('Error deleting odds snapshot:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!oddsSnapshot) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            Hapus Snapshot Odds
          </DialogTitle>
          <DialogDescription>
            Anda yakin ingin menghapus data odds ini secara permanen?
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm">
            <p><strong>Bookmaker:</strong> {oddsSnapshot.bookmaker}</p>
            <p>
              <strong>Waktu:</strong> {oddsSnapshot.timestamp && isValid(new Date(oddsSnapshot.timestamp))
                ? format(new Date(oddsSnapshot.timestamp), "dd MMM yyyy, HH:mm 'WIB'", { locale: localeId }) // PERBAIKAN
                : '-'}
            </p>
            <p><strong>Odds:</strong> {oddsSnapshot.price_home} / {oddsSnapshot.price_draw} / {oddsSnapshot.price_away}</p>
            <p className="mt-2 text-red-700">Tindakan ini tidak dapat dibatalkan.</p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Batal</Button>
          <Button 
            onClick={handleDelete} 
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isLoading ? 'Menghapus...' : 'Ya, Hapus'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}