import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Contact } from './contact.schema';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactService {
	constructor(
		@InjectModel(Contact.name) private readonly contactModel: Model<Contact>,
	) {}

	async find() {
		return await this.contactModel.find();
	}

	async findById(id: string) {
		return await this.contactModel.findById(id);
	}

	async create(dto: CreateContactDto) {
		return await this.contactModel.create(dto);
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
}
