import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsIn } from 'class-validator';

export class AdjustStockDto {
  @ApiProperty({ description: 'Positive to add stock, negative to remove' })
  @IsInt()
  quantity: number;

  @ApiProperty({ enum: ['IN', 'OUT'] })
  @IsIn(['IN', 'OUT'])
  type: 'IN' | 'OUT';
}
