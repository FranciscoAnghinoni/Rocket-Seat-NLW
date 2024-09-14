import dayjs from 'dayjs'
import { client, db } from '.'
import { goalCompletions, goals } from './schema'

async function seed() {
  await db.delete(goalCompletions)
  await db.delete(goals)

  const result = await db
    .insert(goals)
    .values([
      { title: 'Exercise', desiredWeeklyFrequency: 3 },
      { title: 'Read', desiredWeeklyFrequency: 5 },
      { title: 'Meditate', desiredWeeklyFrequency: 7 },
      { title: 'Eat healthly', desiredWeeklyFrequency: 1 },
      { title: 'Run', desiredWeeklyFrequency: 6 },
      { title: 'Play', desiredWeeklyFrequency: 2 },
      { title: 'Drink water', desiredWeeklyFrequency: 4 },
    ])
    .returning()

  const startWeekDay = dayjs().startOf('week')

  await db.insert(goalCompletions).values([
    { goalId: result[0].id, createdAt: startWeekDay.toDate() },
    { goalId: result[1].id, createdAt: startWeekDay.add(1, 'day').toDate() },
  ])
}

seed().finally(() => client.end())
