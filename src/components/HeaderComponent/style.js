import { Row } from 'antd';
import styled from 'styled-components';

export const WrapperHeader = styled(Row)`
    background-color: #f5f5f5;
    padding: 10px 120px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); 
    align-items: center;
    gap: 16px;
    flex-wrap: nowrap;
`;

export const WrapperTextHeader = styled.span`
    font-size: 30px;
    color: black;
    font-weight: bold;
    text-align: left;
`;

export const WrapperHeaderAccount = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const WrapperTextHeaderSmall = styled.span`
    font-size: 16px;                
    color: #333;                  
    font-weight: 600;               
    padding: 5px 10px;              
    border-radius: 5px;             
    cursor: pointer;                 
    transition: background-color 0.3s; 
    
    &:hover {
        background-color: #f0f0f0;   
    }
`;

export const WrapperContentPopup = styled.p`
    cursor: pointer;
    padding: 8px 12px; // Add padding for better spacing
    border-radius: 5px; // Rounded corners for a softer look
    transition: background-color 0.2s, color 0.2s; // Smooth transitions for hover effects
    
    &:hover {
        background-color: #f0f0f0; // Light background on hover
        color: rgb(26, 148, 255); // Change text color on hover
    }
`;


