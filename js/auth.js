function redirect(url = null) {

    switch (url) {
        case 'notes':
            location.pathname = '/atividade-api-recados/recados';
            break;
    
        default:
            location.pathname = '/atividade-api-recados/login.html';
            break;
    }
}

function session(user) {
    sessionStorage.setItem('user', user.username);
}

function isLogged() {
    if (!sessionStorage.getItem('user')) {
        if (location.pathname != '/atividade-api-recados/login.html' && location.pathname != '/atividade-api-recados/register.html') {
            redirect('login');
        }
    } else {
        if (!location.pathname.includes('/atividade-api-recados/recados')) {
            redirect('notes');
        }
    }
}

function logout() {
    sessionStorage.clear();
    isLogged();
}

isLogged();
