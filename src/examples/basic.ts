import { pumpa } from '../index.js';

const app = pumpa();

app.listen(3333).then(() => {
  console.log('servidor rodando caralho');
});

// app.get('/health', () => {
//   return { status: 'ok' };
// });

app.get('/users/:id', (ctx) => {
  return { status: `${ctx}` };
});
