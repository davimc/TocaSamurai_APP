"use client";

import Check from "@mui/icons-material/CheckCircleOutlined";
import LockClock from "@mui/icons-material/LockClockOutlined";
import ErrorAlert from "@mui/icons-material/ErrorOutlineOutlined";

import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
// import { useRouter } from "next/router";
import { useState } from "react";
import { PaymentWithStudent } from "@/models/payments";

interface PaymentsTableProps {
  payments: PaymentWithStudent[];
}

export function PaymentsTable({ payments }: PaymentsTableProps) {
  //   const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR");
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-600/20 text-green-500";
      case "pending":
        return "bg-yellow-600/20 text-yellow-500";
      case "overdue":
        return "bg-red-600/20 text-red-500";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "paid":
        return "Pago";
      case "pending":
        return "Pendente";
      case "overdue":
        return "Atrasado";
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <Check className="h-3 w-3" />;
      case "pending":
        return <LockClock className="h-3 w-3" />;
      case "overdue":
        return <ErrorAlert className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const handleMarkAsPaid = async (paymentId: string) => {
    setLoading(paymentId);

    setLoading(null);
    // router.refresh();
  };

  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHead>
          <TableRow className="border-border hover:bg-transparent">
            <TableCell className="text-muted-foreground">Aluno</TableCell>
            <TableCell className="text-muted-foreground">Descricao</TableCell>
            <TableCell className="text-muted-foreground">Valor</TableCell>
            <TableCell className="text-muted-foreground">Vencimento</TableCell>
            <TableCell className="text-muted-foreground">Status</TableCell>
            <TableCell className="text-muted-foreground">Pago em</TableCell>
            <TableCell className="text-muted-foreground w-[50px]"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payments.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center text-muted-foreground py-8"
              >
                Nenhum pagamento registrado ainda.
              </TableCell>
            </TableRow>
          ) : (
            payments.map((payment) => (
              <TableRow key={payment.id} className="border-border">
                <TableCell className="font-medium text-foreground">
                  {payment.student.name}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {payment.description || "Mensalidade"}
                </TableCell>
                <TableCell className="font-semibold text-foreground">
                  {formatCurrency(payment.amount)}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(payment.due_date)}
                </TableCell>
                <TableCell>
                  <Badge
                    className={`${getStatusColor(payment.status)} flex items-center gap-1 w-fit`}
                  >
                    {getStatusIcon(payment.status)}
                    {getStatusLabel(payment.status)}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {payment.paid_at ? formatDate(payment.paid_at) : "-"}
                </TableCell>
                <TableCell>
                  {/* <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        disabled={loading === payment.id}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="bg-popover border-border"
                    >
                      {payment.status !== "paid" && (
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => handleMarkAsPaid(payment.id)}
                        >
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          Marcar como Pago
                        </DropdownMenuItem>
                      )}
                      {payment.status === "pending" && (
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => handleMarkAsOverdue(payment.id)}
                        >
                          <AlertCircle className="mr-2 h-4 w-4 text-red-500" />
                          Marcar como Atrasado
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu> */}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
