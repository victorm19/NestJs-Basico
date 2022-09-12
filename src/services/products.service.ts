import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/product.dtos';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description product',
      price: 122,
      stock: 100,
      image: '',
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((x) => x.id === id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found.`);
    }
    return product;
  }

  create(payload: CreateProductDto) {
    this.counterId++;
    console.log(payload);
    const newProduct: Product = {
      id: this.counterId,
      ...payload,
    };

    this.products.push(newProduct);

    return newProduct;
  }

  update(id: number, payload: UpdateProductDto) {
    const product = this.findOne(id);

    if (!product) {
      throw new NotFoundException(`Product #${id} not found.`);
    }

    const index = this.products.findIndex((x) => x.id === id);
    this.products[index] = {
      ...product,
      ...payload,
    };

    return this.products[index];
  }

  delete(id: number) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product #${id} not found.`);
    }

    this.products.splice(index, 1);

    return true;
  }
}
