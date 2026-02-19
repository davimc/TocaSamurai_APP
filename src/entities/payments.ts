export default interface Payment {
  id: string;
  student_id: string;
  amount: number;
  due_date: string;
  paid_at?: string;
  status: "paid" | "pending" | "overdue";
  created_at: string;
}

export interface PaymentWithStudent extends Payment {
  students: {
    id: string;
    full_name: string;
    email: string;
    status: "active" | "inactive";
    created_at: string;
  };
}
