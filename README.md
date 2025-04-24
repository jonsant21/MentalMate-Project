# 🌿 Welcome to MentalMate

<p align="center">
  <img src="./public/MentalMate%20Logo%2002-26.png" width="300"/>
</p>

> MentalMate is a personalized mental health chatbot website aimed at creating a supportive environment where users can freely express their emotions and receive constructive feedback. It provides emotional support through AI-powered chatbot interactions, offering users a space to reflect, vent, or seek guidance.

> MentalMate plays an important role in increasing accessibility to mental health support, especially for individuals who may not have immediate access to traditional resources. Whether you're actively seeking mental health support, exploring mindfulness and stress management techniques, or simply curious, MentalMate is designed to be inclusive and accessible to everyone.

---

## ✨ Features

- 🧠 [**AI-powered chatbot**](#chatbot) for mental for mental health conversations  
- 📅 [**Mood tracking**](#mood-tracking) with daily reflections  
- 📓 [**Secure journaling**](#journaling) with timestamped entries  
- 🌼 **Daily affirmations** for positivity  
- 📈 **Dashboard** for personal growth insights

In-depth explanations of each feature can be seen by clicking on each feature.

---

## 🚀 Tech Stack

| Frontend  | Backend    | Database | Other         |
|-----------|------------|----------|---------------|
| React     | Node.js    | MySQL    | Express, JWT  |

---

## 🛠️ Installation

In order to run MentalMate, you must have Node installed. To learn how to install Node onto your computer, check out Node's official website:
> https://nodejs.org/en/download

From there, you can install all the necessary packages needed to run the application, including React and its dependencies. 

```bash
# After cloning the repository, cd to the folder
cd mentalmate-project

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install

#In separate terminals:
#From the root directory:

#Run the server
cd backend
node server

# Run the client
npm start

```

---

## ⚙️ Configuration

This project allows for some light configuration of the chatbot model directly in the backend. These settings can be changed in 📁 backend/routes/ChatBot.js


🔧 System Prompt

The `systemMessage` defines how the AI behaves. You can edit the tone, personality, and guidance the model receives:

```js
const systemMessage = {
  role: 'system',
  content: `You are a compassionate and supportive mental health chatbot designed to offer emotional support...`
};

```

This is where you can customize the chatbot’s behavior — for example, making it more casual, adding specific instructions, or adjusting how it handles sensitive topics.

🤖 Model Version

You can change which OpenAI model is used by updating this line:

```js
const systemMessage = {
  role: 'system',
  content: `You are a compassionate and supportive mental health chatbot designed to offer emotional support...`
};

```
Some other supported model options include:

'gpt-4'

'gpt-3.5-turbo'

'gpt-4o' (latest, recommended)

Refer to OpenAI’s model list for up-to-date options.

🧠 Context Memory Limit
To reduce API token usage, you can limit how many past messages are remembered during a chat session:

```js
const maxContextMessages = 3;


```

Increase this number to give the bot more memory of the conversation, or decrease it to lower token costs. This affects performance, tone consistency, and cost.

There are more possible configurations within our backend regarding the OpenAI API. Feel free to explore and adjust these settings to better fit your chatbot's goals or environment.

---

## 🖼️ Preview
Upon running the application, you will be greeted by the main menu:

![MentalMate Screenshot](./public/Home.png)

This serves as a welcome for the user and allows anyone to get acquainted with MentalMate features before logging in. In order to access any of these features, you do need to create an account, so none of the features are shown until a user is successfully logged into an authenticated account.


However, once a user is logged in, the signed-in user now has access to the journaling, mood tracking, and chatbot:

![MentalMate Screenshot](./public/HomeDashboard.png)

Clicking on any of the features on the navigation bar takes you to their respective windows.

---

## Features: In Depth

### Mood Tracking
> Soon to be updated with a picture and description


### Journaling
![MentalMate Screenshot](./public/Journal.png)

The journaling feature allows users to create and save personal journal entries linked to their account. Each journal entry consists of a title and the user's written content. When a user saves a journal entry, the date is automatically recorded and displayed whenever the journal is accessed. Users can edit existing entries at any time or delete them if desired. Before any deletion, a confirmation prompt ensures the user truly intends to remove the entry.


### ChatBot
![MentalMate Screenshot](./public/ChatBot.png)

The ChatBot feature enables users to interact with an AI chatbot designed to support mental health. Users can communicate with the chatbot through text or, optionally, through voice if permission is granted. The chatbot responds in both text and voice, and users can switch between the two modes as needed. If any inappropriate or off-topic messages are detected, the chatbot will gently redirect the conversation back to its core purpose: providing mental health guidance, support, and mindfulness tips.


### Profile 
![MentalMate Screenshot](./public/Profile.png)

The profile page provides an overview of the user's personal information, including their username, date of birth, and more. Users have the option to update any of their details, except for their email address. If they choose to delete their account, a confirmation prompt will appear to ensure they want to proceed with the deletion.








