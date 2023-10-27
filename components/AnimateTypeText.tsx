"use client";

import React from 'react'
import Typewriter from 'typewriter-effect'

const AnimateTypeText = () => {
  return (
    <Typewriter
        options={{
            strings: ['GigaChad', 'Everyone'],
            autoStart: true,
            loop: true,
            cursor: '|'
        }}
    />
  )
}

export default AnimateTypeText