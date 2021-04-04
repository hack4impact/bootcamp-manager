import { AllMiddlewareArgs, SlackEventMiddlewareArgs } from "@slack/bolt";
import { UserModel } from "../schemas/User";
import newUserView from "./views/home/newUserView";
import studentsAssignmentViews from "./views/home/studentAssignmentsView";

export default async function publishHome({
  event,
  client,
}: SlackEventMiddlewareArgs<"app_home_opened"> & AllMiddlewareArgs) {
  const user = await UserModel.findById({ _id: event.user });
  if (!user) {
    client.views.publish({
      user_id: event.user,
      view: newUserView(),
    });
  } else {
    client.views.publish({
      user_id: event.user,
      view: await studentsAssignmentViews(event.user),
    });
  }
}
