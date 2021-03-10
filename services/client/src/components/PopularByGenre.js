import React from 'react';
import ByGenreButton from '../components/ByGenreButton';
import GenreLists from '../components/GenreLists';

const PopuparByGenre = () => {
  const [genreButton, setGenreButton] = React.useState('');

  const genreLists = [
    'Business',
    'Science',
    'Fiction',
    'History',
    'Philosophy',
    'Technology',
    'Biography',
  ];

  const setGenre = (genre) => {
    setGenreButton(genre);
  };

  const showGenreLists = genreLists.map((genre) => {
    return <ByGenreButton genre={genre} handleList={setGenre} />;
  });

  return (
    <div className="bg-gradient-to-r  via-indigo-200 from-indigo-300 to-purple-300 lg:py-40 min-h-screen">
      <div className="flex items-center justify-between px-32">
        <h1
          className="text-2xl lg:text-6xl font-extrabold bg-clip-text text-transparent 
          bg-gradient-to-r from-indigo-600 to-purple-600 pb-10"
        >
          Popular by Genre
        </h1>
        <div className="lg:flex  space-x-4 text-right lg:space-x-14 text-indigo-500 text-lg">
          {showGenreLists}
        </div>
      </div>

      <div className="border border-indigo-400 shadow-lg mx-32 mt-10"></div>

      <GenreLists genre={genreButton} />
    </div>
  );
};

export default PopuparByGenre;
