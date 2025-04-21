import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "인증 프로젝트",
  description: "Next.js + Tailwind CSS + shadcn",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className="h-full">
      <body className={inter.className + " h-full"}>{children}</body>
    </html>
  )
}
