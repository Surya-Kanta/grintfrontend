import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import {AuthContext} from "./contexts/AuthorizationContext";
import {useContext} from "react";


const App = () => {
    const auth = useContext(AuthContext);

    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to={auth.user ? '/profile' : '/login'}/>}/>
                    <Route path="login" element={auth.user ? <Navigate to={'/profile'}/> : <Login/>}/>
                    <Route path="register" element={auth.user ? <Navigate to={'/profile'}/> : <Register/>}/>
                    <Route path="profile" element={auth.user ? <Profile/> : <Navigate to={'/login'}/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
