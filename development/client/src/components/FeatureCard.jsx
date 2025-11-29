// Same as Level 2
function FeatureCard({ icon, title, description }) {
  return (
    <div className="feature-card">
      <span className="icon">{icon}</span>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default FeatureCard;
