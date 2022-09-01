import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class VaccineCreateDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly description: string;
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
  @IsNumber()
  readonly id_laboratory: number;
  @IsNumber()
  readonly quantity: number;
}
