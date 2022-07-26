import ava from 'ava';
import * as stream from 'stream';
import { N9JSONStream, N9JSONStreamResponse, waitFor } from '../src';

ava.serial('Return array ', async (t) => {
	let streamedData = '';
	const readable = new stream.Readable();

	const stream2 = readable.pipe(
		new N9JSONStream<{ _id: string }, { test: number }>({
			total: 5,
			metaData: {
				test: 1,
			},
		}),
	);

	stream2.on('data', (data) => {
		streamedData += data;
	});

	const items = [{ _id: 'a' }, { _id: 'b' }, { _id: 'c' }, { _id: 'd' }];
	items.forEach((item) => readable.push(item.toString()));
	// no more data
	readable.push(null);

	await waitFor(200);
	const dataParsed: N9JSONStreamResponse<{ _id: string }, { test: number }> =
		JSON.parse(streamedData);
	t.is(dataParsed.total, 5);
	t.is(dataParsed.count, 4);
	t.deepEqual(dataParsed.metaData, { test: 1 });
});

ava.serial('Throw error with wrong params ', async (t) => {
	await t.throws(() => new N9JSONStream({ total: undefined as any }));
});
