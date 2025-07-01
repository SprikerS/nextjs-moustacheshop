import { Footer, Header } from '@/components/shared'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
      <Header />
      <div className="container mx-auto p-5 h-full grid place-items-center">{children}</div>
      <Footer />
    </div>
  )
}
