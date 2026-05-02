import { apiFetch } from "@/lib/api";
import Student, { NewStudent } from "@/models/students";

export async function getStudents(token?: string): Promise<Student[]> {
  return apiFetch<Student[]>("/pratictioners", {}, token);
}

export async function createStudent(student: NewStudent): Promise<Student> {
  return apiFetch<Student>("/pratictioners", {
    method: "POST",
    body: JSON.stringify(student),
  });
}
