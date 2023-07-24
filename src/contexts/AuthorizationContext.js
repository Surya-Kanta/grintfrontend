import {createContext, useEffect, useState} from "react";
import {GetBearerToken, SetBearerToken} from "../services/Storage";
import {DELETE, GET, POST} from "../services/REST";

export const AuthContext = createContext(null);

const AuthorizationContext = ({children}) => {

    const [loaded, setLoaded] = useState(false);
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState([]);

    const login = payload => {
        setErrors([]);
        POST({
            url: 'auth/login',
            content: payload
        })
            .then(response => {
                if (response.status) {
                    SetBearerToken(response.response.session_token);
                    window.location.href = '/profile';
                }
            })
            .catch(error => {
                if (error?.content?.errors) {
                    setErrors(error.content.errors);
                } else {
                    alert(error.message+'!');
                }
            });
    };

    const register = payload => {
        POST({
            url: 'auth/register',
            content: payload
        })
            .then(response => {
                if (response.status && window.confirm('Registration successful.\n Go to login page.')) {
                    window.location.href = '/login';
                }
            })
            .catch(error => {
                if (error?.content?.errors) {
                    setErrors(error.content.errors);
                } else {
                    alert(error.message+'!');
                }
            });
    };

    const logout = () => {
        DELETE({
            url: 'auth/logout',
            authRequired: true
        })
            .then(response => {
                if (response.status) {
                    SetBearerToken(null);
                    window.location.href = '/login';
                }
            })
            .catch(error => {
                alert(error.message+'!');
            });
    };

    const getProfile = () => {
        GET({
            url: 'auth/me',
            authRequired: true
        })
            .then(response => {
                if (response.status) {
                    setUser(response.response.user);
                }
            })
            .catch(error => {
                console.log(error.message);
            })
            .finally(() => {
                setLoaded(true);
            });
    };

    useEffect(() => {
        const authToken = GetBearerToken();
        if (authToken) {
            getProfile();
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            loaded: loaded,
            user: user,
            errors: errors,
            login: login,
            register: register,
            logout: logout
        }}>
            {loaded ? children : null}
        </AuthContext.Provider>
    )
};

export default AuthorizationContext;
