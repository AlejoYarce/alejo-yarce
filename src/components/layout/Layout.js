import React from 'react'

import '@/components/layout/styles/index.scss'
import Meta from '@/components/layout/Meta'

const Layout = (props) => {
  const { children } = props

  return (
    <div>
      <Meta />
      {children}
    </div>
  )
}

export default Layout
