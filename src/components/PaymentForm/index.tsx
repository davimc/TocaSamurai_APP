"use client";

import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
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
import Student from "@/models/students";
// import { useRouter } from "next/router";
import React, { useState } from "react";

import { PaymentWithStudent } from "@/models/payments";

interface PaymentFormProps {
  infos: Student[];
  onAddPayment: (payment: PaymentWithStudent) => void;
}

export default function PaymentForm({ infos, onAddPayment }: PaymentFormProps) {
  //   const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    student_id: "",
    student_name: "",
    amount: "",
    due_date: "",
    description: "",
  });
  const initialFormData = {
    student_id: "",
    student_name: "",
    amount: "",
    due_date: "",
    description: "",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    const selectedStudent = infos.find((s) => s.id === formData.student_id);

    if (!selectedStudent) {
      alert("Aluno não encontrado");
      setLoading(false);
      return;
    }

    const newPayment: PaymentWithStudent = {
      id: crypto.randomUUID(),
      student_id: formData.student_id,
      amount: parseFloat(formData.amount),
      due_date: formData.due_date,
      status: "pending",
      created_at: new Date().toISOString(),
      paid_at: undefined,
      student: selectedStudent,
    };

    onAddPayment(newPayment);

    setLoading(false);
    setOpen(false);
    setFormData(initialFormData);
  };

  return (
    <>
      <Button
        className="bg-primary text-primary-foreground hover:bg-primary/90 mb-4"
        onClick={() => setOpen(true)}
      >
        <AddCircleOutlineOutlinedIcon className="mr-2 h-4 w-4" />
        Novo Pagamento
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent className="bg-card border-border sm:max-w-[500px]">
          <DialogTitle className="text-foreground">
            Registrar Pagamento
          </DialogTitle>
          <FormControl fullWidth>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <InputLabel id="student-label" className="text-foreground">
                  Age
                </InputLabel>

                <Select
                  labelId="student-label"
                  value={formData.student_id}
                  label="Selecionar Aluno"
                  sx={{
                    minWidth: "50%",
                    backgroundColor: "var(--input)",
                  }}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      student_id: e.target.value,
                    })
                  }
                >
                  {infos.map((student) => (
                    <MenuItem key={student.id} value={student.id}>
                      {student.name}
                    </MenuItem>
                  ))}
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <TextField
                    id="amount"
                    label="Valor (R$)"
                    variant="outlined"
                    type="number"
                    minRows="0"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                    className="bg-input border-border text-foreground"
                    required
                  />
                </div>
                <div className="space-y-2">
                  {/* todo: Verificar este campo */}
                  <TextField
                    id="due_date"
                    label="Vencimento"
                    variant="outlined"
                    type="date"
                    value={formData.due_date}
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
                  onClick={() => {
                    setFormData(initialFormData);
                    setOpen(false);
                  }}
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
