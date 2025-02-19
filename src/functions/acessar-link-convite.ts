import { redis } from '../redis/client'

interface AcessarLinkConviteParams {
  idInscrito: string
}

export async function acessarLinkConvite({
  idInscrito,
}: AcessarLinkConviteParams) {
  await redis.hincrby('convite:contador-acesso', idInscrito, 1)
}
