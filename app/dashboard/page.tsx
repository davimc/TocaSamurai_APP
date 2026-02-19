import DashboardStats from "@/components/Dashboard";
import RecentStudents from "@/components/RecentStudents";
import { TodaySchedule } from "@/components/TodaySchedules";

export default function DashboardPage() {
  // Get today's day of week (0 = Sunday, 1 = Monday, etc.)
  const today = new Date();
  const daysOfWeek = [
    "domingo",
    "segunda",
    "terca",
    "quarta",
    "quinta",
    "sexta",
    "sabado",
  ];
  const todayName = daysOfWeek[today.getDay()];

  const totalStudents = 120; // Example data
  const activeStudents = 85; // Example data
  const pendingPayments = 15; // Example data
  const recentStudents = [
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
  const todayClasses = [
    {
      id: "1",
      start_time: "18:00",
      end_time: "19:00",
      instructor: "Marcelo",
      modalities: { name: "Jiu-Jitsu" },
    },
    {
      id: "2",
      start_time: "19:00",
      end_time: "20:00",
      instructor: "James",
      modalities: { name: "Muay Thai" },
    },
    {
      id: "3",
      start_time: "20:00",
      end_time: "21:00",
      instructor: "Carlos",
      modalities: { name: "Taekwondo" },
    },
  ]; // Example data
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Painel de Controle
        </h1>
        <p className="text-muted-foreground">
          Bem-vindo ao sistema de gestão da Toca do Samurai
        </p>
      </div>
      <DashboardStats
        totalStudents={totalStudents ?? 0}
        activeStudents={activeStudents ?? 0}
        pendingPayments={pendingPayments ?? 0}
        todayClasses={todayClasses?.length ?? 0}
      />

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <RecentStudents students={recentStudents ?? []} />

        <TodaySchedule classes={todayClasses ?? []} />
      </div>
    </div>
  );
}
