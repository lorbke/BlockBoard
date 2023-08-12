"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBillBoardDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_bill_board_dto_1 = require("./create-bill-board.dto");
class UpdateBillBoardDto extends (0, mapped_types_1.PartialType)(create_bill_board_dto_1.CreateBillBoardDto) {
}
exports.UpdateBillBoardDto = UpdateBillBoardDto;
//# sourceMappingURL=update-bill-board.dto.js.map