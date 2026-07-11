import "./globals.css";
import { AppLayout } from "@/components/layout/AppLayout";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryProvider } from "@/components/providers/QueryProvider";

export const metadata = {
  title: "CRM",
  description: "AI-powered CRM Dashboard"
};



export default function RootLayout({
  children
}) {
  
  return (
    <html
      lang="en" suppressHydrationWarning
      className="h-full antialiased ">      
      <body className="min-h-screen flex text-gray-900 dark:text-gray-100 w-full overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-200">
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange >
            <AppLayout>      
              {children}
            </AppLayout>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>);

}