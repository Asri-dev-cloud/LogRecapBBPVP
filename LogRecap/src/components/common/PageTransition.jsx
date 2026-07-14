import React from 'react'

const PageTransition = ({ children, className = '' }) => {
  return (
    <main className={`pt-28 ${className}`}>
      {children}
    </main>
  )
}

export default PageTransition
