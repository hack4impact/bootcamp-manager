import { slackWebClient } from "../config";

export default async function getSlackUserInfo(userId: string) {
  return await slackWebClient.users.profile.get({
    user: userId,
  });
}
