"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

interface Student {
  id: string;
  full_name: string;
}

interface PaymentFormProps {
  students: Student[];
  beltRanks: { name: string; color: string }[];
  modalities: { name: string }[];
}

export function StudentForm({ students }: PaymentFormProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    student_id: "",
    amount: "150.0",
    due_date: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setLoading(false);
    setOpen(false);
    setFormData({
      student_id: "",
      amount: "",
      due_date: "",
      description: "",
    });
    router.refresh();
  };

  return (
    <>
      <Button
        className="bg-primary text-primary-foreground hover:bg-primary/90"
        onClick={() => setOpen(true)}
      >
        <AddCircleOutlineOutlinedIcon className="mr-2 h-4 w-4" />
        Novo Aluno
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent className="bg-card border-border sm:max-w-[500px]">
          <DialogTitle className="text-foreground">Registrar Aluno</DialogTitle>
          <FormControl fullWidth>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <InputLabel className="text-foreground" id="student-label">
                  Aluno
                </InputLabel>
                <Select
                  labelId="student-label"
                  value={formData.student_id}
                  label="aluno"
                  sx={{ width: "48%" }}
                  onChange={(e) =>
                    setFormData({ ...formData, student_id: e.target.value })
                  }
                >
                  {students.map((student) => (
                    <MenuItem key={student.id} value={student.id}>
                      {student.full_name}
                    </MenuItem>
                  ))}
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <TextField
                    id="amount"
                    label="Valor (R$)"
                    type="number"
                    inputProps={{ min: "0" }}
                    variant="outlined"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                    className="bg-input border-border text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <TextField
                    id="due_date"
                    type="date"
                    label="Vencimento"
                    variant="outlined"
                    value={formData.due_date}
                    slotProps={{
                      inputLabel: {
                        shrink: true, // Mantém o rótulo em cima
                      },
                    }}
                    onChange={(e) =>
                      setFormData({ ...formData, due_date: e.target.value })
                    }
                    className="bg-input border-border text-foreground"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <TextField
                  id="description"
                  label="Descrição"
                  variant="outlined"
                  value={formData.description}
                  sx={{ width: "90%" }}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Mensalidade, Taxa de matricula, etc."
                  className="bg-input border-border text-foreground"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => setOpen(false)}
                  className="border-border text-foreground hover:bg-muted"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {loading ? "Salvando..." : "Salvar"}
                </Button>
              </div>
            </form>
          </FormControl>
        </DialogContent>
      </Dialog>
    </>
  );
}
