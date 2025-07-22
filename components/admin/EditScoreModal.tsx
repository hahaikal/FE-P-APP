'use client';

import { useState, useEffect } from 'react';
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
import { Match } from '@/types';

interface EditScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  match: Match | null;
  onSave: (matchId: number, homeScore: number, awayScore: number) => void;
}

export function EditScoreModal({ isOpen, onClose, match, onSave }: EditScoreModalProps) {
  const [homeScore, setHomeScore] = useState<string>('');
  const [awayScore, setAwayScore] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (match) {
      setHomeScore(match.result_home_score?.toString() || '');
      setAwayScore(match.result_away_score?.toString() || '');
    }
  }, [match]);

  const handleSave = async () => {
    if (!match || homeScore.trim() === '' || awayScore.trim() === '') return;
    
    setIsLoading(true);
    try {
      await onSave(match.id, parseInt(homeScore, 10), parseInt(awayScore, 10));
      onClose();
    } catch (error) {
      console.error('Error saving score:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!match) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Skor Akhir</DialogTitle>
          <DialogDescription>
            Masukkan skor akhir untuk: <strong>{`${match.home_team} vs ${match.away_team}`}</strong>
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="homeScore">{match.home_team} (Home)</Label>
            <Input
              id="homeScore"
              type="number"
              placeholder="Skor"
              value={homeScore}
              onChange={(e) => setHomeScore(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="awayScore">{match.away_team} (Away)</Label>
            <Input
              id="awayScore"
              type="number"
              placeholder="Skor"
              value={awayScore}
              onChange={(e) => setAwayScore(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Batal</Button>
          <Button 
            onClick={handleSave} 
            disabled={homeScore.trim() === '' || awayScore.trim() === '' || isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isLoading ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}