import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
	) {}

	async signup(dto: CreateUserDto) {
		const user = (await this.userService.create(dto)).toObject();
		delete user.hashPass;
		return { ...user, token: await this.genToken(user) };
	}

	async signin({ email, password }: Pick<CreateUserDto, 'email' | 'password'>) {
		const user = await this.userService.validate(email, password);
		return { email, token: await this.genToken(user) };
	}

	async genToken({ email, _id }: User) {
		return await this.jwtService.signAsync(
			{ email, _id },
			{
				secret: this.configService.get('JWT_SECRET'),
				expiresIn: Number(this.configService.get('JWT_EXPIRE')),
			},
		);
	}
}
