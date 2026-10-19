const test = require('node:test');
const assert = require('node:assert');
const { parseEvent } = require('../src/events');

test('accepts a valid event', () => {
  assert.deepStrictEqual(
    parseEvent('{"agent":"claude","session":"abc-123","state":"working"}'),
    { agent: 'claude', session: 'abc-123', state: 'working' },
  );
});

test('rejects bad JSON, unknown states and empty agents', () => {
  assert.strictEqual(parseEvent('not json'), null);
  assert.strictEqual(parseEvent('null'), null);
  assert.strictEqual(parseEvent('{"agent":"claude","state":"hacking"}'), null);
  assert.strictEqual(parseEvent('{"agent":"<>","state":"idle"}'), null);
});

test('strips odd characters and caps length', () => {
  const event = parseEvent(JSON.stringify({ agent: '<b>claude</b>' + 'x'.repeat(100), state: 'idle' }));
  assert.match(event.agent, /^[\w.-]{1,40}$/);
});
