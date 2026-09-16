import { Photo } from '../types';

interface PhotoCardProps {
  photo: Photo;
  onSelect: (photo: Photo) => void;
}

export function PhotoCard({ photo, onSelect }: PhotoCardProps) {
  return (
    <article
      className="photo-card"
      id={`photo-card-${photo.id}`}
      onClick={() => onSelect(photo)}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${photo.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(photo);
        }
      }}
    >
      <div className="photo-img-wrapper">
        <img
          className="photo-img"
          src={photo.url}
          alt={photo.title}
          loading="lazy"
        />
        <div className="photo-hover-overlay" aria-hidden="true">
          <span className="photo-hover-text">🐾 View Details ↗</span>
        </div>
      </div>
      <div className="photo-title-container">
        <h2 className="photo-title">{photo.title}</h2>
        {photo.traits && photo.traits[0] && (
          <span className="photo-subtitle-trait">🐾 {photo.traits[0]}</span>
        )}
      </div>
    </article>
  );
}
