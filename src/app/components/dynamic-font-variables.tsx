'use client';

interface DynamicFontVariablesProps {
    bodyFont: string;
    headlineFont: string;
}

export function DynamicFontVariables({ bodyFont, headlineFont }: DynamicFontVariablesProps) {
    const css = `
    :root {
      --font-body: "${bodyFont}";
      --font-headline: "${headlineFont}";
    }
  `;

  return <style>{css}</style>;
}
