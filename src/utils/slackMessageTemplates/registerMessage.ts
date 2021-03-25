import { chapterData } from "../loadAirtableData";

function createChapterOptions() {
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

export const chapterSelect: Record<string, any> = {
  action_id: "chapterSelect",
  type: "static_select",
  placeholder: {
    type: "plain_text",
    text: "Select a chapter",
  },
  options: null,
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

export const interactiveBlock: Record<string, any> = {
  type: "actions",
  block_id: "registerMessage",
  elements: [],
};

export function registerMessage(userExists: boolean) {
  const chapterOptions = createChapterOptions();
  chapterSelect.options = chapterOptions;
  interactiveBlock.elements = [
    chapterSelect,
    semesterSelect,
    submitButton,
    cancelButton,
  ];
  const message = userExists
    ? "It looks like you're already registered for the bootcamp. You can change your bootcamp settings by submitting this form."
    : "Hey there! To register for the bootcamp, please select your H4I chapter as well as the semester you want to register for.";
  return {
    blocks: [
      {
        type: "section",
        text: {
          type: "plain_text",
          text: message,
        },
      },
      interactiveBlock,
    ],
  };
}
