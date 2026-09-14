export function App() {
  const photos = [
    { id: 1, title: 'Volleyball', url: '/images/volleyball.jpeg' },
    { id: 2, title: 'Placeholder Photo 2', url: 'https://picsum.photos/seed/photo2/600/600' },
    { id: 3, title: 'Placeholder Photo 3', url: 'https://picsum.photos/seed/photo3/600/600' },
    { id: 4, title: 'Placeholder Photo 4', url: 'https://picsum.photos/seed/photo4/600/600' },
    { id: 5, title: 'Placeholder Photo 5', url: 'https://picsum.photos/seed/photo5/600/600' },
    { id: 6, title: 'Placeholder Photo 6', url: 'https://picsum.photos/seed/photo6/600/600' },
    { id: 7, title: 'Placeholder Photo 7', url: 'https://picsum.photos/seed/photo7/600/600' },
    { id: 8, title: 'Placeholder Photo 8', url: 'https://picsum.photos/seed/photo8/600/600' },
    { id: 9, title: 'Placeholder Photo 9', url: 'https://picsum.photos/seed/photo9/600/600' },
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
