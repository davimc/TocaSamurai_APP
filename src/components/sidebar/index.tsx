"use client";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenterOutlined";
import DashboardIcon from "@mui/icons-material/DashboardOutlined";
import PersonIcon from "@mui/icons-material/PersonOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonthOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCardOutlined";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "lib/utils/cn";

export default function Sidebar() {
  const navigation = [
    { name: "Painel", href: "/", icon: DashboardIcon },
    { name: "Alunos", href: "/students", icon: PersonIcon },
    { name: "Pagamentos", href: "/payments", icon: CreditCardIcon },
    { name: "Horários", href: "/schedules", icon: CalendarMonthIcon },
  ];
  //   const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-border bg-sidebar px-0 py-4 flex-col bg-background text-foreground">
      <div className="flex h-16 items-center gap-3 border-b border-border px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
          <FitnessCenterIcon className="h-5 w-5 text-primary-foreground" />
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold text-foreground">
            Toca do Samurai
          </span>
          <span className="text-xs text-muted-foreground">
            Sistema de Gestão
          </span>
        </div>
      </div>

      <nav className="flex flex-col flex-1 space-y-1 p-4 gap-3">
        {navigation.map((item) => {
          const isActive = usePathname() === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground border border-primary height-12"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-4">
        <div className="rounded-lg bg-muted/50 p-3">
          <p className="text-xs text-muted-foreground">
            Modalidades oferecidas:
          </p>
          <div className="mt-2 flex flex-wrap gap-1">
            <span className="rounded bg-primary/20 px-2 py-0.5 text-xs text-primary">
              Jiu-Jitsu
            </span>
            <span className="rounded bg-primary/20 px-2 py-0.5 text-xs text-primary">
              Muay Thai
            </span>
            <span className="rounded bg-primary/20 px-2 py-0.5 text-xs text-primary">
              Taekwondo
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
