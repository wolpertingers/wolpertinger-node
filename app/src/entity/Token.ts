import { Entity, Unique, Column, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";

@Unique("Token_value_unique", token => [token.value])
@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ readonly: true })
  value: string;
}
