import Airtable from "airtable";
import Record from "airtable/lib/record";
import { AssignmentRecord } from "../types/Assignment";

export let chapterData: Record[] = [];
export let assignmentData: AssignmentRecord[];

export async function setAirtableData() {
  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    process.env.AIRTABLE_BASE_ID as string
  );

  chapterData = await base("Chapter Assignment Selection")
    .select({
      view: "Grid view",
    })
    .firstPage();

  assignmentData = ((await base("Assignments")
    .select({
      view: "Grid view",
    })
    .firstPage()) as unknown) as AssignmentRecord[];
}
