import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateContactDto {
	@IsString()
	name: string;

	@IsString()
	email: string;

	@IsString()
	phone: string;

	@IsOptional()
	@IsBoolean()
	favorite: boolean;
}
