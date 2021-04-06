import { KnownBlock } from "@slack/types";
import { AssingnmentFields } from "../../../types/Assignment";
import dividerTemplate from "../templates/dividerTemplate";
import headerTemplate from "../templates/headerTemplate";
import markdownTemplate from "../templates/markdownTemplate";

export default function completedAssignment(
  assignment: AssingnmentFields,
  assignmentId: string,
  submissions: string[]
): KnownBlock[] {
  return [
    dividerTemplate(),
    headerTemplate(assignment.Name),
    markdownTemplate("*Previous Submissions*"),
    ...submissions.map(submissionsToMarkdown),
  ];
}

function submissionsToMarkdown(submission: string) {
  return markdownTemplate(`<${submission}>`);
}
