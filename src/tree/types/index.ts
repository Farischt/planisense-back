import { Tree } from '@prisma/client'

export type SQLCount = {
  _all: number
}

export type AreaWithCount = {
  area: Tree['area']
  _count: SQLCount
}

export type GenderWithCount = {
  gender: Tree['gender']
  _count: SQLCount
}
