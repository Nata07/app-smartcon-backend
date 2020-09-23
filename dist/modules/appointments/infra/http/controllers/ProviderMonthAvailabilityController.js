"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListProviderMonthAvailibilityService = _interopRequireDefault(require("../../../services/ListProviderMonthAvailibilityService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProviderMonthAvailabilityController {
  async index(request, response) {
    const {
      provider_id
    } = request.params;
    const {
      month,
      year
    } = request.query;

    const listProviderMonthAvailability = _tsyringe.container.resolve(_ListProviderMonthAvailibilityService.default);

    const availability = await listProviderMonthAvailability.execute({
      provider_id,
      month: Number(month),
      year: Number(year)
    });
    return response.json(availability);
  }

}

exports.default = ProviderMonthAvailabilityController;