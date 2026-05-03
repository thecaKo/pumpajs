import test from 'node:test';
import assert from 'node:assert/strict';
import { pumpa } from './index.js';

test('should create a pumpajs app', () => {
  const app = pumpa();

  assert.equal(app.name, 'pumpajs');
});
