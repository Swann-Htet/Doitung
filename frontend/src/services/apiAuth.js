import api from '@/utils/api';

export const logInUser = async ({ email, password }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const { data } = await api.post("/api/auth/login", { email, password });
    return data;
};

export const getCurrentUser = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) throw new Error('No access token found');
    
    const { data } = await api.get("/api/auth/user-data", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return data;
};