const form = document.querySelector('#form-login');
if (form.querySelector('#register')) {
    form.addEventListener('submit', registerUser)
} else {
    form.addEventListener('submit', login)
}

function getForm() {
    const form = document.querySelector('#form-login');

    const data = {
        user: form.user.value,
        password: form.password.value
    }
    
    if (!data.user || !data.password) {
        alert('Preencha todos os campos!');
        return null;
    }

    return data;
}

function registerUser(e) {
    e.preventDefault();

    const data = getForm();

    if (!data) {
        return;
    }

    if (userExists(data.user)) {
        alert('Este nome de usuário já está sendo utilizado!');
        return;
    }

    createUser(data.user, data.password);
    alert('Usuário criado com sucesso!')

    redirect('login');
}

function login(e) {
    e.preventDefault();

    const data = getForm();

    if (!data) {
        return;
    }

    if (!userExists(data.user)) {
        alert('Usuário ou senha incorreto!');
        return;
    }

    const user = loginUser(data.user, data.password);

    if (!user) {
        alert('Usuário ou senha incorreto!');
        return;
    }

    session(user);
    alert('Usuário logado com sucesso!')

    redirect('notes');
}


function getUsers(user, password) {
    const data = JSON.parse(localStorage.getItem('users'));

    if (!data) {
        return [];
    }

    return data;
}

function userExists(username) {
    const users = getUsers();

    return users.find(user => user.username == username) ? true : false;
}

function createUser(username, password) {
    const user = { username, password };

    const userList = getUsers();

    userList.push(user);

    const json = JSON.stringify(userList);

    localStorage.setItem('users', json);
}

function loginUser(username, password) {
    const userList = getUsers();

    const user = userList.find(user => user.username === username && user.password === password);

    return user;
}