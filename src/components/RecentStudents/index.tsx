"use client";

import { Avatar, Badge, Card, CardContent, Typography } from "@mui/material";

interface Student {
  id: string;
  full_name: string;
  email: string;
  status: string;
  created_at: string;
}

interface RecentStudentsProps {
  students: Student[];
}

export default function RecentStudents({ students }: RecentStudentsProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    });
  };

  return (
    <Card className="bg-card border-border">
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          className="text-foreground"
        >
          Alunos Recentes
        </Typography>
        <div className="space-y-4">
          {students.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Nenhum aluno cadastrado ainda.
            </p>
          ) : (
            students.map((student) => (
              <div
                key={student.id}
                className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-border">
                    {getInitials(student.full_name)}
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">
                      {student.full_name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {student.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    className={
                      student.status === "active"
                        ? "bg-green-600/20 text-green-500 hover:bg-green-600/30"
                        : "bg-muted text-muted-foreground"
                    }
                  >
                    {student.status === "active" ? "Ativo" : "Inativo"}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(student.created_at)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
