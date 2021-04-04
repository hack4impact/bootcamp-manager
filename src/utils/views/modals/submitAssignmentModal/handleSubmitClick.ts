import {
  AllMiddlewareArgs,
  BlockElementAction,
  SlackAction,
  SlackActionMiddlewareArgs,
} from "@slack/bolt";
import { assignments } from "../../../airtable/loadAirtableData";
import submitAssignmentModal from "./submitAssignmentModal";

export default async function handleSubmitClick({
  client,
  body,
  action,
  ack,
}: SlackActionMiddlewareArgs<SlackAction> & AllMiddlewareArgs) {
  ack();
  const actionId = (action as BlockElementAction).action_id;
  const prefix = "submit_assignment_";
  const assingmentId = actionId.substring(prefix.length);

  const assignmentRecord = assignments.find(({ id }) => assingmentId === id);
  if (!assignmentRecord) {
    throw new Error(
      `Faulty request submitted: Assingment id ${assingmentId} not found.`
    );
  }

  await client.views.open({
    trigger_id: (body as Record<string, any>).trigger_id,
    view: submitAssignmentModal(assignmentRecord.fields, assignmentRecord.id),
  });
}
