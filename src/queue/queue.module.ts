import { Module } from '@nestjs/common';
import { BullModule, getQueueToken } from '@nestjs/bull';
import { JobsProcessor } from './jobs.processor';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [
    BullModule.forRoot({
      redis: { host: 'localhost', port: 6379 },
    }),
    BullModule.registerQueue({ name: 'jobs' }),
  ],
  providers: [JobsProcessor, PrismaService],
  exports: [BullModule],
})
export class QueueModule {}
