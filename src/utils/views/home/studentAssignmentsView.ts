import { KnownBlock, View } from "@slack/bolt";
import { AssignmentRecord } from "../../../types/Assignment";
import studentAssignment from "../../blocks/studentAssignment/studentAssignment";
import headerTemplate from "../../blocks/templates/headerTemplate";
import { assignmentData } from "../../loadAirtableData";

export default function studentsAssignmentViews(): View {
  return {
    type: "home",
    blocks: [headerTemplate("Assingments"), ...generateAssignments()],
  };
}

function generateAssignments() {
  console.log(assignmentData);
  let blocks: KnownBlock[] = [];
  assignmentData.forEach((record: AssignmentRecord) => {
    blocks = blocks.concat(studentAssignment(record.fields));
  });
  return blocks;
}
