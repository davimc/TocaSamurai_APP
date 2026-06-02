export default interface Plan {
  title: string;
  description: string;
  martialArt: string;
}

export interface InitialPlan {
  planId: string;
  martialArtCod: string;
  planType: string;
  beltCod: string;
}
export interface PlanLong {
  id: string;
  title: string;
  description: string;
  price: number;
  martialArt: MartialArt;
}

export interface PlanSubscription {
  title: string;
  description: string;
  martialArt: string;
}
export interface BeltGraduation {
  cod: number;
  name: string;
  color: string;
}
//TODO: passar para model de martial art
export interface MartialArt {
  id: string;
  name: string;
  belts: BeltGraduation[];
}
