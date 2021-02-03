import React, { lazy, Suspense } from "react"
import { Switch, Route, Redirect } from "react-router-dom"

const Main = lazy(() => import("../pages/Main/Main"))
const Tasks = lazy(() => import("../pages/Tasks/Tasks"))
const Login = lazy(() => import("../pages/Login/Login"))
const EmptyLayout = lazy(() => import("../layouts/EmptyLayout"))

const useRoutes = isAuthenticated =>
  isAuthenticated ? (
    <Switch>
      <Suspense fallback='Loading ...'>
        <Route exact path='/' component={Main} />
      </Suspense>
      <Suspense fallback='Loading ...'>
        <Route exact path='/tasks' component={Main} />
      </Suspense>
      <Redirect to='/' />
    </Switch>
  ) : (
    <Switch>
      <Suspense fallback='Loading ...'>
        <Route exact path='/'>
          <EmptyLayout>
            <Login />
          </EmptyLayout>
        </Route>
      </Suspense>
    </Switch>
  )

export { useRoutes }
