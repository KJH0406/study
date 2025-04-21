"use client"

import { useEffect, useState } from "react"
import { supabase } from "./supabase"

// 로그인 되어 있는지 확인하기 위한 커스텀 훅
export function useSession() {
  // Supabase에서 세션 받아오는 중인지 표시
  const [loading, setLoading] = useState(true)
  //로그인 상태 (세션이 있으면 로그인한 것)
  const [session, setSession] = useState<any>(null)
  // 로그인 하면 Object 형태로 응답이 옴
  // 로그인 하지 않으면 null 반환

  // 세션 확인 훅
  useEffect(() => {
    // 세션 요청 함수
    const getSession = async () => {
      // supabase에 세션 요청
      const { data } = await supabase.auth.getSession()
      // 세션 상태 저장(= 로그인 여부 저장)
      setSession(data.session)
      // 세션을 받아왔으니 로딩 상태 해제
      setLoading(false)
    }

    // 세션 변경 리스너
    // 로그인을 새로 하거나 로그아웃하면, 자동으로 상태 업데이트됨 (실시간 반영)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        // 세션 상태 설정
        setSession(session)
      }
    )

    // 세션 확인
    getSession()

    // 세션 변경 리스너 해제
    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  // 세션 상태 반환
  return { session, loading }
}
