"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillBoardModule = void 0;
const common_1 = require("@nestjs/common");
const bill_board_service_1 = require("./bill-board.service");
const bill_board_controller_1 = require("./bill-board.controller");
const prisma_module_1 = require("../prisma/prisma.module");
let BillBoardModule = exports.BillBoardModule = class BillBoardModule {
};
exports.BillBoardModule = BillBoardModule = __decorate([
    (0, common_1.Module)({
        controllers: [bill_board_controller_1.BillBoardController],
        providers: [bill_board_service_1.BillBoardService],
        imports: [prisma_module_1.PrismaModule],
    })
], BillBoardModule);
//# sourceMappingURL=bill-board.module.js.map