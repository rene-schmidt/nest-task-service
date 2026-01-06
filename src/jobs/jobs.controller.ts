import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { JobsService } from './jobs.service';

/**
 * HTTP controller for job-related endpoints.
 */
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  /**
   * Creates a new job.
   */
  @Post()
  createJob() {
    return this.jobsService.createJob();
  }

  /**
   * Returns the status of a job by ID.
   * @param id Job identifier
   */
  @Get(':id')
  getJobStatus(@Param('id') id: string) {
    return this.jobsService.getJobStatus(id);
  }
}
