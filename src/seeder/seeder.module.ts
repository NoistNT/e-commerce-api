import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { SeederController } from './seeder.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from '@/schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
  ],
  controllers: [SeederController],
  providers: [SeederService],
})
export class SeederModule {}
