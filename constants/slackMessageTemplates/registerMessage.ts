export default {
  blocks: [
    {
      type: "section",
      text: {
        type: "plain_text",
        text:
          "Hey there! To register for the bootcamp, please select your H4I chapter as well as the semester you want to register for.",
      },
    },
    {
      type: "actions",
      block_id: "actions1",
      elements: [
        {
          action_id: "text1234",
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
              value: "value-0",
            },
            {
              text: {
                type: "plain_text",
                text: "UIUC",
              },
              value: "value-1",
            },
            {
              text: {
                type: "plain_text",
                text: "Cornell",
              },
              value: "value-2",
            },
          ],
        },
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "Start Bootcamping!",
          },
          value: "submit",
          action_id: "button_1",
          style: "primary",
        },
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "Cancel",
          },
          value: "cancel",
          action_id: "button_2",
          style: "danger",
        },
      ],
    },
    {
      type: "actions",
      block_id: "actions2",
      elements: [
        {
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
              value: "value-2",
            },
            {
              text: {
                type: "plain_text",
                text: "Next Semester",
              },
              value: "value-3",
            },
          ],
        },
      ],
    },
  ],
};
