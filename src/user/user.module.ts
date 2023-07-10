import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { User, UserSchema } from './user.schema';
import { SendgridModule } from 'src/sendgrid/sendgrid.module';
import { SendgridService } from 'src/sendgrid/sendgrid.service';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
		SendgridModule,
	],
	providers: [UserService, SendgridService],
	exports: [UserService],
})
export class UserModule {}
