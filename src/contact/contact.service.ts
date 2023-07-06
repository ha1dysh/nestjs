import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Query as ExpressQuery } from 'express-serve-static-core';

import { Contact } from './contact.schema';
import { CreateContactDto, UpdateContactDto, FavoriteContactDto } from './dto';

@Injectable()
export class ContactService {
	constructor(
		@InjectModel(Contact.name) private readonly contactModel: Model<Contact>,
	) {}

	async find(owner: string, query: ExpressQuery) {
		const perPage = 20;
		const currentPage = Number(query.page) || 1;
		const skip = perPage * (currentPage - 1);

		return await this.contactModel.find({ owner }).limit(perPage).skip(skip);
	}

	async findById(id: string) {
		return await this.contactModel.findById(id);
	}

	async create(dto: CreateContactDto, id: string) {
		return await this.contactModel.create({ ...dto, owner: id });
	}

	async deleteById(id: string) {
		return await this.contactModel.findByIdAndDelete(id);
	}

	async updateById(id: string, dto: UpdateContactDto) {
		if (!Object.keys(dto).length) {
			return { message: 'missing fields' };
		}
		return await this.contactModel.findByIdAndUpdate(id, dto);
	}

	async updateFavorite(id: string, dto: FavoriteContactDto) {
		return await this.contactModel.findByIdAndUpdate(id, dto, { new: true });
	}
}
