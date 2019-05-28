import { Table, Column, Model, AllowNull } from "sequelize-typescript";

@Table
export class Image extends Model<Image> {
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
