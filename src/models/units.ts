import BeltGraduation from "./beltGraduation";
import { PlanLong } from "./plans";
import { StudentShort } from "./students";

export interface UnitWithProfessors {
  id: string;
  name: string;
  plans: PlanLong[];
  belts: BeltGraduation[];
  professors: StudentShort[];
}
