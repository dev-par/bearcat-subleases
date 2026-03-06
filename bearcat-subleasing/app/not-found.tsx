import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='text-center'>
        <h2 className='text-2xl font-bold md-2'>Not Found</h2>
        <p className='md-4'>Could not find requested resource</p>
        <Link href="/" className='mb-4 text-blue-600 hover:text-blue-700 hover:underline transition'>Return Home</Link>
      </div>
    </div>
  )
}