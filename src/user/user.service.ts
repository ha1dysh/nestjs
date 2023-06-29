import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash } from 'bcryptjs';

import { User } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<User>,
	) {}

	async create(dto: CreateUserDto) {
		const oldUser = await this.userModel.find({ email: dto.email });
		if (oldUser) {
			throw new ConflictException('Email in use');
		}
		const password = await hash(dto.password, 10);
		return await this.userModel.create({ ...dto, hashPass: password });
	}
}
