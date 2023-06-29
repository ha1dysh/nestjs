import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateContactDto {
	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	name: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	email: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	phone: string;
}
