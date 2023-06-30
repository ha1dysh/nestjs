import {
	Body,
	Controller,
	HttpCode,
	Post,
	ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('signup')
	async signup(@Body(ValidationPipe) dto: CreateUserDto) {
		return await this.authService.signup(dto);
	}

	@HttpCode(200)
	@Post('signin')
	async signin(
		@Body(ValidationPipe) dto: Pick<CreateUserDto, 'email' | 'password'>,
	) {
		return await this.authService.signin(dto);
	}
}
