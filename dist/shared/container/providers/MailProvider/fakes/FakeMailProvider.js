"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class FakeMailProvider {
  constructor() {
    this.messages = [];
  }

  async sendEmail(message) {
    this.messages.push(message);
  }

}

exports.default = FakeMailProvider;