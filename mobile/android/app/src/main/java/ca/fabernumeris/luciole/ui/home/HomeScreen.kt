package ca.fabernumeris.luciole.ui.home

import androidx.compose.foundation.layout.Box
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.ui.platform.LocalContext
import ca.fabernumeris.luciole.constants.DEFAULT_COORDINATES
import ca.fabernumeris.luciole.constants.DEFAULT_STYLE_URL
import ca.fabernumeris.luciole.model.TrackedObject
import org.maplibre.android.MapLibre
import org.maplibre.compose.camera.CameraPosition
import org.maplibre.compose.camera.rememberCameraState
import org.maplibre.compose.layers.CircleLayer
import org.maplibre.compose.map.MaplibreMap
import org.maplibre.compose.sources.GeoJsonData
import org.maplibre.compose.sources.rememberGeoJsonSource
import org.maplibre.compose.style.BaseStyle
import org.maplibre.spatialk.geojson.Position


@Composable
fun HomeScreen(
    trackedObjects: Map<String, TrackedObject>,
    onLogout: () -> Unit) {

    val context = LocalContext.current
    LaunchedEffect(Unit) {
        MapLibre.getInstance(context)
    }
    Box {
        MainMap(trackedObjects)
        Button(onClick = onLogout) {
            Text("Logout")
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
    val featuresJson = trackedObjects.values
        .filter { obj -> obj.position.hasCoordinate() }
        .joinToString(",") { obj ->
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