import test from 'ava';
import { Stream } from 'stream';
import { N9JSONStream, waitFor } from '../src';

test('Return array ', async (t) => {
	let streamedData = '';
	const readable = new Stream.Readable();

	const stream = readable
			.pipe(new N9JSONStream<object>({
				total: 5,
			}));

	stream.on('data', (data) => {
		streamedData += data;
	});

	const items = [{ _id: 'a' }, { _id: 'b' }, { _id: 'c' }, { _id: 'd' }];
	items.forEach((item) => readable.push(item.toString()));
	// no more data
	readable.push(null);

	await waitFor(200);
	const dataParsed = JSON.parse(streamedData);
	t.is(dataParsed.total, 5);
	t.is(dataParsed.count, 4);
});

test('Throw error with wrong params ', async (t) => {
	await t.throws(() => {
		const a = new N9JSONStream({ total: undefined });
	});
});
