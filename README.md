GitOn
=====

CS 467 Social Visualization Project
---------------------------------------------
## Overview
Analyzes a given GitHub repository for the number of replies and activity related to a certain issue. 
Creates a refined visualization that plots the number of comments by user on a give day.

There are two parts about the projects. For the first part, we developed a web application, which uses real time data from Github to visualize the comments and time for each issue to be resolved. For the second part, we developed a static page using static csv file. It basically shows user activity in each issue comment.

## People 
+ Xuefeng Zhu 
+ Shantanu Dev
+ Chuma Kabaghe
+ Prashanth Nambiar 
 

## Web application(Part1)

For the web application, we are using http://visjs.org/ to help us to do the visualization. We mainly write the code, which is in the js/controller.js file, to fetch and process data. 

The demo can be find at http://xuefeng-zhu.github.io/GitOn/ 
The way to use the web application is very simple. You can provide User name and Repository name, and then press the button "Visualize". For example, input "videojs" for User name and "video.js" for Repository name. It will show two graph. The first one is about how many comments take for each labeled issue to be resolved. The second one is about how long does each labeled issue to be resolved.

If you want to run the application offline, just go to the application folder in terminal and then run "python -m SimpleHTTPServer" Then visit localhost:8000

## Static page(Part2)

For the static page, we used Javascript and Python to extract Github information for a given repository. It is it then converted into a CSV to allow D3.js to be able to parse our dataset for use in our visualization. Our visualization for the steam graph was based off this online tutorial: http://www.delimited.io/blog/2014/3/3/creating-multi-series-charts-in-d3-lines-bars-area-and-streamgraphs. 

Using this data that we extracted, we created a interactive steam graph to display the information by user. Our intended goal was to show the number of comments being made stratified by the various users making the comments in order to resolve an issue. On the visualization, the x-axis for our visualization is the date of the issues and our y-axis is the total number of comments for all the issues in the repository. A notable feature to note about our visualization is the interactive effects when a mouse hovers over a node on the graph; it displays a small pop-up window showing the total number of comments and which user made those comments.

If you want to run the application, just go to the application folder in terminal and then run "python -m SimpleHTTPServer" Then visit localhost:8000

