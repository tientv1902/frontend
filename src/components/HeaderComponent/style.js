import {Row} from 'antd';
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
    background-color: #f5f5f5;
    padding: 10px 120px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); 
    align-items: center;
    gap: 16px;
    flex-wrap: nowrap;
    
`
export const WrapperTextHeader = styled.span`
    font-size: 30px;
    color: black;
    font-weight: bold;
    text-align: left;
`
export const WrapperHeaderAccount = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    
`
export const WrapperTextHeaderSmall = styled.span`
    font-size: 14px;
    color: black;
    white-space: nowrap;
`

export const WrapperContentPopup = styled.p`
    cursor: pointer;
    &:hover {
        color: rgb(26, 148, 255);
    }
`