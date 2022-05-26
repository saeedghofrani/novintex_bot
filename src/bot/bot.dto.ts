import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateBotUserDto {

    @IsString()
    @IsNotEmpty()
    public first_name: string;

    @IsString()
    @IsNotEmpty()
    public last_name: string;

    @IsString()
    @IsNotEmpty()
    public chat_id: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

}
