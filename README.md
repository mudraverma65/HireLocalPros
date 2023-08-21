# CSCI 5709 Report Web Application

# ![Local Image](./client/src/images/logorbg.png)

## HireLocalPros

* HireLocalPros is a user-friendly platform that offers a hassle-free way for individuals to discover and engage with nearby service providers. With a focus on convenience, the website aims to simplify the process of hiring local services by providing detailed information such as service descriptions, provider profiles, pricing, and availability. By facilitating seamless communication between users and service providers, the platform optimizes the hiring process, ensuring that finding and hiring dependable local professionals is both effortless and efficient.

## Authors

* [Limysh Kalapala](lm657206@dal.ca) 
* [Pallavi Marni](pl381965@dal.ca)
* [Mudra Verma](mudraverma@dal.ca)
* [Manil Patel](manilpatel@dal.ca)
* [Manav Bhikadiya](bh957167@dal.ca)

## Links
* Date Created: 20 June 2023
* Last Modification Date: 11 August 2023
* Website URL: https://csci-web-project-frontend.onrender.com/
* Project Git Repo: https://git.cs.dal.ca/manavbhai/csci_5709_group03/-/tree/main
* Report Web application Git URL: https://github.com/manavbhikadiya/CSCI_5709_GROUP3 

## Deployment

* [Render.com](https://render.com/)

## Clone the project

```bash
  git clone https://git.cs.dal.ca/manavbhai/csci_5709_group03/-/tree/main
```
## Technology Used to Build HireLocalPros

* [React.js](https://react.dev/)
* [MongoDB](https://www.mongodb.com/)
* [Node.js](https://nodejs.org/)
* [Express.js](https://nodejs.org/)
* [Render.com](https://render.com/)
* [Material UI](https://mui.com/)

## Prerequisites

* Node.js (@latest)
* Npm (@latest)
* 8 GB RAM

## Run Backend Locally

Go to the Server folder

```bash
  cd ./server
```

Install dependencies

```bash
  npm install
```

Start the project

```bash
  node index.js
```


## Run Frontend Locally

Go to the Client folder

```bash
  cd ./client
```

Install dependencies

```bash
  npm install
```

Start the project

```bash
  npm start
```

Create build folder for production
```bash
  npm run build
```


## Dependencies for backend and frontend

Add the following dependencies:

* emotion/react@11.11.1
* emotion/styled@11.11.0
* material-ui/core@4.12.4
* material-ui/icons@4.11.3
* mui/icons-material@5.11.16
* mui/material@5.13.5
* mui/styles@5.13.2
* testing-library/jest-dom@5.16.5
* testing-library/react@13.4.0
* testing-library/user-event@13.5.0
* mui@0.0.1
* react-dom@18.2.0
* react-material-ui-carousel@3.4.2
* react-router-dom@6.13.0
* react-scripts@5.0.1
* react@18.2.0
* web-vitals@2.1.4
* nodemailer
* express
* mongoose
* jsonwebtoken
* body-parser
* axios

## Cross Browser and Device Compatibility
* Chrome
* Mozila firefox
* Microsoft Edge
* Mobile
* Desktop
* Tablet

## Performance of HireLocalPros
We are using [Render.com](https://render.com/) to deploy our backend and frontend. Render.com provider free tier to host the application we are currently enrolled in the free tier. Hence, our application is quite slow. Another significant factor behind this is render.com turn off the server when there are no requests comming. Hence, when we open our site after some time it again restart the server and serve the web pages. This is the COLD START problem [8], because of that our application is quite slow.

## Security

Our application is fully secured. We used JWT based authentication to provide advance security to our application. Moreover, we created the protected routes into the frontend as well so, whenever user request the page without login into the system they are automatically redirect to the login page.

## Testing

We performed following testings on our application
* Functional Testing
* Performace Testing
* Regression Testing

However, we can use Automation testing using Cypress or Selenium. We are targetting to complete e2e test using automation tool Cypress in the future.

## Novelty Work

* Created **InterCeptors** to authenticate request before sending into the backend (client/src/services)
* **Protected Routes** (client/src/ProtectedRoutes.js)

## References

[1] AppSeed. (2023). MUI React Coding Landing Page. [Online]. Available: https://blog.appseed.us/mui-react-coding-landing-page/. [Accessed: August 09, 2023].

[2] LogRocket. (2023). Using React Responsive to Implement Responsive Design. LogRocket Blog. [Online]. Available: https://blog.logrocket.com/using-react-responsive-to-implement-responsive-design/. [Accessed: August 09, 2023].

[3] Simplilearn. (2023). How to Create a Functional React Dropdown Menu. Simplilearn Tutorials. [Online]. Available: https://www.simplilearn.com/tutorials/reactjs-tutorial/how-to-create-functional-react-dropdown-menu. [Accessed: August 09, 2023].

[4] The MUI Team. (2023). Modal - Material-UI. Material-UI. [Online]. Available: https://mui.com/material-ui/react-modal/. [Accessed: August 09, 2023].

[5] "How to send email with Nodemailer using Gmail account in Node.js ?", geekeforgeeks, [Online]. Available https://www.geeksforgeeks.org/how-to-send-email-with-nodemailer-using-gmail-account-in-node-js/ [Accessed: August 09, 2023].

[6] "How to upload images in the mongoDB using multer and node.js", bezcoder.com, [Online]. Available https://www.bezkoder.com/node-js-upload-store-images-mongodb/ [Accessed: 09, 2023].

[7] "ERROR: Request too larger", stakeoverflow.com, [Online]. Available https://stackoverflow.com/questions/19917401/error-request-entity-too-large [Accessed: August 09, 2023].

[8] "Cold Start Problem", en.wikipedia.org, [Online]. Available https://en.wikipedia.org/wiki/Cold_start_(recommender_systems) [Accesed: August 11, 2023].

[9] Image 1: https://img1.wsimg.com/isteam/ip/720aa643-00e5-42b5-92a8-83ff8252d6b7/Champion%20Plumbing%20logo%20only%20for%20website.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=h:500,cg:true

[10] Image 2: https://www.iconpacks.net/icons/4/free-laptop-search-icon-12530-thumb.png

[11] Image 3: https://cdn1.vectorstock.com/i/1000x1000/55/10/task-complete-job-done-work-complete-icon-vector-27195510.jpg

[12] Image 4: https://t4.ftcdn.net/jpg/05/54/17/79/360_F_554177966_xX2acthwHjhZ9c8dTeLZZ7DhLjJJ0IRK.jpg