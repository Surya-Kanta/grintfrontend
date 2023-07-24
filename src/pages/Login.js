import {useContext, useState} from "react";
import {AuthContext} from "../contexts/AuthorizationContext";
import * as sha1 from "sha1";

const Login = () => {
    const auth = useContext(AuthContext);

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [remember, setRemember] = useState(false);

    const loginSubmit = (event) => {
        event.preventDefault();
        auth.login({
            email: email,
            password: sha1(password)
        });
    };

    return (
        <div className="container">
            <div className="row d-flex justify-content-center mt-4">
                <div className="col-md-4">
                    <form id="loginform" onSubmit={loginSubmit}>
                        <div className="form-group">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                aria-describedby="emailHelp"
                                placeholder="Enter email"
                                onChange={event => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Password"
                                onChange={event => setPassword(event.target.value)}
                            />
                        </div>
                        <div className="form-group form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="remember"
                                onChange={event => setRemember(event.target.checked)}
                            />
                            <label className="form-check-label">Remember</label>
                        </div>
                        {auth.errors.map(error => (
                            <small className="text-danger form-text">
                                {error.message}
                            </small>
                        ))}
                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                        <a onClick={() => window.location.href = '/register'} className="btn btn-success text-white float-right">
                            Register
                        </a>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;