import { Clock } from "../domain/Clock";

export class DateClock implements Clock {
	now(): Date {
		return new Date();
	}
}
