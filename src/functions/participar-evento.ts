import { eq } from 'drizzle-orm'
import { db } from '../drizzle/client'
import { inscritos } from '../drizzle/schema/inscritos'
import { redis } from '../redis/client'

interface ParticiparEventoParams {
  nome: string
  email: string
  remetente?: string | null
}

export async function participarEvento({
  nome,
  email,
  remetente,
}: ParticiparEventoParams) {
  const inscrito = await db
    .select()
    .from(inscritos)
    .where(eq(inscritos.email, email))
  if (inscrito.length > 0) {
    return {
      idInscrito: inscrito[0].id,
    }
  }
  const result = await db.insert(inscritos).values({ nome, email }).returning()

  if (remetente) {
    await redis.zincrby('convite:ranking', 1, remetente)
  }

  return {
    idInscrito: result[0].id,
  }
}
