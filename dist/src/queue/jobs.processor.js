"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsProcessor = void 0;
const bull_1 = require("@nestjs/bull");
const prisma_service_1 = require("../prisma/prisma.service");
let JobsProcessor = class JobsProcessor {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async handle(job) {
        const { jobId } = job.data;
        await this.prisma.job.update({
            where: { id: jobId },
            data: { status: 'PROCESSING' },
        });
        await new Promise((r) => setTimeout(r, 10_000));
        await this.prisma.job.update({
            where: { id: jobId },
            data: { status: 'DONE' },
        });
        return { ok: true };
    }
};
exports.JobsProcessor = JobsProcessor;
__decorate([
    (0, bull_1.Process)('run'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JobsProcessor.prototype, "handle", null);
exports.JobsProcessor = JobsProcessor = __decorate([
    (0, bull_1.Processor)('jobs'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], JobsProcessor);
//# sourceMappingURL=jobs.processor.js.map