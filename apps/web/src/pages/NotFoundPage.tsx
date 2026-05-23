import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <main className="flex flex-col items-center justify-center flex-1 p-4 text-center">
      <h1 className="text-4xl font-bold text-ocean-700">404</h1>
      <p className="mt-2 text-gray-500">Page not found.</p>
      <Link to="/" className="mt-4 text-ocean-600 underline">
        Back to Today on LBI
      </Link>
    </main>
  )
}
