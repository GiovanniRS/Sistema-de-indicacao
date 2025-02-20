import { redis } from '../redis/client'

interface AcessarConviteParams {
  idInscrito: string
}

export async function acessarConvite({ idInscrito }: AcessarConviteParams) {
  await redis.hincrby('convite:contador-acesso', idInscrito, 1)
}
