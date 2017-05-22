import test from 'ava'

import { waitFor } from '../src'

test('Should wait for 100ms', async (t) => {
	const start = Date.now()
	await waitFor(100)
	t.true(Date.now() - start >= 100)
})

test('Should work without parameter', async (t) => {
	const start = Date.now()
	await waitFor()
	t.true(Date.now() - start <= 10)
})
