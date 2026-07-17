import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';

describe('ProductsService', () => {
  let service: ProductsService;
  const mockRepo = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: getRepositoryToken(Product), useValue: mockRepo },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw ConflictException if SKU exists', async () => {
    mockRepo.findOne.mockResolvedValue({ id: '1', sku: 'PVC-001' });
    await expect(
      service.create({
        sku: 'PVC-001',
        name: 'PVC Pipe',
        category: 'Pipes',
        unitPrice: 10,
      }),
    ).rejects.toThrow(ConflictException);
  });

  it('should create a product successfully', async () => {
    mockRepo.findOne.mockResolvedValue(null);
    mockRepo.create.mockReturnValue({ sku: 'PVC-002', name: 'PVC Elbow' });
    mockRepo.save.mockResolvedValue({ id: '2', sku: 'PVC-002', name: 'PVC Elbow' });

    const result = await service.create({
      sku: 'PVC-002',
      name: 'PVC Elbow',
      category: 'Fittings',
      unitPrice: 5,
    });

    expect(result).toEqual({ id: '2', sku: 'PVC-002', name: 'PVC Elbow' });
  });
});
