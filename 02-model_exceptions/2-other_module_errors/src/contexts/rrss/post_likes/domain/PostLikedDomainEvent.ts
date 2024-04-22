import { DomainEvent, DomainEventAttributes } from "../../../shared/domain/event/DomainEvent";

export class PostLikedDomainEvent extends DomainEvent {
	static eventName = "codely.rrss.post.liked";

	constructor(
		public readonly id: string,
		public readonly postId: string,
		public readonly likerUserId: string,
		eventId?: string,
		occurredOn?: Date,
	) {
		super(PostLikedDomainEvent.eventName, id, eventId, occurredOn);
	}

	static fromPrimitives(
		aggregateId: string,
		eventId: string,
		occurredOn: Date,
		attributes: DomainEventAttributes,
	): PostLikedDomainEvent {
		return new PostLikedDomainEvent(
			aggregateId,
			attributes.postId as string,
			attributes.likerUserId as string,
			eventId,
			occurredOn,
		);
	}

	toPrimitives(): DomainEventAttributes {
		return {
			id: this.id,
			postId: this.postId,
			likerUserId: this.likerUserId,
		};
	}
}
