
export const GetBearerToken = () => {
    return localStorage.getItem('Authorization') ?? '';
};

export const SetBearerToken = value => {
    localStorage.setItem('Authorization', value);
};

export const GetRememberData = () => {
    const data = localStorage.getItem('Remember');

    if (!data) {
        return null;
    }

    if ('object' === typeof data) {
        return data;
    }

    return JSON.parse(data);
};

export const SetRememberData = user => {
    const data = localStorage.setItem('Remember', user ? JSON.stringify(user) : null);
};