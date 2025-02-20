import { inArray } from 'drizzle-orm'
import { db } from '../drizzle/client'
import { inscritos } from '../drizzle/schema/inscritos'
import { redis } from '../redis/client'

export async function ranking() {
  const rankingRedis = await redis.zrevrange(
    'convite:ranking',
    0,
    2,
    'WITHSCORES'
  )

  const ranking: Record<string, number> = {}

  for (let i = 0; i < rankingRedis.length; i += 2) {
    ranking[rankingRedis[i]] = Number.parseInt(rankingRedis[i + 1])
  }

  const resultado = await db
    .select()
    .from(inscritos)
    .where(inArray(inscritos.id, Object.keys(ranking)))

  const rankingInscritos = resultado
    .map(inscrito => {
      return {
        id: inscrito.id,
        nome: inscrito.nome,
        pontos: ranking[inscrito.id],
      }
    })
    .sort((a, b) => {
      return b.pontos - a.pontos
    })

  return { rankingInscritos }
}
