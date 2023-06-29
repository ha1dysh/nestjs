import { IsBoolean } from 'class-validator';

export class FavoriteContactDto {
	@IsBoolean()
	favorite: boolean;
}
