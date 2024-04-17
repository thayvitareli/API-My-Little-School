import { Module } from '@nestjs/common';
import { ResponsiblesService } from './responsibles.service';
import { ResponsiblesController } from './responsibles.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ResponsiblesController],
  providers: [ResponsiblesService],
})
export class ResponsiblesModule {}
