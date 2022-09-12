import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dtos';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class CustomersService {
  private counterId = 1;
  private customers: Customer[] = [
    {
      id: 1,
      name: 'Victor',
      lastName: 'Martinez',
      phone: '3701234567',
    },
  ];

  findAll() {
    return this.customers;
  }

  findOne(id: number) {
    const customer = this.customers.find((x) => x.id === id);
    if (!customer) {
      throw new NotFoundException(`Customers #${id}, not found`);
    }
    return customer;
  }

  create(payload: CreateCustomerDto) {
    this.counterId++;

    const newCustomer: Customer = {
      id: this.counterId,
      ...payload,
    };

    this.customers.push(newCustomer);

    return newCustomer;
  }

  update(id: number, payload: UpdateCustomerDto) {
    const customer = this.findOne(id);

    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found.`);
    }

    const index = this.customers.findIndex((x) => x.id === id);
    this.customers[index] = {
      ...customer,
      ...payload,
    };

    return this.customers[index];
  }

  delete(id: number) {
    const index = this.customers.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Customer #${id} not found.`);
    }

    this.customers.splice(index, 1);

    return true;
  }
}
