import { ColumnNameQueryBuilder } from "knex";

class Settings {
  dollar: number;
  cost: number;
  discounts: number;

  constructor(dollar: number, cost: number, discounts: number) {
    this.dollar = dollar;
    this.cost = cost;
    this.discounts = discounts;
  }
}

export default Settings;