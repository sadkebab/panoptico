import PusherListener from '@/components/pusher-listener'
import PusherPublisher from '@/components/pusher-publisher'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <PusherPublisher />
      <PusherListener />
    </main>
  )
}
