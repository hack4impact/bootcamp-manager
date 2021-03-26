import { SayArguments, ActionsBlock } from "@slack/bolt";
import {
  blockId,
  cancelButton,
  chapterSelect,
  createChapterOptions,
  semesterSelect,
  submitButton,
} from "./elements";

export function registerMessage(userExists: boolean): SayArguments {
  const chapterOptions = createChapterOptions();
  chapterSelect.options = chapterOptions;

  const interactiveBlock: ActionsBlock = {
    type: "actions",
    block_id: blockId,
    elements: [chapterSelect, semesterSelect, submitButton, cancelButton],
  };

  const message = userExists
    ? "It looks like you're already registered for the bootcamp. You can change your bootcamp settings by submitting this form."
    : "Hey there! To register for the bootcamp, please select your H4I chapter as well as the semester you want to register for.";
  return {
    text: "",
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
