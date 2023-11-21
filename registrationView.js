const port = 3000;
const dataServiceBaseUrl = `http://127.0.0.1:${port}`;

function handleRegistration() {
    const form = document.getElementById('registrationForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const submitButton = document.getElementById('submitButton');
    const clearButton = document.getElementById('clearButton');
    const testButton = document.getElementById('testButton');
    const getUserProfile = document.getElementById('getUserProfile');

    submitButton.addEventListener('click', function(event) {
        event.preventDefault();
        const registerUser = function() {
            const headers = {
                'Content-Type': 'application/json',
              };
    
            const postData = {
                name: nameInput.value,
                email: emailInput.value,
                password: passwordInput.value
            };
            debugger
            axios.post(dataServiceBaseUrl + '/api/user/register', postData, {headers: headers} )
                .then(response => {
                    alert("User registered successfully.")
                    console.log('Response:', response.data)
                })
                .catch(error => { 
                    debugger; 
                    console.log('Error:', error)
                });
        };
        registerUser();
        console.log('Name:', nameInput.value);
        console.log('Email:', emailInput.value);
        console.log('Password:', passwordInput.value);
    });

    clearButton.addEventListener('click', function() {
        nameInput.value = '';
        emailInput.value = '';
        passwordInput.value = '';
    });

    testButton.addEventListener('click', function() {
        nameInput.value = 'tester';
        emailInput.value = 'test@test.com';
        passwordInput.value = 'Pass123!';
    });

    getUserProfile.addEventListener('click', function() {
        axios.get(dataServiceBaseUrl + '/api/user/info')
            .then(response => {
                console.log('Response:', response.data)
            })
            .catch(error => { 
                console.error('Error:', error)
            });
    });
}
handleRegistration();