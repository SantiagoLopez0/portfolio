import { Hero } from "app/components/Home/Hero/Hero";
import { Projects } from "app/components/Home/Projects";
import { Skills } from "app/components/Home/Skills";

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Web Developer | Weblfow | Frontend | Santiago López',
  description: 'Santiago López - Web developer focused on never stop learning. ',
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Projects />
      <Skills />
    </main>
  )
}