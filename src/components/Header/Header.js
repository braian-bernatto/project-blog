'use client'
import React from 'react'
import clsx from 'clsx'
import { Rss, Sun, Moon } from 'react-feather'

import Logo from '@/components/Logo'
import VisuallyHidden from '@/components/VisuallyHidden'
import Cookie from 'js-cookie'

import { LIGHT_TOKENS, DARK_TOKENS, COLOR_THEME_NAME } from '@/constants'

import styles from './Header.module.css'

function Header({ initialTheme, className, ...delegated }) {
  const [theme, setTheme] = React.useState(initialTheme)

  function toggleTheme() {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    const nextTokens = theme === 'light' ? DARK_TOKENS : LIGHT_TOKENS

    setTheme(nextTheme)
    Cookie.set(COLOR_THEME_NAME, nextTheme, { expires: 1000 })

    const root = document.documentElement
    root.setAttribute('data-color-theme', nextTheme)
    Object.entries(nextTokens).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })
  }

  return (
    <header className={clsx(styles.wrapper, className)} {...delegated}>
      <Logo />

      <div className={styles.actions}>
        <a className={styles.action} href='/rss.xml'>
          <Rss
            size='1.5rem'
            style={{
              transform: 'translate(2px, -2px)',
            }}
          />
          <VisuallyHidden>View RSS feed</VisuallyHidden>
        </a>
        <button className={styles.action} onClick={toggleTheme}>
          {theme === 'light' ? <Sun size='1.5rem' /> : <Moon size='1.5rem' />}
          <VisuallyHidden>
            Toggle {theme === 'light' ? 'dark' : 'light'} mode
          </VisuallyHidden>
        </button>
      </div>
    </header>
  )
}

export default Header
