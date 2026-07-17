import { Product } from '../../products/entities/product.entity';
export declare class Inventory {
    id: string;
    product: Product;
    quantityOnHand: number;
    reorderLevel: number;
    warehouseLocation: string;
    updatedAt: Date;
}
