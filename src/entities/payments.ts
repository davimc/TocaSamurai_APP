import Student from "./students";

export default interface Payment {
  id: string;
  student_id: string;
  amount: number;
  due_date: string;
  paid_at?: string;
  status: "paid" | "pending" | "overdue";
  created_at: string;
  description?: string;
}

export interface PaymentWithStudent extends Payment {
  student: Student;
}
