import React, { useState, useEffect } from "react";
import { getTopArtists } from "../../../api";
import "./GenreStat.css";
import Spinner from "../../Spinner/Spinner";
import { Chart as ChartJS, ArcElement, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Legend);
ChartJS.register(ChartDataLabels);

function GenreStat({ token, state }) {
  const [artists, setTopArtists] = useState([]);
  const [chartData, setChartData] = useState({});
  const [loader, setLoader] = useState(false);
  const [chartDataUpdate, setChartDataUpdate] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      const topArtists = await getTopArtists(token, 20, "long_term");
      setTopArtists(topArtists);
      const genreCount = getGenreCount(topArtists);
      //take only top 5
      const labels = Object.keys(genreCount).slice(0, 20);
      const data = Object.values(genreCount).slice(0, 20);

      const backgroundColors = generateBackgroundColors(labels.length);
      const updatedChartData = {
        labels,
        plugins: [ChartDataLabels],
        datasets: [
          {
            data,
            backgroundColor: backgroundColors,
          },
        ],
      };
      setChartData(updatedChartData);
      setChartDataUpdate(true);
      setLoader(false);
    };
    fetchData();
  }, [token]);

  const generateBackgroundColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const hue = Math.floor(Math.random() * 360); // Random hue value between 0 and 360
      const saturation = Math.floor(Math.random() * 31) + 70; // Random saturation between 70 and 100 (bright colors)
      const lightness = Math.floor(Math.random() * 21) + 60; // Random lightness between 60 and 80 (light colors)
      const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      colors.push(color);
    }
    return colors;
  };

  const getGenreCount = (artists) => {
    const genreCount = {};
    artists.forEach((artist) => {
      artist.genres.forEach((genre) => {
        if (genreCount[genre]) {
          genreCount[genre] += 1;
        } else {
          genreCount[genre] = 1;
        }
      });
    });

    const sortedGenreCount = {};
    Object.keys(genreCount)
      .sort((a, b) => genreCount[b] - genreCount[a])
      .forEach((key) => {
        sortedGenreCount[key] = genreCount[key];
      });
    return sortedGenreCount;
  };

  const options = {
    aspectRatio: 1,
    responsive: true,
    color: "#fff",
    plugins: {
      legend: {
        position: "right",
        labels: {
          usePointStyle: true,
        },
        padding: 200,
      },
    },
  };

  return (
    <div className="genre">
     {loader && <Spinner />}
      <div className="main__chart" style={{ padding: "20px", width: "50%" }}>
        {chartDataUpdate && <Doughnut data={chartData} options={options} />}
        <h4 className="info">*Data is based on All-Time streaming</h4>
      </div>
      <div className="genre__list">
        <table className="genre__table">
          <thead>
            <tr>
              <th>Genre</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(getGenreCount(artists))
              .slice(0, 10)
              .map((genre) => {
                const count = getGenreCount(artists)[genre];
                const totalGenres = Object.keys(getGenreCount(artists)).length;
                const percentage = ((count / totalGenres) * 100).toFixed(2);
                return (
                  <tr key={genre}>
                    <td>{genre.toUpperCase()}</td>
                    <td>{percentage}%</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <h4 className="info" style={{ marginTop: "30px" }}>*Top 20 all-time data based on Artists</h4>
      </div>
    </div>
  );
}

export default GenreStat;
