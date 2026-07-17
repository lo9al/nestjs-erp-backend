import { Order } from '../../orders/entities/order.entity';
export declare class Customer {
    id: string;
    companyName: string;
    contactName: string;
    email: string;
    phone: string;
    address: string;
    taxNumber: string;
    orders: Order[];
    createdAt: Date;
    updatedAt: Date;
}
