import React from "react";
import Project from "../layouts/Project";

const Projects = () => {
  return (
    <div className="projects">
      <h1 className="projects__header">Projects</h1>
        <h2 className="projects__about">What I've Built!</h2>
        <div className="projects__grid">
          <Project data={["PCOV Church Application", "assets/Berkeley-Seal.png", ["Collaboratively developed a software application for the Philadelphia Church of Vancouver, a local church community", "Published Android app provides the religious community of 50+ members with a way to share images and videos, make community announcements, and reach a wider audience", "Application has worked to increase membership and has received eloquent appreciation from church members, including the Pastor himself", "The app has extended connection past physical interaction to technology", "Download Here: <a href='https://play.google.com/store/apps/details?id=org.pcov.pcovannouncements&hl=en'></a>"], "Java, Android Studio, Google Firebase", "https://github.com/PCOV-Application/PCOV-Public", "Sep 2018 - Nov 2019"]} />
          <Project data={["AI Stock Trading Bot", "assets/Berkeley-Seal.png", ["Implemented Alpaca Trading API to import data and create buy/sell orders", "Designed AI software to predict the movement of stocks based on past data and current trends; creates buy/sell orders accordingly", "", "Uploaded program to Google Cloud Storage to run infinitely on Google Cloud", "Developed with Keras, Sklearn, Numpy, Pandas, and threading"], "Python, Keras, Sklearn, Numpy, Pandas, Google Cloud Platform", "https://github.com/rexliu3/StockTradingBotCloud", "May 2020 - Jun 2020"]} />
          <Project data={["Senior House Connect", "assets/Berkeley-Seal.png", ["Creating web application for senior homes to match volunteers with seniors for one-on-one sessions", "Designing user-interface for volunteers to input preferences and for volunteer managers to manage senior and volunteers", "Implementing MySQL database to store preferences of volunteers and seniors", "Developing unique algorithm to match seniors to volunteers based on preferences", ""], "HTML, CSS, JavaScript, MySQL", "https://github.com/Studio-Coders/Senior-Connect", "Apr 2020 - PRESENT"]} />
          <Project data={["Senior House Connect", "assets/Berkeley-Seal.png", [""], "Python, Keras, Sklearn, Numpy, Pandas, Google Cloud Platform", "https://github.com/rexliu3/StockTradingBotCloud", "May 2020 - Jun 2020"]} />
          <Project data={["Senior House Connect", "assets/Berkeley-Seal.png", [""], "Python, Keras, Sklearn, Numpy, Pandas, Google Cloud Platform", "https://github.com/rexliu3/StockTradingBotCloud", "May 2020 - Jun 2020"]} />
          <Project data={["Senior House Connect", "assets/Berkeley-Seal.png", [""], "Python, Keras, Sklearn, Numpy, Pandas, Google Cloud Platform", "https://github.com/rexliu3/StockTradingBotCloud", "May 2020 - Jun 2020"]} />
          <Project data={["Senior House Connect", "assets/Berkeley-Seal.png", [""], "Python, Keras, Sklearn, Numpy, Pandas, Google Cloud Platform", "https://github.com/rexliu3/StockTradingBotCloud", "May 2020 - Jun 2020"]} />

        </div>
    </div>
  );
};

export default Projects;
