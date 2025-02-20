import { redis } from '../redis/client'

interface ContConviteParams {
  idInscrito: string
}

export async function contConvite({ idInscrito }: ContConviteParams) {
  const cont = await redis.zscore('convite:ranking', idInscrito)

  return {
    cont: cont ? Number.parseInt(cont) : 0,
  }
}
