import React from 'react';

function initialsFromName(name) {
  if (!name || typeof name !== 'string') return '?';
  const parts = name.replace(/\./g, ' ').trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export default function TestimonialAvatar({ name, className = '' }) {
  const initials = initialsFromName(name);
  return (
    <div
      className={`w-14 h-14 rounded-full shrink-0 flex items-center justify-center ring-2 ring-white shadow-sm font-jetbrains text-sm font-bold text-white bg-gradient-to-br from-[#142B5C] to-[#55B8F5] ${className}`}
      aria-hidden
    >
      {initials}
    </div>
  );
}