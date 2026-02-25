import { apiFetch } from "@/lib/api";
import Student from "@/models/students";

export async function getStudents(): Promise<Student[]> {
  return apiFetch<Student[]>("/pratictioners");
}
