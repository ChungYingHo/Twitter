import styled from 'styled-components'
const colors = {
    orange: '#ff6600',
    white: '#ffffff',
    lightGray: '#e6ecf0',
    darkGray: '#6c757d',
    Gray: '#f6f7f8'
}

const styledBorder = `#e6ecf0 solid 1px;`

const styledImg = `
    width: 50px;
    height: 50px;
    border-radius: 50%;
`

const styledName = `
    font-weight: 700;
    font-size: 16px;
    margin: 0;
`

const styledAccount = `
    font-weight: 400;
    font-size: 14px;
    color: #6c757d;
    margin: 0;
`

const styledContentFont = `
    font-size: 16px;
    font-weight: 400;
    margin: 0;
`

const styledIconFont = `
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    font-family: 'Montserrat', sans-serif;
`

const StyledBtn = styled.button`
  border-radius: 50px;
  border: ${colors.orange} 1px solid;
  background-color: ${colors.orange};
  font-weight: 400;
  font-size: 16px;
  color: ${colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  &:active{
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3) inset
  }
`



export {
    colors,
    styledBorder,
    styledImg,
    styledName,
    styledAccount,
    styledContentFont,
    styledIconFont,
    StyledBtn,
}