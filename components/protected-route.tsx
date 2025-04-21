"use client"

import { usePathname, useRouter } from "next/navigation"
import { useSession } from "@/lib/use-session"
import { useEffect } from "react"

// 로그인하지 않아도 접근할 수 있는 예외적인 URL 목록
const publicRoutes = ["/login", "/signup"]

// 보호된 라우트(로그인 후 접근 가능)
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  // 세션 확인
  const { session, loading } = useSession()
  // 현재 경로
  const pathname = usePathname()
  const router = useRouter()

  // 세션 확인
  useEffect(() => {
    // 로딩 완료 후 실행
    if (!loading) {
      // 로그인 하지 않았는데 보호된 라우트에 접근하려고 하면 로그인 페이지로 리다이렉트
      if (!session && !publicRoutes.includes(pathname)) {
        router.replace("/login")
      }
      // 로그인 했는데 공공 라우트에 접근하려고 하면 메인 페이지로 리다이렉트
      if (session && publicRoutes.includes(pathname)) {
        router.replace("/")
      }
    }
  }, [session, loading, pathname, router])

  // 보호된 라우트 반환
  return <>{children}</>
}
