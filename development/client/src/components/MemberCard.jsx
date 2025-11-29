// Same as Level 2
function MemberCard({ name, role, program, status, interests, bio }) {
  return (
    <div className="member-card">
      <h3>{name}</h3>
      <div className="status-badge">{status}</div>
      <div className="role">{role}</div>
      <div className="program">{program}</div>

      <div className="interests">
        {interests.map((interest, index) => (
          <span key={index} className="interest-tag">
            {interest}
          </span>
        ))}
      </div>

      <div className="bio">{bio}</div>
    </div>
  );
}

export default MemberCard;
