'use client';

import { useState } from 'react';
import Shell from './Shell';
import Hero from './Hero';
import { Manifesto, Poses, Catalogue, Uses, Finishes, Technique, Steps } from './Sections';
import { Quote, Footer } from './Contact';

export default function Site() {
  const [filter, setFilter] = useState('all');
  // Depuis « Types de pose » : filtre le catalogue puis y descend
  const pick = id => {
    setFilter(id);
    const el = document.getElementById('catalogue');
    window.__lenis ? window.__lenis.scrollTo(el) : el.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <Shell>
      <main>
        <Hero />
        <Manifesto />
        <Poses onPick={pick} />
        <Catalogue filter={filter} setFilter={setFilter} />
        <Uses />
        <Finishes />
        <Technique />
        <Steps />
        <Quote />
      </main>
      <Footer />
    </Shell>
  );
}
