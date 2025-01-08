import styled from "styled-components";

export const DivisorLine = styled.div`

    position: relative;
    width: 100%;

    &::after{

        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        height: .5px;
        background-color: #aaa;
    }


`