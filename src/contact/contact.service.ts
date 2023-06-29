import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Contact } from './contact.schema';
import { Model } from 'mongoose';
import { CreateContactDto } from './dto/create-contact.dto';

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
}
