package codely.contexts.shared.domain

trait EventBus {
	def publish(events: Seq[DomainEvent]): Unit
}
