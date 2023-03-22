import { Outlet } from 'react-router-dom'

import { NavBar } from 'components/NavBar'
import { PlayBar } from 'components/PlayBar'

const Template = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <PlayBar />
    </>
  )
}

export default Template;