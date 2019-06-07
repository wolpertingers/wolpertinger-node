import {
  PrimaryGeneratedColumn,
  Entity,
  Unique,
  Column,
  JoinTable,
  ManyToOne
} from "typeorm";
import { IsNotEmpty, Min, Max } from "class-validator";
import { Image } from "./Image";
import { Order } from "./Order";

@Unique("ImageReference.image.unique", reference => [
  reference.image,
  reference.order
])
@Unique("ImageReference.level.unique", reference => [
  reference.level,
  reference.order
])
@Entity()
export class ImageReference {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @ManyToOne(type => Image, {
    nullable: false,
    eager: true,
    onDelete: "NO ACTION"
  })
  image: Image;

  @IsNotEmpty()
  @ManyToOne(type => Order, order => order.images, {
    lazy: true,
    onDelete: "CASCADE"
  })
  @JoinTable()
  order: Order[];

  @Min(1, { message: "ImageReference.level.Range" })
  @Max(6, { message: "ImageReference.level.Range" })
  @IsNotEmpty({ message: "ImageReference.level.NotNull" })
  @Column()
  level: number;
}
