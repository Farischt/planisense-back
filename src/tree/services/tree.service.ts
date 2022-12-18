import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { Tree, Prisma } from '@prisma/client'

import { PrismaService } from '../../database/prisma.service'
import { AreaWithCount, GenderWithCount } from '../types'

@Injectable()
export class TreeService {
  constructor(
    private readonly httpService: HttpService,
    private readonly prismaService: PrismaService,
  ) {}

  /**
   * Create a tree
   *
   * @param data create data
   * @returns created tree
   */
  private async create(data: Prisma.TreeCreateInput): Promise<Tree> {
    return await this.prismaService.tree.create({ data })
  }

  /**
   * Get a tree by id
   * @param id tree id
   * @returns tree
   */
  private async get(id: Tree['id']): Promise<Tree | null> {
    return await this.prismaService.tree.findUnique({ where: { id } })
  }

  /**
   * Get all areas with number of trees
   * @returns areas with number of trees
   */
  public async getAllAreas(paris: boolean): Promise<AreaWithCount[]> {
    return (await this.prismaService.tree.groupBy({
      where: {
        area: {
          contains: paris ? 'PARIS' : '',
        },
      },
      by: ['area'],
      _count: {
        _all: true,
      },
      orderBy: {
        area: 'asc',
      },
    })) as unknown as AreaWithCount[]
  }

  public async getAllGenders(): Promise<GenderWithCount[]> {
    return (await this.prismaService.tree.groupBy({
      by: ['gender'],
      _count: {
        _all: true,
      },
      orderBy: {
        gender: 'asc',
      },
    })) as unknown as GenderWithCount[]
  }

  /**
   * Create trees from Paris Open Data API
   * @param numberOfRows number of rows to fetch
   * @returns created trees
   * @throws Error if API call fails
   */
  public async createFromApi(numberOfRows = 10): Promise<Tree[]> {
    const apiUrl = `https://opendata.paris.fr/api/records/1.0/search/?dataset=les-arbres&q=&rows=${numberOfRows}&facet=arrondissement&facet=genre&facet=idbase`
    const r = await this.httpService.get(apiUrl).toPromise()

    if (!r || r.status !== 200) {
      console.log('Could not fetch trees')
      throw new Error('Could not fetch trees')
    }

    const trees: Tree[] = r.data.records
      .map((record: any) => record.fields)
      .map(async (tree: any) => {
        const exist = await this.get(tree.idbase)

        if (!exist) {
          const createdTree = await this.create({
            id: tree.idbase,
            area: tree.arrondissement,
            gender: tree.genre,
          })

          return createdTree
        }
        console.log('Tree already exists', tree.idbase)
      })

    return trees
  }
}
