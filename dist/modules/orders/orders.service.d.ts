import { Repository, DataSource } from 'typeorm';
import { Order } from './entities/order.entity';
import { Customer } from '../customers/entities/customer.entity';
import { Product } from '../products/entities/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
export declare class OrdersService {
    private readonly ordersRepository;
    private readonly customersRepository;
    private readonly productsRepository;
    private readonly dataSource;
    constructor(ordersRepository: Repository<Order>, customersRepository: Repository<Customer>, productsRepository: Repository<Product>, dataSource: DataSource);
    create(dto: CreateOrderDto): Promise<Order>;
    findAll(): Promise<Order[]>;
    findOne(id: string): Promise<Order>;
    updateStatus(id: string, dto: UpdateOrderStatusDto): Promise<Order>;
}
