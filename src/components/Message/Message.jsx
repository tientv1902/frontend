import { message } from "antd"

const success = (mes = 'Success') => {
    message.success(mes);
}

const error = (mes = 'Error') => {
    message.success(mes);
}

const warning = (mes = 'Warning') => {
    message.success(mes);
}

export {success, error, warning}