import React from 'react'
import { Work_Sans, Spline_Sans_Mono } from 'next/font/google'
import clsx from 'clsx'

import {
  LIGHT_TOKENS,
  DARK_TOKENS,
  BLOG_TITLE,
  COLOR_THEME_NAME,
  BLOG_DESCRIPTION,
} from '@/constants'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './styles.css'
import RespectUserMotionPreference from '@/components/RespectUserMotionPreference'
import { cookies } from 'next/headers'

const mainFont = Work_Sans({
  subsets: ['latin'],
  display: 'fallback',
  weight: 'variable',
  variable: '--font-family',
})
const monoFont = Spline_Sans_Mono({
  subsets: ['latin'],
  display: 'fallback',
  weight: 'variable',
  variable: '--font-family-mono',
})

export const metadata = {
  title: BLOG_TITLE,
  description: BLOG_DESCRIPTION,
}

function RootLayout({ children }) {
  const savedTheme = cookies().get(COLOR_THEME_NAME)

  const theme = savedTheme?.value || 'light'

  return (
    <RespectUserMotionPreference>
      <html
        lang='en'
        className={clsx(mainFont.variable, monoFont.variable)}
        data-color-theme={theme}
        style={theme === 'light' ? LIGHT_TOKENS : DARK_TOKENS}
      >
        <body>
          <Header initialTheme={theme} />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </RespectUserMotionPreference>
  )
}

export default RootLayout
