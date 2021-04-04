import { AllMiddlewareArgs, SlackViewMiddlewareArgs } from "@slack/bolt";

export default async function handleLinkSubmission({
  ack,
  client,
  body,
}: SlackViewMiddlewareArgs & AllMiddlewareArgs) {
  console.log(body);
}
