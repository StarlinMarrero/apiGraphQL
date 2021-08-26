import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";


@ObjectType()
@Entity()
export class FileImage extends BaseEntity{

    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Field()
    @Column()
    filename: string

    @Field()
    @Column()
    mimetype: string

    @Field()
    @Column()
    encoding: string

    @Field()
    @Column()
    url: string

 
    @OneToMany(()=> User, user => user.images)
    users: User[]

}