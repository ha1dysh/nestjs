import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { User } from 'src/user/user.schema';

export type ContactDocument = HydratedDocument<Contact>;

@Schema({ versionKey: false })
export class Contact extends Document {
	@Prop({ required: true })
	name: string;

	@Prop()
	email: string;

	@Prop()
	phone: string;

	@Prop({ default: false })
	favorite: boolean;

	@Prop({ type: Types.ObjectId, ref: 'User', required: true })
	owner: User;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
