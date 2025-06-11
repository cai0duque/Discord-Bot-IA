import test from 'node:test';
import assert from 'node:assert/strict';

const regex = /<@!?(\d+)>/;

const cases = [
  ['<@123456> hello', 'hello'],
  ['<@!123456> hello', 'hello'],
];

for (const [input, expected] of cases) {
  test(`extract prompt from "${input}"`, () => {
    const result = input.replace(regex, '').trim();
    assert.equal(result, expected);
  });
}
