import DashboardStats from "@/components/dashboard";
import Sidebar from "@/components/sidebar";

export default function Home() {
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
  const todayClasses = [
    { time: "18:00", class: "Jiu Jitsu Kids" },
    { time: "19:00", class: "Muay Thai Teens" },
    { time: "20:00", class: "Jiu Jitsu Adults" },
  ]; // Example data

  return (
    <div className="flex min-h-screen min-w-screen items-end justify-start flex-row bg-zinc-50 font-sans dark:bg-black">
      <Sidebar />

      {/* TODO: ajustar width main com sidebar */}
      <main className="flex bg-background p-0 min-h-screen flex-1 ml-64">
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
            {/* <RecentStudents students={recentStudents ?? []} />
            <TodaySchedule classes={todayClasses ?? []} /> */}
          </div>
        </div>
      </main>
    </div>
  );
}
