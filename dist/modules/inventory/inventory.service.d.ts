import { Repository } from 'typeorm';
import { Inventory } from './entities/inventory.entity';
import { AdjustStockDto } from './dto/adjust-stock.dto';
import { SetReorderLevelDto } from './dto/set-reorder-level.dto';
export declare class InventoryService {
    private readonly inventoryRepository;
    constructor(inventoryRepository: Repository<Inventory>);
    findByProduct(productId: string): Promise<Inventory>;
    adjustStock(productId: string, dto: AdjustStockDto): Promise<Inventory>;
    setReorderLevel(productId: string, dto: SetReorderLevelDto): Promise<Inventory>;
    findLowStock(): Promise<Inventory[]>;
}
