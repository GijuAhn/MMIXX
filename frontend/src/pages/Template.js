import { Outlet, useLocation } from 'react-router-dom'
import styled from 'styled-components'

import { NavBar } from 'components/NavBar'
import { PlayBar } from 'components/PlayBar'

const Template = () => {
  return (
    <TemplateDiv>
      <NavBar />
      <Outlet />
      <PlayBar />
    </TemplateDiv>
  )
}

const TemplateDiv = styled.div`
  display: grid;
  grid-auto-rows: 200px 1200px;
`
export default Template;