import HeroBanner from "./components/HeroBanner";
import {QuickMenu} from "./components/QuickMenu";
import {RecommendPhotos} from "./components/RecommendPhotos";

export default function HomePage() {
  return (
    <div>
      <HeroBanner />
      <QuickMenu />
      <RecommendPhotos />
    </div>
  );
}
