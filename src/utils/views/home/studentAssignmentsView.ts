import { KnownBlock, View } from "@slack/bolt";
import { AssignmentRecord } from "../../../types/Assignment";
import studentAssignment from "../../blocks/todoAssignment/todoAssignment";
import headerTemplate from "../../blocks/templates/headerTemplate";
import getAssignmentsByUser from "../../airtable/getAssignmentsByUser";
import completedAssignment from "../../blocks/completedAssignment/completedAssignment";
import { SubmissionModel } from "../../../schemas/Submission";

export default async function studentsAssignmentViews(
  studentId: string
): Promise<View> {
  const filteredAssignments = await getAssignmentsByUser(studentId);
  return {
    type: "home",
    blocks: [
      headerTemplate("To-Do Assignments :books:"),
      ...(await generateTodoAssignments(studentId, filteredAssignments.todo)),
      headerTemplate("Completed Assignments :white_check_mark:"),
      ...(await generateCompletedAssignments(
        studentId,
        filteredAssignments.completed
      )),
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

async function generateCompletedAssignments(
  studentId: string,
  filteredAssignments: AssignmentRecord[]
) {
  let blocks: KnownBlock[] = [];
  for (const record of filteredAssignments) {
    const submissionLinks = await SubmissionModel.find({
      assignmentId: record.id,
      user: studentId,
    });
    blocks = blocks.concat(
      completedAssignment(record.fields, record.id, submissionLinks)
    );
  }
  return blocks;
}
