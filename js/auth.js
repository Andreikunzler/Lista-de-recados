function redirect(url = null) {
    switch (url) {
        case 'notes':
            location.pathname = '/recados';
            break;
    
        default:
            location.pathname = '/login.html';
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
