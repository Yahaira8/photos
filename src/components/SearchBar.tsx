import React, { useState, useRef, useEffect } from 'react';
import { Search, X, PawPrint } from 'lucide-react';
import { Photo } from '../types';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectDog: (photo: Photo) => void;
  allPhotos: Photo[];
}

export function SearchBar({
  searchQuery,
  onSearchChange,
  onSelectDog,
  allPhotos,
}: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const trimmed = searchQuery.trim().toLowerCase();
  const filteredDogs = trimmed
    ? allPhotos.filter(
        (photo) =>
          photo.title.toLowerCase().includes(trimmed) ||
          photo.category.toLowerCase().includes(trimmed) ||
          photo.description.toLowerCase().includes(trimmed)
      )
    : [];

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!isOpen || filteredDogs.length === 0) {
      if (e.key === 'Enter' && filteredDogs.length > 0) {
        e.preventDefault();
        onSelectDog(filteredDogs[0]);
        setIsOpen(false);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filteredDogs.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev <= 0 ? filteredDogs.length - 1 : prev - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < filteredDogs.length) {
        onSelectDog(filteredDogs[activeIndex]);
      } else if (filteredDogs.length > 0) {
        onSelectDog(filteredDogs[0]);
      }
      setIsOpen(false);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  }

  function handleClear() {
    onSearchChange('');
    setActiveIndex(-1);
    setIsOpen(false);
    inputRef.current?.focus();
  }

  function handleSelect(photo: Photo) {
    onSelectDog(photo);
    setIsOpen(false);
  }

  return (
    <div className="search-bar-container" ref={containerRef} id="dog-search-container">
      <div className="search-input-wrapper">
        <Search className="search-icon" size={18} aria-hidden="true" />
        <input
          ref={inputRef}
          type="text"
          id="dog-search-input"
          className="search-input"
          placeholder="Search dog breeds or traits..."
          value={searchQuery}
          onChange={(e) => {
            onSearchChange(e.target.value);
            setIsOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => {
            if (trimmed) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          aria-label="Search what dog you want to know more about"
          aria-expanded={isOpen}
          aria-controls="dog-search-dropdown"
          autoComplete="off"
        />
        {searchQuery && (
          <button
            type="button"
            className="search-clear-btn"
            id="clear-search-btn"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {isOpen && trimmed && (
        <div className="search-dropdown" id="dog-search-dropdown" role="listbox">
          {filteredDogs.length > 0 ? (
            <>
              <div className="search-dropdown-header">
                <span>Matching Dogs ({filteredDogs.length})</span>
                <span className="search-dropdown-hint">Press Enter to view</span>
              </div>
              <ul className="search-results-list">
                {filteredDogs.map((dog, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <li
                      key={dog.id}
                      id={`search-result-${dog.id}`}
                      role="option"
                      aria-selected={isActive}
                      className={`search-result-item ${isActive ? 'active' : ''}`}
                      onClick={() => handleSelect(dog)}
                      onMouseEnter={() => setActiveIndex(idx)}
                    >
                      <img
                        src={dog.url}
                        alt={dog.title}
                        className="search-result-thumb"
                        loading="lazy"
                      />
                      <div className="search-result-info">
                        <span className="search-result-title">{dog.title}</span>
                        <span className="search-result-category">{dog.category}</span>
                      </div>
                      <span className="search-result-action">
                        <PawPrint size={14} className="search-result-paw" />
                        <span>Know more</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            <div className="search-empty-state">
              <span className="search-empty-icon">🐾</span>
              <p className="search-empty-text">
                No dog matches "<strong>{searchQuery}</strong>"
              </p>
              <span className="search-empty-hint">Try searching Corgi, Husky, Retriever, or Beagle</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
