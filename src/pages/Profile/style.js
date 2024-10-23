import styled from 'styled-components';
import { Card } from 'antd';

export const WrapperHeader = styled.h1`
  color: #2c3e50;
  font-size: 36px;
  margin-bottom: 10px;
  text-align: center;
  font-weight: bold;
  letter-spacing: 1.2px;
  text-transform: uppercase;
`;

export const WrapperContentProfile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 30px;
`;

export const WrapperLabel = styled.label`
  color: #555;
  font-size: 16px;
  margin-bottom: 10px;
  display: block;
  font-weight: 600;
`;

export const StyledCard = styled(Card)`
  width: 100%;
  max-width: 600px;
  padding: 30px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  background-color: #fff;
  transition: box-shadow 0.3s ease-in-out;
  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
`;
