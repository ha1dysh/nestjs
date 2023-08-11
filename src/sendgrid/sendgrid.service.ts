import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class SendgridService {
	constructor(private readonly configService: ConfigService) {
		sgMail.setApiKey(configService.get('SENDGRID_KEY'));
	}

	async sendEmail(email: string) {
		await sgMail.send({
			to: email,
			from: this.configService.get('SENDGRID_SENDER'),
			subject: 'Register successful',
			text: ' ',
			html: '<strong>Congrats!</strong>',
		});
	}
}
