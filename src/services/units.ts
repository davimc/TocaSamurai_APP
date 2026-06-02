import { apiFetch } from "@/lib/api";
import Student, { NewStudent } from "@/models/students";
import { UnitWithProfessors } from "@/models/units";

export async function getStudents(token?: string): Promise<Student[]> {
  return apiFetch<Student[]>("/pratictioners", {}, token);
}

export async function loadUnitInfos(martialArt: string): Promise<UnitWithProfessors[]> {
  return apiFetch<UnitWithProfessors>(`/units/martial-arts?type=${martialArt}`, {
    method: "GET",
  });
}