const { Star } = require("lucide-react");

const StarRating = ({ rating, reviews }) => {
  return (
    <div className="flex items-center mt-1">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={`${
              i < Math.floor(rating)
                ? "text-yellow-500 fill-yellow-500"
                : i < rating
                ? "text-yellow-500 fill-yellow-500"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-muted-foreground ml-1">({reviews})</span>
    </div>
  );
};

export default StarRating;
