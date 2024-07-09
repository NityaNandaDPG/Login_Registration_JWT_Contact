import { Contact } from 'src/contact/contact.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  username: string;

  @Column()
  password: string;

@Column()
  email: string;
  @Column() 
  age: number;

  @Column({ default: false })
  isVerified: boolean;

  @OneToMany(() => Contact, contact =>contact.user)
  contacts: Contact[];
}
