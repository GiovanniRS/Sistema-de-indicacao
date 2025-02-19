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
  const result = await db.insert(inscritos).values({ nome, email }).returning()
  const inscrito = result[0]
  return {
    idInscrito: inscrito.id,
  }
}
