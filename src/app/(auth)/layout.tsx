export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="grid min-h-dvh place-items-center">{children}</div>
    </>
  )
}
