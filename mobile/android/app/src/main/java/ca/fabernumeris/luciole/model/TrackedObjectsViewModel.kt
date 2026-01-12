package ca.fabernumeris.luciole.model

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import ca.fabernumeris.luciole.constants.DEFAULT_COORDINATES
import ca.fabernumeris.luciole.repository.ITrackedObjectsRepository
import ca.fabernumeris.luciole.repository.TrackedObjectsRepository
import ca.fabernumeris.tracking.v1.Coordinate
import ca.fabernumeris.tracking.v1.Position
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class TrackedObjectsViewModel @Inject constructor (
    private val repository : ITrackedObjectsRepository

    ) : ViewModel() {

    private val _trackedObjects = MutableStateFlow<Map<String, TrackedObject>>(emptyMap())

    val trackedObjects: StateFlow<Map<String, TrackedObject>> = _trackedObjects.asStateFlow()

    fun addTrackedObject(id: String, position: Position) {
        _trackedObjects.value += (id to TrackedObject(id, position))
    }

    fun updateObjectPosition(id: String, newPosition: Position) {
        _trackedObjects.value += (id to TrackedObject(id, newPosition))
    }

    fun removeTrackedObject(id: String) {
        _trackedObjects.value -= id
    }

    fun listenForUpdates() {

        val initialPosition = Position.Builder()
            .coordinate(coordinate = Coordinate(
                DEFAULT_COORDINATES.latitude,
                DEFAULT_COORDINATES.longitude
            ))
            .build()
        addTrackedObject("object-1", initialPosition)

        viewModelScope.launch {
            while (true) {
                val objs = repository.getTrackedObjects()
                updateObjectPosition("object-1", objs[0].position)
            }
        }
    }
}




