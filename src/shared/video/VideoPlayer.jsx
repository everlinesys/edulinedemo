export default function VideoPlayer({ videoId }) {
  if (!videoId) return null;

  const src = `https://iframe.mediadelivery.net/play/${import.meta.env.VITE_BUNNY_LIBRARY_ID
    }/${videoId}`;

  return (
    <div className="w-full h-auto rounded-xl aspect-video relative overflow-hidden my-5">
      <iframe
        src={src}
        className="rounded-xl relative -top-75 -left-3 md:-top-58 min-w-100 md:w-[50vw] h-[820px]"
        allow="
          accelerometer;
          autoplay;
          clipboard-write;
          encrypted-media;
          gyroscope;
          picture-in-picture;
          fullscreen
        "
        allowFullScreen
        style={{ border: 0, padding: 0, margin: 0 }}
      />
    </div>
  );
}
