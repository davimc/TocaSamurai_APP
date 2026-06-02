import { StudentsTable } from "@/components/StudentTable";
import { StudentForm } from "@/components/StudentForm";
import { getStudents } from "@/services/students";
import Loading from "@/components/Loading";
import Student from "@/models/students";
import { Suspense } from "react";

import Input from "@/components/atomic/Input";
import { cookies } from "next/headers";
import Box from "node_modules/@mui/material/esm/Box/Box";
import { Search } from "@mui/icons-material";
import { Button } from "@mui/material";

export default async function StudentsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const students: Student[] = await getStudents(token);

  return (
    <Box className="flex min-h-screen bg-background w-full items-start justify-center p-4">
      <Suspense fallback={<Loading />}>
        <Box
          sx={{
            mb: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "column",
          }}
        >
          <Box className="w-full max-w-2xl text-center">
            <h1 className="text-3xl font-bold text-foreground">Alunos</h1>
            <p className="text-muted-foreground">
              Gerencie os alunos da academia
            </p>
          </Box>

          <Box className="my-6 flex w-[100%] justify-between gap-4">
            <div className="relative max-w-sm">
              <Input placeholder="Buscar alunos..." />
              <Button className="h-full">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              </Button>
            </div>
            <StudentForm />
          </Box>

          <StudentsTable studentsList={students} />
        </Box>
      </Suspense>
    </Box>
  );
}
