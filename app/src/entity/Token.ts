import { Entity, Unique, Column, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";

@Unique("Token.value.unique", token => [token.value])
@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ readonly: true })
  value: string;
}
