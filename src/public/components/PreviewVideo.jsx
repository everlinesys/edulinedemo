import { useBranding } from "../../shared/hooks/useBranding"
import VideoPlayer from "../../shared/video/VideoPlayer";

export default function PreviewVideo() {
  const brand = useBranding();
  const theme = brand.theme || {};

  const preview = brand.preview || {};
  const perks = preview.perks || [
    { value: "HD", label: "High Definition" },
    { value: "24/7", label: "Lifetime Access" },
  ];

  // 👇 PRIORITY LOGIC
  const videoId =
    preview.bunnyVideoId ||
    brand.hero?.bunnyVideoId;

  const poster =
    preview.poster ||
    brand.hero?.poster;

  return (
    <section
      className={`
        relative overflow-hidden md:pb-5 pl-5
        ${theme.layout?.panel || ""}
       
      `}
    >
      {/* Glow */}


      <div className="relative z-10 grid lg:grid-cols-2 gap-0 items-center">
        <div className="w-full h-[320px] sm:h-[220px] md:h-[260px] lg:h-[200px] relative">

          <div className="
            absolute inset-0
            flex items-center justify-center
           
          ">
            <VideoPlayer
              videoId={videoId}
              poster={poster}
            />
          </div>

        </div>
        {/* TEXT */}
        <div className="p-6 md:p-10 lg:p-14 space-y-6 md:space-y-8 ">
          <h2 className={`text-3xl md:text-5xl font-bold ${theme.text?.title || ""}`}>
            {preview.title} {" "}
            <span style={{ color: brand.colors.primary }}>
              {preview.highlight}
            </span>
          </h2>

          <p className={`text-sm md:text-base ${theme.text?.body}`}>
            {preview.description}
          </p>
        </div>

        {/* ================= FIXED VIDEO SECTION ================= */}

        {/* ======================================================== */}

      </div>
    </section>
  );
}
