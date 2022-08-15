import Cookies from 'js-cookie'
import config from '@/config'


export const TOKEN_KEY = 'token'
const { cookieExpires } = config

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



/**
 * @param {Array} routeMetched 当前路由metched
 * @returns {Array}
 */
export const getBreadCrumbList = (route) => {
  let routeMetched = route.matched
  let res = routeMetched.filter(item => {
    return item.meta === undefined || !item.meta.hideInBread
  }).map(item => {
    let meta = { ...item.meta }
    if (meta.title && typeof meta.title === 'function') {
      meta.__titleIsFunction__ = true
      meta.title = meta.title(route)
    }
    let obj = {
      icon: (item.meta && item.meta.icon) || '',
      name: item.name,
      meta: meta
    }
    return obj
  })
  res = res.filter(item => {
    return !item.meta.hideInMenu
  })
  return res
}

export const showTitle = (item) => {
  let { title } = item.meta
  if (!title) return
  else title = (item.meta && item.meta.title) || item.name
  return title
}
