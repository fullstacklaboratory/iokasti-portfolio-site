

import { getAbout } from '@/lib/about'
import React from 'react'

   // Content-Security-Policy: frame-ancestors <source>;


const CV = async () => {
    const content = await getAbout()

    console.log(content.cv)

  return (
    // problem https://stackoverflow.com/questions/27358966/how-can-i-set-x-frame-options-on-an-iframe
     <iframe
        className="w-screen h-screen"
        src={content.cv}
        // src='/2023.pdf'
        frameBorder="0"
      ></iframe> 
  )
}

export default CV