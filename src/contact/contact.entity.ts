export class ContactEntity {}
import { User } from 'src/user/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @ManyToOne(() => User, user => user.contacts,{onDelete:'CASCADE'})
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;
}
