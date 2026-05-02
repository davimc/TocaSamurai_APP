import Plan from "./plans";
import Subscription from "./subscriptions";

export default interface Student {
  id: string;
  name: string;
  email: string;
  phone?: string;
  entryDate: Date;
  subscriptions: Subscription[];
}

export interface NewStudent {
  name: string;
  gender: number;
  birthdate: Date;
  entryDate: Date;
  documentNumber: string;
  personType: number;
  phone: string;
  street: string;
  number: number;
  complement: string;
  district: string;
  city: string;
  state: string;
  postalCode: string;
  beltId: number;
  martialArtId: number;
  roleId: number;
  unitId: string;
  username: string;
  password: string;
  plan: InitialPlan;
}

export interface InitialPlan {
  martialArtCod: number;
  unitPrice: number;
  durationInMonths: number;
  planType: number;
  beltCod: number;
}
