import { Submission, SubmissionModel } from "../../schemas/Submission";
import { UserModel } from "../../schemas/User";
import { AssignmentRecord } from "../../types/Assignment";
import {
  assignments,
  chapterData,
  customAssignments,
} from "./loadAirtableData";

type UserAssignments = {
  completed: AssignmentRecord[];
  todo: AssignmentRecord[];
};

export default async function getAssignmentsByUser(
  userId: string
): Promise<UserAssignments> {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new Error("User not found when looking up assignments.");
  }

  const filteredAssignments = assignments.filter(
    filterByChapter(user.chapterId)
  );
  filteredAssignments.concat(
    customAssignments.filter(filterByChapter(user.chapterId, true))
  );
  filteredAssignments.sort(sortByAssignmentOrder);

  const todo: AssignmentRecord[] = [];
  const completed: AssignmentRecord[] = [];

  for (const assignment of filteredAssignments) {
    const [submissionLink] = await assignmentCompleted(assignment.id, userId);
    if (submissionLink) {
      assignment.submissionLink = submissionLink;
      completed.push(assignment);
    } else {
      todo.push(assignment);
    }
  }

  return {
    todo,
    completed,
  };
}

function filterByChapter(chapterId: string, customAssignments = false) {
  const chapterRecord = chapterData.find((record) => record.id === chapterId);
  return (assignment: AssignmentRecord) => {
    if (customAssignments) {
      if (chapterRecord?.fields["Custom Assignments"]?.includes(assignment.id))
        return true;
      else return false;
    } else {
      if (chapterRecord?.fields["Omitted Assignments"]?.includes(assignment.id))
        return false;
      else return true;
    }
  };
}

async function assignmentCompleted(
  assignmentId: string,
  userId: string
): Promise<[submissionLink: string | null]> {
  const submissions = await SubmissionModel.find({
    assignmentId: assignmentId,
    user: userId,
  });
  if (submissions.length === 0) return [null];
  const mostRecentSubmission = submissions.sort(sortBySubmissionDate)[0];
  return [mostRecentSubmission.link];
}

function sortByAssignmentOrder(
  assignment1: AssignmentRecord,
  assignment2: AssignmentRecord
) {
  return assignment1.fields.Order > assignment2.fields.Order ? 1 : -1;
}

function sortBySubmissionDate(sub1: Submission, sub2: Submission) {
  return sub1.submissionDate > sub2.submissionDate ? 1 : -1;
}
