import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public first_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public last_name: string;
}
