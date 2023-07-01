import {
	Body,
	Controller,
	Delete,
	Get,
	NotFoundException,
	Param,
	Patch,
	Post,
	Put,
	Query,
	UseGuards,
	ValidationPipe,
} from '@nestjs/common';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { ContactService } from './contact.service';
import { JwtGuard } from 'src/auth/jwt-guard';
import { CreateContactDto, UpdateContactDto, FavoriteContactDto } from './dto';

@ApiTags('Contacts')
@Controller('contact')
export class ContactController {
	constructor(private readonly contactService: ContactService) {}

	@UseGuards(JwtGuard)
	@Get()
	async get(@Query() query: ExpressQuery) {
		return await this.contactService.find(query);
	}

	@Get(':id')
	async getById(@Param('id') id: string) {
		const res = await this.contactService.findById(id);
		if (!res) {
			throw new NotFoundException();
		}
		return res;
	}

	@ApiResponse({ type: CreateContactDto })
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

	@ApiResponse({ type: UpdateContactDto })
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

	@ApiResponse({ type: FavoriteContactDto })
	@Patch(':id/favorite')
	async updateFavorite(
		@Param('id') id: string,
		@Body(ValidationPipe) dto: FavoriteContactDto,
	) {
		const res = await this.contactService.updateFavorite(id, dto);
		if (!res) {
			throw new NotFoundException();
		}
		return res;
	}
}
