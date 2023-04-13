import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class BaseRepository<T> {
  protected readonly BaseModel: Model<T>;

  protected readonly modelName: string;

  constructor(baseModel: Model<T>) {
    this.BaseModel = baseModel;
    this.modelName = this.BaseModel.modelName;
  }

  async findById(id: string): Promise<T> {
    const user = await this.BaseModel.findById(id);
    return user;
  }

  async validateUser(details: any): Promise<T> {
    try {
      const { email, fullName, subject, provider, picture } = details;

      const user = await this.BaseModel.findOne({
        provider,
        subject,
        // si va a tener multiples cuentas con diferentes roles:
        // role: this.modelName.toString().toLowerCase(),
      });
      if (!user) {
        console.log('user not Found, creating...');
        const newUser = new this.BaseModel({
          email,
          picture,
          firstName: fullName.split(' ')[0],
          lastName: fullName.split(' ')[1],
          provider,
          subject,
          role: this.modelName.toString().toLowerCase(),
        });

        await newUser.save();
        return newUser;
      }
      return user;
    } catch (error) {
      throw new HttpException(
        `Could not validate ${this.modelName}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
