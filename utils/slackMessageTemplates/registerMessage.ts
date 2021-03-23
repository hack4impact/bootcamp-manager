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

export const chapterSelect = {
  action_id: "chapterSelect",
  type: "static_select",
  placeholder: {
    type: "plain_text",
    text: "Select a chapter",
  },
  options: [
    {
      text: {
        type: "plain_text",
        text: "Cal Poly",
      },
      value: "Cal Poly",
    },
    {
      text: {
        type: "plain_text",
        text: "UIUC",
      },
      value: "UIUC",
    },
    {
      text: {
        type: "plain_text",
        text: "Cornell",
      },
      value: "Cornell",
    },
  ],
};

export const semesterSelect = {
  action_id: "text1235",
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

export const interactiveBlock = {
  type: "actions",
  block_id: "registerMessage",
  elements: [chapterSelect, semesterSelect, submitButton, cancelButton],
};

export const registerMessage = {
  blocks: [
    {
      type: "section",
      text: {
        type: "plain_text",
        text:
          "Hey there! To register for the bootcamp, please select your H4I chapter as well as the semester you want to register for.",
      },
    },
    interactiveBlock,
  ],
};
