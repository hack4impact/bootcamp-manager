import { StaticSelect } from "@slack/bolt";
import { chapterData } from "../../loadAirtableData";

export const cancelButton = {
  type: "button",
  text: {
    type: "plain_text",
    text: "Cancel",
  },
  value: "cancel",
  action_id: "cancel",
  style: "danger",
};

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

export const semesterSelect = {
  action_id: "semesterSelect",
  type: "static_select",
  placeholder: {
    type: "plain_text",
    text: "Select a semester",
  },
  options: [
    {
      text: {
        type: "plain_text",
        text: "Current Semester",
      },
      value: "currentsemester",
    },
    {
      text: {
        type: "plain_text",
        text: "Next Semester",
      },
      value: "nextsemester",
    },
  ],
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
