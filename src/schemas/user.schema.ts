import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsString, IsUrl, Length } from 'class-validator';

@Schema()
export class User {
  @Prop({ required: true, unique: true, index: true })
  @IsString()
  @IsEmail()
  email!: string;

  @Prop({ required: true, trim: true, lowercase: true })
  @IsString()
  @Length(2, 30)
  name!: string;

  @Prop()
  @IsString()
  @IsUrl()
  image?: string;

  @Prop({ default: true })
  isActive?: boolean;

  @Prop({ default: false })
  isAdmin?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
