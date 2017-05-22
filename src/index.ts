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
