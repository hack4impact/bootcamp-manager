import { AllMiddlewareArgs, SlackEventMiddlewareArgs } from "@slack/bolt";
import { UserModel } from "../schemas/User";
import newUserView from "./views/home/newUserView";

export default async function publishHome({
  event,
  client,
}: SlackEventMiddlewareArgs<"app_home_opened"> & AllMiddlewareArgs) {
  const user = UserModel.findById({ _id: event.user });
  if (!user) {
    client.views.publish({
      user_id: event.user,
      view: newUserView(),
    });
  }
}
