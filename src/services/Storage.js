
export const GetBearerToken = () => {
    return localStorage.getItem('Authorization') ?? '';
};

export const SetBearerToken = value => {
    localStorage.setItem('Authorization', value);
};