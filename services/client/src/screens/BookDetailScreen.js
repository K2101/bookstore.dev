import React from 'react';
import FormatButton from '../components/FormatButton';

const BookDetailScreen = () => {
  const [format, setFormat] = React.useState('');
  const [truncate, setTruncate] = React.useState(false);

  // 'mt-5 text-md  text-gray-800 truncate'
  console.log(format);

  const selectFormat = (format) => {
    setFormat(format);
  };
  // 'mt-5 text-md  text-gray-800'
  const truncateFormat = () => {
    setTruncate(!truncate);
  };

  return (
    <div className="mt-8 bg-gradient-to-r  via-indigo-200 from-indigo-300 to-purple-300 min-h-screen">
      <div className="pl-52 pr-56 py-10">
        <h1 className="">BookDetailScreen</h1>

        <div className="mt-10 grid grid-cols-4 gap-10">
          <div className="rounded-xl shadow-2xl  ">
            <img
              src="/images/cosmos.jpg"
              alt="cosmos"
              width="300"
              className="block w-full ring-4 ring-indigo-400 rounded-xl"
            />
          </div>

          <div className="col-span-2 row-span-2">
            <h1 className="text-lg font-bold text-gray-800">
              COSMOS : POSSIBLE WORLDS
            </h1>
            <h3 className="text-lg text-gray-800">by Ann Druyan (Author)</h3>
            <div className="border border-indigo-300 mt-5 rounded-lg shadow-lg"></div>
            <h1 className="mt-2 text-md text-gray-600">Format</h1>
            <div className="space-x-5">
              <FormatButton
                format={'Kindle'}
                price={25.99}
                selectFormat={selectFormat}
              />
              <FormatButton
                format={'Paperback'}
                price={30.99}
                selectFormat={selectFormat}
              />
            </div>

            <p
              className={
                truncate
                  ? 'mt-5 text-md cursor-pointer text-gray-800'
                  : 'mt-5 text-md cursor-pointer text-gray-800 truncate'
              }
              onClick={truncateFormat}
            >
              This sequel to Carl Sagan's blockbuster continues the electrifying
              journey through space and time, connecting with worlds billions of
              miles away and envisioning a future of science tempered with
              wisdom. Based on National Geographic's internationally-renowned
              television series, this groundbreaking and visually stunning book
              explores how science and civilization grew up together. From the
              emergence of life at deep-sea vents to solar-powered starships
              sailing through the galaxy, from the Big Bang to the intricacies
              of intelligence in many life forms, acclaimed author Ann Druyan
              documents where humanity has been and where it is going, using her
              unique gift of bringing complex scientific concepts to life. With
              evocative photographs and vivid illustrations, she recounts
              momentous discoveries, from the Voyager missions in which she and
              her husband, Carl Sagan, participated to Cassini-Huygens's recent
              insights into Saturn's moons. This breathtaking sequel to Sagan's
              masterpiece explains how we humans can glean a new understanding
              of consciousness here on Earth and out in the cosmos--again
              reminding us that our planet is a pale blue dot in an immense
              universe of possibility.
            </p>
            <div className="border border-indigo-300 mt-5 rounded-lg shadow-lg"></div>

            <div className="mt-5">
              <h1 className="text-lg text-gray-700 font-bold ">Book details</h1>
              <div className="px-5 text-gray-700 text-md">
                <p>
                  ISBN:&nbsp;
                  <span>978-3-16-148410-0</span>
                </p>
                <p>
                  Publisher:&nbsp;
                  <span>
                    National Geographic; Illustrated edition (February 25, 2020)
                  </span>
                </p>
                <p>
                  Types:&nbsp;
                  <span>Paperback/Kindle</span>
                </p>
                <p>
                  Pages:&nbsp;
                  <span>378 pages</span>
                </p>
                <p>
                  Weight:&nbsp;
                  <span>0.75 pounds</span>
                </p>
                <p>
                  Language:&nbsp;
                  <span>English</span>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-indigo-600 p-10 rounded-xl ring-4 ring-indigo-400">
            <button className="bg-pink-400 py-4 px-8 block w-full">
              Add to Cart
            </button>
          </div>
        </div>

        <div className="mt-20 border-2 border-indigo-300  bg-indigo-200 p-10 rounded-xl shadow-xl">
          <h1 className="font-bold text-gray-800 text-lg">Editorial Reviews</h1>

          <div className="p-5">
            <h2 className="font-bold text-gray-800 text-lg">Review</h2>
            <p className="pt-2 text-gray-800">
              “In the breadth of its scope and the magnitude of its
              imagination…Possible Worlds is a triumphant return to scale, and a
              direct challenge to a humanity that seems to have lost its will to
              confront and overcome the problems that face it. It encompasses
              astronomy, neuroscience, quantum physics, the origins of life, the
              future of space flight, nuclear weaponry, alternate intelligence
              models, cosmology, archaeology, anthropology, and biochemistry in
              the breathtaking course of its 370 richly illustrated pages, all
              driven by Druyan’s approachable but grand prose that urges us to
              find in ourselves the intellectual courage to truly know who we
              are, where we came from, and what possible futures stretch out
              before us.” –Women You Should Know
            </p>
            <p className="pt-7 text-gray-800">
              “Now, 40 years later, Ann Druyan boldly carries the torch forward
              with the long-awaited sequel to the book, COSMOS with Cosmos:
              Possible Worlds.” –Laughing Place
            </p>
            <p className="pt-7 text-gray-800">
              “In the breadth of its scope and the magnitude of its imagination,
              it is teaching us again how to look beyond our tribal
              specializations towards a future powered by a bold syncretism.
              Possible Worlds is a triumphant return to scale, and a direct
              challenge to a humanity that seems to have lost its will to
              confront and overcome the problems that face it. It encompasses
              astronomy, neuroscience, quantum physics, the origins of life, the
              future of space flight, nuclear weaponry, alternate intelligence
              models, cosmology, archaeology, anthropology, and biochemistry in
              the breathtaking course of its 370 richly illustrated pages, all
              driven by Druyan’s approachable but grand prose that urges us to
              find in ourselves the intellectual courage to truly know who we
              are, where we came from, and what possible futures stretch out
              before us.” –Women You Should Know
            </p>

            <p className="pt-7 text-gray-800">
              “Ann Druyan is reimagining the future.” –Scientific American
            </p>
            <h2 className="font-bold text-gray-800 text-lg pt-7">
              About the Author
            </h2>
            <p className="pt-7 text-gray-800">
              ANN DRUYAN is a celebrated writer and producer who co-authored
              many bestsellers with her late husband, Carl Sagan. She also
              famously served as creative director of the Voyager Golden Record,
              sent into space 40 years ago. Druyan continues her work as an
              interpreter of the most important scientific discoveries,
              partnering with NASA and the Planetary Society. She has served as
              Secretary of the Federation of American Scientists and is a
              laureate of the International Humanist Academy. Most recently, she
              received both an Emmy and Peabody Award for her work in
              conceptualizing and writing National Geographic's first season of
              Cosmos. --This text refers to an alternate kindle_edition edition.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailScreen;
