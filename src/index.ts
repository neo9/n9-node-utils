import { EventEmitter } from 'events';
import { NextFunction, Response } from 'express';
import * as os from 'os';
import { Transform } from 'stream';

/**
 * N9Error(message [, status] [, context])
 *
 *  @param status The HTTP Status of the error. i.e. : 404 → Not Found
 *  @param context Should be an object helping to understand the error
 */
export class N9Error extends Error {
	public readonly date: Date;
	public readonly hostname: string;
	public readonly message: string;
	public readonly status: number;
	public context: any;

	constructor(message: string, status?: number, context?: Record<string, any>) {
		super(message);
		this.date = new Date();

		// we check if an error has been passed in the context
		// if so we create an intermediary object
		// to allow JSON.stringify to work correctly render the error's message
		if (context) {
			for (const key of Object.keys(context)) {
				if (context[key] instanceof Error) {
					context[key] = {
						...context[key],
						message: context[key].message,
						name: context[key].name,
						stack: context[key].stack,
					};
				}
			}
		}

		this.message = message;
		this.status = status || 500;
		this.context = context || {};
		this.hostname = os.hostname();
		Error.captureStackTrace(this, N9Error);
	}

	/**
	 *
	 */
	public toJSON?(): object {
		return {
			name: this.name,
			message: this.message,
			status: this.status,
			context: this.context,
			stack: this.stack,
			date: this.date,
			hostname: this.hostname,
		};
	}
}

/*
 ** ok(promise: Promise): <Promise>
 */
export async function ok(promise: Promise<any>): Promise<any> {
	try {
		return await promise;
	} catch (err) {
		return;
	}
}

/*
 ** cb(fn: Function, args: ...any): <Promise>
 */
export async function cb<T = any>(fn: (...args: any[]) => any, ...args: any[]): Promise<T> {
	return new Promise<T>((resolve, reject) => {
		fn(...args, (err: Error, result: T) => {
			if (err) return reject(err);
			resolve(result);
		});
	});
}

/*
 ** waitFor(ms)
 */
export async function waitFor(ms?: number): Promise<any> {
	return new Promise((resolve) => setTimeout(resolve, ms || 0));
}

/*
 ** waitForEvent(emmiter, eventName)
 */
export async function waitForEvent(emmiter: EventEmitter, eventName: string): Promise<any> {
	return new Promise((resolve) => {
		emmiter.once(eventName, (...args) => resolve([...args]));
	});
}

/*
 ** asyncObject(obj): Promise<Object>
 */
export async function asyncObject(
	obj: Record<string, Promise<any> | any> = {},
): Promise<Record<string, any>> {
	const keys = Object.keys(obj).filter(
		(key: string) => obj[key] && typeof obj[key].then === 'function',
	);
	const promises = keys.map((key) => obj[key]);
	const results = await Promise.all(promises);
	const container = Object.assign({}, obj);
	results.forEach((result, index) => {
		const key = keys[index];
		container[key] = result;
	});
	return container;
}

export interface N9JSONStreamOptionsBase {
	total: number;
	limit?: number;
	offset?: number;
	count?: number;
	metaData?: any;
}

export interface N9JSONStreamOptions extends N9JSONStreamOptionsBase {
	res?: Response;
	key?: string;
}

/**
 * N9JSONStreamResponse
 */
export interface N9JSONStreamResponse<T> {
	items: T[];
	count: number;
	total: number;
	limit?: number;
	offset?: number;
	metaData?: any;
}

/**
 * N9JSONStream(baseObject)
 *
 */
export class N9JSONStream<T = object> extends Transform {
	private first: boolean;
	private readonly base: N9JSONStreamOptionsBase;
	private readonly key: string;

	/**
	 * Usage example :
	 * ```
	 * 	const cursor = await this.service.find(filter, page, size);
	 *  return cursor.pipe(
	 *    new N9JSONStream({
	 *        res, // express response
	 *        total: await cursor.count(),
	 *      }),
	 *    );
	 *
	 * ```
	 * @param options should give at least Express Response to stream in, and the total number of elements
	 */
	constructor(options: N9JSONStreamOptions) {
		super({
			readableObjectMode: true,
			writableObjectMode: true,
		});

		if (typeof options.total === 'undefined') {
			throw new N9Error(`'total' property is required to N9JSONStream class`);
		}
		if (options.res) {
			options.res.setHeader('Content-Type', 'application/json; charset=utf-8');
		}
		this.first = true;
		this.base = {
			total: options.total,
			limit: options.limit,
			offset: options.offset,
			metaData: options.metaData,
			count: 0,
		};
		this.key = options.key || 'items';
		this.push(`{"${this.key}":[`);
	}

	public _transform(item: T, encoding: string, next: NextFunction): void {
		if (!this.first) this.push(',');
		else this.first = false;

		this.push(JSON.stringify(item));
		this.base.count += 1;

		return next();
	}

	public _flush(next: NextFunction): void {
		const keys: (keyof N9JSONStreamOptionsBase)[] = [
			'limit',
			'offset',
			'total',
			'count',
			'metaData',
		];

		const keysWithValue = keys.filter((key) => typeof this.base[key] !== 'undefined');

		this.push('],');
		keysWithValue.forEach((key, i) => {
			const value = this.base[key];
			if (typeof value === 'object') {
				this.push(`"${key}": ${JSON.stringify(value)}`);
			} else {
				this.push(`"${key}": ${value}`);
			}
			if (i < keysWithValue.length - 1) this.push(',');
		});
		this.push('}');

		return next();
	}
}
