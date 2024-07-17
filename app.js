const firebaseConfig = {
  apiKey: "AIzaSyAGLsEgtSCqIUZY6rAzR1y7j7cyG9HU8tY",
  authDomain: "gamestore-7786e.firebaseapp.com",
  projectId: "gamestore-7786e",
  storageBucket: "gamestore-7786e.appspot.com",
  messagingSenderId: "320614136633",
  appId: "1:320614136633:web:eccaed5ed9544786fb86e8",
  measurementId: "G-5TNL6CCP8H"
 };
 
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();


function login(){
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  auth.signInWithEmailAndPassword (email, password).then(function(userCredential){
    const user = userCredential.user

    database.ref('user/' + user.uid).update({ last_login: new Date().toString() });

    displayFeedback('User logged in');
  }) 
  .catch(function(error){
    displayFeedback('User not found!');
  })

  }

  document.getElementById('loginButton').addEventListener('click', function() {
    login();
  })

  function displayFeedback(message, isError = false) {
    const feedbackContainer = document.getElementById('feedback');
    feedbackContainer.style.color = isError ? 'red' : 'green';
    feedbackContainer.innerText = message;
  }

  function register() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        validarEmail(email);
        validarSenha(password);

        auth.createUserWithEmailAndPassword(email, password)
            .then(function (userCredential) {
                const user = userCredential.user;
                const user_data = {
                    email: email,
                    registration_time: new Date().toString(),
                };
                database.ref('users/' + user.uid).set(user_data);
                displayFeedback('User Created!!');
            })
            .catch(function (error) {
                displayFeedback(error.message, true);
            });
    } catch (error) {
        displayFeedback(error.message, true);
    }
}

  document.getElementById('registerButton').addEventListener('click',
    function() {
    register();
  });


  function validarEmail(email){

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!regex.test(email)){
      throw new Error ('Email inválido')
    }
  }


  function validarSenha(senha){
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,10}$/;

    if(!regex.test(senha)){
      throw new Error ('Senha inválida. A senha deve conter no mínimo 6 caracteres, uma letra maiuscula, uma minuscula e um número')
    }
  }