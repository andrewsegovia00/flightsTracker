# :airplane:  Travel Bud 

## Description:

Travel Bud is a user-friendly app that empowers travelers to budget and manage their expenses effortlessly. With a strong focus on forecasting and planning, Travel Bud provides a comprehensive platform to estimate trip costs and simulate budgets before you even set foot on your journey. Its intuitive design allows users to seamlessly track and categorize expenses while on the go, ensuring a smooth and stress-free travel experience. Whether you're a seasoned traveler or planning your first adventure, Travel Bud is your ultimate companion for smart and efficient budgeting.

## Below: The Wireframe of the Game
## Wireframe 1
![wireframe1](/public/images/wireframe_1.png)

## Wireframe 2
![wireframe1](/public/images/wireframe_2.png)

## Wireframe 3
![wireframe1](/public/images/wireframe_3.png)

## Wireframe 4
![wireframe1](/public/images/wireframe_4.png)

## Technologies Used:
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)

![Node.JS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

![Heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)

![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)

![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)

![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

![VScode](https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)

## Getting Started

:video_game: [Live Link](https://travelbudgeting-tracker-0734a04974ea.herokuapp.com/)

Clone the repository: Start by cloning this GitHub repository to your local machine using the following command:

```
git clone https://github.com/your-username/travel-bud.git
```

Install Dependencies: Navigate to the project directory and install the required dependencies by running the following command:

```
npm install
```
Set up Environment Variables: Create a .env file in the root directory of the project and set the following environment variables:

```
SECRET=your_secret_key
MONGODB_URI=your_mongodb_uri
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_SECRET=your_google_secret
GOOGLE_CALLBACK=your_google_callback_url
```

Start the Server: Once the dependencies and environment variables are set up, start the server with the following command:

```
npm start
```
Access the Application: Travel Bud should now be running on http://localhost:3000/. Open your web browser and visit this URL to access the application.

Sign In and Get Started: Travel Bud provides Google OAuth for user authentication. Click on the "LOG IN" button on the top-right corner of the navigation bar to sign in with your Google account. Once signed in, you can start creating and managing your travel budgets and expenses.

Explore and Enjoy: Now you're all set to explore Travel Bud's features and enjoy a seamless and organized travel planning experience. Happy traveling!

## Game Screenshots:

### Below: Home Page View
![A screenshot displaying the home page.](/public/images/homePage.png)

### Below: Personal Trip Entries
![A screenshot displaying the dashboard of your personal trip.](/public/images/personalTripView.png)

### Below: Adding an Expense
![A screenshot displaying the user flow to add an expense.](/public/images/addingExpense.png)

### Below: Deleting a Journey
![A screenshot showing the sad moment the user decides to delete a journey](/public/images/deletinJourney.png)

## Logic Behind the Machine
```ejs
<div id="deleteJourneyShowModal" class="hide">
                    <form id="journeyDelete" method="POST" action="/dashboard/<%= journey._id %>?_method=DELETE">
                        <div class="popUpSpacing">
                            <div>Are you sure you want to delete this Journey?</div>
                        </div>
                        <div class="popUpBtns">
                            <button class="CancelPopUp" type="button" id="closeDeleteJourney">No</button>
                            <button class="confirmsPopUp" type="submit">Yes</button>
                        </div>
                    </form>
                </div>
```
This code snippet displays a modal pop-up for deleting a journey. Modals/PopUps that help the user are my favorite, expecially when there's a message stopping me from deleting an entry accidentally. The modal is starts as a hidden class, and an event listener queues the function that displays the moal. The form uses the POST method with a DELETE action, which allows the server to handle the deletion request when the user clicks the "Yes" button. The modal provides a warning message asking the user to confirm their intention before proceeding with the deletion. If the user clicks the "No" button, the modal is closed without any further action. The code snippet adds a layer of protection to avoid accidental deletions.

## Future Features / Icebox:
- [ ] Add mobile-responsive design.
- [ ] Add the ability to share your journeys and forecasted budgets with friends ad loved ones.
- [ ] Request a travel API to populate the homepage with popular destination and more details about the location.
- [ ] Add the ability to add another user to the same journey and share expenses and costs belonging to a user.