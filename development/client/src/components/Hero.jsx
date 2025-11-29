// ========================================
// LEVEL 3: Hero Component
// Learning: Props, conditional rendering
// ========================================

import "../styles/Hero.css";

function Hero({ title, subtitle, showCTA = false, ctaText, ctaLink }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">{title}</h1>
        <p className="hero-subtitle">{subtitle}</p>
        {showCTA && ctaLink && (
          <a href={ctaLink} className="hero-cta">
            {ctaText || "Get Started"}
          </a>
        )}
      </div>
    </section>
  );
}

export default Hero;

/*
🎓 LEARNING NOTES:

1. PROPS WITH DEFAULTS:
   - showCTA = false means it's optional
   - If not provided, defaults to false

2. CONDITIONAL RENDERING:
   - {showCTA && ctaLink && (...)}
   - Only renders if BOTH are truthy
   - Short-circuit evaluation

3. PROP TYPES:
   - title: string (required)
   - subtitle: string (required)
   - showCTA: boolean (optional)
   - ctaText: string (optional)
   - ctaLink: string (optional)
*/
