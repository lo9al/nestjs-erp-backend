import { Customer } from '../../customers/entities/customer.entity';
import { OrderItem } from './order-item.entity';
export declare enum OrderStatus {
    PENDING = "pending",
    CONFIRMED = "confirmed",
    SHIPPED = "shipped",
    DELIVERED = "delivered",
    CANCELLED = "cancelled"
}
export declare class Order {
    id: string;
    orderNumber: string;
    customer: Customer;
    status: OrderStatus;
    items: OrderItem[];
    totalAmount: number;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
}
