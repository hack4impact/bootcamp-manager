import Airtable from "airtable";
import { AssignmentRecord } from "../../types/Assignment";
import { ChapterRecord } from "../../types/Chapter";

export let chapterData: ChapterRecord[] = [];
export let assignments: AssignmentRecord[];
export let customAssignments: AssignmentRecord[];

export async function setAirtableData() {
  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    process.env.AIRTABLE_BASE_ID as string
  );

  chapterData = ((await base("Chapter Assignment Selection")
    .select({
      view: "Grid view",
    })
    .firstPage()) as unknown) as ChapterRecord[];

  assignments = ((await base("Assignments")
    .select({
      view: "Grid view",
    })
    .firstPage()) as unknown) as AssignmentRecord[];

  customAssignments = ((await base("Custom Assignments")
    .select({
      view: "Grid view",
    })
    .firstPage()) as unknown) as AssignmentRecord[];
}
