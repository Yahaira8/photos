import React, { useEffect, useState } from 'react';
import { 
  X, 
  Heart, 
  Bone, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  PawPrint,
  Clock,
  Activity,
  Lightbulb
} from 'lucide-react';
import { Photo } from '../types';

interface PhotoDetailProps {
  photo: Photo;
  currentIndex: number;
  totalPhotos: number;
  onBack: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function PhotoDetail({
  photo,
  currentIndex,
  totalPhotos,
  onBack,
  onPrev,
  onNext,
}: PhotoDetailProps) {
  const [petCount, setPetCount] = useState(3);
  const [showHeartEffect, setShowHeartEffect] = useState(false);

  // Keyboard navigation: Esc to close, ArrowLeft/Right to navigate
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onBack();
      } else if (e.key === 'ArrowLeft') {
        onPrev();
      } else if (e.key === 'ArrowRight') {
        onNext();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack, onPrev, onNext]);

  // Prevent background body scroll while popup is open
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  function handlePetDog() {
    setPetCount((prev) => prev + 1);
    setShowHeartEffect(true);
    setTimeout(() => {
      setShowHeartEffect(false);
    }, 1200);
  }

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      onBack();
    }
  }

  return (
    <div 
      className="dog-popup-backdrop" 
      id="dog-popup-modal-backdrop" 
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-dog-name"
    >
      <div className="dog-popup-card" id="dog-popup-card">
        {/* Top Header Controls */}
        <div className="popup-top-bar">
          <div className="popup-badge-group">
            <span className="popup-category-badge">{photo.category}</span>
            <span className="popup-counter-badge">
              {currentIndex + 1} of {totalPhotos}
            </span>
          </div>

          <button
            type="button"
            className="popup-close-btn"
            id="close-dog-popup-btn"
            onClick={onBack}
            aria-label="Close popup"
            title="Close (Esc)"
          >
            <X size={18} />
          </button>
        </div>

        {/* Dog Name Header */}
        <header className="popup-dog-header">
          <h2 className="popup-dog-name" id="popup-dog-name">
            {photo.title}
          </h2>
          <div className="popup-dog-subtitle">
            <PawPrint size={14} className="popup-paw-icon" />
            <span>Discover Breed Traits & Favorites</span>
          </div>
        </header>

        {/* Scrollable Content Body */}
        <div className="popup-scroll-body">
          {/* Main Image Container */}
          <div className="popup-image-container">
            <img
              src={photo.url}
              alt={photo.title}
              className="popup-dog-image"
              id="popup-dog-image"
              loading="eager"
            />

            {/* Quick action button over image */}
            <button
              type="button"
              className="popup-pet-btn"
              id="pet-dog-btn"
              onClick={handlePetDog}
              title={`Give ${photo.title} some love!`}
              aria-label={`Pet ${photo.title}`}
            >
              <Heart size={15} className="popup-heart-icon" />
              <span>Pet Me!</span>
              <span className="popup-pet-counter">{petCount}</span>
            </button>

            {showHeartEffect && (
              <div className="popup-heart-effect" aria-hidden="true">
                <Heart size={36} className="popup-animated-heart" />
                <span>Happy Tail Wag! ❤️</span>
              </div>
            )}
          </div>

          {/* Personality Traits Section */}
          <section className="popup-section" id="popup-traits-section">
            <div className="popup-section-title">
              <Sparkles size={15} className="section-title-icon text-amber" />
              <h3>Personality Traits</h3>
            </div>
            <div className="popup-traits-list">
              {photo.traits.map((trait, idx) => (
                <span key={idx} className="popup-trait-chip">
                  <span className="trait-bullet">🐾</span>
                  <span>{trait}</span>
                </span>
              ))}
            </div>
          </section>

          {/* Favorite Snacks Section */}
          <section className="popup-section popup-snack-card" id="popup-snack-section">
            <div className="popup-snack-header">
              <div className="popup-snack-icon-wrap">
                <Bone size={18} className="popup-snack-icon" />
              </div>
              <div>
                <span className="popup-snack-label">Favorite Snacks</span>
                <p className="popup-snack-value" id="popup-favorite-snack">
                  {photo.favoriteSnack}
                </p>
              </div>
            </div>
          </section>

          {/* Fun Quirk / Characteristic */}
          {photo.funQuirk && (
            <section className="popup-section popup-quirk-card" id="popup-quirk-section">
              <div className="popup-quirk-header">
                <Lightbulb size={16} className="popup-quirk-icon" />
                <span className="popup-quirk-label">Signature Quirk</span>
              </div>
              <p className="popup-quirk-text">"{photo.funQuirk}"</p>
            </section>
          )}

          {/* Quick Breed Facts (Energy & Lifespan) */}
          {(photo.energyLevel || photo.lifespan) && (
            <div className="popup-stats-row">
              {photo.energyLevel && (
                <div className="popup-stat-box">
                  <Activity size={14} className="popup-stat-icon" />
                  <span className="popup-stat-label">Energy Level</span>
                  <span className="popup-stat-value">{photo.energyLevel}</span>
                </div>
              )}
              {photo.lifespan && (
                <div className="popup-stat-box">
                  <Clock size={14} className="popup-stat-icon" />
                  <span className="popup-stat-label">Lifespan</span>
                  <span className="popup-stat-value">{photo.lifespan}</span>
                </div>
              )}
            </div>
          )}

          {/* Full Breed Overview / Description */}
          <section className="popup-section popup-about-section">
            <h4 className="popup-about-heading">About the Breed</h4>
            <p className="popup-about-text" id="popup-breed-description">
              {photo.description}
            </p>
          </section>
        </div>

        {/* Footer Navigation Controls */}
        <footer className="popup-footer">
          <button
            type="button"
            className="popup-nav-btn"
            id="popup-prev-dog-btn"
            onClick={onPrev}
            aria-label="Previous Dog"
          >
            <ChevronLeft size={16} />
            <span>Prev Dog</span>
          </button>

          <button
            type="button"
            className="popup-close-action-btn"
            id="popup-back-gallery-btn"
            onClick={onBack}
          >
            Back to Gallery
          </button>

          <button
            type="button"
            className="popup-nav-btn"
            id="popup-next-dog-btn"
            onClick={onNext}
            aria-label="Next Dog"
          >
            <span>Next Dog</span>
            <ChevronRight size={16} />
          </button>
        </footer>
      </div>
    </div>
  );
}
