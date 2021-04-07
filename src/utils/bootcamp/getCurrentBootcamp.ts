import { BootcampModel } from "../../schemas/Bootcamp";

export default async function getCurrentBootcamp(chapterId: string) {
  const bootcamp = await BootcampModel.findOne({
    chapterId,
    end: { $exists: false },
  });

  return bootcamp;
}
