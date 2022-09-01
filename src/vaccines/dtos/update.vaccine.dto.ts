import {
  IsDateString,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class VaccineUpdateDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(15)
  readonly lote: string;
  @IsString()
  @IsDateString()
  readonly admission_date: string;
  @IsString()
  @IsDateString()
  readonly expiration_date: string;
}
