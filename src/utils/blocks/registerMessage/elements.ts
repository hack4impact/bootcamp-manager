import { StaticSelect } from "@slack/bolt";
import { chapterData } from "../../loadAirtableData";

export const submitButton = {
  type: "button",
  text: {
    type: "plain_text",
    text: "Start Bootcamping!",
  },
  value: "submit",
  action_id: "submit",
  style: "primary",
};

export const chapterSelect: StaticSelect = {
  action_id: "chapterSelect",
  type: "static_select",
  placeholder: {
    type: "plain_text",
    text: "Select a chapter",
  },
};

export const blockId = "registerMessage";

export function createChapterOptions() {
  const chapterOptions: any[] = [];
  chapterData.forEach((chapter) => {
    chapterOptions.push({
      text: {
        type: "plain_text",
        text: chapter.get("Chapter Name"),
      },
      value: chapter.get("Chapter Name"),
    });
  });
  return chapterOptions;
}
