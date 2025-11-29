// ========================================
// LEVEL 3: SearchBar Component with State
// Learning: Controlled input, onChange handler
// ========================================

/**
 * SearchBar now receives value and onChange from parent
 * This makes it a "controlled component"
 */
function SearchBar({ value, onChange }) {
  return (
    <section className="search-section">
      <div className="container">
        <h2 className="section-title">Member Directory</h2>
        <div className="search-bar">
          {/* 
            Controlled input:
            - value: React controls what's displayed
            - onChange: React knows when it changes
          */}
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search members by name, role, or program..."
            aria-label="Search members"
          />
        </div>
      </div>
    </section>
  );
}

export default SearchBar;

/*
🎓 LEARNING NOTES:

CONTROLLED vs UNCONTROLLED INPUTS:

Uncontrolled (Level 2):
  <input type="text" />
  - React doesn't know the value
  - Need to query DOM to get value
  - Hard to validate or manipulate

Controlled (Level 3):
  <input value={value} onChange={onChange} />
  - React owns the value
  - Single source of truth
  - Easy to validate, transform, reset

WHY CONTROLLED?
- Can validate input as user types
- Can prevent certain characters
- Can format automatically (phone numbers, etc.)
- Can reset form programmatically
- State is always in sync with UI
*/
