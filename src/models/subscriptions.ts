import { PlanSubscription } from "./plans";

export default interface Subscription {
  id: string;
  status: StatusType;
  created_at: Date;
  due_date: Date;
  next_date: Date;
  paymentPreference: string;
  professor: string;
  matrix: string;
  plan: PlanSubscription;
}

export interface InitialSubscription {
  dueDate: string;
  paymentPreference: string;
  professorId: string;
  planId: string;
}

export enum StatusType {
  ATIVO = 1,
  SUSPENSO = 2,
  CANCELADO = 3,
  EXPIRADO = 4,
}

export const StatusOptions = [
  { cod: StatusType.ATIVO, desc: "Ativo" },
  { cod: StatusType.SUSPENSO, desc: "Suspenso" },
  { cod: StatusType.CANCELADO, desc: "Cancelado" },
  { cod: StatusType.EXPIRADO, desc: "Expirado" },
];
