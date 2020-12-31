import React from "react";
import Project from "../layouts/Project";

const Projects = () => {
  return (
    <div className="projects">
      <h1 className="projects__header">Projects</h1>
      <hr className="projects__horizontal" />
        <div className="projects__grid">
          <Project data={["PCOV Church Application", "assets/PCOV.png", ["Collaboratively developed a software application for the Philadelphia Church of Vancouver, a local church community", "Published Android app provides the religious community of 50+ members with a way to share images and videos, make community announcements, and reach a wider audience", "Application has worked to increase membership and has received eloquent appreciation from church members, including the Pastor himself", "The app has extended connection past physical interaction to technology"], ["Java", "Android Studio", "Google Firebase"], "https://github.com/PCOV-Application/PCOV-Public", "Sep 2018 - Nov 2019", "Android application to connect the PCOV Church Community through technology", "assets/PCOV-Wall.jpeg", "https://play.google.com/store/apps/details?id=org.pcov.pcovannouncements&hl=en&gl=US"]} />
          <Project data={["AI Stock Trading Bot", "assets/AI.png", ["Implemented Alpaca Trading API to import data and create buy/sell orders", "Designed AI software to predict the movement of stocks based on past data and current trends; creates buy/sell orders accordingly", "Uploaded program to Google Cloud Storage to run infinitely on Google Cloud", "Developed with Keras, Sklearn, Numpy, Pandas, and threading"], ["Python", "Keras", "Sklearn", "Numpy", "Pandas", "Google Cloud Platform"], "https://github.com/rexliu3/StockTradingBotCloud", "May 2020 - Jun 2020", "Python program that learns stock movement based on past and current data and buys/sells stocks accordingly", "assets/AI-Wall.png"]} />
          <Project data={["Senior Connect", "assets/Connect.png", ["Creating web application for senior homes to match volunteers with seniors for one-on-one sessions", "Designing user-interface for volunteers to input preferences and for volunteer managers to manage senior and volunteers", "Implementing MySQL database to store preferences of volunteers and seniors", "Developing unique algorithm to match seniors to volunteers based on preferences"], ["HTML", "CSS", "JavaScript", "MySQL"], "https://github.com/rexliu3/LocationBasedActions", "Apr 2020 – May 2020", "React website to encourage personal bonds between volunteers and seniors at Senior Homes", "assets/Senior-Wall.jpg"]} />
          <Project data={["Sorting Visualizer", "assets/Sorting.png", ["Visualize merge, quick, heap, and bubble sort algorithms", "Developed user-interface to randomize and sort arrays with React library"], ["JavaScript", "ReactJS"], "https://github.com/rexliu3/sorting_visualizer", "May 2020 - PRESENT", "Visualize popular sorting algorithms including Bubble Sort & Quick Sort", "assets/Sorting-Wall.png"]} />
          <Project data={["Location Based Notifications", "assets/Location.png", ["Designed application that sends notifications when user enters pre-set radiuses", "Implemented geofences to track user location near a center address", "Created user-interface to input address, radius, and duration", "Published to Google Play Store", ""], ["Java", "XML", "Geofences", "Android Studio"], "https://github.com/rexliu3/StockTradingBotCloud", "May 2020 - Jun 2020", "Android application that notifies users when they enter a preset region", "assets/Location-Wall.jpg"]} />
          <Project data={["Sudoku Game and Solver", "assets/Sudoku.png", ["Developed playable Sudoku game GUI with Python and the PyGame module", "Designed Sudoku board solver to visualize backtracking algorithm", "Created timer and incorrect move counter"], ["Python", "PyGame", "Algorithms"], "https://github.com/rexliu3/sudoku-solver", "May 2020", "An interactive Sudoku GUI with built-in Python solver"]} />
          {/*<Project data={["Minesweeper Game and Generator", "assets/NoImage.png", ["Implemented Minesweeper board generator based on difficult", "Implemented Minesweeper board generator based on difficult", "Users can flag and reveal boxes", "", ""], "Python, PyGame", "https://github.com/rexliu3/minesweeper", "May 2020 - Jun 2020"]} />
  */}
          </div>
    </div>
  );
};

export default Projects;
