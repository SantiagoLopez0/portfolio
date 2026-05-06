import { Hero } from "app/components/Home/Hero/Hero";
import { WhatIDo } from "app/components/Home/WhatIDo";
import { Work } from "app/components/Home/Work";
import { About } from "app/components/Home/About";
import { Contact } from "app/components/Home/Contact";

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Web Developer | Weblfow | Frontend | Santiago López',
  description: 'Santiago López - Web developer focused on never stop learning. ',
};

export default function Home() {
  return (
    <main>
      <Hero />
      <WhatIDo />
      <Work />
      <About />
      <Contact />
    </main>
  )
}