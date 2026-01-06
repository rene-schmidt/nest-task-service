import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InjectQueue } from '@nestjs/bull';
import type { Queue } from 'bull';

/**
 * Service for creating jobs and retrieving their status.
 */
@Injectable()
export class JobsService {
  constructor(
    private prisma: PrismaService,
    @InjectQueue('jobs') private jobsQueue: Queue,
  ) {}

  /**
   * Creates a new job and enqueues it for background processing.
   */
  async createJob() {
    const job = await this.prisma.job.create({
      data: { status: 'PENDING' },
    });

    // Enqueue job for processing
    await this.jobsQueue.add('run', { jobId: job.id });

    return { id: job.id, status: job.status };
  }

  /**
   * Retrieves the current status of a job.
   * @param id Job identifier
   * @throws NotFoundException if the job does not exist
   */
  async getJobStatus(id: string) {
    const job = await this.prisma.job.findUnique({ where: { id } });

    // Job not found in database
    if (!job) throw new NotFoundException('Job not found');

    return { id: job.id, status: job.status };
  }
}
