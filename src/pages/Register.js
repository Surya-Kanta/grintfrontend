import {useContext, useState} from "react";
import {AuthContext} from "../contexts/AuthorizationContext";
import * as sha1 from "sha1";

const Register = () => {
    const auth = useContext(AuthContext);

    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(false);

    const [errors, setErrors] = useState({});

    const registerSubmit = (event) => {
        event.preventDefault();
        auth.register({
            name: name,
            email: email,
            password: sha1(password),
            password_confirmation: sha1(confirmPassword)
        });
    };

    return (
        <div className="container">
            <div className="row d-flex justify-content-center mt-4">
                <div className="col-md-4">
                    <form id="loginform" onSubmit={registerSubmit}>
                        <div className="form-group">
                            <label>Full name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                aria-describedby="emailHelp"
                                placeholder="Full Name"
                                onChange={event => setName(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
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
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirm-password"
                                placeholder="Password"
                                onChange={event => setConfirmPassword(event.target.value)}
                            />
                        </div>
                        {auth.errors.map(error => (
                            <small className="text-danger form-text">
                                {error.message}
                            </small>
                        ))}
                        <button type="submit" className="btn btn-primary">
                            Register
                        </button>
                        <a onClick={() => window.location.href = '/login'} className="btn btn-success text-white float-right">
                            Login
                        </a>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;