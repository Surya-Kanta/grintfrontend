import {useContext} from "react";
import {AuthContext} from "../contexts/AuthorizationContext";

const Profile = () => {
    const auth = useContext(AuthContext);

    return (
        <div className="container">
            <div className="row d-flex justify-content-center mt-4">
                <div className="col-md-4">
                    <div className="form-group">
                        <label>Full name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={auth.user.name}
                            aria-describedby="emailHelp"
                            placeholder="Full Name"
                            disabled={true}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={auth.user.email}
                            placeholder="Enter email"
                            disabled={true}
                        />
                    </div>
                    <a onClick={() => auth.logout()} className="btn btn-danger float-right">
                        Logout
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Profile;