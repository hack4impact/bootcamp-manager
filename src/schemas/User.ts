import { getModelForClass, prop } from "@typegoose/typegoose";

export class User {
  @prop({ required: true, type: () => String })
  public name!: string;

  @prop({ required: true, type: () => String })
  public chapterName!: string;

  @prop({ required: true, type: () => String })
  public chapterId!: string;

  @prop({ required: true, type: () => String })
  public slackId!: string;
}

export const UserModel = getModelForClass(User);
