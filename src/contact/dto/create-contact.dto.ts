import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import mongoose from 'mongoose';
import { User } from 'src/user/user.schema';

export class CreateContactDto {
	@ApiProperty()
	@IsString()
	name: string;

	@ApiProperty()
	@IsString()
	email: string;

	@ApiProperty()
	@IsString()
	phone: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsBoolean()
	favorite: boolean;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
	user: User;
}
