const form = document.querySelector('#form-login');
if (form.querySelector('#register')) {
    form.addEventListener('submit', registerUser)
} else {
    form.addEventListener('submit', login)
}

form.querySelectorAll('.form-control').forEach(el => {
    el.addEventListener('input', validationFormStyle);
});

function validationFormStyle(e) {
    const input = e.target;

    if (!input.value) {
        input.parentNode.classList.remove("success");
        input.parentNode.classList.add("error");
    } else {
        input.parentNode.classList.add("success");
        input.parentNode.classList.remove("error");
    }
}

async function registerUser(e) {
    e.preventDefault();

    const data = {
        user: form.user.value,
        password: form.password.value,
        email: form.email.value,
        image: form.image.value
    }

    for (const key in data) {
        if (!data[key]) {
            alert('Preencha todos os campos do formulário!');
            return null;
        }
    }

    if (await userExists(data.email)) {
        alert('Este email já está sendo utilizado!');
        return;
    }
    
    const created = await createUser(data.user, data.password, data.email, data.image);
    
    if (created) {
        alert('Usuário criado com sucesso!');
    } else {
        alert('Erro ao tentar cadastrar!')
    }

    form.reset()
    form.querySelectorAll('.form-control').forEach(div => div.classList.remove('success'));
}

async function login(e) {
    e.preventDefault();

    // Validar dados do formulário
    const data = {
        email: form.email.value,
        password: form.password.value
    }

    for (const key in data) {
        if (!data[key]) {
            alert('Preencha todos os campos do formulário!');
            return null;
        }
    }

    // Validar se o usuário existe
    if (!( await userExists(data.email) )) {
        alert('Usuário ou senha incorreto!');
        return;
    }
    
    // Efetuar login
    const user = loginUser(data.email, data.password);

    if (!user) {
        alert('Usuário ou senha incorreto!');
        return;
    }

    session(user);
    alert('Usuário logado com sucesso!')

    redirect('notes');
}

async function getUsers() {
    return (await api.get('/users')).data;
}

async function userExists(email) {
    const users = await getUsers();

    console.log(users)
    console.log(users.find(user => user.login === email))

    return users.find(user => user.login == email) ? true : false;
}

async function loginUser(login, password) {
    const userList = await getUsers();

    const user = userList.find(user => user.login === login && user.password === password);

    return user;
}

async function createUser(name, password, login, avatar) {
    const user = { name, password, login, avatar };

    try {
        const response = await api.post('/users', user);
    
        if (response.status === 201) {
            return true;
        }

    } catch (error) {
        console.error('Erro ao cadastrar recado', error);
        return null;
    }
}