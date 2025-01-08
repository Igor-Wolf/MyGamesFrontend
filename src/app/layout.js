'use client'

import { Footer } from "./Components/Footer";
import { Header } from "./Components/Header";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <head>  
        <title>MY GAMES</title>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap" rel="stylesheet"></link>
    </head>
      <body>
          <Header></Header>
        {children}
        <Footer></Footer>
       
    </body>
  </html>
  );
}