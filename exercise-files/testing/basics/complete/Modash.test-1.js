/* keep this line for cq processing (issue #19) */
import Modash from './Modash';

const string = 'there was one catch, and that was CATCH-22';
const actual = Modash.truncate(string, 19);
const expected = 'there was one catch...';

if (actual !== expected) {
  console.log(
    `[FAIL] Expected \`truncate()\` to return '${expected}', got '${actual}'`
  );
} else {
  console.log('[PASS] `truncate()`.');
}
