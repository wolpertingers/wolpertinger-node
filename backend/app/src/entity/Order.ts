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
  IsUrl,
  ArrayMinSize,
  ArrayMaxSize,
  ArrayUnique
} from "class-validator";
import { Token } from "./Token";
import { ImageReference } from "./ImageReference";

@Unique("Order_orderer_unique", order => [order.orderer])
@Unique("Order_configuration_unique", order => [order.configuration])
@Unique("Order_token_unique", order => [order.token])
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

  @Length(0, 512, { message: "Order.comment.Length" })
  @Column({ nullable: true })
  comment: string;

  @IsUrl({}, { message: "Order.url.format" })
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