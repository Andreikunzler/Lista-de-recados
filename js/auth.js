const HOST = location.host;

function redirect(url = null) {
    switch (url) {
        case 'notes':
            location.href = HOST + '/recados';
            break;
    
        default:
            location.href = HOST + '/login.html';
            break;
    }
}

function session(user) {
    sessionStorage.setItem('user', user.username);
}

function isLogged() {
    if (!sessionStorage.getItem('user')) {
        if (location.pathname != '/login.html' && location.pathname != '/register.html') {
            redirect('login');
        }
    } else {
        if (!location.pathname.includes('recados')) {
            redirect('notes');
        }
    }
}

function logout() {
    sessionStorage.clear();
    isLogged();
}

isLogged();
