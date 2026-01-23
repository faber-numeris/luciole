package ca.fabernumeris.luciole

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.viewModels
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import ca.fabernumeris.luciole.model.TrackedObjectsViewModel
import ca.fabernumeris.luciole.model.UserStateViewModel
import ca.fabernumeris.luciole.routes.Routes
import ca.fabernumeris.luciole.ui.home.HomeScreen
import ca.fabernumeris.luciole.ui.login.LoginScreen
import ca.fabernumeris.luciole.ui.theme.FireflyTheme
import dagger.hilt.android.AndroidEntryPoint


@AndroidEntryPoint
class MainActivity : ComponentActivity() {


    // Inject the HiltViewModels into the activity
    private val trackedObjectsViewModel: TrackedObjectsViewModel by viewModels()
    private val userStateViewModel: UserStateViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContent {
            FireflyTheme {
                val trackedObjects by trackedObjectsViewModel.trackedObjects.collectAsState()

                val navController = rememberNavController()
                val isLoggedIn by userStateViewModel.isLoggedIn.collectAsState()


                LaunchedEffect(isLoggedIn) {
                    if (isLoggedIn) {
                        navController.navigate(Routes.HOME) {
                            popUpTo(Routes.LOGIN) { inclusive = true }
                        }
                    } else {
                        navController.navigate(Routes.LOGIN) {
                            popUpTo(Routes.HOME) { inclusive = true }
                        }
                    }
                }

                NavHost(
                    navController = navController,
                    startDestination = Routes.LOGIN
                ) {
                    composable(Routes.LOGIN) {
                        LoginScreen(userStateViewModel::login)
                    }
                    composable(Routes.HOME) {
                        HomeScreen(
                            onLogout = { userStateViewModel.logout() },
                            trackedObjects = trackedObjects
                        )
                    }
                }
            }
        }

    }
}







