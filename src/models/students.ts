import Plan, { InitialPlan } from "./plans";
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
  lasname: string;
  email: string;
  gender: number;
  birthdate: Date;
  entryDate: Date;
  documentNumber: string;
  personType: number;
  phone: string;
  street: string;
  number: number;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  postalCode: string;
  beltId: string;
  martialArtId: string;
  roleId: number;
  unitId: string;
  username: string;
  password: string;
  plan: InitialPlan;
}

export interface StudentShort {
  id: string;
  name: string;
}
