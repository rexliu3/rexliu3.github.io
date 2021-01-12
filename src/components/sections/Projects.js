import React from "react";
import Project from "../layouts/Project";

const projects = [
  {
    name: "PCOV Church Application",
    logo: "assets/PCOV.png",
    description: [
      "Collaboratively developed a software application for the Philadelphia Church of Vancouver, a local church community",
      "Published Android app provides the religious community of 50+ members with a way to share images and videos, make community announcements, and reach a wider audience",
      "Application has worked to increase membership and has received eloquent appreciation from church members, including the Pastor himself",
      "The app has extended connection past physical interaction to technology",
    ],
    tools: ["Java", "Android Studio", "Google Firebase"],
    github: "https://github.com/PCOV-Application/PCOV-Public",
    date: "Sep 2018 - Nov 2019",
    summary:
      "Android application to connect the PCOV Church Community through technology",
    image: "assets/PCOV-Wall.jpeg",
    link:
      "https://play.google.com/store/apps/details?id=org.pcov.pcovannouncements&hl=en&gl=US",
  },
  { 
    name: "AI Stock Trading Bot",
    logo: "assets/AI.png",
    description: [
      "Implemented Alpaca Trading API to import data and create buy/sell orders",
      "Designed AI software to predict the movement of stocks based on past data and current trends; creates buy/sell orders accordingly",
      "Uploaded program to Google Cloud Storage to run infinitely on Google Cloud",
      "Developed with Keras, Sklearn, Numpy, Pandas, and threading",
    ],
    tools: [
      "Python",
      "Keras",
      "Sklearn",
      "Numpy",
      "Pandas",
      "Google Cloud Platform",
    ],
    github: "https://github.com/rexliu3/StockTradingBotCloud",
    date: "May 2020 - Jun 2020",
    summary:
      "Python program that learns stock movement based on past and current data and buys/sells stocks accordingly",
    image: "assets/AI-Wall.png",
    link: null,
  },
  {
    name: "Senior Connect",
    logo: "assets/Connect.png",
    description: [
      "Creating web application for senior homes to match volunteers with seniors for one-on-one sessions",
      "Designing user-interface for volunteers to input preferences and for volunteer managers to manage senior and volunteers",
      "Implementing MySQL database to store preferences of volunteers and seniors",
      "Developing unique algorithm to match seniors to volunteers based on preferences",
    ],
    tools: ["HTML", "CSS", "JavaScript", "MySQL"],
    github: "https://github.com/rexliu3/LocationBasedActions",
    date: "Apr 2020 – May 2020",
    summary:
      "React website to encourage personal bonds between volunteers and seniors at Senior Homes",
    image: "assets/Senior-Wall.jpg",
    link: null,
  },
  {
    name: "Sorting Visualizer",
    logo: "assets/Sorting.png",
    description: [
      "Visualize merge, quick, heap, and bubble sort algorithms",
      "Developed user-interface to randomize and sort arrays with React library",
    ],
    tools: ["JavaScript", "ReactJS"],
    github: "https://github.com/rexliu3/sorting_visualizer",
    date: "May 2020 - PRESENT",
    summary:
      "Visualize popular sorting algorithms including Bubble Sort & Quick Sort",
    image: "assets/Sorting-Wall.png",
    link: null,
  },
  {
    name: "Location Based Notifications",
    logo: "assets/Location.png",
    description: [
      "Designed application that sends notifications when user enters pre-set radiuses",
      "Implemented geofences to track user location near a center address",
      "Created user-interface to input address, radius, and duration",
      "Published to Google Play Store",
    ],
    tools: ["Java", "XML", "Geofences", "Android Studio"],
    github: "https://github.com/rexliu3/StockTradingBotCloud",
    date: "May 2020 - Jun 2020",
    summary:
      "Android application that notifies users when they enter a preset region",
    image: "assets/Location-Wall.jpg",
    link: null,
  },
  {
    name: "Sudoku Game and Solver",
    logo: "assets/Sudoku.png",
    description: [
      "Developed playable Sudoku game GUI with Python and the PyGame module",
      "Designed Sudoku board solver to visualize backtracking algorithm",
      "Created timer and incorrect move counter",
    ],
    tools: ["Python", "PyGame", "Algorithms"],
    github: "https://github.com/rexliu3/sudoku-solver",
    date: "May 2020",
    summary: "An interactive Sudoku GUI with built-in Python solver",
    image: "assets/Sudoku-Wall.gif",
    link: null,
  },
  {
    name: "Minesweeper Game and Generator",
    logo: "assets/Minesweeper.png",
    description: [
      "Implemented Minesweeper board generator based on difficult",
      "Implemented Minesweeper board generator based on difficult",
      "Users can flag and reveal boxes",
    ],
    tools: ["Python", "PyGame"],
    github: "https://github.com/rexliu3/minesweeper",
    date: "May 2020 - Jun 2020",
    summary: "A playable MineSweeper GUI; features board generator and solver",
    image: "assets/Minesweeper-Wall.png",
    link: null,
  },
  {
    name: "Scheme Interpreter",
    logo: "assets/Scheme.png",
    description: [
      "Developed Scheme language interpreter in Python",
      "Includes procedures, name binding, environments, etc.", 
    ],
    tools: ["Python", "Scheme"],
    github: "https://github.com/rexliu3/minesweeper",
    date: "Nov 2020",
    summary: "A Scheme interpreter built in Python",
    image: "assets/Scheme-Wall.gif",
    link: null,
  },
];

const Projects = () => {
  return (
    <div className="projects">
      <h1 className="projects__header">Projects</h1>
      <hr className="projects__horizontal" />
      <div className="projects__grid">
        {projects.map((project) => (
          <Project data={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
