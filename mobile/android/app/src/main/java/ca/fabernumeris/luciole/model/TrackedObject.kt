package ca.fabernumeris.luciole.model

import ca.fabernumeris.tracking.v1.Position


data class TrackedObject(
    val id: String,
    val position: Position,
    val timestamp: Long = System.currentTimeMillis(),
)
