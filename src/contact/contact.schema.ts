import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ContactDocument = HydratedDocument<Contact>;

@Schema({ versionKey: false })
export class Contact {
	@Prop({ required: true })
	name: string;

	@Prop()
	email: string;

	@Prop()
	phone: string;

	@Prop({ default: false })
	favorite: boolean;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
