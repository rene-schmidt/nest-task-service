import { Processor, Process } from '@nestjs/bull';
import type { Job } from 'bull';
import { PrismaService } from '../prisma/prisma.service';

@Processor('jobs')
export class JobsProcessor {
  constructor(private prisma: PrismaService) {}

  @Process('run')
  async handle(job: Job<{ jobId: string }>) {
    const { jobId } = job.data;

    await this.prisma.job.update({
      where: { id: jobId },
      data: { status: 'PROCESSING' },
    });

    // Fake work: Doing 10 seconds nothing
    await new Promise((r) => setTimeout(r, 10_000));

    await this.prisma.job.update({
      where: { id: jobId },
      data: { status: 'DONE' },
    });

    return { ok: true };
  }
}
