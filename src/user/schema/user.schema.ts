import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User{
    @Prop({ required: true })
    name: string;
  
    @Prop({ required: true })
    email: string;

    @Prop({required:true})
    role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
