"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class FakeMailTempalateProvider {
  async parse() {
    return 'Mail tempplate';
  }

}

exports.default = FakeMailTempalateProvider;