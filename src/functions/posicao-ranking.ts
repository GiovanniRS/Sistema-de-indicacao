import { redis } from '../redis/client'

interface PosicaoRankingParams {
  idInscrito: string
}

export async function posicaoRanking({ idInscrito }: PosicaoRankingParams) {
  const posicao = await redis.zrevrank('convite:ranking', idInscrito)

  if (posicao == null) {
    return { posicao: null }
  }

  return {
    posicao: posicao + 1,
  }
}
