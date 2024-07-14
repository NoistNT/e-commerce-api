import { Injectable } from '@nestjs/common';
import { Product } from '@/schemas/product.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { products } from '@/mock-data';

@Injectable()
export class SeederService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async seed() {
    const session = await this.productModel.startSession();
    session.startTransaction();

    const productsMocked = [];

    while (productsMocked.length < 90) {
      for (const product of products) {
        productsMocked.push(product);
      }
    }

    try {
      await this.productModel.deleteMany({});
      await this.productModel.insertMany(productsMocked);
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      const err = error as Error;
      throw new Error(err.message);
    } finally {
      session.endSession();
    }
  }
}
