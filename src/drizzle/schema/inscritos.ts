import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const inscritos = pgTable('inscritos', {
  id: uuid('id').primaryKey().defaultRandom(),
  nome: text('nome').notNull(),
  email: text('email').notNull().unique(),
  criadoEm: timestamp('criado_em').notNull().defaultNow(),
})
