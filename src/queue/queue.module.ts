import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { JobsProcessor } from './jobs.processor';
import { PrismaService } from '../prisma/prisma.service';

/**
 * Parses an environment variable as an integer.
 * @param name Environment variable name
 * @param fallback Fallback value if parsing fails
 */
function envInt(name: string, fallback: number): number {
  const value = process.env[name];
  const parsed = value ? Number(value) : NaN;
  return Number.isFinite(parsed) ? parsed : fallback;
}

/**
 * Configures Bull queues and Redis connection.
 */
@Module({
  imports: [
    // Global Bull configuration with Redis
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST ?? 'redis',
        port: envInt('REDIS_PORT', 6379),
      },
    }),

    // Job queue used for background processing
    BullModule.registerQueue({ name: 'jobs' }),
  ],

  // Queue processor and database service
  providers: [JobsProcessor, PrismaService],

  // Expose Bull queues to other modules
  exports: [BullModule],
})
export class QueueModule {}
