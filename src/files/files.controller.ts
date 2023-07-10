import {
	Controller,
	HttpCode,
	Post,
	UploadedFile,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from 'src/_common/jwt-guard';
import { FileResponse } from './dto/file.response';
import { FilesService } from './files.service';
import { MFile } from './mfile.class';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Files')
@Controller('files')
export class FilesController {
	constructor(private readonly filesService: FilesService) {}

	@UseGuards(JwtGuard)
	@HttpCode(200)
	@UseInterceptors(FileInterceptor('files'))
	@Post('upload')
	async uploadFile(
		@UploadedFile() file: Express.Multer.File,
	): Promise<FileResponse[]> {
		const saveArray = [new MFile(file)];
		if (file.mimetype.includes('image')) {
			const buffer = await this.filesService.convertWebp(file.buffer);
			saveArray.push(
				new MFile({
					originalname: `${file.originalname.split('.')[0]}.webp`,
					buffer,
				}),
			);
		}
		return this.filesService.saveFiles(saveArray);
	}
}
