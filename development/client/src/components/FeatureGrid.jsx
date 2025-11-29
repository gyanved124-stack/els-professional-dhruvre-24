// ========================================
// LEVEL 3: FeatureGrid Component
// Learning: Array mapping, component composition
// ========================================

import FeatureCard from "./FeatureCard";
import "../styles/FeatureGrid.css";

const features = [
  {
    id: 1,
    icon: "👥",
    title: "Member Directory",
    description:
      "Browse and connect with students and alumni from your college community.",
  },
  {
    id: 2,
    icon: "🔍",
    title: "Smart Search",
    description:
      "Find members by name, batch, or course with our powerful search feature.",
  },
  {
    id: 3,
    icon: "📊",
    title: "Real-time Stats",
    description: "Track community growth with live statistics and analytics.",
  },
  {
    id: 4,
    icon: "🔐",
    title: "Secure Access",
    description:
      "Your data is protected with industry-standard authentication.",
  },
];

function FeatureGrid() {
  return (
    <section className="features-section">
      <h2 className="section-title">Key Features</h2>
      <div className="features-grid">
        {features.map((feature) => (
          <FeatureCard
            key={feature.id}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
}

export default FeatureGrid;

/*
🎓 LEARNING NOTES:

1. ARRAY MAPPING:
   - features.map() creates JSX for each feature
   - Returns array of FeatureCard components
   - React renders array of components automatically

2. KEY PROP:
   - key={feature.id} helps React track items
   - Required when rendering lists
   - Should be unique and stable

3. COMPONENT COMPOSITION:
   - FeatureGrid contains FeatureCard components
   - Data flows from parent to child via props
   - Reusable components pattern
*/
