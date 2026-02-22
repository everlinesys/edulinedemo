export default function VideoPlayer({ videoId }) {
  if (!videoId) return null;

  const src = `https://iframe.mediadelivery.net/play/${import.meta.env.VITE_BUNNY_LIBRARY_ID
    }/${videoId}`;

  // return (
  //   <div className="w-full h-auto rounded-xl aspect-video relative overflow-hidden my-5">
  //     <iframe
  //       src={src}
  //       className="rounded-xl relative -top-75 -left-3 md:-top-58 min-w-100 md:w-[50vw] h-[820px]"
  //       allow="
  //         accelerometer;
  //         autoplay;
  //         clipboard-write;
  //         encrypted-media;
  //         gyroscope;
  //         picture-in-picture;
  //         fullscreen
  //       "
  //       allowFullScreen
  //       style={{ border: 0, padding: 0, margin: 0 }}
  //     />
  //   </div>
  // );
  return (
    <div style={{ position: "relative", paddingTop: "56.25%" }}>
      <iframe
        src="https://player.mediadelivery.net/embed/594138/231392af-8a40-4586-9879-897d3f02b853?autoplay=false&loop=false&muted=false&preload=false&responsive=true"
        loading="lazy"
        style={{
          border: 0,
          position: "absolute",
          top: 0,
          height: "100%",
          width: "100%",
        }}
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
        allowFullScreen
      />
    </div>
  )
}
