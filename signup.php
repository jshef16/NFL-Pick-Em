<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyD75_7uQWQtJHAOce0yYOQOZn7ME6SIoX0",
    authDomain: "nfl-pickem-6d43f.firebaseapp.com",
    projectId: "nfl-pickem-6d43f",
    storageBucket: "nfl-pickem-6d43f.appspot.com",
    messagingSenderId: "80897335788",
    appId: "1:80897335788:web:5953c3258d37c5b2f7a0c9",
    measurementId: "G-HTE07SYLVD"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>