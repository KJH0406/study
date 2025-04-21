"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

// UI 컴포넌트
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// 로그인 페이지
export default function LoginPage() {
  // 라우터
  const router = useRouter()
  // 사용자 이메일
  const [email, setEmail] = useState("")
  // 사용자 비밀번호
  const [password, setPassword] = useState("")
  // 로딩 상태(로그인 중)
  const [loading, setLoading] = useState(false)

  // 로그인 함수
  const handleLogin = async () => {
    // 로그인 중 상태로 변경
    setLoading(true)
    // 로그인 요청
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    // 로그인 완료 후 로딩 상태 해제
    setLoading(false)

    // 로그인 실패 시 오류 메시지 표시
    if (error) {
      alert("로그인 실패: " + error.message)
    } else {
      router.push("/")
    }
  }
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-center">🔐 로그인</h1>
        <Input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* 로그인 버튼 */}
        <Button className="w-full" onClick={handleLogin} disabled={loading}>
          {/* 로그인 중 상태일 경우 로그인 중... 표시 */}
          {loading ? "로그인 중..." : "로그인"}
        </Button>
        {/* 회원가입 페이지로 이동 */}
        <p className="text-sm text-center">
          아직 회원이 아니신가요?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => router.push("/signup")}
          >
            회원가입 하기
          </span>
        </p>
      </div>
    </div>
  )
}
