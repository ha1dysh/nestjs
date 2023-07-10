import {
	ConflictException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { compare, hash } from 'bcryptjs';
import { User } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<User>,
	) {}

	async create(dto: CreateUserDto) {
		const oldUser = await this.userModel.findOne({ email: dto.email });
		if (oldUser) {
			throw new ConflictException('Email in use');
		}
		const hashPass = await hash(dto.password, 10);
		return await this.userModel.create({ ...dto, hashPass });
	}

	async find(email: string) {
		return this.userModel.findOne({ email });
	}

	async validate(email: string, password: string) {
		const user = await this.find(email);
		if (!user) {
			throw new UnauthorizedException();
		}
		const validPass = await compare(password, user.hashPass);
		if (!validPass) {
			throw new UnauthorizedException();
		}
		return user;
	}
}
