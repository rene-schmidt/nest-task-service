import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import type { Queue } from 'bull';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JobsService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectQueue('jobs') private readonly jobsQueue: Queue,
  ) {}

  async createJob() {
    const created = await this.prisma.job.create({
      data: { status: 'PENDING' },
      select: { id: true, status: true },
    });

    await this.jobsQueue.add('run', { jobId: created.id });

    return created;
  }

  async getJobStatus(id: string) {
    const job = await this.prisma.job.findUnique({
      where: { id },
      select: { id: true, status: true },
    });

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    return job;
  }
}
