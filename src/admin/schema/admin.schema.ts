import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type AdminDocument = HydratedDocument<Admin>;

@Schema()
export class Admin{
    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    lastName: string;
  
    @Prop({ required: true })
    email: string;

    @Prop({required:true})
    role: string;

    @Prop({ required: true })
    provider: string

    @Prop({ required: true })
    subject: string
}

export const AdminSchema = SchemaFactory.createForClass(Admin);