import type { Metadata } from "next"
import { Geist_Mono, Nunito } from "next/font/google"
import "./globals.css"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ThemeProvider } from "@/context/ThemeContext"

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
})

export const metadata: Metadata = {
  title: "UPER SaaS Platform",
  description: "Modular SaaS platform with Supabase-inspired design system",
}

// ── Anti-flash script ──────────────────────────────────────────────────────
// Runs synchronously before first paint. Reads localStorage, resolves color
// scheme, applies dark/light class and all stored CSS vars to <html>.
// Fully self-contained — no module imports, all preset data inlined as
// plain object literals so it survives serialization to a raw <script> tag.
// try/catch throughout to handle private-browsing localStorage restrictions.

const ANTI_FLASH_SCRIPT = `(function(){
  var LS_SCHEME="theme-scheme",LS_VARS="theme-vars";
  var scheme="dark";
  try{scheme=localStorage.getItem(LS_SCHEME)||"dark";}catch(e){}
  var isDark=scheme==="dark"||(scheme==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches);
  var root=document.documentElement;
  if(isDark){root.classList.add("dark");root.classList.remove("light");}
  else{root.classList.add("light");root.classList.remove("dark");}
  var ACCENTS={
    emerald:["hsl(152.9 60% 52.9%)","hsl(0 0% 100%)","hsl(147.6 72.5% 90%)","hsl(147.5 72% 80.4%)","hsl(151.3 66.9% 66.9%)","hsl(153.5 61.8% 21.6%)","hsl(153 59.5% 70%)","hsl(152.9 60% 52.9%)"],
    blue:   ["hsl(217 91% 60%)",    "hsl(0 0% 100%)","hsl(214 95% 93%)",    "hsl(213 97% 87%)",    "hsl(216 94% 74%)",     "hsl(217 75% 20%)",    "hsl(215 90% 72%)",   "hsl(217 91% 60%)"],
    violet: ["hsl(263 70% 62%)",    "hsl(0 0% 100%)","hsl(261 80% 93%)",    "hsl(260 75% 86%)",    "hsl(262 68% 72%)",     "hsl(264 60% 22%)",    "hsl(262 68% 75%)",   "hsl(263 70% 62%)"],
    amber:  ["hsl(38 95% 55%)",     "hsl(0 0% 8%)",  "hsl(45 100% 92%)",    "hsl(43 100% 84%)",    "hsl(40 96% 68%)",      "hsl(38 78% 20%)",     "hsl(38 94% 68%)",    "hsl(38 95% 55%)"],
    rose:   ["hsl(345 82% 62%)",    "hsl(0 0% 100%)","hsl(350 90% 93%)",    "hsl(348 88% 86%)",    "hsl(346 82% 72%)",     "hsl(345 65% 22%)",    "hsl(344 82% 73%)",   "hsl(345 82% 62%)"],
    cyan:   ["hsl(189 94% 48%)",    "hsl(0 0% 8%)",  "hsl(186 96% 90%)",    "hsl(187 96% 82%)",    "hsl(188 90% 63%)",     "hsl(189 72% 18%)",    "hsl(188 88% 62%)",   "hsl(189 94% 48%)"],
  };
  var AP=["--brand","--brand-foreground","--brand-200","--brand-300","--brand-400","--brand-500","--brand-600","--chart-1"];
  var RADII={
    none:["0px","0px","0px","0px","0px","0rem"],
    sm:  ["1px","2px","4px","6px","10px","0.25rem"],
    md:  ["2px","4px","6px","8px","16px","0.375rem"],
    lg:  ["4px","6px","10px","14px","24px","0.625rem"],
  };
  var RP=["--radius-xs","--radius-sm","--radius-md","--radius-lg","--radius-xl","--radius"];
  var FS={sm:"12px",md:"14px",lg:"16px"};
  try{
    var raw=localStorage.getItem(LS_VARS);
    if(raw){
      var s=JSON.parse(raw);
      var a=s.accent&&ACCENTS[s.accent]?s.accent:"emerald";
      var av=ACCENTS[a];
      for(var i=0;i<AP.length;i++){root.style.setProperty(AP[i],av[i]);}
      var r=s.radius&&RADII[s.radius]?s.radius:"md";
      var rv=RADII[r];
      for(var j=0;j<RP.length;j++){root.style.setProperty(RP[j],rv[j]);}
      var f=s.fontScale&&FS[s.fontScale]?s.fontScale:"md";
      root.style.fontSize=FS[f];
    }
  }catch(e){}
})();`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistMono.variable} ${nunito.variable} h-full antialiased dark`} suppressHydrationWarning>
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script dangerouslySetInnerHTML={{ __html: ANTI_FLASH_SCRIPT }} />
      </head>
      <body className="min-h-full bg-background text-foreground">
        <ThemeProvider>
          <TooltipProvider delay={200}>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
