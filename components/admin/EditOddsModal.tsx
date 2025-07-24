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
import { Match } from '@/types';

interface EditOddsModalProps {
  isOpen: boolean;
  onClose: () => void;
  match: Match | null;
  onSave: (matchId: number, oddsData: any) => void;
}

export function EditOddsModal({ isOpen, onClose, match, onSave }: EditOddsModalProps) {
  const [formData, setFormData] = useState({
    price_home: '',
    price_draw: '',
    price_away: '',
    snapshot_time: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!match) return;
    
    setIsLoading(true);
    try {
      const oddsData = {
        bookmaker: 'manual_input',
        price_home: parseFloat(formData.price_home),
        price_draw: parseFloat(formData.price_draw),
        price_away: parseFloat(formData.price_away),
        snapshot_time: formData.snapshot_time,
        snapshot_timezone: 'Asia/Jakarta',
      };
      await onSave(match.id, oddsData);
      onClose();
    } catch (error) {
      console.error('Error saving odds:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const isFormValid = formData.price_home && formData.price_draw && formData.price_away && formData.snapshot_time;

  if (!match) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Tambah Odds Manual</DialogTitle>
          <DialogDescription>
            Masukkan snapshot odds baru untuk pertandingan: <strong>{`${match.home_team} vs ${match.away_team}`}</strong>
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price_home">Odds Home</Label>
              <Input id="price_home" name="price_home" type="number" step="0.01" placeholder="1.95" value={formData.price_home} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price_draw">Odds Draw</Label>
              <Input id="price_draw" name="price_draw" type="number" step="0.01" placeholder="3.50" value={formData.price_draw} onChange={handleInputChange} />
            </div>
             <div className="space-y-2">
              <Label htmlFor="price_away">Odds Away</Label>
              <Input id="price_away" name="price_away" type="number" step="0.01" placeholder="4.10" value={formData.price_away} onChange={handleInputChange} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="snapshot_time">Waktu Snapshot (HH:mm)</Label>
            <Input id="snapshot_time" name="snapshot_time" type="time" value={formData.snapshot_time} onChange={handleInputChange} />
            <p className="text-sm text-gray-500">Waktu snapshot akan menggunakan zona waktu Asia/Jakarta.</p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Batal</Button>
          <Button 
            onClick={handleSave} 
            disabled={!isFormValid || isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isLoading ? 'Menyimpan...' : 'Simpan Odds'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}