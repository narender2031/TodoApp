export const TodoSchema = {
  name: 'Todo',
  primaryKey: 'id',
  properties: {
    id: 'int',
    title: 'string',
    text: 'string',
    createdAt: 'date',
    updatedAt: 'date',
    status: 'string',
  },
};
