import { redis } from '../redis/client'

interface ClicksLinkConviteParams {
  idInscrito: string
}

export async function clicksLinkConvite({
  idInscrito,
}: ClicksLinkConviteParams) {
  const cont = await redis.hget('convite:contador-acesso', idInscrito)

  return {
    cont: cont ? Number.parseInt(cont) : 0,
  }
}
