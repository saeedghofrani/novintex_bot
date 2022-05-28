import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateBotUserDto {

    @ApiProperty()
    @IsString()    
    @IsNotEmpty()
    public first_name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public last_name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    chat_id: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

}
