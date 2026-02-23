"use client";

import Student from "@/entities/students";
import {
  Dialog,
  Avatar,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

import { useState } from "react";

interface StudentModality {
  modalities: {
    name: string;
  };
  belt_ranks: {
    name: string;
    color: string;
  } | null;
}

interface StudentsTableProps {
  students: Student[];
}

export function StudentsTable({ students }: StudentsTableProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR");
  };

  return (
    <>
      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHead>
            <TableRow className="border-border hover:bg-transparent">
              <TableCell className="text-muted-foreground">Aluno</TableCell>
              <TableCell className="text-muted-foreground">Contato</TableCell>
              <TableCell className="text-muted-foreground">
                Modalidade
              </TableCell>
              <TableCell className="text-muted-foreground">Graduação</TableCell>
              <TableCell className="text-muted-foreground">Status</TableCell>
              <TableCell className="text-muted-foreground">Cadastro</TableCell>
              <TableCell className="text-muted-foreground w-[50px]"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center text-muted-foreground py-8"
                >
                  Nenhum aluno cadastrado ainda.
                </TableCell>
              </TableRow>
            ) : (
              students.map((student) => (
                <TableRow key={student.id} className="border-border">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border border-border">
                        {getInitials(student.full_name)}
                      </Avatar>
                      <span className="font-medium text-foreground">
                        {student.full_name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p className="text-foreground">{student.email}</p>
                      {student.phone && (
                        <p className="text-muted-foreground">{student.phone}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {student.student_modalities.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {student.student_modalities.map((sm, idx) => (
                          <Badge
                            key={idx}
                            color="secondary"
                            className="bg-primary/20 text-primary"
                          >
                            {sm.modalities.name}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {student.student_modalities.length > 0 &&
                    student.student_modalities[0].belt_ranks ? (
                      //TODO: criar belt componente para mostrar a graduação com a cor correta
                      <Badge
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          width: "80%",
                          backgroundColor:
                            student.student_modalities[0].belt_ranks.color,
                          color: "#fff",
                        }}
                      >
                        {student.student_modalities[0].belt_ranks.name}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      color={
                        student.status === "active" ? "default" : "secondary"
                      }
                      className={
                        student.status === "active"
                          ? "bg-green-600/20 text-green-500"
                          : "bg-muted text-muted-foreground"
                      }
                    >
                      {student.status === "active" ? "Ativo" : "Inativo"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(student.created_at)}
                  </TableCell>
                  <TableCell>
                    {/* <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-popover border-border"
                      >
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/alunos/${student.id}`}
                            className="flex items-center cursor-pointer"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Ver Detalhes
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive cursor-pointer"
                          onClick={() => setDeleteId(student.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu> */}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
        <DialogTitle className="text-foreground">
          Confirmar exclusão
        </DialogTitle>
        <DialogContentText className="text-muted-foreground">
          Tem certeza que deseja excluir este aluno? Esta ação não pode ser
          desfeita e todos os dados relacionados serão removidos.
        </DialogContentText>

        <DialogActions className="justify-end">
          <Button className="border-border text-foreground hover:bg-muted">
            Cancelar
          </Button>
          <Button
            // onClick={handleDelete}
            disabled={loading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {loading ? "Excluindo..." : "Excluir"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
