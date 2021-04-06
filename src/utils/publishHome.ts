import { AllMiddlewareArgs, SlackEventMiddlewareArgs } from "@slack/bolt";
import { WebClient } from "@slack/web-api";
import { UserModel } from "../schemas/User";
import newUserView from "./views/home/newUserView";
import studentsAssignmentViews from "./views/home/studentAssignmentsView";

export async function publishHomeMiddleware({
  event,
  client,
}: SlackEventMiddlewareArgs<"app_home_opened"> & AllMiddlewareArgs) {
  await publishHome(client, event.user);
}

export async function publishHome(client: WebClient, userId: string) {
  const user = await UserModel.findById({ _id: userId });
  if (!user) {
    client.views.publish({
      user_id: userId,
      view: newUserView(),
    });
  } else {
    client.views.publish({
      user_id: userId,
      view: await studentsAssignmentViews(userId),
    });
  }
}
