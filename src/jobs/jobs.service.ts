import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import type { Queue } from 'bull';
import { PrismaService } from '../prisma/prisma.service';

/**
 * Service responsible for creating jobs and querying their status.
 */
@Injectable()
export class JobsService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectQueue('jobs') private readonly jobsQueue: Queue,
  ) {}

  /**
   * Creates a new job and enqueues it for processing.
   */
  async createJob() {
    const created = await this.prisma.job.create({
      data: { status: 'PENDING' },
      select: { id: true, status: true },
    });

    // Enqueue job for background processing
    await this.jobsQueue.add('run', { jobId: created.id });

    return created;
  }

  /**
   * Returns the current status of a job.
   * @param id Job identifier
   * @throws NotFoundException if the job does not exist
   */
  async getJobStatus(id: string) {
    const job = await this.prisma.job.findUnique({
      where: { id },
      select: { id: true, status: true },
    });

    // Job not found in database
    if (!job) {
      throw new NotFoundException('Job not found');
    }

    return job;
  }
}
