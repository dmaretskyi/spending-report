import styled, { css } from 'styled-components'

export interface ButtonProps {
  outlined?: boolean
}

export const Button = styled.button<ButtonProps>`
  min-width: 70px;
  padding: 5px 10px;
  border-radius: 8px;
  font-size: 15px;
  line-height: 20px;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  ${({ outlined }) => !outlined && css`
    background-color: red;
    color: white;

    &:hover {
      background-color: darkred;
    }
  `}

  ${({ outlined }) => outlined && css`
    background-color: white;
    color: red;
    border: 1px solid red;

    &:hover {
      color: darkred;
      border-color: darkred;
    }
  `}
`
