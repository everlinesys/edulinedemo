import { useBranding } from "../../shared/hooks/useBranding";
import VideoPlayer from "../../shared/video/VideoPlayer";

export default function PreviewVideo() {
  const brand = useBranding();
  const theme = brand.theme || {};
  const preview = brand.preview || {};

  const videoId =
    preview.bunnyVideoId ||
    brand.hero?.bunnyVideoId;

  const poster =
    preview.poster ||
    brand.hero?.poster;

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">

        {/* 🎥 VIDEO — CLEAN */}
        <div className="w-full">
          <VideoPlayer
            videoId={videoId}
            poster={poster}
          />
        </div>

        {/* 📝 TEXT — KEPT */}
        <div className="p-6 md:p-10 lg:p-14 space-y-6 md:space-y-8">
          <h2 className={`text-xl md:text-5xl font-bold ${theme.text?.title || ""}`}>
            {preview.title}{" "}
            <span style={{ color: brand.colors.primary }}>
              {preview.highlight}
            </span>
          </h2>

          <p className={`text-sm md:text-base ${theme.text?.body}`}>
            {preview.description}
          </p>
        </div>

      </div>
    </section>
  );
}