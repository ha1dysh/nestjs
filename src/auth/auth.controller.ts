import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('signup')
	async signup(@Body(ValidationPipe) dto: CreateUserDto) {
		return await this.authService.signup(dto);
	}
}
