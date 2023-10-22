import Navbar from '@/components/Navbar'
import { ThemeProvider } from '@/components/Theme-provider'

export default function Home() {
  return (
    <main>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
      <Navbar />
      
      </ThemeProvider>
    </main>
  )
}
