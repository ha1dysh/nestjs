import { ConfigService } from '@nestjs/config';

export const mongoConfig = (configService: ConfigService) => {
	return { uri: configService.get('MONGO_URI') };
};
