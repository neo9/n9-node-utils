import { Response } from 'express'
import { EventEmitter } from 'events'
import { Transform } from 'stream'

/*
** N9Error(message [, status] [, context])
*/
export class N9Error extends Error {
	public message: string
	public status: number
	public context: any

	constructor(message: string, status?: number, context?: any) {
		super(message)
		this.message = message
		this.status = status || 500
		this.context = context || {}
		Error.captureStackTrace(this, N9Error)
	}
}

/*
** ok(promise: Promise): <Promise>
*/
export async function ok(promise: Promise<any>): Promise<any> {
	try {
		return await promise
	} catch (err) {
		return
	}
}

/*
** cb(fn: Function, args: ...any): <Promise>
*/
export async function cb(fn: (...args: any[]) => any, ...args: any[]): Promise<any> {
	return new Promise((resolve, reject) => {
		fn(...args, (err, result) => {
			if (err) return reject(err)
			resolve(result)
		})
	})
}

/*
** waitFor(ms)
*/
export async function waitFor(ms?: number): Promise<any> {
	return new Promise((resolve) => setTimeout(resolve, ms || 0))
}

/*
** waitForEvent(emmiter, eventName)
*/
export async function waitForEvent(emmiter: EventEmitter, eventName: string): Promise<any> {
	return new Promise((resolve, reject) => {
		emmiter.once(eventName, (...args) => resolve([...args]))
	})
}

/*
** asyncObject(obj): Promise<Object>
*/
export async function asyncObject(obj = {}): Promise<any> {
	const containsPromise = (key) => obj[key] && typeof obj[key].then === 'function'
	const keys = Object.keys(obj).filter(containsPromise)
	const promises = keys.map((key) => obj[key])
	const results = await Promise.all(promises)
	const container = Object.assign({}, obj)
	results.forEach((result, index) => {
		const key = keys[index]
		container[key] = result
	})
	return container
}

export interface N9JSONStreamOptionsBase {
	total: number,
	limit?: number,
	offset?: number,
	count?: number,
	metaData?: any
}

export interface N9JSONStreamOptions extends N9JSONStreamOptionsBase {
	res?: Response
	key?: string
}

/**
 * N9JSONStreamResponse
 */
export interface N9JsonStreamResponse<T> {
	items: T[]
	count: number
	total: number
	limit?: number
	offset?: number
	metaData?: any
}

/*
** N9JSONStream(basObject)
*/
export class N9JSONStream extends Transform {
	private first: boolean
	private readonly base: N9JSONStreamOptionsBase
	private readonly key: string

	constructor(options: N9JSONStreamOptions) {
		super({
			readableObjectMode: true,
			writableObjectMode: true
		})

		const requiredKeys = ['total']
		requiredKeys.forEach((key) => {
			if (typeof options[key] === 'undefined') {
				throw new N9Error(`'${key}' property is required to N9JSONStream class`)
			}
		})
		if (options.res) {
			options.res.setHeader('Content-Type', 'application/json; charset=utf-8')
		}
		this.first = true
		this.base = {
			total: options.total,
			limit: options.limit,
			offset: options.offset,
			metaData: options.metaData,
			count: 0
		}
		this.key = options.key || 'items'
		this.push(`{"${this.key}":[`)
	}

	public _transform(item, encoding, next) {
		if (!this.first) this.push(',')
		else this.first = false

		this.push(JSON.stringify(item))
		this.base.count++

		return next()
	}

	public _flush(next) {
		const keys = ['limit', 'offset', 'total', 'count', 'metaData']

		const keysWithValue = keys.filter((key) => typeof this.base[key] !== 'undefined')

		this.push('],')
		keysWithValue.forEach((key, i) => {
			if (typeof this.base[key] === 'object') {
				this.push(`"${key}": ${JSON.stringify(this.base[key])}`)
			} else {
				this.push(`"${key}": ${this.base[key]}`)
			}
			if (i < keysWithValue.length - 1) this.push(',')
		})
		this.push('}')

		return next()
	}
}
