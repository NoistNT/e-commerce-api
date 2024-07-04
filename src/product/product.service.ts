import { Injectable } from '@nestjs/common';
import { Product } from '@/schemas/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductFilterDto } from './dto/product-filter.dto';
import { Query } from '@/types';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async create<T extends Product>(product: T): Promise<Product> {
    try {
      const isInDB = await this.productModel.findOne({ name: product.name });

      if (isInDB) {
        throw new Error('Product already exists');
      }

      const newProduct = new this.productModel(product);
      await newProduct.save();
      return newProduct;
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }

  async findAll(filter?: ProductFilterDto): Promise<Product[]> {
    const query: Query = {};

    try {
      if (filter) {
        if (filter.minPrice) {
          query.price = { $gte: filter.minPrice };
        }
        if (filter.maxPrice) {
          query.price = { $lte: filter.maxPrice };
        }
        if (filter.name) {
          query.name = { $regex: filter.name, $options: 'i' };
        }
        if (filter.brand) {
          query.brand = { $regex: filter.brand, $options: 'i' };
        }
        if (filter.category) {
          query.category = { $regex: filter.category, $options: 'i' };
        }
        if (filter.isActive) {
          query.isActive = filter.isActive;
        }
        return await this.productModel.find(query).limit(9).select('-__v');
      }

      return await this.productModel.find().select('-__v');
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }

  async findOne(id: string): Promise<Product> {
    try {
      const product = await this.productModel.findById(id).select('-__v');

      if (!product) {
        throw new Error('Product not found');
      }

      return product;
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }

  async update<T extends Product>(id: string, product: T): Promise<T> {
    try {
      const updatedProduct = await this.productModel.findOneAndUpdate(
        { _id: id },
        { $set: product },
      );

      if (!updatedProduct) {
        throw new Error('Product not found');
      }

      return product;
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }

  async remove(id: number) {
    try {
      const deletedProduct = await this.productModel.findOneAndDelete({
        _id: id,
      });

      if (!deletedProduct) {
        throw new Error('Product not found');
      }

      return deletedProduct;
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }
}
