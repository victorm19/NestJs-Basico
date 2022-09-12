import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dtos';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoriesService {
  private counterId = 1;
  private categories: Category[] = [
    {
      id: 1,
      name: 'Category 1',
    },
  ];

  findAll() {
    return this.categories;
  }

  findOne(id: number) {
    const category = this.categories.find((x) => x.id === id);
    if (!category) {
      throw new NotFoundException(`Category #${id}, not found`);
    }
    return category;
  }

  create(payload: CreateCategoryDto) {
    this.counterId++;

    const newCategory: Category = {
      id: this.counterId,
      ...payload,
    };

    this.categories.push(newCategory);

    return newCategory;
  }

  update(id: number, payload: UpdateCategoryDto) {
    const category = this.findOne(id);

    if (!category) {
      throw new NotFoundException(`Category #${id} not found.`);
    }

    const index = this.categories.findIndex((x) => x.id === id);
    this.categories[index] = {
      ...category,
      ...payload,
    };

    return this.categories[index];
  }

  delete(id: number) {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Category #${id} not found.`);
    }

    this.categories.splice(index, 1);

    return true;
  }
}
