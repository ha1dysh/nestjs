import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

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
}
