import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
	@ApiProperty()
	@IsString()
	email: string;

	@ApiProperty()
	@IsString()
	password: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsEnum(['starter', 'pro', 'business'])
	subscription: ['starter', 'pro', 'business'];
}
