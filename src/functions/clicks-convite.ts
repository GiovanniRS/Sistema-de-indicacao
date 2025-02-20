import { redis } from '../redis/client'

interface ClicksConviteParams {
  idInscrito: string
}

export async function clicksConvite({ idInscrito }: ClicksConviteParams) {
  const cont = await redis.hget('convite:contador-acesso', idInscrito)

  return {
    cont: cont ? Number.parseInt(cont) : 0,
  }
}
