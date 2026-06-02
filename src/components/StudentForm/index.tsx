"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Box,
  MenuItem,
  Select,
  TextField,
  Container,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
  InputLabel,
} from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { NewStudent } from "@/models/students";
import Input from "../atomic/Input";
import { createStudent } from "@/services/students";
import { loadUnitInfos } from "@/services/units";
import { UnitWithProfessors } from "@/models/units";

export function StudentForm() {
  async function onAddFunction(student: NewStudent) {
    await createStudent(student);
  }
  const router = useRouter();
  const [open, setOpen] = useState(false);
  // TODO: pagination
  // const [step, setStep] = useState(1);
  // const nextStep = () => setStep(prev => prev + 1)
  // const backStep = () => setStep(prev => prev - 1)

  const [loading, setLoading] = useState(false);
  const dataAtual = new Date();
  const [unitsInfo, setUnitsInfo] = useState<UnitWithProfessors[] | null>(null);
  const [unitSelected, setUnitSelected] = useState<UnitWithProfessors | null>(
    null,
  );
  const [formData, setFormData] = useState({
    name: "",
    lasname: "",
    email: "",
    gender: 1,
    birthdate: dataAtual.getFullYear() - 5 + "-01-01",
    entryDate: dataAtual.toISOString().split("T")[0],
    documentNumber: "",
    personType: "Física",
    phone: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    postalCode: "",
    martialArt: "",
    belt: "",
    unidade: "",
    username: "",
    password: "",
    due_date: new Date().toISOString().split("T")[0],
    preferencePaymentType: "PIX",
    plan: "Mensal",
    professor: "",
    faixa: "",
    grau: 0
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

  const handleSelectMartialArt = async (martialArt: string) => {
    try {
      const loadedUnitInfos = await loadUnitInfos(martialArt);
      setUnitsInfo(loadedUnitInfos);
      setUnitSelected(null);
      setFormData((prev) => ({ ...prev, unidade: "", plan: "", professor: "" }));
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };


  return (
    <>
    {/* TODO: Move this button to Page*/}
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <Box className="space-y-2 flex justify-between">
                <Input label="Nome" width="2/5" value={formData.name} onChange={(e) => setFormData({...formData, name:e.target.value})}/>
                <Input label="Sobrenome" width=" 3/5" value={formData.lasname} />
                
              </Box>
              <Box className="space-y-2 flex justify-between">
                <Input label="Email" type="email" width=" 3/5" value={formData.lasname} />
                <Select className={`w-2/5`}label="Genero" value={formData.gender} 
                onChange={(e) => setFormData({...formData, gender: e.target.value})}
                >
                  <MenuItem value={1}>
                    Masculino
                  </MenuItem>
                  <MenuItem value={2}>
                    Feminino
                  </MenuItem>
                  <MenuItem value={3}>
                    Não Informado
                  </MenuItem>
                </Select>
              </Box>
              <Box className="space-y-2 flex justify-between">
              <Input
                  label="Nascimento"
                  width="2/5"
                  type="date"
                  value={formData.birthdate}
                />
              <Input
                    id="due_date"
                    type="date"
                    label="Vencimento"
                    value={formData.due_date}
                    onChange={(e) =>
                      setFormData({ ...formData, due_date: e.target.value })
                    }
                    
                    required
                  />
              </Box>
              <Box className="space-y-2 flex justify-between">
                <FormControl>
                  <FormLabel>Tipo de Pessoa</FormLabel>
                  <RadioGroup>
                    <FormControlLabel value={1} label={"Física"} control={<Radio/>}/>
                    <FormControlLabel value={2} label={"Jurídica"} control={<Radio/>}/>
                  </RadioGroup>
                </FormControl>
              <Input
                  label="Document"
                  width="3/5"
                  type="text"
                  value={formData.documentNumber}
                  onChange={(e) => setFormData({...formData, documentNumber: e.target.value})}
                />
              </Box>
              <Container>
                <Box className="space-y-2 flex justify-between">
                    <Input
                  label="CEP"
                  width="2/5"
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                />
                <Input
                    label="Rua"
                    width="3/5"
                    type="text"
                    value={formData.street}
                    onChange={(e) => setFormData({...formData, street: e.target.value})}
                />
                </Box>
                <Box className="space-y-2 flex justify-between">                  
                  <Input
                    label="Nº"
                    width="1/5"
                    type="text"
                    value={formData.number}
                    onChange={(e) => setFormData({...formData, number: e.target.value})}
                />
                  <Input
                    label="Complemento"
                    width="4/5"
                    type="text"
                    value={formData.complement}
                    onChange={(e) => setFormData({...formData, complement: e.target.value})}
                  />
                </Box>
                <Box className="space-y-2 flex justify-between">
                  <Input
                    label="Bairro"
                    type="text"
                    value={formData.neighborhood}
                    onChange={(e) => setFormData({...formData, neighborhood: e.target.value})}
                />
                </Box>
                <Box className="space-y-2 flex justify-between">
                <Input
                    label="Cidade"
                    
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                />
                  <Input
                    label="Estado"
                    
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({...formData, state: e.target.value})}
                  />
                </Box>
              </Container>
              <Container className="flex flex-col w-full gap-3">
              <Box className="flex-grow flex justify-between">
                
              <FormControl className="w-2/6">
              <InputLabel id="select-label">Arte Marcial</InputLabel>  
                <Select
                label="Arte Marcial"
                
                  value={formData.martialArt}
                  
                  onChange={(e) => {
                    setFormData({ ...formData, martialArt: e.target.value})
                    handleSelectMartialArt(e.target.value);
                  }
                  }
                  sx={{
                    width: "80%",
                    
                  }}
                >
                  <MenuItem value="MMA">MMA</MenuItem>
                  <MenuItem value="Jiu Jitsu">JJ</MenuItem>
                  <MenuItem value="Karaté">Karaté</MenuItem>
                  <MenuItem value="Taekwondo">Taekwondo</MenuItem>
                  <MenuItem value="Kickboxing">Kickboxing</MenuItem>
                  <MenuItem value="Boxe">Boxe</MenuItem>
                  <MenuItem value="Muay Thai">Muay Thai</MenuItem>
                  <MenuItem value="Judo">Judo</MenuItem>
                </Select>
                </FormControl>
                <FormControl className="w-4/6">
                <InputLabel id="select-label">Unidade</InputLabel>  
                  <Select
                    id="select-unit"
                    className="flex-grow w-full"
                    value={formData.unidade}
                    onChange={(e) => {
                      const selectedUnitId = e.target.value;
                      const selectedUnit =
                        unitsInfo?.find((unit) => unit.id === selectedUnitId) ??
                        null;

                      setFormData((prev) => ({
                        ...prev,
                        unidade: selectedUnitId,
                        plan: "",
                        professor: "",
                      }));
                      setUnitSelected(selectedUnit);
                    }}
                    sx={{
                      width: "100%",
                    }}
                  >
                    {unitsInfo?.map((unit) => (
                      <MenuItem key={unit.id} value={unit.id}>
                        {unit.name}
                      </MenuItem>
                    ))}
                  </Select>
                  </FormControl>
                  </Box >
                  
                  {unitSelected && (
                    <>
                    <Box className="flex-grow flex justify-between">
                      <FormControl fullWidth className="flex-grow w-3/5 m-0 p-0">
                      <InputLabel id="select-label">Plano</InputLabel>  
                      <Select
                        value={formData.plan}
                        className="w-1/2"
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, plan: e.target.value }))
                        }
                        sx={{
                          width: "100%",
                        }}
                      >
                        {unitSelected.plans.map((plan) => (
                          <MenuItem key={plan.id} value={plan.title}>
                            <p className="flex justify-between">
                              <span>{plan.title}</span> <span>{plan.price}</span>
                            </p>
                          </MenuItem>
                        ))}
                      </Select>
                        </FormControl>
                        <FormControl fullWidth className="flex-grow w-3/5 m-0 p-0">
                        <InputLabel id="select-label">Professor</InputLabel>  
                      <Select
                        value={formData.professor}
                        className="w-1/2"
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            professor: e.target.value,
                          }))
                        }
                        sx={{
                          width: "100%",
                        }}
                      >
                        {unitSelected.professors.map((professor) => (
                          <MenuItem key={professor.id} value={professor.name}>
                            <p>{professor.name}</p>
                          </MenuItem>
                        ))}
                      </Select>
                      </FormControl>
                    </Box>
                    <Box className="flex-grow flex justify-between">
                    <FormControl fullWidth className="flex-grow w-3/5 m-0 p-0">
                    <InputLabel id="select-label">Faixa</InputLabel>  
                    <Select
                      value={formData.faixa}
                      className="w-3/4"
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, faixa: e.target.value }))
                      }
                      sx={{
                        width: "100%",
                      }}
                    >
                      {unitSelected.belts.reverse().map((belt) => (
                        <MenuItem key={belt.id} value={belt.name}>
                          <p className={`bg-[${belt.color}]`}>
                            <span >{belt.name}</span>
                          </p>
                        </MenuItem>
                      ))}
                    </Select>
                      </FormControl>
                      <Input type="number"  label="Grau atual" ></Input>
                  </Box>
                  </>
                  )}
                </Container>
               
                

              <div className="grid grid-cols-2 gap-4">
                {/* <div className="space-y-2">
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
                </div> */}
                <Box className="space-y-2">
                  
                </Box>
              </div>

              {/* <div className="space-y-2">
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
              </div> */}

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
          
        </DialogContent>
      </Dialog>
    </>
  );
}
