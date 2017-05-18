import test from 'ava'

import { N9Error } from '../src'

test('Should throw an error with a message', (t) => {
	const err = new N9Error('test')
	t.is(err.message, 'test')
	t.is(err.status, 500)
	t.deepEqual(err.context, {})
	t.true(err.stack.includes('dist/test/index.js'))
})

test('Should throw an error (status)', (t) => {
	const err = new N9Error('custom-status', 400)
	t.is(err.message, 'custom-status')
	t.is(err.status, 400)
	t.deepEqual(err.context, {})
})

test('Should throw an error (context)', (t) => {
	const err = new N9Error('custom-context', 505, { test: true })
	t.is(err.message, 'custom-context')
	t.is(err.status, 505)
	t.deepEqual(err.context, { test: true })
})
