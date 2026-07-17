import { Controller, Get, Param, Patch, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { InventoryService } from './inventory.service';
import { AdjustStockDto } from './dto/adjust-stock.dto';
import { SetReorderLevelDto } from './dto/set-reorder-level.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles, Role } from '../../common/decorators/roles.decorator';

@ApiTags('Inventory')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get('low-stock')
  @Roles(Role.ADMIN, Role.MANAGER)
  findLowStock() {
    return this.inventoryService.findLowStock();
  }

  @Get('product/:productId')
  findByProduct(@Param('productId') productId: string) {
    return this.inventoryService.findByProduct(productId);
  }

  @Patch('product/:productId/adjust')
  @Roles(Role.ADMIN, Role.MANAGER, Role.STAFF)
  adjustStock(
    @Param('productId') productId: string,
    @Body() dto: AdjustStockDto,
  ) {
    return this.inventoryService.adjustStock(productId, dto);
  }

  @Patch('product/:productId/reorder-level')
  @Roles(Role.ADMIN, Role.MANAGER)
  setReorderLevel(
    @Param('productId') productId: string,
    @Body() dto: SetReorderLevelDto,
  ) {
    return this.inventoryService.setReorderLevel(productId, dto);
  }
}
