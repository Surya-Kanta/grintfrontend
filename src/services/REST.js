import {GetBearerToken} from "./Storage";

const BACKEND_URL = process.env.REACT_APP_BACKEND_BASE_URL + '/';


export const GET = props => {
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };

    if (props.authRequired) {
        headers.Authorization = 'Bearer '+ GetBearerToken();
    }

    return new Promise((accept, reject) => {
        fetch(BACKEND_URL + props.url, {
            method: 'GET',
            headers: new Headers(headers),
            mode: 'cors'
        })
        .then(res => res.json())
        .then(response => {
            if (response.status) {
                accept(response);
            } else {
                reject(response);
            }
        })
        .catch(error => {
            reject(error);
        });
    });
};

export const POST = props => {
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };

    if (props.authRequired) {
        headers.Authorization = 'Bearer '+ GetBearerToken();
    }

    return new Promise((accept, reject) => {
        fetch(BACKEND_URL + props.url, {
            method: 'POST',
            headers: new Headers(headers),
            body: JSON.stringify(props.content),
            mode: 'cors'
        })
            .then(res => res.json())
            .then(response => {
                if (response.status) {
                    accept(response);
                } else {
                    reject(response);
                }
            })
            .catch(error => {
                reject(error);
            });
    });
};

export const DELETE = props => {
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };

    if (props.authRequired) {
        headers.Authorization = 'Bearer '+ GetBearerToken();
    }

    return new Promise((accept, reject) => {
        fetch(BACKEND_URL + props.url, {
            method: 'DELETE',
            headers: new Headers(headers),
            body: JSON.stringify(props.content ?? {}),
            mode: 'cors'
        })
            .then(res => res.json())
            .then(response => {
                if (response.status) {
                    accept(response);
                } else {
                    reject(response);
                }
            })
            .catch(error => {
                reject(error);
            });
    });
};