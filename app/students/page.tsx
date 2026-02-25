// import { StudentForm } from "@/components/student-form";
// import { StudentsTable } from "@/components/students-table";
import { StudentsTable } from "@/components/StudentTable";
import Student from "@/entities/students";
import Search from "@mui/icons-material/SearchOutlined";
import { Input } from "@mui/material";
import { StudentForm } from "@/components/StudentForm";
import { Suspense } from "react";

export default function StudentsPage() {
  const students: Student[] = [
    {
      id: "1",
      full_name: "João Silva",
      email: "joao.silva@example.com",
      status: "active",
      created_at: "2024-01-15T10:00:00Z",
      phone: "11987654321",
      student_modalities: [
        {
          modalities: { name: "Jiu-Jitsu" },
          belt_ranks: { name: "Faixa Azul", color: "#0000FF" },
        },
        {
          modalities: { name: "Muay Thai" },
          belt_ranks: null,
        },
      ],
    },
    {
      id: "2",
      full_name: "Maria Oliveira",
      email: "maria.oliveira@example.com",
      status: "inactive",
      created_at: "2024-02-20T14:30:00Z",
      phone: "1234567890",
      student_modalities: [
        {
          modalities: { name: "Taekwondo" },
          belt_ranks: { name: "Faixa Vermelha", color: "#FF0000" },
        },
      ],
    },
  ];

  const modalities = [
    { id: "1", name: "Jiu-Jitsu" },
    { id: "2", name: "Muay Thai" },
    { id: "3", name: "Taekwondo" },
  ];
  const beltRanks = [
    { id: "1", name: "Branca", color: "#FFFFFF" },
    { id: "2", name: "Azul", color: "#0000FF" },
    { id: "3", name: "Roxa", color: "#800080" },
    { id: "4", name: "Marrom", color: "#A52A2A" },
    { id: "5", name: "Preta", color: "#000000" },
  ];
  // const supabase = await createClient();

  // const [{ data: students }, { data: modalities }, { data: beltRanks }] =
  //   await Promise.all([
  //     supabase
  //       .from("students")
  //       .select(
  //         `
  //       *,
  //       student_modalities (
  //         modalities (name),
  //         belt_ranks (name, color)
  //       )
  //     `,
  //       )
  //       .order("full_name"),
  //     supabase.from("modalities").select("*").order("name"),
  //     supabase.from("belt_ranks").select("*"),
  //   ]);

  return (
    <div className="flex min-h-screen bg-background">
      <main className="flex-1 pl-64">
        {/* <Suspense fallback={<Loading />}> */}
        <div className="p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Alunos</h1>
              <p className="text-muted-foreground">
                Gerencie os alunos da academia
              </p>
            </div>
            <StudentForm
              students={students ?? []}
              modalities={modalities ?? []}
              beltRanks={beltRanks ?? []}
            />
          </div>

          <div className="mb-6">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar alunos..."
                className="bg-input border-border text-foreground pl-9"
              />
            </div>
          </div>

          <StudentsTable students={students} />
        </div>
        {/* </Suspense> */}
      </main>
    </div>
  );
}
