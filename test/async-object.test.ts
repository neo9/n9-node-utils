import ava from 'ava';

import { asyncObject, waitFor } from '../src';

async function aFunctionThatReturnAPromise(val: string, delay: number = 0): Promise<string> {
	await waitFor(delay);
	return val;
}

async function fail(delay: number = 0): Promise<void> {
	await waitFor(delay);
	throw new Error('fail');
}

ava.serial('Returns the results of promises + non-promises', async (t) => {
	const res = await asyncObject({
		foo: aFunctionThatReturnAPromise('foo'),
		bar: aFunctionThatReturnAPromise('bar'),
		baz: aFunctionThatReturnAPromise('baz'),
		n: null,
		u: undefined,
	});
	const expected: Record<string, any> = {
		foo: 'foo',
		bar: 'bar',
		baz: 'baz',
		n: null,
		u: undefined,
	};
	t.deepEqual(res, expected);
});

ava.serial('Returns empty object with no parameter', async (t) => {
	const obj = await asyncObject();
	t.deepEqual(obj, {});
});

ava.serial('Throws an error is one promise throws', async (t) => {
	const err = await t.throwsAsync(
		asyncObject({
			foo: fail(100),
			bar: aFunctionThatReturnAPromise('bar'),
			fail: fail(),
		}),
	);
	t.is(err.message, 'fail');
});
