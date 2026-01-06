import { Processor, Process } from '@nestjs/bull';
import type { Job } from 'bull';
import { PrismaService } from '../prisma/prisma.service';

/**
 * Bull processor for the "jobs" queue.
 */
@Processor('jobs')
export class JobsProcessor {
  constructor(private prisma: PrismaService) {}

  /**
   * Executes a background job.
   * @param job Bull job containing the job payload
   */
  @Process('run')
  async handle(job: Job<{ jobId: string }>) {
    const { jobId } = job.data;

    // Update job status to processing
    await this.prisma.job.update({
      where: { id: jobId },
      data: { status: 'PROCESSING' },
    });

    // Simulate long-running work (10 seconds)
    await new Promise((r) => setTimeout(r, 10_000));

    // Update job status to done
    await this.prisma.job.update({
      where: { id: jobId },
      data: { status: 'DONE' },
    });

    return { ok: true };
  }
}
