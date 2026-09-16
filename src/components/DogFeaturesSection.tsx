import { useState } from 'react';
import { 
  Award, 
  Sparkles, 
  Heart, 
  Quote, 
  Lightbulb, 
  HeartPulse, 
  Bone, 
  RotateCw, 
  ChevronRight,
  ChevronLeft,
  PawPrint
} from 'lucide-react';
import { DogOfTheMonth, FunFact, CareTip, DogQuote, Photo } from '../types';

interface DogFeaturesSectionProps {
  dogOfTheMonth: DogOfTheMonth;
  funFacts: FunFact[];
  careTips: CareTip[];
  dogQuotes: DogQuote[];
  photos: Photo[];
  onSelectPhoto: (photo: Photo) => void;
}

export function DogFeaturesSection({
  dogOfTheMonth,
  funFacts,
  careTips,
  dogQuotes,
  photos,
  onSelectPhoto,
}: DogFeaturesSectionProps) {
  // Treats given state for puppy spotlight
  const [treatsCount, setTreatsCount] = useState(14);
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);

  // Quote index state
  const [quoteIndex, setQuoteIndex] = useState(0);

  // Fun fact index state
  const [factIndex, setFactIndex] = useState(0);

  // Care tip active index
  const [activeTipIndex, setActiveTipIndex] = useState(0);

  function handleGiveTreat() {
    setTreatsCount((prev) => prev + 1);
    setShowHeartAnimation(true);
    setTimeout(() => {
      setShowHeartAnimation(false);
    }, 1200);
  }

  function handleNextQuote() {
    setQuoteIndex((prev) => (prev + 1) % dogQuotes.length);
  }

  function handleNextFact() {
    setFactIndex((prev) => (prev + 1) % funFacts.length);
  }

  function handlePrevFact() {
    setFactIndex((prev) => (prev - 1 + funFacts.length) % funFacts.length);
  }

  const currentQuote = dogQuotes[quoteIndex];
  const currentFact = funFacts[factIndex];
  const currentTip = careTips[activeTipIndex];

  // Find related breed photo if any
  const relatedPhoto = dogOfTheMonth.relatedDogId
    ? photos.find((p) => p.id === dogOfTheMonth.relatedDogId)
    : photos[0];

  return (
    <section className="dog-features-container" id="dog-features-section" aria-label="Canine Fun Corner">
      <div className="section-title-wrapper">
        <div className="section-badge" id="canine-corner-badge">
          <Sparkles size={14} className="section-badge-icon" />
          <span>Spotlight & Daily Joy</span>
        </div>
        <h2 className="section-heading" id="canine-corner-heading">
          Dog of the Month & Fun Corner
        </h2>
        <p className="section-subtext" id="canine-corner-subtext">
          Meet our featured pup, learn fascinating canine facts, and discover daily care tips.
        </p>
      </div>

      <div className="dog-features-grid">
        {/* Left Column: Dog of the Month Spotlight */}
        <article className="puppy-spotlight-card" id="puppy-spotlight-card">
          <div className="spotlight-badge-ribbon">
            <Award size={15} />
            <span>{dogOfTheMonth.badge}</span>
          </div>

          <div className="spotlight-image-wrapper">
            <img
              src={dogOfTheMonth.url}
              alt={`${dogOfTheMonth.name} the ${dogOfTheMonth.breed}`}
              className="spotlight-image"
              loading="lazy"
            />
            <div className="spotlight-month-tag">{dogOfTheMonth.month}</div>
            
            {showHeartAnimation && (
              <div className="floating-heart-effect" aria-hidden="true">
                <Heart size={28} className="heart-icon fill-heart" />
                <span>+1 Treat! Yum!</span>
              </div>
            )}
          </div>

          <div className="spotlight-content">
            <div className="spotlight-header">
              <div>
                <h3 className="spotlight-dog-name">{dogOfTheMonth.name}</h3>
                <p className="spotlight-dog-breed">
                  {dogOfTheMonth.breed} · {dogOfTheMonth.age}
                </p>
              </div>

              <button
                type="button"
                className="treat-button"
                id="give-puppy-treat-btn"
                onClick={handleGiveTreat}
                title="Give Milo a tasty puppy treat!"
                aria-label="Give treat to Milo"
              >
                <Bone size={16} className="treat-bone-icon" />
                <span>Give Treat</span>
                <span className="treat-counter" id="milo-treats-count">{treatsCount}</span>
              </button>
            </div>

            <p className="spotlight-bio">{dogOfTheMonth.bio}</p>

            <div className="spotlight-stats-grid">
              <div className="spotlight-stat-item">
                <span className="stat-label">Favorite Snack</span>
                <span className="stat-value">{dogOfTheMonth.favSnack}</span>
              </div>
              <div className="spotlight-stat-item">
                <span className="stat-label">Superpower</span>
                <span className="stat-value">{dogOfTheMonth.superpower}</span>
              </div>
              <div className="spotlight-stat-item">
                <span className="stat-label">Best Trick</span>
                <span className="stat-value">{dogOfTheMonth.bestTrick}</span>
              </div>
            </div>

            {relatedPhoto && (
              <button
                type="button"
                className="spotlight-explore-btn"
                id="spotlight-explore-breed-btn"
                onClick={() => onSelectPhoto(relatedPhoto)}
              >
                <span>Learn more about {relatedPhoto.title}s</span>
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        </article>

        {/* Right Column: 3 Bento Widgets (Quotes, Fun Facts, Care Tips) */}
        <div className="dog-widgets-column">
          {/* 1. Daily Dog Quote */}
          <div className="dog-widget-card quote-widget-card" id="daily-dog-quote-card">
            <div className="widget-header">
              <div className="widget-title-group">
                <Quote size={16} className="widget-icon text-amber" />
                <h3 className="widget-title">Daily Dog Wisdom</h3>
              </div>
              <button
                type="button"
                className="widget-refresh-btn"
                id="new-quote-btn"
                onClick={handleNextQuote}
                title="Shuffle new quote"
                aria-label="Get another daily dog quote"
              >
                <RotateCw size={14} />
                <span>New Quote</span>
              </button>
            </div>

            <blockquote className="quote-body">
              <p className="quote-text">"{currentQuote.quote}"</p>
              <footer className="quote-author">— {currentQuote.author}</footer>
            </blockquote>
          </div>

          {/* 2. Canine Fun Facts */}
          <div className="dog-widget-card fact-widget-card" id="canine-fun-facts-card">
            <div className="widget-header">
              <div className="widget-title-group">
                <Lightbulb size={16} className="widget-icon text-orange" />
                <h3 className="widget-title">Did You Know?</h3>
                <span className="fact-badge">{currentFact.category}</span>
              </div>

              <div className="fact-nav-controls">
                <span className="fact-pagination-text">
                  {factIndex + 1} / {funFacts.length}
                </span>
                <button
                  type="button"
                  className="fact-nav-btn"
                  id="prev-fact-btn"
                  onClick={handlePrevFact}
                  title="Previous fact"
                  aria-label="Previous fun fact"
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  type="button"
                  className="fact-nav-btn"
                  id="next-fact-btn"
                  onClick={handleNextFact}
                  title="Next fact"
                  aria-label="Next fun fact"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            <div className="fact-body">
              <span className="fact-icon-large" aria-hidden="true">{currentFact.icon}</span>
              <p className="fact-text">{currentFact.fact}</p>
            </div>
          </div>

          {/* 3. Puppy & Dog Care Tips */}
          <div className="dog-widget-card care-widget-card" id="puppy-care-tips-card">
            <div className="widget-header">
              <div className="widget-title-group">
                <HeartPulse size={16} className="widget-icon text-rose" />
                <h3 className="widget-title">Puppy & Dog Care Tips</h3>
              </div>
              <span className="care-tip-count">
                Tip {activeTipIndex + 1} of {careTips.length}
              </span>
            </div>

            {/* Topic pill tabs */}
            <div className="care-topic-pills" role="tablist" aria-label="Care Tip Topics">
              {careTips.map((tip, idx) => (
                <button
                  key={tip.id}
                  type="button"
                  role="tab"
                  aria-selected={idx === activeTipIndex}
                  className={`care-pill ${idx === activeTipIndex ? 'active' : ''}`}
                  id={`care-tab-${tip.id}`}
                  onClick={() => setActiveTipIndex(idx)}
                >
                  <PawPrint size={12} className="care-pill-paw" />
                  <span>{tip.badge}</span>
                </button>
              ))}
            </div>

            <div className="care-content-box">
              <h4 className="care-tip-title">{currentTip.title}</h4>
              <p className="care-tip-text">{currentTip.tip}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
