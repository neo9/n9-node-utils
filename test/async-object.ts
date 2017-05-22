import test from 'ava'

import { asyncObject, waitFor } from '../src'

async function p(val, delay = 0) {
	await waitFor(delay)
	return val
}

async function fail(delay = 0) {
	await waitFor(delay)
	throw new Error('fail')
}

test('Returns the results of promises + non-promises', async (t) => {
	const res = await asyncObject({
		foo: p('foo'),
		bar: p('bar'),
		baz: p('baz'),
		n: null,
		u: undefined
	})
	const expected = { foo: 'foo', bar: 'bar', baz: 'baz', n: null, u: undefined }
	t.deepEqual(res, expected)
})

test('Throws an error is one promise throws', async (t) => {
	const err = await t.throws(asyncObject({
		foo: fail(100),
		bar: p('bar'),
		fail: fail()
	}))
	t.is(err.message, 'fail')
})
