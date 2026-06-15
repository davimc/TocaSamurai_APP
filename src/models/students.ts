import Plan, { InitialPlan } from "./plans";
import Subscription, { InitialSubscription } from "./subscriptions";

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
  lastname: string;
  email: string;
  gender: number;
  birthdate: string;
  entryDate: string;
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
  beltLevel: number;
  martialArtId: string;
  roleId?: number | 3;
  unitId: string;
  username: string;
  password: string;
  // plan: InitialPlan;
  subscription: InitialSubscription
}
export interface FormDataStudent {
  name: string;
  lastname: string;
  email: string;
  gender: number;
  birthdate: string;
  entryDate: string;
  documentNumber: string;
  personType: number;
  phone: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  postalCode: string;
  martialArt: string;
  
  unidade: string;
  username: string;
  password: string,
  due_date: string,
  roleId: number,
  preferencePaymentType: string,
  plan: string,
  professor: string,
  belt: string;
  grau: number
}
export interface StudentShort {
  id: string;
  name: string;
}
