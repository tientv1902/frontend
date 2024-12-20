import axios from "axios";
import { axiosJWT } from "./UserService";

export const getAllProduct = async (search, limit) => {
    let res = {}
    if(search?.length > 0){
        res = await axios.get(`${process.env.REACT_APP_API_URL}/product/getAll?filter=name&filter=${search}&limit=${limit}`);
    }else{
        res = await axios.get(`${process.env.REACT_APP_API_URL}/product/getAll?limit=${limit}`);
    }
    
    return res.data;
};

export const createProuct = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/create`, data);
    return res.data;
};

export const getDetailsProduct = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/product-details/${id}`);
    return res.data;
};

export const getCategoryProduct = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/getCategory`);
    return res.data;
};

export const updateProduct = async (id, access_token, data) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/product/update/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    });
    return res.data;
};

export const deleteProduct = async (id, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/product/delete/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    });
    return res.data;
};

export const getAllProductCategory = async (type, page, limit) => {
    if(type){
       const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/getAll?filter=type&filter=${type}&limit=${limit}&page=${page}`);
       return res.data
    }
       
}
