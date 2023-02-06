import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  artistId: string | null = null; // refers to Artist

  @IsOptional()
  @IsString()
  albumId: string | null = null; // refers to Album

  @IsNotEmpty()
  @IsInt()
  duration: number; // integer number
}
