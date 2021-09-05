import styled from 'styled-components'

export const ContactContainer = styled.div`
    background: #0c0c0c;
    display: grid;
    z-index: 1;
    min-height: 860px;
    width: 100%;
    max-width: 1100px;
    margin-right: auto;
    margin-left: auto;
    padding: 0 24px;
    justify-content: center;
    color: #fff;
`
export const ContactContent = styled.div`
    display: flex;
    margin-top: 25px;
`

export const ContactLeft = styled.div`
    flex: 0.4 1;
`
export const ContactRight = styled.div`
    flex: 0.6 1;
    margin-left: 4%;
`
export const ContactFormItem = styled.div`
    flex: 0.48 1;
`
export const ContactFormInput = styled.input`
    width: 100%;
    border: 2px solid;
    margin-bottom: 4%;
    padding: 1.5% 2%;
    outline: none;
    transition: .4s ease-in-out;
`
export const ContactFormTextArea = styled.textarea`
    width: 100%;
    height: 70%;
    border: 2px solid;
    padding: 1.5% 2%;
    outline: none;
    transition: .4s ease-in-out;
`
export const ContactFormHeading = styled.h2`
    width: 200px;
    position: relative;
    padding-bottom: 5px;
    border-bottom: 2px solid #fff;
    margin-bottom: 2%;
    &:after{
        content: "";
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 30px;
        border-bottom: 2px solid #01BF71;
    }

    
`
export const ContactForm = styled.form`
    display: flex;
    justify-content: space-between;
`