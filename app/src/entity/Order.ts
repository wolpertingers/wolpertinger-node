import {
  Entity,
  Unique,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import {
  IsNotEmpty,
  Length,
  ArrayMinSize,
  ArrayMaxSize,
  ArrayUnique
} from "class-validator";
import { Token } from "./Token";
import { ImageReference } from "./ImageReference";

@Unique("Order.orderer.unique", order => [order.orderer])
@Unique("Order.configuration.unique", order => [order.configuration])
@Unique("Order.token.unique", order => [order.token])
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty({ message: "Order.orderer.NotNull" })
  @Length(3, 100, { message: "Order.orderer.Length" })
  @Column()
  orderer: string;

  @IsNotEmpty({ message: "Order.visible.NotNull" })
  @Column({ default: false })
  visible: boolean;

  @Column({ nullable: true })
  comment: string;

  @Column({ nullable: true })
  url: string;

  @ArrayMinSize(6)
  @ArrayMaxSize(6)
  @ArrayUnique()
  @OneToMany(type => ImageReference, image => image.order, {
    eager: true,
    cascade: ["insert", "update", "remove"],
    onDelete: "CASCADE"
  })
  images: ImageReference[];

  @Column({ nullable: true })
  configuration: string;

  @IsNotEmpty({ message: "Order.token.NotNull" })
  @OneToOne(() => Token, { nullable: false, onDelete: "NO ACTION" })
  @JoinColumn()
  token: Token;
}
