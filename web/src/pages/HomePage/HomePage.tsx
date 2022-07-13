import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import bazinga from 'virtual:redwood-routes'

import BlogPostsCell from 'src/components/BlogPostsCell'

const HomePage = () => {
  console.log(`🗯 \n ~ file: HomePage.tsx ~ line 5 ~ bazinga`, bazinga)

  return (
    <>
      <BlogPostsCell />
    </>
  )
}

export default HomePage
