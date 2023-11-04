import PusherListener from '@/components/pusher-listener'
import PusherPublisher from '@/components/pusher-publisher'
import { Metadata } from 'next'

export const metadata: Metadata = {
  description: 'A custom event tracking solution'
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <PusherPublisher />
      <PusherListener />
    </main>
  )
}
