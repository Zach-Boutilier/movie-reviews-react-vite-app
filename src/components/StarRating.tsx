export default function StarRating({ score, max = 5 }: { score: number; max?: number }) {
  return (
    <span className="inline-flex gap-0.5" title={`${score} / ${max}`}>
      {Array.from({ length: max }, (_, i) => {
        const fill = Math.min(1, Math.max(0, score - i));
        return (
          <svg
            key={i}
            viewBox="0 0 20 20"
            className="w-4 h-4"
            aria-hidden="true"
          >
            {/* empty star (gray) */}
            <path
              d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27 5.23 15.71l.91-5.32L2.27 6.62l5.34-.78L10 1z"
              className="fill-gray-700"
            />
            {/* filled star (yellow), clipped for partial fills */}
            <clipPath id={`star-clip-${i}-${score}`}>
              <rect x="0" y="0" width={fill * 20} height="20" />
            </clipPath>
            <path
              d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27 5.23 15.71l.91-5.32L2.27 6.62l5.34-.78L10 1z"
              className="fill-yellow-400"
              clipPath={`url(#star-clip-${i}-${score})`}
            />
          </svg>
        );
      })}
    </span>
  );
}
