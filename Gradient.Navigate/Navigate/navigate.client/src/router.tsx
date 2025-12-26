import { Children, createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactElement, ReactNode } from 'react'

type NavigateOptions = {
  replace?: boolean
}

type NavigateFunction = (to: string, options?: NavigateOptions) => void

type RouterState = {
  path: string
  navigate: NavigateFunction
}

type RouteProps = {
  path: string
  element: ReactNode
}

type RouteMatch = {
  element: ReactNode
  params: Record<string, string | undefined>
}

const RouterContext = createContext<RouterState | null>(null)
const RouteMatchContext = createContext<Record<string, string | undefined>>({})

const normalizePath = (value: string) => {
  if (!value.startsWith('/')) {
    return `/${value}`
  }
  if (value.length > 1 && value.endsWith('/')) {
    return value.slice(0, -1)
  }
  return value
}

const matchPath = (pattern: string, pathname: string): RouteMatch | null => {
  if (pattern === '*') {
    return { element: null, params: {} }
  }

  const normalizedPattern = normalizePath(pattern)
  const normalizedPath = normalizePath(pathname)

  if (normalizedPattern === normalizedPath) {
    return { element: null, params: {} }
  }

  const patternParts = normalizedPattern.split('/').filter(Boolean)
  const pathParts = normalizedPath.split('/').filter(Boolean)

  if (patternParts.length !== pathParts.length) {
    return null
  }

  const params: Record<string, string | undefined> = {}
  for (let index = 0; index < patternParts.length; index += 1) {
    const patternPart = patternParts[index]
    const pathPart = pathParts[index]
    if (patternPart.startsWith(':')) {
      params[patternPart.slice(1)] = pathPart
      continue
    }
    if (patternPart !== pathPart) {
      return null
    }
  }

  return { element: null, params }
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(() => normalizePath(window.location.pathname))

  useEffect(() => {
    const handlePopState = () => {
      setPath(normalizePath(window.location.pathname))
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = useCallback<NavigateFunction>((to, options) => {
    const nextPath = normalizePath(to)
    if (options?.replace) {
      window.history.replaceState(null, '', nextPath)
    } else {
      window.history.pushState(null, '', nextPath)
    }
    setPath(nextPath)
  }, [])

  const value = useMemo(() => ({ path, navigate }), [path, navigate])

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}

export function Route(_props: RouteProps) {
  return null
}

export function Routes({ children }: { children: ReactNode }) {
  const router = useContext(RouterContext)
  if (!router) {
    throw new Error('Routes must be rendered inside RouterProvider.')
  }

  const { path } = router
  const elements = useMemo(() => Children.toArray(children), [children])

  let match: RouteMatch | null = null
  for (const child of elements) {
    if (!child || typeof child !== 'object') {
      continue
    }
    const element = child as ReactElement<RouteProps>
    if (element.type !== Route) {
      continue
    }
    const candidate = matchPath(element.props.path, path)
    if (candidate) {
      match = {
        element: element.props.element,
        params: candidate.params,
      }
      break
    }
  }

  if (!match) {
    return null
  }

  return <RouteMatchContext.Provider value={match.params}>{match.element}</RouteMatchContext.Provider>
}

export function useNavigate() {
  const router = useContext(RouterContext)
  if (!router) {
    throw new Error('useNavigate must be used within RouterProvider.')
  }
  return router.navigate
}

export function useParams<T extends Record<string, string | undefined>>() {
  return useContext(RouteMatchContext) as T
}

export function Navigate({ to, replace }: { to: string; replace?: boolean }) {
  const navigate = useNavigate()
  useEffect(() => {
    navigate(to, { replace })
  }, [navigate, replace, to])
  return null
}
