import { LogoutButton } from "@/components/logout-button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">🎉 로그인 성공!</h1>
      <LogoutButton />
    </main>
  )
}
