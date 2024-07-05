import { Outlet } from 'react-router-dom'

export function Layout() {
  return (
    <div className="mx-auto max-w-5xl p-3">
      <header>
        <h1 className="mb-5 text-center text-3xl">Вселенная Рик и Морти</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
