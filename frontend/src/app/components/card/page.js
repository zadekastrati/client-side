'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function Card({
  title,
  description,
  image,
  price,
  date,
  location,
  link,
  variant = 'default', // default, horizontal, minimal
  className = '',
  onClick,
}) {
  const cardStyles = {
    default: 'flex flex-col',
    horizontal: 'flex flex-col md:flex-row',
    minimal: 'flex flex-col bg-transparent shadow-none'
  };

  const imageStyles = {
    default: 'h-48 w-full',
    horizontal: 'h-48 md:h-full md:w-48',
    minimal: 'h-32 w-full'
  };

  const content = (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200 ${cardStyles[variant]} ${className}`}>
      {image && (
        <div className={`relative ${imageStyles[variant]}`}>
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full"
          />
        </div>
      )}
      
      <div className="p-4 flex-1">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        {description && <p className="text-gray-600 mb-4">{description}</p>}
        
        {(date || location) && (
          <div className="space-y-2 mb-4">
            {date && (
              <div className="flex items-center text-gray-500">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{date}</span>
              </div>
            )}
            {location && (
              <div className="flex items-center text-gray-500">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{location}</span>
              </div>
            )}
          </div>
        )}

        {price && (
          <div className="text-blue-600 font-semibold mb-4">
            ${typeof price === 'number' ? price.toFixed(2) : price}
          </div>
        )}
      </div>
    </div>
  );

  if (link) {
    return (
      <Link href={link} className="block">
        {content}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} className="w-full text-left">
        {content}
      </button>
    );
  }

  return content;
} 