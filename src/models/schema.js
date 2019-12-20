export const SectionSchema = {
  name: 'Section',
  primaryKey: 'title',
  properties: {
    id: {type: 'string'},
    title: {type: 'string', indexed: true},
    createdAt: 'date',
    updatedAt: 'date',
    todos: 'Todo[]',
  },
};

export const TodoSchema = {
  name: 'Todo',
  primaryKey: 'id',
  properties: {
    id: {type: 'string', indexed: true},
    title: 'string',
    text: 'string',
    createdAt: 'date',
    updatedAt: 'date',
    status: 'string',
    sections: {
      type: 'linkingObjects',
      objectType: 'Section',
      property: 'todos',
    },
  },
};
