import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Like, Repository } from 'typeorm';
import { Contact } from './contact.entity';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact) private contactRepository: Repository<Contact>,
  ) {}

  create(contact: Contact): Promise<Contact> {
    return this.contactRepository.save(contact);
  }

  findAll(userId: number, page: number, limit: number): Promise<Contact[]> {
    const skip = (page - 1) * limit;
    return this.contactRepository.find({
      where: { user: { id: userId } },
      skip: skip,
      take: limit,
    });
  }
 
  findByName(userId: number, name: string): Promise<Contact[]> {
    return this.contactRepository.find({
      where: 
        { user: { id: userId }, name: ILike(`%${name}%`) },
    });
  } 
}
