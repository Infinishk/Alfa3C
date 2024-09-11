// Para usar express en vez de http
const express = require('express');

// Inicia la app usando express
const app = express();

// Configuramos a EJS como motor de templates con express
app.set('view engine', 'ejs');
app.set('views', 'views');

const path = require('path');

// Para que se pueda usar cookie parser de forma más fácil
const cookieParser = require('cookie-parser');
app.use(cookieParser('Un secreto'));

// Para usar las sesiones
const session = require('express-session');

app.use(session({
    secret: 's&xYnn9oVRuo3*0@sBA&SedkdMGoM!&e%kASzFfZ6537MqWruvYe27X=7hQUdktRRxYQHDjWtW7veznF',
    resave: false, // La sesión no se guardará en cada petición, sino sólo si algo cambió
    saveUninitialized: false, // No guarda una sesión si no es necesario
    rolling: true, // Renueva la sesión en cada interacción del usuario
    cookie: {
        maxAge: 900000 // Tiempo en milisegundos para que expire la sesión
    }
}));

// La aplicación va a tener acceso a todo lo que está en 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Para manipular fácilmente los datos de las peticiones
const bodyParser = require('body-parser');

// Configura body-parser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json()); // Para manejar peticiones JSON

// Rutas
const rutasConfiguracion = require('./routes/configuracion.routes');
app.use('/configuracion', checkSession, rutasConfiguracion);

const rutasContrato = require('./routes/contrato.routes');
app.use('/contrato', checkSession, rutasContrato);

const rutasEstadoCuenta = require('./routes/estadoCuenta.routes');
app.use('/estadoCuenta', checkSession, rutasEstadoCuenta);

const rutasInquilino = require('./routes/inquilino.routes');
app.use('/inquilino', checkSession, rutasInquilino);

const rutasPagos = require('./routes/pagos.routes');
app.use('/pagos', checkSession, rutasPagos);

const rutasSession = require('./routes/session.routes');
app.use('/auth', rutasSession);

const rutasUsuarios = require('./routes/usuarios.routes');
app.use('/usuarios', rutasUsuarios);

// Middleware para manejar archivos con multer
const multer = require('multer');
const upload = multer(); // Utiliza multer sin configuración de almacenamiento
app.use(upload.single('archivo')); // Para manejar un archivo enviado desde un formulario

// Protección CSRF
const csrf = require('csurf');
const csrfProtection = csrf();
app.use(csrfProtection); // Después de inicializar la sesión

// Seguridad con helmet
const helmet = require('helmet');
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            "script-src": ["'self'", 'code.jquery.com', 'ajax.googleapis.com', 'cdn.jsdelivr.net', 'cdnjs.cloudflare.com'],
            "script-src-attr": ["'unsafe-inline'"],
            "connect-src": ["'self'", 'sandboxpo.mit.com.mx'],
            "frame-src": ['*']
        }
    }
}));

// Compresión para mejorar el rendimiento
const compression = require('compression');
app.use(compression());

// Middleware para verificar si la sesión está activa
function checkSession(req, res, next) {
    if (!req.session.username) {
        return res.redirect('/auth/login'); // Redirigir al login si no hay una sesión activa
    }
    next();
}

// Middleware para manejar errores de CSRF
app.use((err, req, res, next) => {
    if (err.code === 'EBADCSRFTOKEN') {
        return res.redirect('/auth/login'); // Redirigir al login si se detecta un token CSRF inválido
    }
    next(err);
});

// Función local para EJS, para iterar permisos
app.locals.contienePermiso = (permisos, casoUso) => {
    const contains = !!permisos.find(caso => {
        return caso.funcion === casoUso;
    });
    return contains;
};

// Ruta para la página principal
const home_root = require('./util/home');
app.get('/', home_root);

// Para manejar errores 404
app.use((request, response) => {
    response.status(404);
    response.render('404', {
        username: request.session.username || '',
        permisos: request.session.permisos || [],
        rol: request.session.rol || "",
    });
});

// Iniciar el servidor
app.listen(process.env.PORT || 5000);