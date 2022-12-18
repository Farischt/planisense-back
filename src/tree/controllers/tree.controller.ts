import {
  Controller,
  Get,
  BadRequestException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  ParseBoolPipe,
} from '@nestjs/common'
import { Tree } from '@prisma/client'
import { TreeService } from '../services/tree.service'
import { AreaWithCount, GenderWithCount } from '../types'

@Controller('trees')
export class TreeController {
  constructor(private readonly treeService: TreeService) {}

  @Post('/generate/:numberOfTrees')
  public async createFromApi(
    @Param('numberOfTrees', ParseIntPipe) numberOfTrees: number,
  ): Promise<Tree[]> {
    if (numberOfTrees < 1) {
      throw new BadRequestException('numberOfTrees must be greater than 0')
    } else if (numberOfTrees > 200_000) {
      throw new BadRequestException('numberOfTrees must be less than 200 000')
    }

    return await this.treeService.createFromApi(numberOfTrees)
  }

  @Get('/areas')
  public async getAllAreas(@Query('paris') paris?: boolean): Promise<AreaWithCount[]> {
    let parisBoolean: boolean
    if (paris === undefined) {
      parisBoolean = false
    } else {
      parisBoolean = await new ParseBoolPipe().transform(paris, { type: 'query' })
    }

    return await this.treeService.getAllAreas(parisBoolean)
  }

  @Get('/genders')
  public async getAllGenders(): Promise<GenderWithCount[]> {
    return await this.treeService.getAllGenders()
  }
}
