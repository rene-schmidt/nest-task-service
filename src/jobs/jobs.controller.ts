import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  // POST /jobs
  @Post()
  createJob() {
    return this.jobsService.createJob();
  }


  // GET /jobs/:id
  @Get(':id')
  getJobStatus(@Param('id') id: string) {
    return this.jobsService.getJobStatus(id);
  }
}
