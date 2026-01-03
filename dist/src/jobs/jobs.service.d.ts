import type { Queue } from 'bull';
import { PrismaService } from '../prisma/prisma.service';
export declare class JobsService {
    private readonly prisma;
    private readonly jobsQueue;
    constructor(prisma: PrismaService, jobsQueue: Queue);
    createJob(): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.JobStatus;
    }>;
    getJobStatus(id: string): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.JobStatus;
    }>;
}
