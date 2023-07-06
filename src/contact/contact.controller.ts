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
import { JwtGuard } from 'src/_common/jwt-guard';
import { CreateContactDto, UpdateContactDto, FavoriteContactDto } from './dto';
import { IdValidationPipe } from 'src/_common/id-validation.pipe';
import { UserId } from 'src/_common/user-id.decorator';

@ApiTags('Contacts')
@Controller('contact')
export class ContactController {
	constructor(private readonly contactService: ContactService) {}

	@UseGuards(JwtGuard)
	@Get()
	async get(@Query() query: ExpressQuery, @UserId() id: string) {
		return await this.contactService.find(id, query);
	}

	@UseGuards(JwtGuard)
	@Get(':id')
	async getById(@Param('id', IdValidationPipe) id: string) {
		const res = await this.contactService.findById(id);
		if (!res) {
			throw new NotFoundException();
		}
		return res;
	}

	@ApiResponse({ type: CreateContactDto })
	@UseGuards(JwtGuard)
	@Post()
	async create(
		@Body(ValidationPipe) dto: CreateContactDto,
		@UserId() id: string,
	) {
		return await this.contactService.create(dto, id);
	}

	@UseGuards(JwtGuard)
	@Delete(':id')
	async deleteById(@Param('id', IdValidationPipe) id: string) {
		const res = await this.contactService.deleteById(id);
		if (!res) {
			throw new NotFoundException();
		}
		return { message: 'contact deleted' };
	}

	@ApiResponse({ type: UpdateContactDto })
	@UseGuards(JwtGuard)
	@Put(':id')
	async update(
		@Param('id', IdValidationPipe) id: string,
		@Body(ValidationPipe) dto: UpdateContactDto,
	) {
		const res = await this.contactService.updateById(id, dto);
		if (!res) {
			throw new NotFoundException();
		}
		return res;
	}

	@ApiResponse({ type: FavoriteContactDto })
	@UseGuards(JwtGuard)
	@Patch(':id/favorite')
	async updateFavorite(
		@Param('id', IdValidationPipe) id: string,
		@Body(ValidationPipe) dto: FavoriteContactDto,
	) {
		const res = await this.contactService.updateFavorite(id, dto);
		if (!res) {
			throw new NotFoundException();
		}
		return res;
	}
}
