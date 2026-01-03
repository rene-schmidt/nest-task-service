import { JobsService } from './jobs.service';
export declare class JobsController {
    private readonly jobsService;
    constructor(jobsService: JobsService);
    createJob(): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.JobStatus;
    }>;
    getJobStatus(id: string): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.JobStatus;
    }>;
}
