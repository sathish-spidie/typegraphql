import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { Field, ObjectType, ID, Root } from "type-graphql";

@ObjectType()
@Entity()
export class Users123 extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column("text", { unique: true })
  email: string;

  @Column()
  password: string;

  @Column("bool", { default: false })
  confirmed: boolean;

  @Field()
  name(@Root() parent: Users123): string {
    return `${parent.firstName} ${parent.lastName}`;
  }
  //   @Column("bool", { default: false })
  //   confirmed: boolean;
}
