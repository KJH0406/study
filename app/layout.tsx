import "./globals.css"
import { Inter } from "next/font/google"

// 보호된 라우트
import { ProtectedRoute } from "@/components/protected-route"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "인증 프로젝트",
  description: "Next.js + Supabase",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className="h-full">
      <body className={inter.className + " h-full"}>
        {/* 보호된 라우트 적용 */}
        <ProtectedRoute>{children}</ProtectedRoute>
      </body>
    </html>
  )
}
