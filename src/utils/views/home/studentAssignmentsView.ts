import { KnownBlock, View } from "@slack/bolt";
import { AssignmentRecord } from "../../../types/Assignment";
import studentAssignment from "../../blocks/studentAssignment/studentAssignment";
import headerTemplate from "../../blocks/templates/headerTemplate";
import getAssignmentsByUser from "../../airtable/getAssignmentsByUser";

export default async function studentsAssignmentViews(
  studentId: string
): Promise<View> {
  const filteredAssignments = await getAssignmentsByUser(studentId);
  return {
    type: "home",
    blocks: [
      headerTemplate("Assignments"),
      ...(await generateTodoAssignments(studentId, filteredAssignments.todo)),
      headerTemplate("Completed Assignments"),
    ],
  };
}

async function generateTodoAssignments(
  studentId: string,
  filteredAssignments: AssignmentRecord[]
) {
  let blocks: KnownBlock[] = [];
  filteredAssignments.forEach((record: AssignmentRecord) => {
    blocks = blocks.concat(studentAssignment(record.fields, record.id));
  });
  return blocks;
}

// eslint-disable-next-line no-unused-vars
async function generateCompletedAssignments(
  studentId: string,
  filteredAssignments: AssignmentRecord[]
) {
  let blocks: KnownBlock[] = [];
  filteredAssignments.forEach((record: AssignmentRecord) => {
    blocks = blocks.concat(studentAssignment(record.fields, record.id));
  });
  return blocks;
}
