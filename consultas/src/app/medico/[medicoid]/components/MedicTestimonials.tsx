/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import { Review } from "@/app/lib";

const ReviewCard = ({
  User,
  id,
  doctorId,
  userId,
  rating,
  comment,
  createdAt,
  updatedAt,
}: Review) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img
          className="rounded-full"
          width="32"
          height="32"
          alt=""
          src={`https://avatar.vercel.sh/${User.name}`}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {User.name}
          </figcaption>
          <p className="text-xs font-medium text-gray-500">Criada no dia: {new Date(createdAt).toLocaleDateString("pt-br")}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{comment}</blockquote>
    </figure>
  );
};

export function MedicTestimonials({
  reviews,
  className,
}: {
  reviews: Review[];
  className?: string;
}) {
  const firstRow = reviews.slice(0, reviews.length / 2);
  const secondRow = reviews.slice(reviews.length / 2);
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.User.name} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.User.name} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}

export default MedicTestimonials;
