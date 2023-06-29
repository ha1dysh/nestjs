import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
	constructor(private readonly userService: UserService) {}

	async signup(dto: CreateUserDto) {
		const res = (await this.userService.create(dto)).toObject();
		delete res.hashPass;
		return res;
	}

	async signin(dto: Pick<CreateUserDto, 'email' | 'password'>) {
		const user = await this.userService.find(dto.email);
		if (!user) {
			throw new UnauthorizedException();
		}

		const validPass = await compare(dto.password, user.hashPass);
		if (!validPass) {
			throw new UnauthorizedException();
		}

		return { email: user.email, token: '' };
	}
}
