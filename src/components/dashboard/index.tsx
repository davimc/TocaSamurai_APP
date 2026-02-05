"use client";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
// import CardTitle from "@mui/material/CardTitle";
import SportsKabaddiOutlinedIcon from "@mui/icons-material/SportsKabaddiOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

interface StatsProps {
  totalStudents: number;
  activeStudents: number;
  pendingPayments: number;
  todayClasses: number;
}

export default function DashboardStats({
  totalStudents,
  activeStudents,
  pendingPayments,
  todayClasses,
}: StatsProps) {
  const stats = [
    {
      title: "Total de Alunos",
      value: totalStudents,
      icon: SportsKabaddiOutlinedIcon,
      description: "Cadastrados no sistema",
    },
    {
      title: "Alunos Ativos",
      value: activeStudents,
      icon: TrendingUpIcon,
      description: "Com matrícula ativa",
    },
    {
      title: "Pagamentos Pendentes",
      value: pendingPayments,
      icon: CreditCardOutlinedIcon,
      description: "Aguardando pagamento",
    },
    {
      title: "Aulas Hoje",
      value: todayClasses,
      icon: CalendarMonthOutlinedIcon,
      description: "Programadas para hoje",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            {/* <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle> */}
            <stat.icon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stat.value}
            </div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
