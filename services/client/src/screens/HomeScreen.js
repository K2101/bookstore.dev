import Hero from '../components/Hero';
import FeaturedBooks from '../components/FeaturedBooks';
import PopularByGenre from '../components/PopularByGenre';

const HomeScreen = () => {
  return (
    <>
      <Hero />

      <FeaturedBooks />

      <PopularByGenre />
    </>
  );
};

export default HomeScreen;
