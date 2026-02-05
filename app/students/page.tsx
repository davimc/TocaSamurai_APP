// import { StudentForm } from "@/components/student-form";
// import { StudentsTable } from "@/components/students-table";
import Search from "@mui/icons-material/SearchOutlined";
import { Input } from "@mui/material";
import { Suspense } from "react";

export default function StudentsPage() {
  const students = [
    {
      id: "1",
      full_name: "João Silva",
      email: "joao.silva@example.com",
    },
    {
      id: "2",
      full_name: "Maria Oliveira",
      email: "maria.oliveira@example.com",
    },
  ];

  const modalities = [
    { id: "1", name: "Jiu-Jitsu" },
    { id: "2", name: "Muay Thai" },
    { id: "3", name: "Taekwondo" },
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
            {/* <StudentForm
                modalities={modalities ?? []}
                beltRanks={beltRanks ?? []}
              /> */}
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

          {/* <StudentsTable students={students ?? []} /> */}
        </div>
        {/* </Suspense> */}
      </main>
    </div>
  );
}
