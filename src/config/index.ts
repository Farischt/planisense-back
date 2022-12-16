import * as config from './config.json'

export type PostgresConfiguration = {
  POSTGRES_HOSTNAME: string
  POSTGRES_USER: string
  POSTGRES_PASSWORD: string
  POSTGRES_DB: string
  POSTGRES_PORT: number
}

export type BaseConfiguration = {
  DB: PostgresConfiguration
}

export default (): BaseConfiguration => {
  return {
    DB: {
      POSTGRES_HOSTNAME: config.POSTGRES_HOSTNAME,
      POSTGRES_USER: config.POSTGRES_USER,
      POSTGRES_PASSWORD: config.POSTGRES_PASSWORD,
      POSTGRES_DB: config.POSTGRES_DB,
      POSTGRES_PORT: config.POSTGRES_PORT,
    },
  }
}
