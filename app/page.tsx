"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { LogoutButton } from "@/components/logout-button"

// 홈 페이지
export default function Home() {
  // 사용자 이름
  const [username, setUsername] = useState("")

  // 사용자 이름 로드
  useEffect(() => {
    // 사용자 이름 로드
    const loadUser = async () => {
      // 사용자 정보 가져오기
      const {
        data: { user },
      } = await supabase.auth.getUser()
      // 사용자 정보가 있으면
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("username")
          .eq("id", user.id)
          .single()

        // 사용자 이름 설정
        setUsername(profile?.username || "")
      }
    }

    // 사용자 이름 로드
    loadUser()
  }, [])

  return (
    <main className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <h1 className="text-3xl font-bold">👋 안녕하세요, {username}님!</h1>
      <LogoutButton />
    </main>
  )
}
