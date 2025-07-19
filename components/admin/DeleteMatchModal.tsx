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

interface DeleteMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  match: {
    id: string;
    match: string;
  };
  onDelete: (matchId: string) => void;
}

export function DeleteMatchModal({ isOpen, onClose, match, onDelete }: DeleteMatchModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await onDelete(match.id);
      onClose();
    } catch (error) {
      console.error('Error deleting match:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            Hapus Pertandingan
          </DialogTitle>
          <DialogDescription>
            Anda yakin ingin menghapus pertandingan ini?
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="font-medium text-red-900 mb-2">{match.match}</p>
            <p className="text-sm text-red-700">
              Tindakan ini tidak dapat dibatalkan. Semua data terkait pertandingan ini 
              (termasuk odds snapshots) akan dihapus secara permanen.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>
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