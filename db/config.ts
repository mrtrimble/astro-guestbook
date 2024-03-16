import { defineDb, defineTable, column, NOW } from 'astro:db';

const GuestBook = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    author: column.text(),
    content: column.text(),
    timestamp: column.date({ default: NOW }),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: { GuestBook},
});
