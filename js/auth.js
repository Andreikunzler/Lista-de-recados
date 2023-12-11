function redirect(url=null) {
    switch (url) {
        case 'notes':
            location.href = 'http://127.0.0.1:5501/recados/';
            break;
    
        default:
            location.href = 'http://127.0.0.1:5501/login.html';
            break;
    }
}

function session(user) {
    sessionStorage.setItem('user', user.username);
}

function isLogged() {
    if (!sessionStorage.getItem('user')) {
        if (location.href != 'http://127.0.0.1:5501/login.html' && location.href != 'http://127.0.0.1:5501/register.html') {
            redirect('login');
        }
    } else {
        if (!location.href.includes('recados')) {
            redirect('notes');
        }
    }
}

function logout() {
    sessionStorage.clear();
    isLogged();
}

isLogged();
