import { Module } from '@nestjs/common';
import { SendgridService } from './sendgrid.service';
import { ConfigService } from '@nestjs/config';

@Module({
	providers: [SendgridService, ConfigService],
})
export class SendgridModule {}
