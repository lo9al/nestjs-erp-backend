import { InventoryService } from './inventory.service';
import { AdjustStockDto } from './dto/adjust-stock.dto';
import { SetReorderLevelDto } from './dto/set-reorder-level.dto';
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    findLowStock(): Promise<import("./entities/inventory.entity").Inventory[]>;
    findByProduct(productId: string): Promise<import("./entities/inventory.entity").Inventory>;
    adjustStock(productId: string, dto: AdjustStockDto): Promise<import("./entities/inventory.entity").Inventory>;
    setReorderLevel(productId: string, dto: SetReorderLevelDto): Promise<import("./entities/inventory.entity").Inventory>;
}
