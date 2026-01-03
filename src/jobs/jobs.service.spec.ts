import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InjectQueue } from '@nestjs/bull';
import type { Queue } from 'bull';

@Injectable()
export class JobsService {
  constructor(
    private prisma: PrismaService,
    @InjectQueue('jobs') private jobsQueue: Queue,
  ) {}

  async createJob() {
    const job = await this.prisma.job.create({
      data: { status: 'PENDING' },
    });

    await this.jobsQueue.add('run', { jobId: job.id });

    return { id: job.id, status: job.status };
  }

  async getJobStatus(id: string) {
    const job = await this.prisma.job.findUnique({ where: { id } });
    if (!job) throw new NotFoundException('Job not found');
    return { id: job.id, status: job.status };
  }
}
