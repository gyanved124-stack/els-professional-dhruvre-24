// ========================================
// LEVEL 3: MembersGrid with Filtering
// Learning: Derived state, conditional rendering
// ========================================

import { useMemo } from "react";
import MemberCard from "./MemberCard";
import { members } from "../data/members";

/**
 * MembersGrid now filters members based on props
 * Uses useMemo for performance optimization
 */
function MembersGrid({ searchQuery, activeFilter }) {
  // useMemo: Only recompute when dependencies change
  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      // Convert to lowercase for case-insensitive search
      const query = searchQuery.toLowerCase();

      // Check if member matches search query
      const matchesSearch =
        member.name.toLowerCase().includes(query) ||
        member.role.toLowerCase().includes(query) ||
        member.program.toLowerCase().includes(query);

      // Check if member matches role filter
      const matchesRole =
        activeFilter === "all" || member.role === activeFilter;

      // Must match both conditions
      return matchesSearch && matchesRole;
    });
  }, [searchQuery, activeFilter]); // Recompute when these change

  return (
    <section className="members">
      <div className="container">
        {/* Dynamic count */}
        <div className="members-count">
          Showing {filteredMembers.length} of {members.length} members
        </div>

        {/* Conditional rendering */}
        {filteredMembers.length === 0 ? (
          // Show message if no results
          <div className="no-results">
            <p>No members found. Try a different search or filter.</p>
          </div>
        ) : (
          // Show members grid if we have results
          <div className="members-grid">
            {filteredMembers.map((member) => (
              <MemberCard
                key={member.id}
                name={member.name}
                role={member.role}
                program={member.program}
                status={member.status}
                interests={member.interests}
                bio={member.bio}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default MembersGrid;

/*
🎓 LEARNING NOTES:

DERIVED STATE:
  const filteredMembers = members.filter(...)
  - Computed from props and data
  - No need for useState
  - Automatically updates when dependencies change

useMemo HOOK:
  useMemo(() => expensiveCalculation(), [dep1, dep2])
  - Memoizes (caches) the result
  - Only recomputes when dependencies change
  - Performance optimization for expensive operations
  
  When to use:
  ✅ Filtering/sorting large arrays
  ✅ Complex calculations
  ✅ Creating objects/arrays that are passed as props
  
  When NOT to use:
  ❌ Simple operations (premature optimization)
  ❌ Operations that are already fast

CONDITIONAL RENDERING PATTERNS:

1. Ternary operator:
   {condition ? <ComponentA /> : <ComponentB />}

2. Logical AND:
   {condition && <Component />}

3. Early return:
   if (loading) return <Loading />;
   return <Content />;

ARRAY METHODS FOR FILTERING:

filter():
  - Returns new array with items that pass test
  - Original array unchanged (immutable)
  - Always returns array (even if empty)
  
  members.filter(m => m.role === 'Student')

includes():
  - Checks if string contains substring
  - Case-sensitive by default
  - Convert to lowercase for case-insensitive
  
  name.toLowerCase().includes(query.toLowerCase())

MULTIPLE CONDITIONS:
  - AND: condition1 && condition2 (both must be true)
  - OR: condition1 || condition2 (at least one true)
  - NOT: !condition (opposite)
*/
