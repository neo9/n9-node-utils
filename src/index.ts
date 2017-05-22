import { EventEmitter } from 'events'

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
** waitFor(ms)
*/
export async function waitFor(ms?: number) {
	return new Promise((resolve) => setTimeout(resolve, ms || 0))
}

/*
** waitForEvent(emmiter, eventName)
*/
export async function waitForEvent(emmiter: EventEmitter, eventName: string) {
	return new Promise((resolve, reject) => {
		emmiter.once(eventName, (...args) => resolve([...args]))
	})
}

/*
** asyncObject(obj): Promise<Object>
*/
export async function asyncObject(obj = {}) {
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
