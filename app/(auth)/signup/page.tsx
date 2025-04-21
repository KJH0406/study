"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { supabase } from "@/lib/supabase"

// UI 컴포넌트
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

// 회원가입 페이지
export default function RegisterPage() {
  // 라우터
  const router = useRouter()
  // 사용자 이메일
  const [email, setEmail] = useState("")
  // 사용자 비밀번호
  const [password, setPassword] = useState("")
  // 로딩 상태(회원가입 중)
  const [loading, setLoading] = useState(false)

  // 회원가입 함수
  const handleSignup = async () => {
    // 회원가입 중 상태로 변경
    setLoading(true)
    // 회원가입 요청
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })
    // 회원가입 완료 후 로딩 상태 해제
    setLoading(false)

    // 회원가입 실패 시 오류 메시지 표시
    if (error) {
      alert("회원가입 실패: " + error.message)
    } else {
      // 회원가입 완료 후 로그인 페이지로 이동
      router.push("/login")
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-center">📝 회원가입</h1>
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
        {/* 회원가입 버튼 */}
        <Button className="w-full" onClick={handleSignup} disabled={loading}>
          {/* 회원가입 중 상태일 경우 회원가입 중... 표시 */}
          {loading ? "가입 중..." : "회원가입"}
        </Button>
        {/* 이미 계정이 있으신가요? 표시 */}
        <p className="text-sm text-center">
          이미 계정이 있으신가요?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => router.push("/login")}
          >
            로그인 하기
          </span>
        </p>
      </div>
    </div>
  )
}
