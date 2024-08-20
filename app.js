// Para usar express en vez de http
const express = require('express');

// Inicia la app usuando a express
const app = express();

// Configuramos a EJS como motor de templates con express
app.set('view engine', 'ejs');
app.set('views', 'views');

const path = require('path');

// Para que se puede usar cookie parser de forma mas facil
const cookieParser = require('cookie-parser');
app.use(cookieParser('Un secreto'));

// Para usar las sesiones
const session = require('express-session');

app.use(session({
    secret: 's&xYnn9oVRuo3*0@sBA&SedkdMGoM!&e%kASzFfZ6537MqWruvYe27X=7hQUdktRRxYQHDjWtW7veznF',
    resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
    saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
    cookie: {
        maxAge: 900000 // Tiempo en milisegundos para que expire la sesión
    }
}));

// La aplicacion va a tener acceso a todo lo que esta en public
app.use(express.static(path.join(__dirname, 'public')));

// Manipular facil los datos de las peticiones
const bodyParser = require('body-parser');

// Configura bodyparser
app.use(bodyParser.urlencoded({
    extended: false
}));

const multer = require('multer');
const upload = multer(); // Utiliza multer sin configuración de almacenamiento

app.use(upload.single('archivo')); // Utiliza la configuración de multer sin almacenamiento
// Para proteger del Cross-Site Request Forgery
const csrf = require('csurf');
const csrfProtection = csrf();

//...Y después del código para inicializar la sesión... 
app.use(csrfProtection);

const helmet = require('helmet');

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            "script-src": ["'self'", 'code.jquery.com', 'ajax.googleapis.com', 'cdn.jsdelivr.net', 'cdnjs.cloudflare.com'],
            "script-src-attr": ["'unsafe-inline'"], 
            "connect-src": ["'self'", 'sandboxpo.mit.com.mx'],
            "frame-src": ['*']
        },
    },
}));

const compression = require('compression');

app.use(compression());

// Para utilizar chartist para la generación de gráficos
const chartist = require('chartist');

app.use(bodyParser.json());

// Middleware para verificar si la sesión está activa
function checkSession(req, res, next) {
    if (!req.session.username) {
        // Redirigir al login si no hay una sesión activa
        return res.redirect('/auth/login');
    }
    next();
}

// Middleware para manejar errores de CSRF
app.use((err, req, res, next) => {
    if (err.code === 'EBADCSRFTOKEN') {
        // Redirigir al login cuando se detecte un token CSRF inválido
        return res.redirect('/auth/login');
    }
    next(err);
});

// Agregar funcion para iterar la lista del ejs, y que el codigo se vea limpio
app.locals.contienePermiso = (permisos, casoUso) => {
    const contains = !!permisos.find(caso => {
        return caso.funcion === casoUso;
    });
    return contains;
};

const home_root = require('./util/home');
app.get('/', home_root);

//Para error 404
app.use((request, response, next) => {
    response.status(404);
    response.render('404', {
        username: request.session.username || '',
        permisos: request.session.permisos || [],
        rol: request.session.rol || "",
    });
});

// Para que el servidor este activo
app.listen(process.env.PORT || 5000);
