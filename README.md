# CayenneAPI

The Goal of CayenneAPI is replace an existing API for [Notstrom](https://github.com/dybn7758/Notstrom)  with a back end system that can support the full data set for the project and can scale to meet the demands of production traffic.

### Project Phases

###### Phase 1: Design and multiple database options to analyze and compare, selecting one database option
###### Phase 2: Transform the existing application data and load it into the database
###### Phase 3: Design and build an API server to provide data to the client in the format specified by the API documentation
###### Phase 4: Optimize the individual service by analyzing query times and server responses
###### Phase 5: Deploy the service and integrate it successfully with the [Notstrom](https://github.com/dybn7758/Notstrom) web application

### Teck Stacks
* Node.js
* Express
* PostgreSQL
* PGadmin4
* NGINX
* Loader.into

### Development Process
* Designed ETL process and import data from CSV files into PostgreSQL database
* Defined and created database queries, as well as B-tree & Hash indexes
* Deployed database to the AWS EC2, and created servers that able to interact with the database
* Stress Tested by loader.io and optimized performance with Nginx the load balancer

### Database diagram
![SDC-QA](https://user-images.githubusercontent.com/94567690/170399098-00909305-ee2e-45cf-bd1b-0d2b30c1dcfc.png)

### Stystem Architecture

![Untitled-2022-04-16-1135 excalidraw](https://user-images.githubusercontent.com/94567690/170399090-9f0120d3-804b-4089-a2ff-5b60caf1b60f.png)
