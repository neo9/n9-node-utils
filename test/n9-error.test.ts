import ava from 'ava';

import { N9Error } from '../src';

ava.serial('Should throw an error with a message', (t) => {
	const err = new N9Error('test');
	t.is(err.message, 'test');
	t.is(err.status, 500);
	t.deepEqual(err.context, {});
	t.true(err.stack?.includes('test/n9-error.test.ts'));
});

ava.serial('Should throw an error (status)', (t) => {
	const err = new N9Error('custom-status', 400);
	t.is(err.message, 'custom-status');
	t.is(err.status, 400);
	t.deepEqual(err.context, {});
});

ava.serial('Should throw an error (context)', (t) => {
	const err = new N9Error('custom-context', 505, { test: true });
	t.is(err.message, 'custom-context');
	t.is(err.status, 505);
	t.deepEqual(err.context, { test: true });
});

ava.serial(
	'Should render the content of an error in the context and the stacktrace when stringified',
	(t) => {
		const error: any = new Error('This is an generic JS error');
		error.status = 'this is a status';
		error.name = 'errors name';
		const n9err = new N9Error('error rendering', 500, { error });

		const resultError: Partial<N9Error> = {
			name: n9err.name,
			message: n9err.message,
			status: 500,
			context: {
				error: {
					status: 'this is a status',
					name: 'errors name',
					message: 'This is an generic JS error',
				},
			},
		};

		const expected = JSON.stringify(resultError).substring(0, -3);

		t.true(JSON.stringify(n9err).includes(expected));
		t.true(JSON.stringify(n9err).includes(`"stack":"`));
	},
);
