class ApiKey {

  constructor(key) {
    this.key = key;
    this.end = new Date();
  }

  setEndDate() {
    this.end = this.end.setDate(this.end.getDate() + 1);
  }

}

module.exports = ApiKey;