import AuthGate from "@/components/AuthGate";
import Sidebar from "@/components/sidebar";
import DashboardPage from "@/components/dashboard/page";
import { Box } from "@mui/material";

export default function page() {
  return (
    <AuthGate>
      <DashboardPage />
    </AuthGate>
  );
}
