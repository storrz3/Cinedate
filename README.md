# Birthday Movie Finder

A luxurious and minimalist website that shows you which movies were released on your birthday throughout cinema history.

## Features

- Search for movies released on a specific date (month and day)
- Filter results by genre
- Sort results by release date, popularity, or title
- Responsive design for all devices
- Elegant animations and transitions

## Screenshots

(Screenshots will be added once the application is deployed)

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Framer Motion for animations
- TMDB API for movie data

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- TMDB API key (get it from [https://www.themoviedb.org/documentation/api](https://www.themoviedb.org/documentation/api))

### Installation

1. Clone the repository

```bash
git clone https://github.com/your-username/birthday-movie-finder.git
cd birthday-movie-finder
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Add your TMDB API key

Edit the file `src/services/api.ts` and replace `YOUR_TMDB_API_KEY` with your actual API key:

```javascript
const API_KEY = 'YOUR_TMDB_API_KEY';
```

4. Start the development server

```bash
npm start
# or
yarn start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Deployment

This project can be easily deployed to services like Netlify, Vercel, or GitHub Pages.

### Netlify Deployment

1. Create a production build

```bash
npm run build
# or
yarn build
```

2. Deploy using the Netlify CLI or connect your GitHub repository to Netlify for automatic deployments.

## Environment Variables

In a production environment, it's recommended to use environment variables for the API key. Create a `.env` file in the root directory:

```
REACT_APP_TMDB_API_KEY=your_api_key_here
```

Then update the `api.ts` file:

```javascript
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
```

## License

MIT

## Acknowledgements

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the movie data API
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [React DatePicker](https://reactdatepicker.com/) for the date selection component
