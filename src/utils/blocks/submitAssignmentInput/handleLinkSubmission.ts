import { AllMiddlewareArgs, SlackViewMiddlewareArgs } from "@slack/bolt";
import { SubmissionModel } from "../../../schemas/Submission";
import { inputElement, inputPrefix } from "./submitAssignmentInput";

export default async function handleLinkSubmission({
  ack,
  client,
  body,
  view,
}: SlackViewMiddlewareArgs & AllMiddlewareArgs) {
  ack();
  for (const blockId of Object.keys(view.state.values)) {
    const assignmentId = blockId.substring(
      blockId.indexOf(inputPrefix) + inputPrefix.length
    );
    const submissionLink =
      view.state.values[blockId][inputElement.action_id as string]?.value;
    const submission = new SubmissionModel({
      assignmentId,
      link: submissionLink,
      user: body.user.id,
      date: new Date(),
      reviewed: false,
    });

    await submission.save();
  }
}
