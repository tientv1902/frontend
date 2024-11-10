import { axiosJWT } from "./UserService";


export const createOrder = async ( data, access_token) => {
    console.log('accesstoken', { data, access_token})
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/order/create`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    });
    return res.data;
};

export const getOrderDetails = async ( id, access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/order-details/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    });
    return res.data;
};

export const getOrderDetailsById = async ( id, access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/order-details-by-id/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    });
    return res.data;
    
};

export const deleteOrderDetails = async ( id, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/order/delete-order/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    });
    return res.data;
    
};