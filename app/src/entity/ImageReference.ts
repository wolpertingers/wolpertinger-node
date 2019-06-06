import {
  PrimaryGeneratedColumn,
  Entity,
  Unique,
  Column,
  Not,
  JoinTable,
  ManyToOne
} from "typeorm";
import { IsInt, IsEmpty, IsNotEmpty, Min, Max } from "class-validator";
import { Image } from "./Image";
import { Order } from "./Order";

@Unique("ImageReference_image_unique", reference => [
  reference.image,
  reference.order
])
@Unique("ImageReference_level_unique", reference => [
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
