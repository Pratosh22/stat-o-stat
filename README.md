# Stat-O-Stat 

<img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png" alt="Stat-O-Stat Logo" width="400" style="margin-bottom:20px" >

Welcome to Stat-O-Stat, your ultimate Spotify companion app! This application provides you with powerful features to enhance your music streaming experience. With Stat-O-Stat, you can easily explore your top artists, songs, and genres, receive personalized song recommendations, and create playlists based on your preferences.

[Live Demo](https://stat-o-stat.vercel.app/) | [Documentation](https://github.com/pratosh22/stat-o-stat/blob/main/docs/README.md) 

## Features

- **Top Artists, Songs, and Genres**: Get insights into your music listening habits by viewing your top artists, songs, and genres from Spotify. Discover which artists you've been listening to the most and explore the songs that have captured your attention.
- **Personalized Song Recommendations**: Stat-O-Stat analyzes your top recent songs and artists to generate personalized song recommendations. Discover new music that aligns with your preferences and expand your musical horizons.
- **Playlist Creation**: Utilize the power of personalized recommendations to create playlists that perfectly match your taste in music. Save time and effort by letting Stat-O-Stat curate a playlist tailored to your preferences.
- **Genre Distribution Visualization**: Gain a deeper understanding of your music preferences with the genre distribution doughnut graph. Visualize the distribution of genres in your music library and explore your diverse range of musical interests.

## Installation

To get started with Stat-O-Stat on your local machine, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/pratosh22/stat-o-stat.git
```

2. Navigate to the project directory:

```bash
cd stat-o-stat
```

3. Install the dependencies:

```bash
npm install
```

4. Configure your Spotify API credentials:

   - Create a Spotify developer account at [https://developer.spotify.com/](https://developer.spotify.com/).
   - Create a new application and obtain the client ID and client secret.
   - Update the configuration file `config.js` with your Spotify API credentials.

5. Start the development server:

```bash
npm start
```

6. Open your web browser and visit [http://localhost:3000](http://localhost:3000) to access Stat-O-Stat.


## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Refer to the [LICENSE](https://github.com/pratosh22/stat-o-stat/blob/main/LICENSE) file for more information.

## Acknowledgements

- This app uses the Spotify Web API to retrieve user data and recommendations. Special thanks to Spotify for providing the API.
- The doughnut graph visualization is powered by [Chart.js](https://www.chartjs.org/), a versatile JavaScript charting library.


