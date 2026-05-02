"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
} from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { NewStudent } from "@/models/students";
import Input from "../atomic/Input";
import { createStudent } from "@/services/students";

export function StudentForm() {
  async function onAddFunction(student: NewStudent) {
    await createStudent(student);
  }
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dataAtual = new Date();
  const [formData, setFormData] = useState({
    name: "",
    birthdate: dataAtual.getFullYear() - 5 + "-01-01",
    entryDate: dataAtual.toISOString().split("T")[0],
    documentNumber: "",
    personType: "Física",
    phone: "",
    street: "",
    number: "",
    complement: "",
    district: "",
    city: "",
    state: "",
    zipCode: "",
    unidade: "",
    username: "",
    password: "",
    amount: "150.0",
    due_date: new Date().toISOString().split("T")[0],
    description: "",
  });

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    setLoading(true);

    setLoading(false);
    setOpen(false);
    // setFormData({
    //   name: "",
    //   birthdate: new Date().toISOString().split("T")[0],
    //   amount: "150.0",
    //   due_date: new Date().toLocaleDateString("pt-BR"),
    //   description: "",
    // });
    router.refresh();
  };

  return (
    <>
      <Button
        className="bg-secondary text-primary-foreground border-border hover:bg-primary/90"
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
                <Input label="Nome" width="3/5" value={formData.name} />
                <Input
                  label="Nascimento"
                  width="2/5"
                  type="date"
                  value={formData.birthdate}
                />
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
                        shrink: true,
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
