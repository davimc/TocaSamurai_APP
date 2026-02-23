export default interface Student {
  id: string;
  full_name: string;
  email: string;
  status: "active" | "inactive";
  created_at: string;
  phone?: string;
  student_modalities: {
    modalities: {
      name: string;
    };
    belt_ranks: {
      name: string;
      color: string;
    } | null;
  }[];
}
