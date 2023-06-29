import {
	Body,
	Controller,
	Delete,
	Get,
	NotFoundException,
	Param,
	Post,
	Put,
	ValidationPipe,
} from '@nestjs/common';

import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

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

	@Delete(':id')
	async deleteById(@Param('id') id: string) {
		const res = await this.contactService.deleteById(id);
		if (!res) {
			throw new NotFoundException();
		}
		return { message: 'contact deleted' };
	}

	@Put(':id')
	async update(
		@Param('id') id: string,
		@Body(ValidationPipe) dto: UpdateContactDto,
	) {
		const res = await this.contactService.updateById(id, dto);
		if (!res) {
			throw new NotFoundException();
		}
		return res;
	}
}
