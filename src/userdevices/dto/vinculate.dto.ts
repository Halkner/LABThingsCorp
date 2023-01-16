import { IsBoolean, IsInt, IsString } from 'class-validator';
export class VinculateDto{

    @IsInt()
    user: number;

    @IsInt()
    device: number;

    @IsBoolean()
    is_on: boolean;

    @IsString()
    local: string;

    @IsString()
    room: string;
}