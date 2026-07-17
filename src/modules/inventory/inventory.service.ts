import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from './entities/inventory.entity';
import { AdjustStockDto } from './dto/adjust-stock.dto';
import { SetReorderLevelDto } from './dto/set-reorder-level.dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
  ) {}

  async findByProduct(productId: string): Promise<Inventory> {
    const inventory = await this.inventoryRepository.findOne({
      where: { product: { id: productId } },
      relations: ['product'],
    });
    if (!inventory) throw new NotFoundException('Inventory record not found');
    return inventory;
  }

  async adjustStock(productId: string, dto: AdjustStockDto): Promise<Inventory> {
    const inventory = await this.findByProduct(productId);
    const delta = dto.type === 'IN' ? dto.quantity : -dto.quantity;

    if (inventory.quantityOnHand + delta < 0) {
      throw new BadRequestException('Insufficient stock for this operation');
    }

    inventory.quantityOnHand += delta;
    return this.inventoryRepository.save(inventory);
  }

  async setReorderLevel(
    productId: string,
    dto: SetReorderLevelDto,
  ): Promise<Inventory> {
    const inventory = await this.findByProduct(productId);
    inventory.reorderLevel = dto.reorderLevel;
    return this.inventoryRepository.save(inventory);
  }

  async findLowStock(): Promise<Inventory[]> {
    const all = await this.inventoryRepository.find({ relations: ['product'] });
    return all.filter((i) => i.quantityOnHand <= i.reorderLevel);
  }
}
