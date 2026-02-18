import Hero from "../components/Hero";
import Testimonials from "../components/Testimonials";
import PreviewVideo from "../components/PreviewVideo";
import CTASection from "../components/CTASection";
import Enroll from "../components/Enroll";
import Courses from "./Courses";
import FeaturedCoursesStrip from "../components/CourseStrip";


export default function Home() {
  return (
    <div className="">
      <Hero />
      <PreviewVideo />

      <FeaturedCoursesStrip />
      <Testimonials />
      <Enroll />
      <CTASection />
    </div>
  );
}
