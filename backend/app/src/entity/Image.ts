import { Table, Column, Model, AllowNull, Unique } from "sequelize-typescript";

@Table
export class Image extends Model<Image> {
  @Unique({ name: "Image_name_unique", msg: "Image name must be unique." })
  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  high: string;

  @Column
  medium: string;

  @Column
  low: string;
}
