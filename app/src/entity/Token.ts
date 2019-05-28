import { Table, Column, Model, AllowNull, Unique } from "sequelize-typescript";

@Table
export class Token extends Model<Token> {
  @Unique({ name: "Token_value_unique", msg: "Token has to be unique." })
  @AllowNull(false)
  @Column
  value: string;
}
