package ca.fabernumeris.luciole.model

import androidx.lifecycle.ViewModel
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import javax.inject.Inject


@HiltViewModel
class UserStateViewModel @Inject constructor() : ViewModel() {


    private val _isLoggedIn = MutableStateFlow(false)
    private val _userName = MutableStateFlow("")
    private val _password = MutableStateFlow("")

    val isLoggedIn: MutableStateFlow<Boolean> = _isLoggedIn
    val userName: MutableStateFlow<String> = _userName
    val password: MutableStateFlow<String> = _password



    fun login(email: String, password: String) {
        _isLoggedIn.value = true
        _userName.value = email
        _password.value = password
    }

    fun logout() {
        _isLoggedIn.value = false
        _userName.value = ""
        _password.value = ""
    }



}