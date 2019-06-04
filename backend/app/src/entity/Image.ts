import { Entity, Unique, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsNotEmpty } from "class-validator";

@Unique("Image_name_unique", image => [image.name])
@Unique("Image_high_unique", image => [image.high])
@Unique("Image_medium_unique", image => [image.medium])
@Unique("Image_low_unique", image => [image.low])
// TODO: valid image
@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty({ message: "Image.name.NotEmpty" })
  @Column()
  name: string;

  @IsNotEmpty({ message: "Image.high.NotEmpty" })
  @Column()
  high: string;

  @Column({ nullable: true })
  medium: string;

  @Column({ nullable: true })
  low: string;
}
