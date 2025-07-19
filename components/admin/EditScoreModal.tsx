'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface EditScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  match: {
    id: string;
    match: string;
    finalScore?: string | null;
  };
  onSave: (matchId: string, score: string) => void;
}

export function EditScoreModal({ isOpen, onClose, match, onSave }: EditScoreModalProps) {
  const [score, setScore] = useState(match.finalScore || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!score.trim()) return;
    
    setIsLoading(true);
    try {
      await onSave(match.id, score);
      onClose();
    } catch (error) {
      console.error('Error saving score:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setScore(match.finalScore || '');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Skor Akhir</DialogTitle>
          <DialogDescription>
            Masukkan skor akhir untuk pertandingan: <strong>{match.match}</strong>
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="score">Skor Akhir</Label>
            <Input
              id="score"
              placeholder="Contoh: 2-1, 0-0, 3-2"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              className="w-full"
            />
            <p className="text-sm text-gray-500">
              Format: Skor Tim Tuan Rumah - Skor Tim Tamu
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Batal
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={!score.trim() || isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isLoading ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}