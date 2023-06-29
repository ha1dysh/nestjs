import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { mongoConfig } from './_configs/mongo.config';
import { ContactModule } from './contact/contact.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: mongoConfig,
		}),
		ContactModule,
	],
})
export class AppModule {}
