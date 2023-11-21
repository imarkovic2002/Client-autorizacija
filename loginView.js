const port = 3000;
const dataServiceBaseUrl = `http://127.0.0.1:${port}`;

function handleLogin() {
    const loginForm = document.getElementById('loginForm');
    const loginEmailInput = document.getElementById('loginEmail');
    const loginPasswordInput = document.getElementById('loginPassword');
    const loginSubmitButton = document.getElementById('loginSubmitButton');
    const loginClearButton = document.getElementById('loginClearButton');
    const loginTestButton = document.getElementById('loginTestButton');
    const getUserProfile = document.getElementById('getUserProfile');
    const getSomeData = document.getElementById('getSomeData');
    

    const setHeader = (authHeader) => {
        localStorage.setItem('authHeader', JSON.stringify(authHeader));
    };

    const getHeader = () => {
        return JSON.parse(localStorage.getItem('authHeader'));
    };

    const setUserInfoToLocalStorage = (userData) => {
        localStorage.setItem('userData', JSON.stringify(userData));
    };

    const getUserInfoFromLocalStorage = () => {
        return JSON.parse(localStorage.getItem('userData'));
    };

    getSomeData.addEventListener('click', function(event) {
        event.preventDefault();
        //Add axios call
    });

    loginSubmitButton.addEventListener('click', function(event) {
        event.preventDefault();
        const loginUser = function() {
            const postData = {
                email: loginEmailInput.value,
                password: loginPasswordInput.value
            };
            axios.post(dataServiceBaseUrl + '/api/user/login', postData)
                .then(response => {
                    setHeader(response.headers['authenticated-user']);
                    setUserInfoToLocalStorage(response.data);
                    alert("User login successfull.")
                    console.log('Response:', response.data)
                })
                .catch(error => { 
                    debugger; 
                    console.log('Error:', error)
                });
        };
        loginUser();
        console.log('Login Email:', loginEmailInput.value);
        console.log('Login Password:', loginPasswordInput.value);
    });

    getUserProfile.addEventListener('click', function() {
        const userData = getUserInfoFromLocalStorage();
        const id = userData.id;
        
        const config = {
            headers: {
                'authenticated-user': getHeader(),
            },
        };
        axios.get(dataServiceBaseUrl + `/api/user/info/${id}`, config)
            .then(response => {
                console.log('Response:', response.data)
            })
            .catch(error => { 
                console.error('Error:', error)
            });
    });

    loginClearButton.addEventListener('click', function() {
        loginEmailInput.value = '';
        loginPasswordInput.value = '';
    });

    loginTestButton.addEventListener('click', function() {
        loginEmailInput.value = 'test@test.com';
        loginPasswordInput.value = 'Pass123!';
    });
}
handleLogin();