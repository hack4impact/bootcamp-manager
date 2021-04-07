import { KnownBlock } from "@slack/types";
import { Submission } from "../../../schemas/Submission";
import { AssingnmentFields } from "../../../types/Assignment";
import dividerTemplate from "../templates/dividerTemplate";
import headerTemplate from "../templates/headerTemplate";
import markdownTemplate from "../templates/markdownTemplate";
import { submitButton } from "../todoAssignment/elements";

export default function completedAssignment(
  assignment: AssingnmentFields,
  assignmentId: string,
  submissions: Submission[]
): KnownBlock[] {
  submissions = submissions.sort(sortSubmissionsByDate);
  return [
    dividerTemplate(),
    headerTemplate(assignment.Name),
    markdownTemplate("*Previous Submissions*"),
    ...submissions.map(submissionsToMarkdown),
    {
      type: "actions",
      elements: [submitButton(assignmentId, true)],
    },
  ];
}

function submissionsToMarkdown(
  submission: Submission,
  index: number,
  array: Submission[]
) {
  const content =
    (array.length - 1 === index ? "*Latest:* " : "") +
    `(${submission.submissionDate.toLocaleDateString()}) <${submission.link}>`;
  return markdownTemplate(content);
}

function sortSubmissionsByDate(sub1: Submission, sub2: Submission) {
  return sub1.submissionDate > sub2.submissionDate ? 1 : -1;
}
