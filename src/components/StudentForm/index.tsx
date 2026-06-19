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
import Student, { NewStudent, FormDataStudent } from "@/models/students";
import Input from "../atomic/Input";
import { createStudent } from "@/services/students";
import { loadUnitInfos } from "@/services/units";
import { UnitWithProfessors } from "@/models/units";

//TODO: refactor this component, it's too big and has too much responsibility, maybe split it into multiple steps and components, also add validation and error handling
// And maybe move the form state to a custom hook, to make it more reusable and easier to test
export function StudentForm(student?: Student) {
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
  const dueDate = new Date();
  dueDate.setMonth(dataAtual.getMonth() + 1);
  const [unitsInfo, setUnitsInfo] = useState<UnitWithProfessors[] | null>(null);
  const [unitSelected, setUnitSelected] = useState<UnitWithProfessors | null>(
    null,
  );
  const [formData, setFormData] = useState<FormDataStudent>({
    name: "",
    lastname: "",
    email: "",
    gender: 1,
    birthdate: dataAtual.getFullYear() - 5 + "-01-01",
    entryDate: dataAtual.toISOString().split("T")[0],
    documentNumber: "",
    personType: 1,
    //todo
    phone: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    postalCode: "",
    martialArt: "",
    unidade: "",
    //todo -> virou email
    username: "",
    //todo -> padrão 12345678 e quando eu lançar a parte do aluno eu coloco para que esse mude após receber (senha que expira em 7 dias)
    password: "",
    due_date: 1,
    roleId: 3,
    //todo  -> Acho que por agora eu não preciso adicionar isso.
    preferencePaymentType: "PIX",
    plan: "",
    professor: "",
    belt: "",
    grau: 0,
  });

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);    
    const studentData: NewStudent = {
      name: formData.name,
      lastname: formData.lastname,
      email: formData.email,
      phone: formData.phone,
      gender: formData.gender,
      birthdate: formData.birthdate.toString().split("T")[0],
      entryDate: formData.entryDate.toString().split("T")[0],
      documentNumber: formData.documentNumber,
      personType:+formData.personType,
      street: formData.street,
      number: parseInt(formData.number),
      complement: formData.complement,
      neighborhood: formData.neighborhood,
      city: formData.city,
      state: formData.state,
      postalCode: formData.postalCode,
      beltId: formData.belt,
      beltLevel: formData.grau,
      martialArtId: martialArts.find(art => art.name === formData.martialArt)?.id || '',
      roleId: formData.roleId,
      unitId: formData.unidade,
      username: formData.email,
      password: '12345678',
      subscription: {
        dueDate: formData.due_date,
        paymentPreference: formData.preferencePaymentType,
        professorId: formData.professor,
        planId: formData.plan
      }
    };
    await onAddFunction(studentData);
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
  const martialArts = [
    { id: '0', name: 'MMA' },
    { id: 'aa1fe13a-b231-4997-a8e6-18319cbbe464', name: 'Jiu Jitsu' },
    { id: '1', name: 'Karaté' },
    { id: '2', name: 'Taekwondo' },
    { id: '3', name: 'Kickboxing' },
    { id: '4', name: 'Boxe' },
    { id: '5', name: 'Muay Thai' },
    { id: '6', name: 'Judo' },
  ];

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
                <Input label="Nome" width="2/5" value={formData.name} onChange={(e) => setFormData({...formData, name:e.target.value})} required/>
                <Input label="Sobrenome" width=" 3/5" value={formData.lastname} onChange={(e) => setFormData({...formData, lastname:e.target.value})} required/>
                
              </Box>
              <Box className="space-y-2 flex justify-between">
                <Input label="Email" type="email" width=" 3/5" value={formData.email} onChange={(e) => setFormData({...formData, email:e.target.value})} required />
                <Select className={`w-2/5`}label="Genero" value={formData.gender} required
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
                  onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
                  required
                />
                <FormControl className="w-2/6">
              <InputLabel id="select-label">Data Vencimento</InputLabel>  
              
                <Select 
                label="Dia de Vencimento"
                
                  value={formData.due_date}
                  
                  onChange={(e) => 
                    setFormData((prev) => ({ ...prev, due_date: +e.target.value }))
                  
                  }
                  sx={{
                    width: "80%",
                    
                  }}
                  required
                >
                  {Array.from({length: 31}, (_, i) => i + 1).map((day) => (
                    <MenuItem key={day} value={day}>
                      {day}
                    </MenuItem>
                  ))}
                </Select>
                </FormControl>
              </Box>
              <Box className="space-y-2 flex justify-between items-center">
                <FormControl>
                  <FormLabel>Tipo de Pessoa</FormLabel>
                  <RadioGroup row value={formData.personType} onChange={(e) => {
                    setFormData({...formData, personType: +e.target.value})
                  }
                    }>
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
                  required
                />
                
              </Box>
              
                <Box className="space-y-2 flex justify-between">
                    <Input
                  label="CEP"
                  width="2/5"
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                  required
                />
                <Input
                    label="Rua"
                    width="3/5"
                    type="text"
                    value={formData.street}
                    onChange={(e) => setFormData({...formData, street: e.target.value})}
                    required
                />
                </Box>
                <Box className="space-y-2 flex justify-between">                  
                  <Input
                    label="Nº"
                    width="1/5"
                    type="text"
                    value={formData.number}
                    onChange={(e) => setFormData({...formData, number: e.target.value})}
                    required
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
                    width="1/2"
                    value={formData.neighborhood}
                    onChange={(e) => setFormData({...formData, neighborhood: e.target.value})}
                    required
                />
                <Input
                    label="Telefone"
                    type="text"
                    width="1/2"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}

                />
                </Box>
                <Box className="space-y-2 flex justify-between">
                <Input
                    label="Cidade"
                    
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    required
                />
                  <Input
                    label="Estado"
                    
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({...formData, state: e.target.value})}
                    required
                  />
                </Box>
              
              <Box className="flex-grow flex justify-between">
                
              <FormControl className="w-2/6">
              <InputLabel id="select-label">Arte Marcial</InputLabel>  
              
                <Select
                label="Arte Marcial"
                
                  value={formData.martialArt}
                  
                  onChange={(e) => {
                    const selectedMartialArt = e.target.value;
                    const selectedMartialArtObj = martialArts.find(art => art.name === selectedMartialArt) ?? {id: '', name: ''};
                    setFormData((prev) => ({ ...prev, martialArt: selectedMartialArtObj.name }));
                    handleSelectMartialArt(selectedMartialArtObj.id);
                  }
                  }
                  sx={{
                    width: "80%",
                  }}
                    required

                >
                  {martialArts.map((art) => (
                    <MenuItem key={art.id} value={art.name}>
                      {art.name}
                    </MenuItem>
                  ))
                  }
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
                    required
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
                        required
                      >
                        {unitSelected.plans.map((plan) => (
                          <MenuItem key={plan.id} value={plan.id}>
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
                        required
                      >
                        {unitSelected.professors.map((professor) => (
                          <MenuItem key={professor.id} value={professor.id}>
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
                      value={formData.belt}
                      className="w-3/4"
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, belt: e.target.value }))
                      }
                      sx={{
                        width: "100%",
                      }}
                      required
                    >
                      {unitSelected.belts.reverse().map((belt) => (
                        <MenuItem key={belt.id} value={belt.id}>
                          <p className={`bg-[${belt.color}]`}>
                            <span >{belt.name}</span>
                          </p>
                        </MenuItem>
                      ))}
                    </Select>
                      </FormControl>
                      <Input type="number"  label="Grau atual" value={formData.grau} onChange={(e) => setFormData({...formData, grau: +e.target.value})} required></Input>
                  </Box>
                  </>
                  )}
               
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
