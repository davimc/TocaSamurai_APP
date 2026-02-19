export default interface Student {
  id: string;
  full_name: string;
  email: string;
  status: "active" | "inactive";
  created_at: string;
}
