import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class FavoriteContactDto {
	@ApiProperty()
	@IsBoolean()
	favorite: boolean;
}
