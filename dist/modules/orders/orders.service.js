"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./entities/order.entity");
const order_item_entity_1 = require("./entities/order-item.entity");
const customer_entity_1 = require("../customers/entities/customer.entity");
const product_entity_1 = require("../products/entities/product.entity");
let OrdersService = class OrdersService {
    constructor(ordersRepository, customersRepository, productsRepository, dataSource) {
        this.ordersRepository = ordersRepository;
        this.customersRepository = customersRepository;
        this.productsRepository = productsRepository;
        this.dataSource = dataSource;
    }
    async create(dto) {
        const customer = await this.customersRepository.findOne({
            where: { id: dto.customerId },
        });
        if (!customer)
            throw new common_1.NotFoundException('Customer not found');
        return this.dataSource.transaction(async (manager) => {
            const orderItems = [];
            let totalAmount = 0;
            for (const item of dto.items) {
                const product = await manager.findOne(product_entity_1.Product, {
                    where: { id: item.productId },
                });
                if (!product) {
                    throw new common_1.BadRequestException(`Product ${item.productId} not found`);
                }
                const subtotal = Number(product.unitPrice) * item.quantity;
                totalAmount += subtotal;
                const orderItem = manager.create(order_item_entity_1.OrderItem, {
                    product,
                    quantity: item.quantity,
                    unitPrice: product.unitPrice,
                    subtotal,
                });
                orderItems.push(orderItem);
            }
            const order = manager.create(order_entity_1.Order, {
                orderNumber: `ORD-${Date.now()}`,
                customer,
                items: orderItems,
                totalAmount,
                notes: dto.notes,
            });
            return manager.save(order);
        });
    }
    findAll() {
        return this.ordersRepository.find({
            relations: ['customer', 'items', 'items.product'],
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const order = await this.ordersRepository.findOne({
            where: { id },
            relations: ['customer', 'items', 'items.product'],
        });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        return order;
    }
    async updateStatus(id, dto) {
        const order = await this.findOne(id);
        order.status = dto.status;
        return this.ordersRepository.save(order);
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    __param(2, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], OrdersService);
//# sourceMappingURL=orders.service.js.map