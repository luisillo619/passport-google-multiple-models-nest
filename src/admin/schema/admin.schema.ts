import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type AdminDocument = HydratedDocument<Admin>;

@Schema()
export class Admin{
    @Prop({ required: true })
    name: string;
  
    @Prop({ required: true })
    email: string;

    @Prop({required:true})
    role: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);