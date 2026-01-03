import type { Job } from 'bull';
import { PrismaService } from '../prisma/prisma.service';
export declare class JobsProcessor {
    private prisma;
    constructor(prisma: PrismaService);
    handle(job: Job<{
        jobId: string;
    }>): Promise<{
        ok: boolean;
    }>;
}
