import {
	Body,
	Controller,
	Get,
	NotFoundException,
	Param,
	Post,
	ValidationPipe,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Controller('contact')
export class ContactController {
	constructor(private readonly contactService: ContactService) {}

	@Get()
	async get() {
		return await this.contactService.find();
	}

	@Get(':id')
	async getById(@Param('id') id: string) {
		const res = await this.contactService.findById(id);
		if (!res) {
			throw new NotFoundException();
		}
		return res;
	}

	@Post()
	async create(@Body(ValidationPipe) dto: CreateContactDto) {
		return await this.contactService.create(dto);
	}
}
