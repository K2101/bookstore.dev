import React from 'react';
import ByGenreCard from '../components/ByGenreCard';

const GenreLists = ({ genre }) => {
  console.log(genre);

  const listBooksByGenre = [
    '/images/cover8.jpg',
    '/images/cover10.jpg',
    '/images/cover11.jpg',
    '/images/cover12.jpg',
    '/images/cover14.jpg',
    '/images/cover15.jpg',
    '/images/cover17.jpg',
    '/images/cover19.jpg',
    '/images/cover20.jpg',
    '/images/cover21.jpg',
  ];

  const showByGenre = listBooksByGenre.map((book) => {
    return <ByGenreCard img={book} />;
  });
  return (
    <div className="mt-20 mr-8 ml-32">
      <div className="lg:grid grid-cols-6 gap-y-20">{showByGenre}</div>
    </div>
  );
};

export default GenreLists;
