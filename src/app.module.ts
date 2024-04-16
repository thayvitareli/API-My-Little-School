import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { StudentsModule } from './modules/students/students.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    StudentsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
