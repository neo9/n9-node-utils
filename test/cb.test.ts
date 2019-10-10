import test from 'ava';

import { cb } from '../src';

function read(file: string, callback: (error?: Error, content?: string) => void): NodeJS.Timer {
	if (file === 'foo.txt') {
		return setTimeout(() => callback(null, 'contents'), 0);
	}
	setTimeout(() => callback(new Error('file not found')), 0);
}

test('Passes args and receives results', async (t) => {
	const result = await cb(read, 'foo.txt');
	t.is(result, 'contents');
});

test('Throws an error if (err) is truthy', async (t) => {
	const err = await t.throws(cb(read, 'bar.txt'));
	t.is(err.message, 'file not found');
});
