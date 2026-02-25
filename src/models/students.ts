export default interface Student {
  id: string;
  name: string;
  email: string;
  active: boolean;
  phone?: string;
  martialArtType: string;
  belt: BeltGraduation;
  entryDate: Date;
}

interface BeltGraduation {
  cod: number;
  name: string;
  color: string;
}
