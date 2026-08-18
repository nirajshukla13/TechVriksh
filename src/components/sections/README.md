# ValueProposition Component

A responsive section component that showcases the core value propositions of Tech Vriksh community.

## Usage

Import the component into your page:

```tsx
import { ValueProposition } from '@/components/sections';

// Or directly:
import { ValueProposition } from '@/components/sections/ValueProposition';
```

Add it to your page:

```tsx
export default function HomePage() {
  return (
    <main className="relative">
      {/* Other sections... */}
      
      <ValueProposition />
      
      {/* More sections... */}
    </main>
  );
}
```

## Features

- **Responsive Grid**: Automatically adjusts from 1 column (mobile) → 2 columns (tablet) → 4 columns (desktop)
- **Scroll Animations**: Uses the Reveal component with staggered delays for smooth entrance
- **Hover Effects**: Subtle scale and gradient overlay on hover
- **Design System**: Fully integrated with Tech Vriksh's existing design tokens and classes
- **Accessible**: Semantic HTML and proper heading hierarchy

## Customization

The component uses these design tokens from `globals.css`:
- `--tv-primary`: Primary green accent
- `--tv-text-primary`: Main text color
- `--tv-text-secondary`: Secondary text color
- `--tv-primary-dim`: Dimmed primary for backgrounds

To modify the value cards, edit the `valueCards` array in `ValueProposition.tsx`.
