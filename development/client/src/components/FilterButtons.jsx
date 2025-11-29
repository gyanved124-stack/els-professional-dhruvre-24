// ========================================
// LEVEL 3: FilterButtons with State
// Learning: Event handlers, conditional classes
// ========================================

/**
 * FilterButtons now receives active filter and callback
 * Clicking a button updates parent state
 */
function FilterButtons({ activeFilter, onFilterChange }) {
  const filters = [
    { id: "all", label: "All" },
    { id: "Student", label: "Students" },
    { id: "Faculty", label: "Faculty" },
    { id: "Admin", label: "Admins" },
  ];

  return (
    <div className="filter-controls">
      {filters.map((filter) => (
        <button
          key={filter.id}
          // Add 'active' class if this is the selected filter
          className={`filter-btn ${activeFilter === filter.id ? "active" : ""}`}
          // Call parent's callback when clicked
          onClick={() => onFilterChange(filter.id)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;

/*
🎓 LEARNING NOTES:

CONDITIONAL CLASSES:
  className={`base ${condition ? 'extra' : ''}`}
  - Use template literals for dynamic classes
  - Add/remove classes based on state
  - Provides visual feedback

EVENT HANDLERS:
  onClick={() => onFilterChange(filter.id)}
  - Arrow function to pass arguments
  - Calls parent's state updater
  - Triggers re-render of parent and children

LIFTING STATE UP:
Why doesn't FilterButtons have its own useState?
- Because MembersGrid also needs to know the active filter
- State lives in closest common parent (App)
- Parent passes state down as props
- Children call callbacks to update parent state

This is called "lifting state up" - a key React pattern!
*/
