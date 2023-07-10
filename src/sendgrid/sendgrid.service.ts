import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sendgridMail from '@sendgrid/mail';

@Injectable()
export class SendgridService {
	constructor(private readonly configService: ConfigService) {
		sendgridMail.setApiKey(configService.get('SENDGRID_KEY'));
	}

	async sendEmail(email: string) {
		await sendgridMail.send({
			from: this.configService.get('SENDGRID_SENDER'),
			to: email,
			subject: 'Register successful',
			html: '<strong>Congrats!</strong>',
		});
	}
}
