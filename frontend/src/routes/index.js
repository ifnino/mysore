import { createBrowserRouter } from 'react-router-dom'
import App from '../App.js'
import Home from '../pages/Home.js'
import Login from '../pages/Login.js'
import ForgotPassword from '../pages/ForgotPassword.js'
import SignUp from '../pages/SignUp.js'
const router = createBrowserRouter([
    {
        path: "/",
        element : <App/>,
        children : [
            {
                path : "",
                element : <Home/>
            },
            {
                path : "login",
                element : <Login />
            },
            {
                path : "login/forgot-password",
                element : <ForgotPassword />
            },
            {
                path : "sign-up",
                element : <SignUp />
            }
            
        ]
    }
])

export default router
