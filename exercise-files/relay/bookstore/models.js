import mongoose from 'mongoose';
import Promise from 'bluebird';
import _ from 'lodash';
import crypto from 'crypto';

/**
 * Generate a consistent ID given `input`
 *
 * Normally we wouldn't use this for a real app, but it's helpful to keep IDs
 * consistent across server restarts.
 **/
function makeId(input) {
  return crypto.createHash('md5').update(input).digest('hex').substring(0, 24);
}

// create the author model
const AuthorSchema = new mongoose.Schema({
  name: {
    type: String
  },
  avatarUrl: {
    type: String
  },
  bio: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book'
    }
  ]
});

const Author = mongoose.model('Author', AuthorSchema);

// create the book model
const BookSchema = new mongoose.Schema({
  name: {
    type: String
  },
  slug: {
    type: String,
    index: true
  },
  tagline: {
    type: String
  },
  description: {
    type: String
  },
  coverUrl: {
    type: String
  },
  pages: {
    type: Number,
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  authors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author'
    }
  ]
});

const Book = mongoose.model('Book', BookSchema);

// generate the sample data
async function generateSampleData() {

  // authors
  let ari = new Author({
    _id: makeId('ari'),
    name: 'Ari Lerner',
    avatarUrl: '/images/faces/ari-lerner.png',
    bio: 'Ari bio'
  });
  let nate = new Author({
    _id: makeId('nate'),
    name: 'Nate Murray',
    avatarUrl: '/images/faces/nate-murray.png',
    bio: 'Nate bio'
  });
  let felipe = new Author({
    _id: makeId('felipe'),
    name: 'Felipe Coury',
    avatarUrl: 'https://www.ng-book.com/images/ng2/authors/felipe.png',
    bio: ''
  });
  let carlos = new Author({
    _id: makeId('carlos'),
    name: 'Carlos Tabourda',
    avatarUrl: 'https://www.ng-book.com/images/ng2/authors/carlos.png',
    bio: ''
  });
  let anthony = new Author({
    _id: makeId('anthony'),
    name: 'Anthony Accomazzo',
    avatarUrl: '/images/faces/anthony-accomazzo.png',
    bio: ''
  });
  let clay = new Author({
    _id: makeId('clay'),
    name: 'Clay Allsopp',
    avatarUrl: '/images/faces/clay-allsopp.png',
    bio: ''
  });
  let david = new Author({
    _id: makeId('david'),
    name: 'David Guttman',
    avatarUrl: '/images/faces/david-guttman.png',
    bio: ''
  });
  let tyler = new Author({
    _id: makeId('tyler'),
    name: 'Tyler McGinnis',
    avatarUrl: '/images/faces/tyler-mcginnis.png',
    bio: ''
  });

  let authors = [
    ari, nate, felipe, carlos, anthony, clay, david, tyler
  ];
  await Promise.map(authors, (a) => a.save());

  // books
  let fullstackReact = new Book({
    _id: makeId('react'),
    name: 'Fullstack React',
    slug: 'fullstack-react',
    tagline: 'The Complete Book on ReactJS and Friends',
    coverUrl: '/images/books/fullstack_react_book_cover.png',
    description: 'Build awesome apps in React in record time.',
    pages: 760
  });

  let ngBookClassic = new Book({
    _id: makeId('ng-book-classic'),
    name: 'ng-book classic',
    slug: 'ng-book-classic',
    tagline: 'The Complete Book on AngularJS',
    coverUrl: '/images/books/ng_book_1_cover.png',
    description: 'Learn Angular 1 with this classic book.',
    pages: 620
  });

  let ngBook = new Book({
    _id: makeId('ng-book'),
    name: 'ng-book',
    slug: 'ng-book',
    tagline: 'The Complete Book on Angular 2',
    coverUrl: '/images/books/ng_book_2_cover.png',
    description: 'ng-book is the easiest way to learn Angular.',
    pages: 650
  });

  let books = [
    fullstackReact,
    ngBookClassic,
    ngBook
  ];
  await Promise.mapSeries(books, (b) => b.save());

  // we need to establish the two-way relationship ourselves
  let assignAuthorship = async (book, authors) => {
    book.authors = authors;
    await book.save();

    return await Promise.mapSeries(authors, (a) => {
      // tricky!
      a.books = _.uniq([book._id].concat(a.books), (b) => b.toString());
      return a.save();
    });
  }

  let authorships = [
    { 
      book: fullstackReact,
      authors: [ anthony, ari, david, clay, tyler, nate ]
    },
    { 
      book: ngBookClassic,
      authors: [ ari ]
    },
    { 
      book: ngBook,
      authors: [ nate, ari, felipe, carlos ]
    }
  ];

  return await Promise.mapSeries(authorships, ({book, authors}) => {
    return assignAuthorship(book, authors);
  });

}

generateSampleData().then(() => {
  console.log('Sample data generated');
});

export { 
  Author,
  Book
};
