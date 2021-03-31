import { ActionsBlock, Block } from "@slack/bolt";
import {
  blockId,
  chapterSelect,
  createChapterOptions,
  submitButton,
} from "./elements";

export function registerMessage(): Block {
  const chapterOptions = createChapterOptions();
  chapterSelect.options = chapterOptions;

  const interactiveBlock: ActionsBlock = {
    type: "actions",
    block_id: blockId,
    elements: [chapterSelect, submitButton],
  };

  return interactiveBlock;
}
