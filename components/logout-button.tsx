"use client"

import { supabase } from "@/lib/supabase"
// UI 컴포넌트
import { Button } from "@/components/ui/button"

// 로그아웃 버튼
export function LogoutButton() {
  // 로그아웃 함수
  const handleLogout = async () => {
    // supabase에서 로그아웃 요청
    const { error } = await supabase.auth.signOut()
    if (error) {
      alert("로그아웃 실패: " + error.message)
    }
  }

  return (
    <Button variant="outline" onClick={handleLogout}>
      로그아웃
    </Button>
  )
}
