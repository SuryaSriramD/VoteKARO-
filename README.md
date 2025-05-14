# 🗳️ VoteKARO! – Online Voting System App

VoteKARO! is a sleek and secure mobile application built with **React Native** and **Expo**, designed to enable **easy, transparent, and tamper-proof online voting**. Whether it's a college election, society decision-making, or club polling, VoteKARO! makes your voting experience effortless and digital.

---

## 🚀 Features

✅ **User Authentication**  
✅ **Secure Voting Sessions**  
✅ **Real-time Vote Counting**  
✅ **Role-Based Access (Voter/Admin)**  
✅ **Beautiful UI with React Native Paper**  
✅ **Bottom Tab & Stack Navigation**  
✅ **Session Persistence with Context API**  
✅ **UUID-based Unique Voter Identity**

---

## 📱 Built With

- **React Native** `v0.76.9`
- **Expo** `~52.0.46`
- **React Navigation (Stack & Tabs)`
- **React Native Paper** – Material Design UI components
- **UUID** – For generating secure unique identifiers
- **Context API** – Lightweight state management

---

## 📂 Project Structure
```
votekaro/
│
├── components/ # Reusable UI components
├── context/ # Auth & Voting contexts
├── navigation/ # Stack & Tab navigators
├── screens/ # App screens (Login, Home, Vote, Results)
├── App.js # Entry point
├── app.json # Expo config
├── index.js # Main registration file
├── package.json # Dependencies & scripts
└── README.md # You're reading it!
```

---

## 🔐 Roles

- 👤 **Voter**: Log in securely, cast vote once, and view results
- 🛡️ **Admin**: Create/manage polls, view analytics, and moderate users

---

## 🧪 Run Locally

> Make sure you have **Node.js**, **Expo CLI**, and a physical/emulated mobile device ready.

```bash
# Clone the repo
git clone https://github.com/your-username/votekaro.git

# Navigate to project
cd votekaro

# Install dependencies
npm install

# Start the app
npm start
```

##📈 Future Improvements

-   🔐 OTP-based email/mobile login

-  📊 Graphical result charts

-   🌐 Backend integration with Firebase/MongoDB

- 📥 Offline voting queueing

-   👨‍👩‍👧 Group-based polls and anonymous voting
