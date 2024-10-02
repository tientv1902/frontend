import { Card } from "antd";
import styled from "styled-components";

export const WrapperCartStyle = styled(Card)`
    width: 200px;
    
    & img{
        height: 200px;
        width:200px;
    },
    .ant-card-body { /* Tương tác trực tiếp với phần thân của Card */
        padding: 10px;
    },
    position: relative;
    
`

// export const WrapperImageStyle = styled.img`
//     height: 1px;
//     width: 6px;
//     top: -1px;
//     left: -1px;
//     border-top-left-radius: 3px;
//     position: absolute;
    
// `

export const StyleNameProduct = styled.div`
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: rgb(56, 56, 61);
    
`
export const WrapperReportText = styled.div`
    font-size: 12px;
    color: rgb(128, 128, 137);
    display: flex;
    align-items: center;
    margin: 6px 0 0px;
`
export const WrapperPriceText = styled.div`
    color: rgb(255, 66, 78);
    font-size: 16px;
    font-weight: 500;
    
`

export const WrapperDiscountText = styled.span`
    color: rgb(255, 66, 78);
    font-size: 12px;
    font-weight: 500;
`

export const WrapperStyleTextSell = styled.span`
    font-size: 15px;
    line-height: 24px;
    color: rgb(120, 120, 120);
`