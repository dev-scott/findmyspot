import Image from 'next/image'
import { add } from '@findmyspot/sample-lib'

export default function Home() {
  return <main>Hello {add(2, 4)}</main>
}
