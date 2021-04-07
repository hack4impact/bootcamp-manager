import { BootcampModel } from "../../schemas/Bootcamp";

export default async function startBootcamp(chapterId: string, name: string) {
  const exists = await BootcampModel.exists({
    chapterId,
    end: { $exists: false },
  });

  if (exists) {
    throw new Error(
      `Bootcamp creation attempted when one is already going on. Chapter ID: ${chapterId} ${console.trace()}`
    );
  }

  await BootcampModel.create({
    chapterId,
    name,
    start: new Date(),
  });
}
