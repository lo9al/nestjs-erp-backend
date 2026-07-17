import { Inventory } from '../../inventory/entities/inventory.entity';
export declare class Product {
    id: string;
    sku: string;
    name: string;
    description: string;
    category: string;
    unitPrice: number;
    unit: string;
    isActive: boolean;
    inventory: Inventory;
    createdAt: Date;
    updatedAt: Date;
}
