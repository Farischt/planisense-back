import { Controller, Get, BadRequestException, Param, ParseIntPipe, Post } from '@nestjs/common'
import { TreeService } from '../services/tree.service'

@Controller('trees')
export class TreeController {
  constructor(private readonly treeService: TreeService) {}

  @Post('/generate/:numberOfTrees')
  public async createFromApi(@Param('numberOfTrees', ParseIntPipe) numberOfTrees: number) {
    if (numberOfTrees < 1) {
      throw new BadRequestException('numberOfTrees must be greater than 0')
    } else if (numberOfTrees > 200_000) {
      throw new BadRequestException('numberOfTrees must be less than 200 000')
    }

    return await this.treeService.createFromApi(numberOfTrees)
  }

  @Get('/areas')
  public async getAllAreas() {
    return await this.treeService.getAllAreas()
  }

  @Get('/genders')
  public async getAllGenders() {
    return await this.treeService.getAllGenders()
  }
}
