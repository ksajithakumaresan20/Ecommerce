import React from "react";


function SkeletonGrid() {
  const items = Array(8).fill(0);

  return (
    <div className="skeleton-grid">
      {items.map((_, i) => (
        <div key={i} className="skeleton-card">

          <div className="skeleton-image shimmer"></div>
          

          <div className="skeleton-line shimmer"></div>
          <div className="skeleton-line small shimmer"></div>

        </div>
      ))}
    </div>
  );
}

export default SkeletonGrid;