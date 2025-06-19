'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function Card({
  title,
  description,
  photoUrl,
  price,
  date,
  location,
  link,
  variant = 'default',
  className = '',
  onClick,
  onEdit,   // added
  onDelete, // added
}) {
  const cardStyles = {
    default: 'group relative flex flex-col overflow-hidden',
    horizontal: 'group relative flex flex-col md:flex-row overflow-hidden',
    minimal: 'group relative flex flex-col'
  };

  const imageStyles = {
    default: 'aspect-[4/3] w-full overflow-hidden',
    horizontal: 'aspect-[4/3] md:aspect-[3/4] md:w-1/3 overflow-hidden',
    minimal: 'aspect-[4/3] w-full overflow-hidden'
  };

  const content = (
    <div className={`${cardStyles[variant]} ${className} bg-white rounded-2xl relative`}>
      {photoUrl && (
        <div className={imageStyles[variant]}>
          <img
            src={photoUrl}
            alt={title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        </div>
      )}

      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold tracking-tight text-zinc-900">{title}</h3>
          {description && (
            <p className="mt-2 text-sm text-zinc-600 line-clamp-2">{description}</p>
          )}
        </div>

        <div className="mt-4 space-y-2">
          {date && (
            <div className="flex items-center text-sm text-zinc-600">
              <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {date}
            </div>
          )}

          {location && (
            <div className="flex items-center text-sm text-zinc-600">
              <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {location}
            </div>
          )}
        </div>

        {price && (
          <div className="mt-4 flex items-center justify-between border-t border-zinc-200 pt-4">
            <div className="text-base font-semibold text-zinc-900">
              ${typeof price === 'number' ? price.toFixed(2) : price}
            </div>
            <span className="text-sm text-zinc-600">per ticket</span>
          </div>
        )}

        {(onEdit || onDelete) && (
          <div className="mt-4 flex gap-2">
            {onEdit && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
                type="button"
                className="mt-6 rounded-full bg-zinc-900 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
                >
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                type="button"
                className="mt-6 rounded-full bg-zinc-900 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
                >
                Delete
              </button>
            )}
          </div>
        )}
      </div>

      {/* Hover effect overlay */}
      <div
        className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-zinc-900/10 group-hover:ring-zinc-900/20 transition duration-300"
        style={{ pointerEvents: 'none' }} // important so overlay doesn't block clicks!
      ></div>
    </div>
  );

  if (link) {
    return (
      <Link href={link} className="group relative block">
        <div className="absolute -inset-y-2 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl"></div>
        <div className="relative z-10">{content}</div>
      </Link>
    );
  }

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="group relative block w-full text-left"
      >
        <div className="absolute -inset-y-2 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl"></div>
        <div className="relative z-10">{content}</div>
      </button>
    );
  }

  return content;
}
