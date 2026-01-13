package ca.fabernumeris.luciole

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.viewModels
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import ca.fabernumeris.luciole.constants.DEFAULT_COORDINATES
import ca.fabernumeris.luciole.constants.DEFAULT_STYLE_URL
import ca.fabernumeris.luciole.model.TrackedObject
import ca.fabernumeris.luciole.model.TrackedObjectsViewModel
import ca.fabernumeris.luciole.repository.ITrackedObjectsRepository
import dagger.hilt.android.AndroidEntryPoint
import org.maplibre.android.MapLibre
import org.maplibre.compose.camera.CameraPosition
import org.maplibre.compose.camera.rememberCameraState
import org.maplibre.compose.layers.CircleLayer
import org.maplibre.compose.map.MaplibreMap
import org.maplibre.compose.sources.GeoJsonData
import org.maplibre.compose.sources.rememberGeoJsonSource
import org.maplibre.compose.style.BaseStyle
import org.maplibre.spatialk.geojson.Position
import javax.inject.Inject


@AndroidEntryPoint
class MainActivity : ComponentActivity() {

    @Inject lateinit var tracedObjectsRepository: ITrackedObjectsRepository


    private val trackedObjectsViewModel: TrackedObjectsViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Initialize MapLibre once
        MapLibre.getInstance(this)

        // INSERT HERE: Start listening for updates
        trackedObjectsViewModel.listenForUpdates()

        setContent {
            val trackedObjects by trackedObjectsViewModel.trackedObjects.collectAsState()
            MainMap(trackedObjects = trackedObjects)
        }
    }
}

@Composable
fun MainMap(trackedObjects: Map<String, TrackedObject>) {
    val cameraState = rememberCameraState(CameraPosition(
        target = DEFAULT_COORDINATES,
        zoom = 14.0,
    ))


    MaplibreMap(baseStyle = BaseStyle.Uri(
            DEFAULT_STYLE_URL),
        cameraState = cameraState,
    ){
        MarkerLayer(trackedObjects)

    }
}

private fun createPointFeature(position: Position): String {
    return """
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [${position.longitude}, ${position.latitude}]
            }
        }
    """.trimIndent()
}

@Composable
private fun MarkerLayer(trackedObjects: Map<String, TrackedObject>) {

    // Create a FeatureCollection with all tracked objects
    val featuresJson = trackedObjects.values.joinToString(",") { obj ->
        if (!obj.position.hasCoordinate()){
            throw IllegalStateException("Object ${obj.id} has null coordinates")
        }
        val pos = Position(obj.position.coordinate.longitude, obj.position.coordinate.latitude)
        createPointFeature(pos)
    }

    val geoJsonString = """
        {
            "type": "FeatureCollection",
            "features": [$featuresJson]
        }
    """.trimIndent()

    val objectsSource = rememberGeoJsonSource(
        data = GeoJsonData.JsonString(geoJsonString)
    )

    // Add a circle layer that will render all markers
    CircleLayer(
        id = "tracked-objects-markers",
        source = objectsSource,
    )


}



