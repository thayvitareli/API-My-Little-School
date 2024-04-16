import { Module } from '@nestjs/common';
import { ClassGroupsService } from './class-groups.service';
import { ClassGroupsController } from './class-groups.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ClassGroupsController],
  providers: [ClassGroupsService],
})
export class ClassGroupsModule {}
