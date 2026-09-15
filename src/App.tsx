export function App() {
  const photos = [
    { id: 1, title: 'Volleyball', url: '/images/volleyball.jpeg' },
    { id: 2, title: 'Olivia Babcock', url: '/images/olivia-babcock-volleyball.jpg' },
    { id: 3, title: 'Rudis JB1 Wrestling Shoes', url: '/images/rudis-jb1-flamingo-pink.jpg' },
    { id: 4, title: 'Placeholder Photo 4', url: 'https://picsum.photos/seed/photo4/600/600' },
    { id: 5, title: 'Nike Elite Tournament', url: '/images/nike-elite-tournament.png' },
    { id: 6, title: 'Placeholder Photo 6', url: 'https://picsum.photos/seed/photo6/600/600' },
    { id: 7, title: "Women's Wrestling", url: '/images/womens-wrestling.png' },
    { id: 8, title: 'Placeholder Photo 8', url: 'https://picsum.photos/seed/photo8/600/600' },
    { id: 9, title: 'Intramural Flag Football', url: '/images/intramural-flag-football.webp' },
  ];

  return (
    <main className="page-container" id="photo-gallery-main">
      <header className="page-header" id="photo-gallery-header">
        <h1 className="page-title">Photo Gallery</h1>
      </header>

      <section className="photo-grid" id="photo-grid">
        {photos.map((photo) => (
          <article className="photo-card" id={`photo-card-${photo.id}`} key={photo.id}>
            <img
              className="photo-img"
              src={photo.url}
              alt={photo.title}
              loading="lazy"
            />
            <h2 className="photo-title">{photo.title}</h2>
          </article>
        ))}
      </section>
    </main>
  );
}
