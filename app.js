// 🔥 FIREBASE CONFIG (PASTE YOURS HERE)
const firebaseConfig = {
    apiKey: "AIzaSyBidDkElxe6jKaCoeRdhdgwJx5zXnu3Eg4",
    authDomain: "food-suggestion-1ce2d.firebaseapp.com",
    projectId: "food-suggestion-1ce2d",
    storageBucket: "food-suggestion-1ce2d.firebasestorage.app",
    messagingSenderId: "526105101015",
    appId: "1:526105101015:web:c743a3c4c1ab926d502692"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const foodRef = db.collection("foods");

// ---------------- INDEX PAGE ----------------

async function getRandomFood() {
  const snapshot = await foodRef.get();
  const foods = snapshot.docs.map(doc => doc.data().name);

  if (foods.length === 0) {
    document.getElementById("foodText").innerText = "No food added yet";
    return;
  }

  const random = foods[Math.floor(Math.random() * foods.length)];
  document.getElementById("foodText").innerText = random;
}

// Auto load food
if (document.getElementById("foodText")) {
  getRandomFood();
}

// ---------------- EDIT PAGE ----------------

async function addFood() {
  const input = document.getElementById("foodInput");
  const value = input.value.trim();

  if (!value) return;

  await foodRef.add({ name: value });
  input.value = "";
  loadFoods();
}

async function loadFoods() {
  const list = document.getElementById("foodList");
  if (!list) return;

  list.innerHTML = "";
  const snapshot = await foodRef.get();

  snapshot.forEach(doc => {
    const li = document.createElement("li");
    li.innerText = doc.data().name;
    list.appendChild(li);
  });
}

loadFoods();
