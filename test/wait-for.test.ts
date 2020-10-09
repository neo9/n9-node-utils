import ava from 'ava';

import { waitFor } from '../src';

ava.serial('Should wait for 100ms', async (t) => {
	const start = Date.now();
	await waitFor(100);
	t.true(Date.now() - start >= 100);
});

ava.serial('Should work without parameter', async (t) => {
	const start = Date.now();
	await waitFor();
	t.true(Date.now() - start <= 30);
});
