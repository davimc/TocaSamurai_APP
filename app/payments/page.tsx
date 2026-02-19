import PaymentForm from "@/components/PaymentForm";
import { PaymentsTable } from "@/components/PaymentTable";
import Payment, { PaymentWithStudent } from "@/entities/payments";
import Student from "@/entities/students";
import CheckCircle from "@mui/icons-material/CheckCircleOutlined";
import CreditCard from "@mui/icons-material/CreditCardOutlined";
import ErrorOutlineOutlined from "@mui/icons-material/ErrorOutlineOutlined";
import LockClock from "@mui/icons-material/LockClockOutlined";
import { Card, CardContent } from "@mui/material";

interface PaymentsPageProps {
  students: Student[];
  payments: Payment[];
  totalPaid: number;
  totalPending: number;
  totalOverdue: number;
}
export default async function PaymentsPage() {
  const students: Student[] = [
    {
      id: "1",
      full_name: "João Silva",
      email: "joao.silva@example.com",
      status: "active",
      created_at: "2023-01-15T10:00:00Z",
    },
    {
      id: "2",
      full_name: "Maria Oliveira",
      email: "maria.oliveira@example.com",
      status: "inactive",
      created_at: "2023-01-16T14:30:00Z",
    },
  ];
  const payments: Payment[] = [
    {
      id: "1",
      student_id: "1",
      amount: 100,
      due_date: "2023-02-01T00:00:00Z",
      status: "paid",
      paid_at: "2023-01-30T12:00:00Z",
      created_at: "2023-01-20T12:00:00Z",
    },
    {
      id: "2",
      student_id: "2",
      amount: 150,
      due_date: "2023-02-05T00:00:00Z",
      status: "pending",
      created_at: "2023-01-22T15:30:00Z",
    },
    {
      id: "3",
      student_id: "1",
      amount: 100,
      due_date: "2023-01-25T00:00:00Z",
      status: "overdue",
      created_at: "2023-01-18T09:45:00Z",
    },
  ];

  const paymentWithStudent: PaymentWithStudent[] = payments.map((payment) => {
    const student = students.find((s) => s.id === payment.student_id);
    if (!student) {
      throw new Error(`Student with id ${payment.student_id} not found`);
    }

    return {
      ...payment,
      student: student,
    };
  });

  const totalPaid = payments.filter((p) => p.status === "paid").length;
  const totalPending = payments.filter((p) => p.status === "pending").length;
  const totalOverdue = payments.filter((p) => p.status === "overdue").length;

  const stats = [
    {
      title: "Total Registrado",
      value: payments?.length ?? 0,
      icon: CreditCard,
      color: "text-primary",
      bgColor: "bg-primary/20",
    },
    {
      title: "Pagos",
      value: totalPaid ?? 0,
      icon: CheckCircle,
      color: "text-green-500",
      bgColor: "bg-green-600/20",
    },
    {
      title: "Pendentes",
      value: totalPending ?? 0,
      icon: LockClock,
      color: "text-yellow-500",
      bgColor: "bg-yellow-600/20",
    },
    {
      title: "Atrasados",
      value: totalOverdue ?? 0,
      icon: ErrorOutlineOutlined,
      color: "text-red-500",
      bgColor: "bg-red-600/20",
    },
  ];

  return (
    <main className="flex-1 pl-64">
      <div className="p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Pagamentos</h1>
            <p className="text-muted-foreground">
              Gerencie os pagamentos dos alunos
            </p>
          </div>
          <PaymentForm students={students ?? []} />
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="bg-card border-border">
              <CardContent className="flex items-center gap-4 p-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.bgColor}`}
                >
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <PaymentsTable payments={paymentWithStudent ?? []} />
      </div>
    </main>
  );
}
