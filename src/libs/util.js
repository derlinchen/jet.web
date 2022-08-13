import Cookies from 'js-cookie'
import config from '@/config'


export const TOKEN_KEY = 'token'
const {cookieExpires} = config

export const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token, { expires: cookieExpires || 1 })
}

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)
  if (token) return token
  else return false
}


export const setMenuListInLocalstorage = list => {
  localStorage.menuList = JSON.stringify(list)
}

export const getMenuListFromLocalstorage = () => {
  const list = localStorage.menuList
  return list ? JSON.parse(list) : []
}

