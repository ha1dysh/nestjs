import { IsOptional, IsString } from 'class-validator';

export class UpdateContactDto {
	@IsOptional()
	@IsString()
	name: string;

	@IsOptional()
	@IsString()
	email: string;

	@IsOptional()
	@IsString()
	phone: string;
}
