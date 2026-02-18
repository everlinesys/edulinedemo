import { useBranding } from "../../shared/hooks/useBranding";

export default function StudentExplore() {
  const brand = useBranding();
  const theme = brand.theme;

  return (
    <div className={`${theme.layout.container} p-6`}>
      <h2 className={theme.text.title}>Explore Courses</h2>

      <p className={`${theme.text.body} mt-2`}>
        Browse new courses and learning paths.
      </p>

      <div className={`mt-6 p-6 ${theme.card.soft}`}>
        Course catalog will appear here.
      </div>
    </div>
  );
}
