type BlogLayoutProps = {
  children?: React.ReactNode
}

import { Link, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'

const BlogLayout = ({ children }: BlogLayoutProps) => {
  const { logOut, isAuthenticated } = useAuth()

  return (
    <>
      <header className="relative flex items-center justify-between px-8 py-4 text-white bg-blue-700">
        <h1 className="text-3xl font-semibold tracking-tight">
          <Link
            className="text-blue-400 transition duration-100 hover:text-blue-100"
            to={routes.home()}
          >
            Redwood Blog
          </Link>
        </h1>
        <nav>
          <ul className="relative flex items-center font-light">
            <li>
              <Link
                className="px-4 py-2 transition duration-100 rounded hover:bg-blue-600"
                to={routes.about()}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                className="px-4 py-2 transition duration-100 rounded hover:bg-blue-600"
                to={routes.contact()}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                className="px-4 py-2 transition duration-100 rounded hover:bg-blue-600"
                to={routes.posts()}
              >
                Admin
              </Link>
            </li>
            {isAuthenticated && (
              <li>
                <Link
                  className="px-4 py-2 transition duration-100 rounded hover:bg-blue-600"
                  onClick={logOut}
                  to={''}
                >
                  Log Out
                </Link>
              </li>
            )}
            {!isAuthenticated && (
              <li>
                <Link
                  className="px-4 py-2 transition duration-100 rounded hover:bg-blue-600"
                  to={routes.login()}
                >
                  Log In
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <main className="max-w-4xl p-12 mx-auto mt-3 bg-white rounded-b shadow-lg">
        {children}
      </main>
    </>
  )
}

export default BlogLayout
