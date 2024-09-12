
import { cookies } from 'next/headers'
import Link from 'next/link'


export default async function Page() {

  return (
    <section>
<div className='w-full flex flex-row justify-end gap-6 mb-auto'>
  <Link className='btn__alt' href="/login">Login</Link>
  <Link className="btn__alt" href="/registrieren">Registrieren</Link>
</div>
    </section>
  )
}
