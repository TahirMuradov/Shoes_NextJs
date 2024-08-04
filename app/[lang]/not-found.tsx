import Image from 'next/image'
import Link from 'next/link'
 import _404 from '@/public/404.png'
export default function NotFound() {
  return (
    <div className='w-full text-center'>
        <div className="w-4/5 mx-auto flex  justify-center items-center">

<Image src={_404} width={640} height={480} alt='404'/>
        </div>
      <Link className='karl-checkout-btn border-red-500 text-black my-3' href="/">Return Home</Link>
    </div>
  )
}