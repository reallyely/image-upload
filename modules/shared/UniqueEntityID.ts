import { Identifier } from "./Identifier";
import { randomUUID } from "crypto";

export class UniqueEntityID extends Identifier<string | number> {
  constructor(id?: string | number) {
    super(id ? id : randomUUID());
  }
}
