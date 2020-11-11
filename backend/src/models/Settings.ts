class Settings {
  dollar: number;
  cost: number;
  discounts: number;

  constructor({dollar, cost, discounts}: Settings) {
    this.dollar = dollar;
    this.cost = cost;
    this.discounts = discounts;
  }
}

export default Settings;