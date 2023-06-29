import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false })
export class User {
	@Prop({ required: true, unique: true })
	email: string;

	@Prop({ required: true })
	hashPass: string;

	@Prop({ enum: ['starter', 'pro', 'business'], default: 'starter' })
	subscription: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
