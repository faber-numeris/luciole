package ca.fabernumeris.luciole.gprpc

import ca.fabernumeris.luciole.BuildConfig
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * Unit test for GRPCClient to verify BuildConfig usage.
 */
class GRPCClientTest {
    @Test
    fun serverUrl_isConfiguredFromBuildConfig() {
        // Verify that SERVER_URL is defined in BuildConfig
        assertNotNull("SERVER_URL should be defined in BuildConfig", BuildConfig.SERVER_URL)
        assertTrue("SERVER_URL should not be empty", BuildConfig.SERVER_URL.isNotEmpty())
    }

    @Test
    fun serverUrl_hasValidFormat() {
        // Verify that SERVER_URL starts with http:// or https://
        val serverUrl = BuildConfig.SERVER_URL
        assertTrue(
            "SERVER_URL should start with http:// or https://",
            serverUrl.startsWith("http://") || serverUrl.startsWith("https://")
        )
    }
}
