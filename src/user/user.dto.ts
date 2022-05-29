import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public first_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public last_name: string;

  @IsOptional()
  @ApiProperty()
  public secondId?: number;

  @IsOptional()
  @ApiProperty()
  public parent?: number;
}
