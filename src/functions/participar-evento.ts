import { eq } from 'drizzle-orm'
import { db } from '../drizzle/client'
import { inscritos } from '../drizzle/schema/inscritos'

interface ParticiparEventoParams {
  nome: string
  email: string
}

export async function participarEvento({
  nome,
  email,
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
  return {
    idInscrito: result[0].id,
  }
}
