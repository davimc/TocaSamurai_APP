"use client";

import Student from "@/models/students";
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
  ButtonGroup,
  Tooltip,
  Stack,
} from "@mui/material";
import Trash from "@mui/icons-material/DeleteOutlineOutlined";
import Pencil from "@mui/icons-material/CreateOutlined";
import View from "@mui/icons-material/RemoveRedEyeOutlined";

import { useState } from "react";
import StructuredTableCell from "../celular/StructuredSubscriptionTableCell";
import { StatusType } from "@/models/subscriptions";

interface StudentsTableProps {
  studentsList: Student[];
}

export function StudentsTable({ studentsList }: StudentsTableProps) {
  const [students, setStudents] = useState(studentsList);
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
        <Table className="w-full">
          <TableHead className=" bg-muted p-4">
            <TableRow className="text-right">
              <TableCell
                className="text-muted-foreground"
                sx={{ textAlign: "center" }}
              >
                Aluno
              </TableCell>
              <TableCell
                className="text-muted-foreground"
                sx={{ textAlign: "center" }}
              >
                Contato
              </TableCell>
              <TableCell
                className="text-muted-foreground align-middle"
                sx={{ textAlign: "center" }}
              >
                Modalidade
              </TableCell>
              <TableCell
                className="text-muted-foreground"
                sx={{ textAlign: "center" }}
              >
                Graduação
              </TableCell>
              <TableCell
                className="text-muted-foreground"
                sx={{ textAlign: "center" }}
              >
                Status
              </TableCell>
              <TableCell
                className="text-muted-foreground"
                sx={{ textAlign: "center" }}
              >
                Cadastro
              </TableCell>
              <TableCell
                className="text-muted-foreground w-[50px]"
                sx={{ textAlign: "center" }}
              >
                Ações
              </TableCell>
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
                        {getInitials(student.name)}
                      </Avatar>
                      <span className="font-medium text-foreground">
                        {student.name}
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
                    {student.subscriptions.length > 0 ? (
                      <StructuredTableCell
                        subscriptions={student.subscriptions}
                      />
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Stack
                      color={
                        student.subscriptions.some(
                          (s) => s.status === StatusType.ATIVO,
                        )
                          ? "default"
                          : "secondary"
                      }
                      className={
                        student.subscriptions.some(
                          (s) => s.status === StatusType.ATIVO,
                        )
                          ? "bg-green-600/20 text-green-500"
                          : "bg-muted text-muted-foreground"
                      }
                    >
                      {student.subscriptions.some(
                        (s) => s.status === StatusType.ATIVO,
                      )
                        ? "Ativo"
                        : "Inativo"}
                    </Stack>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {student.entryDate
                      .toString()
                      .split("T")[0]
                      .split("-")
                      .reverse()
                      .join("/")}
                  </TableCell>
                  <TableCell>
                    <ButtonGroup className="ml-auto">
                      <Tooltip title="Ver detalhes do aluno" placement="top">
                        <Button className="border-border text-foreground hover:bg-muted">
                          <View className="mr-2 h-4 w-4" />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Editar aluno" placement="top">
                        <Button className="border-border text-foreground hover:bg-muted">
                          <Pencil />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Excluir aluno" placement="top">
                        <Button>
                          <Trash className="mr-2 h-4 w-4" />
                        </Button>
                      </Tooltip>
                    </ButtonGroup>
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
