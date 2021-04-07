import { BootcampModel } from "../../schemas/Bootcamp";

export default async function endBootcamp(chapterId: string) {
  const bootcamp = await BootcampModel.findOne({
    chapterId,
    end: { $exists: false },
  });

  if (!bootcamp) {
    throw new Error(
      `Attempted to end bootcamp when one is not going on. Chapter ID: ${chapterId} ${console.trace()}`
    );
  }

  bootcamp.end = new Date();
  await bootcamp.save();
}
