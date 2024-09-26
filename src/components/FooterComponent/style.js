import styled from 'styled-components';
import { Row } from 'antd';

export const WrapperFooter = styled.div`
  background-color: #f5f5f5;
  padding: 10px 120px;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  align-items: center;
  
  margin-top: auto; /* This ensures it pushes to the bottom */
`;

export const WrapperFooterSection = styled(Row)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const WrapperFooterText = styled.span`
  font-size: 14px;
  color: black;
  margin-bottom: 10px;
  display: block;
`;

export const WrapperFooterLink = styled.a`
  display: block;
  font-size: 14px;
  color: black;
  margin-bottom: 8px;
  &:hover {
    color: #1890ff;
    text-decoration: underline;
  }
`;

export const WrapperFooterIcon = styled.span`
  font-size: 20px;
  color: black;
  cursor: pointer;
  &:hover {
    color: #1890ff;
  }
`;
