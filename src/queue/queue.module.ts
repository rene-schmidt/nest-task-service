import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { JobsProcessor } from './jobs.processor';
import { PrismaService } from '../prisma/prisma.service';

function envInt(name: string, fallback: number) {
  const v = process.env[name];
  const n = v ? Number(v) : NaN;
  return Number.isFinite(n) ? n : fallback;
}

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST ?? 'redis',
        port: envInt('REDIS_PORT', 6379),
      },
    }),
    BullModule.registerQueue({ name: 'jobs' }),
  ],
  providers: [JobsProcessor, PrismaService],
  exports: [BullModule],
})
export class QueueModule {}
