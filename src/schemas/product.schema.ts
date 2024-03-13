import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNumber, IsPositive, IsString, Length, IsUrl } from 'class-validator';

const stringOptions = { required: true, trim: true, lowercase: true };

@Schema()
export class Product {
  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  @IsString()
  @Length(3, 30)
  name!: string;

  @Prop(stringOptions)
  @IsString()
  @Length(3, 30)
  brand!: string;

  @Prop({ required: true })
  @IsNumber()
  @IsPositive()
  price!: number;

  @Prop(stringOptions)
  @IsString()
  @Length(3, 10)
  currency!: string;

  @Prop({ required: true })
  @IsString()
  @IsUrl()
  image!: string;

  @Prop(stringOptions)
  @IsString()
  @Length(3, 100)
  description!: string;

  @Prop(stringOptions)
  @IsString()
  @Length(3, 20)
  category!: string;

  @Prop({ required: true })
  @IsNumber()
  @IsPositive()
  stock!: number;

  @Prop({ required: true, default: true })
  isActive!: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
