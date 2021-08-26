import { compare, hash } from "bcrypt";
import { Field, ID, ObjectType } from "type-graphql";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { FileImage } from "./fileImages";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToOne(()=> FileImage, image => image.users)
  images: FileImage[]


  @BeforeInsert()
  async hashPassword() {
    return (this.password = await hash(this.password, 10));
  }
  async compare(pass: string) {
    return await compare(pass, this.password);
  }
}
