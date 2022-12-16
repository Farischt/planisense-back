import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { TreeService } from './tree.service'

@Controller('tree')
export class TreeController {
  constructor(private readonly treeService: TreeService) {}

  @Get()
  findAll() {
    return this.treeService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.treeService.findOne(+id)
  }
}
