import { useState, useEffect } from 'react';
import { photos, dogOfTheMonth, funFacts, careTips, dogQuotes } from './data';
import { Photo } from './types';
import { PhotoCard } from './components/PhotoCard';
import { PhotoDetail } from './components/PhotoDetail';
import { SearchBar } from './components/SearchBar';
import { DogFeaturesSection } from './components/DogFeaturesSection';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPhotoId, setSelectedPhotoId] = useState<number | null>(() => {
    // Check initial URL hash or query param on load
    if (typeof window !== 'undefined') {
      const hashMatch = window.location.hash.match(/photo-(\d+)/);
      if (hashMatch) {
        const id = parseInt(hashMatch[1], 10);
        if (photos.some((p) => p.id === id)) return id;
      }
      const params = new URLSearchParams(window.location.search);
      const queryId = params.get('photo') || params.get('id');
      if (queryId) {
        const id = parseInt(queryId, 10);
        if (photos.some((p) => p.id === id)) return id;
      }
    }
    return null;
  });

  // Custom dog cursor state (paw or bone)
  const [cursorMode, setCursorMode] = useState<'paw' | 'bone'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dog_cursor_mode');
      if (saved === 'paw' || saved === 'bone') return saved;
    }
    return 'paw';
  });

  // Keep body class and local storage in sync with active cursor
  useEffect(() => {
    document.body.classList.remove('dog-cursor-paw', 'dog-cursor-bone');
    document.body.classList.add(`dog-cursor-${cursorMode}`);
    try {
      localStorage.setItem('dog_cursor_mode', cursorMode);
    } catch {
      // ignore storage access errors
    }
  }, [cursorMode]);

  // Listen to popstate for browser Back/Forward buttons
  useEffect(() => {
    function handlePopState() {
      const hashMatch = window.location.hash.match(/photo-(\d+)/);
      if (hashMatch) {
        const id = parseInt(hashMatch[1], 10);
        setSelectedPhotoId(photos.some((p) => p.id === id) ? id : null);
      } else {
        setSelectedPhotoId(null);
      }
    }
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const selectedIndex = photos.findIndex((p) => p.id === selectedPhotoId);
  const selectedPhoto = selectedIndex !== -1 ? photos[selectedIndex] : null;

  function handleSelectPhoto(photo: Photo) {
    setSelectedPhotoId(photo.id);
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', `#photo-${photo.id}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function handleBack() {
    setSelectedPhotoId(null);
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', window.location.pathname);
    }
  }

  function handlePrev() {
    if (selectedIndex === -1) return;
    const prevIndex = (selectedIndex - 1 + photos.length) % photos.length;
    const prevPhoto = photos[prevIndex];
    setSelectedPhotoId(prevPhoto.id);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#photo-${prevPhoto.id}`);
    }
  }

  function handleNext() {
    if (selectedIndex === -1) return;
    const nextIndex = (selectedIndex + 1) % photos.length;
    const nextPhoto = photos[nextIndex];
    setSelectedPhotoId(nextPhoto.id);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#photo-${nextPhoto.id}`);
    }
  }

  // Filter photos for the main grid if a search query is active
  const trimmedQuery = searchQuery.trim().toLowerCase();
  const displayedPhotos = trimmedQuery
    ? photos.filter(
        (photo) =>
          photo.title.toLowerCase().includes(trimmedQuery) ||
          photo.category.toLowerCase().includes(trimmedQuery) ||
          photo.description.toLowerCase().includes(trimmedQuery)
      )
    : photos;

  return (
    <main className="page-container" id="photo-gallery-main">
      {/* Top Bar with brand on the left and search bar at top right */}
      <header className="page-top-bar" id="page-top-bar">
        <div className="top-brand">
          <button
            type="button"
            className="cute-dog-badge"
            id="dog-theme-badge"
            onClick={selectedPhoto ? handleBack : undefined}
            title={selectedPhoto ? '← Back to all dogs' : undefined}
          >
            <span>🐾 Paws & Friends</span>
          </button>

          {/* Custom Dog Cursor Switcher */}
          <div
            className="cursor-selector-pill"
            id="custom-dog-cursor-selector"
            role="radiogroup"
            aria-label="Custom Dog Cursor Mode"
          >
            <span className="cursor-selector-label">Cursor:</span>
            <button
              type="button"
              className={`cursor-option-btn ${cursorMode === 'paw' ? 'active' : ''}`}
              id="cursor-mode-paw-btn"
              onClick={() => setCursorMode('paw')}
              title="Cute Paw Print Mouse Cursor"
              aria-checked={cursorMode === 'paw'}
              role="radio"
            >
              <span className="cursor-icon-emoji">🐾</span>
              <span>Paw</span>
            </button>
            <button
              type="button"
              className={`cursor-option-btn ${cursorMode === 'bone' ? 'active' : ''}`}
              id="cursor-mode-bone-btn"
              onClick={() => setCursorMode('bone')}
              title="Cute Dog Bone Mouse Cursor"
              aria-checked={cursorMode === 'bone'}
              role="radio"
            >
              <span className="cursor-icon-emoji">🦴</span>
              <span>Bone</span>
            </button>
          </div>
        </div>

        <div className="top-right-search" id="top-right-search">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSelectDog={handleSelectPhoto}
            allPhotos={photos}
          />
        </div>
      </header>

      <section className="page-header" id="photo-gallery-header">
        <h1 className="page-title" id="photo-gallery-title">
          Pawsome Photo Gallery
        </h1>
        <p className="page-subtitle" id="photo-gallery-subtitle">
          A cute collection of our favorite dog breeds. Click on any photo to open a cute card with their personality traits, favorite snacks, and quirks!
        </p>

        {trimmedQuery && (
          <div className="search-status-bar" id="search-status-bar">
            <span className="search-status-text">
              Showing <strong>{displayedPhotos.length}</strong> of {photos.length} dogs matching "{searchQuery}"
            </span>
            <button
              type="button"
              className="search-reset-btn"
              id="search-reset-btn"
              onClick={() => setSearchQuery('')}
            >
              Clear Filter
            </button>
          </div>
        )}
      </section>

      {displayedPhotos.length > 0 ? (
        <section className="photo-grid" id="photo-grid" aria-label="Photo Grid">
          {displayedPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              onSelect={handleSelectPhoto}
            />
          ))}
        </section>
      ) : (
        <div className="photo-grid-empty" id="photo-grid-empty">
          <span className="empty-paw-icon">🐾</span>
          <h2 className="empty-title">No dogs found</h2>
          <p className="empty-desc">
            We couldn't find any dogs matching "<strong>{searchQuery}</strong>". Try searching for Corgi, Husky, Retriever, or Beagle.
          </p>
          <button
            type="button"
            className="clear-search-action-btn"
            id="clear-search-action-btn"
            onClick={() => setSearchQuery('')}
          >
            View All 9 Dogs
          </button>
        </div>
      )}

      {/* Dog of the Month, Fun Facts, Care Tips & Quotes */}
      <DogFeaturesSection
        dogOfTheMonth={dogOfTheMonth}
        funFacts={funFacts}
        careTips={careTips}
        dogQuotes={dogQuotes}
        photos={photos}
        onSelectPhoto={handleSelectPhoto}
      />

      {/* Cute Popup Card Modal when clicking a photo in the gallery */}
      {selectedPhoto && (
        <PhotoDetail
          photo={selectedPhoto}
          currentIndex={selectedIndex}
          totalPhotos={photos.length}
          onBack={handleBack}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </main>
  );
}

