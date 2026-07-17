// ========================================================
// SISTEMA BASE (MODAL, DATOS Y VISTAS)
// ========================================================
const RNModal = {
    show: function({ type = 'alert', title = '', message = '', placeholder = '', value = '' }) {
        return new Promise((resolve) => {
            const overlay = document.getElementById('rn-modal-overlay');
            const titleEl = document.getElementById('rn-modal-title');
            const msgEl = document.getElementById('rn-modal-message');
            const inputEl = document.getElementById('rn-modal-input');
            const btnCancel = document.getElementById('rn-modal-cancel');
            const btnConfirm = document.getElementById('rn-modal-confirm');

            titleEl.innerText = title; msgEl.innerText = message;
            
            if (type === 'prompt') { 
                inputEl.style.display = 'block'; 
                inputEl.value = value; 
                inputEl.placeholder = placeholder; 
                setTimeout(() => inputEl.focus(), 100); 
            } else { 
                inputEl.style.display = 'none'; 
            }
            
            btnCancel.style.display = type === 'alert' ? 'none' : 'block';
            overlay.classList.remove('modal-hidden');

            const cleanup = () => { overlay.classList.add('modal-hidden'); btnConfirm.onclick = null; btnCancel.onclick = null; };
            btnConfirm.onclick = () => { cleanup(); resolve(type === 'prompt' ? inputEl.value.trim() : true); };
            btnCancel.onclick = () => { cleanup(); resolve(null); };
        });
    }
};

// Convertimos baseRutinasDetalladas en 'let' para poder modificarla dinámicamente
let baseRutinasDetalladas = {};

function construirRutinasBase() {
    const perfilGuardado = localStorage.getItem('rn_perfil_usuario');
    const perfil = perfilGuardado ? JSON.parse(perfilGuardado) : { edad: 18, objetivo: "" };
    
    const edad = parseInt(perfil.edad) || 18;
    const objetivo = (perfil.objetivo || "").toLowerCase();
    const quiereBajarPeso = objetivo.includes("peso") || objetivo.includes("bajar");
    
    const reps = "Al fallo";
    let ejEmpujes = [];
    let ejJalones = [];
    let ejPierna = [];

    // --- 1. LÓGICA PARA ADOLESCENTES (13-17) ---
    if (edad >= 13 && edad <= 17) {
        ejEmpujes = [
            { nombre: "Press Inclinado", meta: `3 series x ${reps}` },
            { nombre: "Flexiones", meta: `2 series x ${reps}` },
            { nombre: "Press Plano", meta: `2 series x ${reps}` },
            { nombre: "Cruces de Polea", meta: `2 series x ${reps}` },
            { nombre: "Extensión de Tríceps", meta: `2 series x ${reps}` },
            { nombre: "Flexiones Diamante", meta: `2 series x ${reps}` },
            { nombre: "Extensión Trasnuca", meta: `2 series x ${reps}` },
            { nombre: "Elevación Lateral", meta: `3 series x ${reps}` }
        ];
        ejJalones = [
            { nombre: "Dominadas", meta: `3 series x ${reps}` },
            { nombre: "Pull Over", meta: `3 series x ${reps}` },
            { nombre: "Remo Libre", meta: `3 series x ${reps}` },
            { nombre: "Face Pull", meta: `3 series x ${reps}` },
            { nombre: "Curl de Bíceps", meta: `3 series x ${reps}` },
            { nombre: "Curl Martillo", meta: `2 series x ${reps}` },
            { nombre: "Curl Bayestian", meta: `2 series x ${reps}` }
        ];
        ejPierna = [
            { nombre: "Sentadilla Libre", meta: `3 series x ${reps}` },
            { nombre: "Caminata con Mancuernas", meta: `3 series x ${reps}` },
            { nombre: "Prensa", meta: `2 series x ${reps}` },
            { nombre: "Peso Muerto Rumano", meta: `2 series x ${reps}` },
            { nombre: "Curl Femoral Sentado", meta: `3 series x ${reps}` },
            { nombre: "Extensión Cuádriceps", meta: `3 series x ${reps}` }
        ];

        // Si quiere bajar de peso, cardio al FINAL (Pierna solo 15 min)
        if (quiereBajarPeso) {
            ejEmpujes.push({ nombre: "Cardio Final (Cicla/Trotar/Lazo)", meta: "30 min o 15/15" });
            ejJalones.push({ nombre: "Cardio Final (Cicla/Trotar/Lazo)", meta: "30 min o 15/15" });
            ejPierna.push({ nombre: "Cardio Leve Post-Pierna", meta: "15 min" });
        }
    } 
    // --- 2. LÓGICA PARA ADULTOS (18-45) ---
    else if (edad >= 18 && edad <= 45) {
        ejEmpujes = [
            { nombre: "Press Inclinado", meta: `3 series x ${reps}` },
            { nombre: "Press Plano", meta: `3 series x ${reps}` },
            { nombre: "Cruces de Polea", meta: `2 series x ${reps}` },
            { nombre: "Cruces Abajo", meta: `2 series x ${reps}` },
            { nombre: "Extensión de Tríceps", meta: `3 series x ${reps}` },
            { nombre: "Extensión Trasnuca", meta: `3 series x ${reps}` },
            { nombre: "Elevación Lateral", meta: `3 series x ${reps}` },
            { nombre: "Press Militar", meta: `2 series x ${reps}` }
        ];
        ejJalones = [
            { nombre: "Jalón al Pecho", meta: `3 series x ${reps}` },
            { nombre: "Remo Unilateral Polea", meta: `3 series x ${reps}` },
            { nombre: "Pull Over", meta: `3 series x ${reps}` },
            { nombre: "Face Pull", meta: `3 series x ${reps}` },
            { nombre: "Trapecios con Mancuernas", meta: `3 series x ${reps}` },
            { nombre: "Curl de Bíceps", meta: `3 series x ${reps}` },
            { nombre: "Curl Martillo", meta: `2 series x ${reps}` },
            { nombre: "Curl Bayestian", meta: `2 series x ${reps}` }
        ];
        ejPierna = [
            { nombre: "Hack Squad", meta: `3 series x ${reps}` },
            { nombre: "Prensa", meta: `3 series x ${reps}` },
            { nombre: "Peso Muerto Rumano", meta: `3 series x ${reps}` },
            { nombre: "Femoral Sentado", meta: `3 series x ${reps}` },
            { nombre: "Sentadilla Búlgara", meta: `3 series x ${reps}` },
            { nombre: "Extensión de Cuádriceps", meta: `3 series x ${reps}` }
        ];

        // Si quiere bajar de peso, cardio al FINAL (Pierna solo 15 min)
        if (quiereBajarPeso) {
            ejEmpujes.push({ nombre: "Cardio Final (Cicla/Trotar/Lazo)", meta: "30 min o 15/15" });
            ejJalones.push({ nombre: "Cardio Final (Cicla/Trotar/Lazo)", meta: "30 min o 15/15" });
            ejPierna.push({ nombre: "Cardio Leve Post-Pierna", meta: "15 min" });
        }
    } 
    // --- 3. LÓGICA PARA MAYORES (46+) ---
    else {
        // Rutina pura sin cardio inicial
        ejEmpujes = [
            { nombre: "Press Inclinado", meta: `2 series x ${reps}` },
            { nombre: "Press Plano", meta: `2 series x ${reps}` },
            { nombre: "Elevaciones Frontales", meta: `2 series x ${reps}` },
            { nombre: "Elevación Lateral", meta: `2 series x ${reps}` },
            { nombre: "Flexiones", meta: `2 series x ${reps}` },
            { nombre: "Extensión de Tríceps", meta: `3 series x ${reps}` }
        ];
        ejJalones = [
            { nombre: "Jalón al Pecho", meta: `3 series x ${reps}` },
            { nombre: "Remo Unilateral Polea", meta: `3 series x ${reps}` },
            { nombre: "Caminata Jardinero", meta: `3 series (Contar pasos como reps)` },
            { nombre: "Curl de Bíceps", meta: `3 series x ${reps}` },
            { nombre: "Curl Martillo", meta: `2 series x ${reps}` }
        ];
        ejPierna = [
            { nombre: "Caminata con Mancuernas", meta: `3 vueltas` },
            { nombre: "Hack Squad", meta: `2 series x ${reps}` },
            { nombre: "Peso Muerto", meta: `2 series x ${reps}` },
            { nombre: "Prensa", meta: `2 series x ${reps}` },
            { nombre: "Curl Femoral Sentado", meta: `2 series x ${reps}` },
            { nombre: "Extensión de Cuádriceps", meta: `2 series x ${reps}` }
        ];

        // En adultos mayores, el cardio SIEMPRE va, pero al FINAL de la rutina (Pierna 15 min)
        ejEmpujes.push({ nombre: "Cardio Final", meta: "30 min (Cicla / Trotar / Lazo)" });
        ejJalones.push({ nombre: "Cardio Final", meta: "30 min (Cicla / Trotar / Lazo)" });
        ejPierna.push({ nombre: "Cardio Leve Post-Pierna", meta: "15 min" });
    }

    // Asignamos las rutinas calculadas a los 5 días de la app
    baseRutinasDetalladas = {
        empujes1: { titulo: "Día 1: Empujes", tiempo: `${ejEmpujes.length * 8} min`, musculos: [{ nombre: "Pecho", pct: "60%" }, { nombre: "Tríceps", pct: "20%" }, { nombre: "Hombro", pct: "20%" }], ejercicios: JSON.parse(JSON.stringify(ejEmpujes)) },
        jalones1: { titulo: "Día 2: Jalones", tiempo: `${ejJalones.length * 8} min`, musculos: [{ nombre: "Espalda", pct: "70%" }, { nombre: "Bíceps", pct: "30%" }], ejercicios: JSON.parse(JSON.stringify(ejJalones)) },
        pierna:   { titulo: "Día 3: Pierna", tiempo: `${ejPierna.length * 8} min`, musculos: [{ nombre: "Cuádriceps", pct: "50%" }, { nombre: "Isquios", pct: "50%" }], ejercicios: JSON.parse(JSON.stringify(ejPierna)) },
        empujes2: { titulo: "Día 4: Empujes", tiempo: `${ejEmpujes.length * 8} min`, musculos: [{ nombre: "Pecho", pct: "60%" }, { nombre: "Tríceps", pct: "20%" }, { nombre: "Hombro", pct: "20%" }], ejercicios: JSON.parse(JSON.stringify(ejEmpujes)) },
        jalones2: { titulo: "Día 5: Jalones 2", tiempo: `${ejJalones.length * 8} min`, musculos: [{ nombre: "Espalda", pct: "70%" }, { nombre: "Bíceps", pct: "30%" }], ejercicios: JSON.parse(JSON.stringify(ejJalones)) }
    };
}
let rutinasCreadasPorUsuario = {
    personalizada1: { titulo: "Lunes - Torso Libre", tiempo: "48 min • 4 ejercicios", musculos: [{ nombre: "Torso", pct: "100%" }], ejercicios: [{ nombre: "Press De Banca", meta: "3 series x 6 reps" }, { nombre: "Remo Bajo", meta: "3 series x 12 reps" }] }
};

let historialMarcas = {
    " press Inclinado": [{kg: 75, reps: 10}, {kg: 80, reps: 7}, {kg: 80, reps: 6}, {kg: 80, reps: 5}]
};
// ========================================================
// SISTEMA DE PERSISTENCIA DE DATOS
// ========================================================
function cargarDatosApp() {
    construirRutinasBase(); // <--- AGREGA ESTA LÍNEA
    
    const rutinasGuardadas = localStorage.getItem('rn_rutinas_custom');
    if (rutinasGuardadas) rutinasCreadasPorUsuario = JSON.parse(rutinasGuardadas);

    const historialGuardado = localStorage.getItem('rn_historial_marcas');
    if (historialGuardado) historialMarcas = JSON.parse(historialGuardado);
}

function guardarDatosApp() {
    localStorage.setItem('rn_rutinas_custom', JSON.stringify(rutinasCreadasPorUsuario));
    localStorage.setItem('rn_historial_marcas', JSON.stringify(historialMarcas));
    
    // >>> ENVIAR TODO A LA NUBE AUTOMÁTICAMENTE <<<
    if (typeof firebase !== 'undefined' && firebase.auth().currentUser) {
        const user = firebase.auth().currentUser;
        const perfilGuardado = JSON.parse(localStorage.getItem('rn_perfil_usuario') || '{}');
        
        // Eliminamos el "{ merge: true }" para que Firebase refleje con precisión 
        // el estado actual de tus rutinas personalizadas (incluyendo eliminaciones).
        db.collection("usuarios").doc(user.uid).set({
            correo: user.email,
            rutina: perfilGuardado,
            rutinasPersonalizadas: rutinasCreadasPorUsuario,
            historial: historialMarcas
        }); 
    }
}

window.addEventListener('DOMContentLoaded', () => {
    cargarDatosApp();
    renderizarListaPersonalizada();
    setTimeout(() => {
        document.getElementById('splash-screen').classList.add('hidden');
        
        // Hacemos visible el Wrapper Maestro
        const mainContainer = document.getElementById('main-wrapper');
        mainContainer.classList.remove('main-content-hidden');
        mainContainer.classList.add('main-content-visible');
        
        // Comprobar estado de Onboarding
        const onboardingCompletado = localStorage.getItem('rn_onboarding_completado');
        
        if (onboardingCompletado === 'true') {
            cambiarSeccion('home');
            inicializarIconosFijosCanvas();
            dibujarAvatarPerfil();
        } else {
            cambiarSeccion('onboarding');
        }
    }, 2400);
});

// ========================================================
// LOGICA DE PROCESAMIENTO Y CLASIFICACIÓN DE ONBOARDING
// ========================================================
function analizarPerfilEntrenamiento(etapaSeleccionada, edad, experiencia, objetivo) {
    const generoFijo = "Hombre";
    let categoriaEdad = etapaSeleccionada; 
    
    let enfoqueIntensidad = experiencia === "Principiante" ? "RPE 6-7" : experiencia === "Intermedio" ? "RPE 7-8" : "RPE 8-10";
    
    return {
        genero: generoFijo, 
        edad: edad, 
        rangoFisiologico: categoriaEdad, 
        experiencia, 
        objetivo,
        lineamientos: { intensidad: enfoqueIntensidad }
    };
}

async function procesarOnboardingUsuario() {
    const genero = document.getElementById('onboarding-genero').value;
    const edadInput = document.getElementById('onboarding-edad').value;
    const experiencia = document.getElementById('onboarding-experiencia').value;
    const objetivo = document.getElementById('onboarding-objetivo').value;

    if (!edadInput || isNaN(edadInput) || parseInt(edadInput) <= 0) {
        mostrarModalGenerico('Faltan datos', 'Por favor ingresa una edad válida antes de continuar.');
        return;
    }

    const perfilEstructurado = analizarPerfilEntrenamiento(genero, parseInt(edadInput), experiencia, objetivo);

   localStorage.setItem('rn_perfil_usuario', JSON.stringify(perfilEstructurado));
   construirRutinasBase();
   localStorage.setItem('rn_onboarding_completado', 'true');

   // >>> ENVIAR A LA NUBE (FIREBASE) <<<
   guardarRutinaEnNube(perfilEstructurado);
    await RNModal.show({ 
        type: 'alert', 
        title: '¡Perfil Creado!', 
        message: `Asignado: ${perfilEstructurado.rangoFisiologico}.` 
    });

    inicializarIconosFijosCanvas();
    dibujarAvatarPerfil();
    cambiarSeccion('home');
}

// ========================================================
// NAVEGACIÓN Y VISTAS
// ========================================================
function cambiarSeccion(seccion) {
    ['view-onboarding', 'view-home', 'view-profile', 'view-detail', 'view-settings', 'view-active-workout', 'view-summary', 'view-coach'].forEach(id => {
        const elemento = document.getElementById(id);
        if (elemento) elemento.classList.add('view-hidden');
    });

    document.getElementById('nav-btn-home').classList.remove('active');
    document.getElementById('nav-btn-profile').classList.remove('active');

    // Ocultar barra de navegación en Onboarding y Entrenamiento Activo
    if (seccion === 'onboarding' || seccion === 'active-workout') {
        document.getElementById('main-bottom-nav').style.display = 'none';
    } else {
        document.getElementById('main-bottom-nav').style.display = 'flex';
    }

    const vistaDestino = document.getElementById('view-' + seccion);
    if (vistaDestino) {
        vistaDestino.classList.remove('view-hidden');
    }

 if (seccion === 'home') {
        const btnHome = document.getElementById('nav-btn-home');
        if (btnHome) btnHome.classList.add('active');
        
        renderizarListaPersonalizada();
        
    } else if (seccion === 'profile') {
        const btnProfile = document.getElementById('nav-btn-profile');
        if (btnProfile) btnProfile.classList.add('active');
        
        // Esta es la línea mágica que carga el texto y dibuja la foto/avatar
        cargarDatosPerfil(); 
    }
}

async function resetearApp() {
    if (await RNModal.show({ type: 'confirm', title: 'Restablecer', message: '¿Borrar datos y volver al Onboarding?' })) {
        localStorage.clear();
        location.reload();
    }
}

function mostrarModalGenerico(titulo, mensaje) { RNModal.show({ type: 'alert', title: titulo, message: mensaje }); }
async function guardarPerfil() { await RNModal.show({ type: 'alert', title: '¡Éxito!', message: 'Perfil guardado.' }); cambiarSeccion('home'); }
async function cambiarFotoPerfil() { await RNModal.show({ type: 'alert', title: 'Galería', message: 'Próximamente.' }); }
async function abrirPremium() { 
    await RNModal.show({ type: 'alert', title: 'RN ELITE', message: '🌟 Redirigiendo a RN Elite...' }); 
    cambiarSeccion('coach'); 
}

// ========================================================
// RUTINAS Y EJERCICIOS
// ========================================================
function renderizarListaPersonalizada() {
    const lista = document.getElementById('custom-workouts-list'); lista.innerHTML = '';
    for (const id in rutinasCreadasPorUsuario) {
        const rut = rutinasCreadasPorUsuario[id];
        const card = document.createElement('div'); card.className = 'custom-workout-item'; card.setAttribute('onclick', `abrirDetalleRutina('${id}')`);
        card.innerHTML = `<div class="custom-workout-thumb"><span>RN</span></div><div class="custom-workout-info"><h3>${rut.titulo}</h3><p>${rut.ejercicios.length > 0 ? rut.ejercicios[0].nombre + '...' : 'Vacía'}</p></div><div class="custom-workout-action" onclick="eliminarRutinaBase(event, '${id}')">⋮</div>`;
        lista.prepend(card);
    }
}

async function eliminarRutinaBase(e, id) {
    e.stopPropagation();
    if (await RNModal.show({ type: 'confirm', title: 'Eliminar Rutina', message: '¿Borrar este entrenamiento?' })) { 
        delete rutinasCreadasPorUsuario[id]; 
        guardarDatosApp();
        renderizarListaPersonalizada(); 
    }
}

async function crearRutinaManualCompleta() {
    const nombre = await RNModal.show({ type: 'prompt', title: 'Nueva Rutina', message: 'Nombre:', placeholder: 'Ej: Martes - Glúteo' });
    if (!nombre) return;
    const id = 'user_' + Date.now();
   rutinasCreadasPorUsuario[id] = { titulo: nombre, tiempo: "0 min • 0 ejercicios", musculos: [{ nombre: "General", pct: "100%" }], ejercicios: [] };
    guardarDatosApp();
    cambiarSeccion('home'); abrirDetalleRutina(id);
}

function abrirDetalleRutina(idRutina) {
    const datos = baseRutinasDetalladas[idRutina] || rutinasCreadasPorUsuario[idRutina];
    if (!datos) return;
    cambiarSeccion('detail');

    document.getElementById('detail-routine-title').innerText = datos.titulo;
    document.getElementById('detail-routine-meta').innerText = datos.tiempo;

    document.getElementById('dynamic-exercises-header').innerHTML = `<h3>${datos.ejercicios.length} Ejercicios</h3><button class="btn-add-exercise" onclick="agregarEjercicioDinamico('${idRutina}')">+ Añadir</button>`;
    document.getElementById('btn-start-dynamic').setAttribute('onclick', `iniciarEntrenamientoTracker('${idRutina}')`);

    const cMusculos = document.getElementById('detail-distribution-container'); cMusculos.innerHTML = '';
    datos.musculos.forEach(m => cMusculos.innerHTML += `<div class="muscle-badge"><canvas class="muscle-badge-canvas" width="24" height="24"></canvas><div class="muscle-meta-text"><span class="m-name">${m.nombre}</span><span class="m-pct">${m.pct}</span></div></div>`);

    const cEjercicios = document.getElementById('detail-exercises-list'); cEjercicios.innerHTML = '';
    datos.ejercicios.forEach((ej, index) => {
        const btnBorrar = rutinasCreadasPorUsuario[idRutina] ? `<button class="btn-delete-exercise" onclick="quitarEjercicioDinamico('${idRutina}', ${index})">✕</button>` : '';
        cEjercicios.innerHTML += `<div class="symmetry-exercise-row"><div class="symmetry-left"><canvas class="symmetry-avatar-canvas" width="44" height="44"></canvas><div class="symmetry-text"><span class="symmetry-meta">${ej.meta}</span><span class="symmetry-name">${ej.nombre}</span></div></div><div class="symmetry-right-actions"><button class="btn-swap-arrows" onclick="intercambiarEjercicio('${idRutina}', ${index})">⇄</button>${btnBorrar}</div></div>`;
    });
    ejecutarDibujoIconosVectoriales();
}

async function agregarEjercicioDinamico(id) {
    const d = baseRutinasDetalladas[id] || rutinasCreadasPorUsuario[id]; if (!d) return;
    const nombre = await RNModal.show({ type: 'prompt', title: 'Paso 1', message: 'Nombre del ejercicio:' }); if (!nombre) return;
    
    // FIX: Ahora usa placeholder en vez de value para que no ensucie el texto al escribir
    const meta = await RNModal.show({ type: 'prompt', title: 'Paso 2', message: 'Meta:', placeholder: 'Ej: 4 series x 12 reps', value: '' }); if (!meta) return;
    
    d.ejercicios.push({ nombre, meta }); d.tiempo = `${d.ejercicios.length * 12} min • ${d.ejercicios.length} ej.`; abrirDetalleRutina(id);
}

async function quitarEjercicioDinamico(id, idx) {
    if (await RNModal.show({ type: 'confirm', title: 'Remover', message: '¿Quitar este ejercicio?' })) { 
        rutinasCreadasPorUsuario[id].ejercicios.splice(idx, 1); 
        guardarDatosApp();
        abrirDetalleRutina(id); 
    }
}
async function intercambiarEjercicio(id, idx) {
    const d = baseRutinasDetalladas[id] || rutinasCreadasPorUsuario[id];
    const n = await RNModal.show({ type: 'prompt', title: 'Modificar', message: 'Corrige el ejercicio:', value: d.ejercicios[idx].nombre });
  if(n) { 
        d.ejercicios[idx].nombre = n; 
        guardarDatosApp();
        abrirDetalleRutina(id); 
    }
}


// ========================================================
// TRACKER DE ENTRENAMIENTO ACTIVO (SISTEMA ÉLITE)
// ========================================================
let sesionActiva = {
    rutinaId: null, ejercicios: [], currentIndex: 0, timerInterval: null, segundos: 0, datosSesion: []
};

async function iniciarEntrenamientoTracker(idRutina) {
    const datos = baseRutinasDetalladas[idRutina] || rutinasCreadasPorUsuario[idRutina];
    if (!datos || datos.ejercicios.length === 0) { mostrarModalGenerico('Error', 'La rutina no tiene ejercicios.'); return; }

    await RNModal.show({ type: 'alert', title: 'Modo Bestia', message: '▶ ¡Cronómetro Activado! A destrozar esos músculos.' });
    
    cambiarSeccion('active-workout'); 
    document.getElementById('main-bottom-nav').style.display = 'none'; 

    sesionActiva.rutinaId = idRutina;
    sesionActiva.currentIndex = 0;
    sesionActiva.segundos = 0;
    
    // --- NUEVO: INYECTAMOS LA PANTALLA DE PREPARACIÓN COMO PRIMER EJERCICIO EN TODAS LAS RUTINAS ---
    const ejerciciosConCalentamiento = [
        { nombre: "🔥 Preparación", meta: "Antes de empezar" },
        ...datos.ejercicios
    ];
    
    sesionActiva.ejercicios = ejerciciosConCalentamiento;
    
    sesionActiva.datosSesion = ejerciciosConCalentamiento.map(ej => {
        // Si es la pantalla inicial obligatoria, no le creamos series
        if (ej.nombre === "🔥 Preparación") {
            return { nombre: ej.nombre, series: [] }; 
        }
        
        let numSeries = 3;
        if (ej.meta) {
            const match = ej.meta.match(/(\d+)\s*series/i);
            if (match) numSeries = parseInt(match[1]);
        }
        
     let seriesState = [];
        for(let i=0; i<numSeries; i++) seriesState.push({ tipo: 'N', kg: '', reps: '', checked: false, notaFuerza: '', subDrops: [] });
        
        return { nombre: ej.nombre, series: seriesState };
    });

    iniciarCronometro();
    renderizarEjercicioActivo();
}

function iniciarCronometro() {
    clearInterval(sesionActiva.timerInterval);
    const timerEl = document.getElementById('workout-timer');
    sesionActiva.timerInterval = setInterval(() => {
        sesionActiva.segundos++;
        const mins = Math.floor(sesionActiva.segundos / 60).toString().padStart(2, '0');
        const secs = (sesionActiva.segundos % 60).toString().padStart(2, '0');
        if (timerEl) {
            timerEl.innerText = `${mins}:${secs}`;
        }
    }, 1000);
}

function renderizarEjercicioActivo() {
    const ejIndex = sesionActiva.currentIndex;
    const ejData = sesionActiva.ejercicios[ejIndex];
    const estadoLocal = sesionActiva.datosSesion[ejIndex];
    const historialEj = historialMarcas[ejData.nombre] || [];

    const navContainer = document.getElementById('exercise-navigator');
    navContainer.innerHTML = '';
    sesionActiva.ejercicios.forEach((ej, idx) => {
        const isActive = idx === ejIndex ? 'active-nav' : '';
        // Quitamos el canvas y ponemos el número del ejercicio (idx + 1)
        navContainer.innerHTML += `
            <div class="nav-circle-wrapper" onclick="navegarEjercicio(${idx})">
                <div class="nav-circle ${isActive}">${idx + 1}</div>
            </div>`;
    });
    // Ya no necesitamos el setTimeout para dibujar canvas, el CSS hará la magia

  document.getElementById('active-exercise-title').innerHTML = `
        ${ejData.nombre}
        <div style="font-size:11px; color:#aaa; margin-top:5px; font-weight:normal; letter-spacing:0.5px;">
            💡 Modos: <b style="color:white;">N</b>ormal | <b style="color:#ff4500;">D</b>rop | <b style="color:#ffcc00;">R</b>est | <b style="color:#1e90ff;">F</b>uerza
        </div>
    `;

    const rowsContainer = document.getElementById('sets-rows-container');
    rowsContainer.innerHTML = '';

    // --- DETECCIÓN DE TIPOS DE PANTALLA ---
    const nombreEj = ejData.nombre.toLowerCase();
    const esPreparacion = nombreEj === '🔥 preparación';
    const esCardio = nombreEj.includes('cardio') || nombreEj.includes('calentamiento') || nombreEj.includes('trotar') || nombreEj.includes('cicla') || nombreEj.includes('lazo');
    
    // Elementos de la interfaz que vamos a ocultar/mostrar
    const labelKg = document.getElementById('label-kg');
    const btnAddSerie = document.querySelector('button[onclick="añadirSerieExtra()"]');
    
    // 1. VISTA DE PREPARACIÓN (Inyectada siempre de primero)
    if (esPreparacion) {
        if(labelKg && labelKg.parentElement) labelKg.parentElement.style.display = 'none';
        if(btnAddSerie) btnAddSerie.style.display = 'none';
        
        rowsContainer.innerHTML = `
            <div style="background-color: #1a1a1a; padding: 25px 15px; border-radius: 12px; text-align: center; margin-top: 30px; border: 1px solid #333;">
                <span style="font-size: 2.5rem; display: block; margin-bottom: 15px;">💪🔥</span>
                <p style="color: #fff; font-size: 1.1rem; line-height: 1.6; margin: 0;">
                    <strong>Calienta como te indique el entrenador de turno antes de iniciar</strong> 
                    Y recuerda hacer series de aproximacion, mucha fuerza en tu entreno felicidades por tu disciplina. <strong>
                </p>
            </div>
        `;
        return; // Terminamos aquí para no dibujar casillas
    } 
   // 2. VISTA DE CARDIO / TROTAR / CICLA
    else if (esCardio) {
        if(labelKg && labelKg.parentElement) labelKg.parentElement.style.display = 'none';
        if(btnAddSerie) btnAddSerie.style.display = 'none';
        
        // Extraemos dinámicamente el tiempo para no mostrar siempre media hora
        const tiempoCardio = ejData.meta ? ejData.meta : "el tiempo indicado";
        
        rowsContainer.innerHTML = `
            <div style="background-color: #1a1a1a; padding: 25px 15px; border-radius: 12px; text-align: center; margin-top: 30px; border: 1px solid #333;">
                <span style="font-size: 2.5rem; display: block; margin-bottom: 15px;">🚴‍♂️🏃‍♂️</span>
                <p style="color: #fff; font-size: 1.1rem; line-height: 1.6; margin: 0;">
                    Termina tu rutina con cicla, trotar o saltar lazo por <strong>${tiempoCardio}</strong>.<br><br>
                    ¡Elige cualquiera y a sudar!
                </p>
            </div>
        `;
        return; // Terminamos aquí para no dibujar casillas
    }

   // 3. VISTA NORMAL DE PESAS
    else {
        // Ocultamos los labels viejos porque ahora la cabecera se genera dinámica con la columna DESC.
        if(labelKg && labelKg.parentElement) labelKg.parentElement.style.display = 'none';
        if(btnAddSerie) btnAddSerie.style.display = 'block';
        
        // Inyectamos la nueva cabecera
        rowsContainer.innerHTML = `
            <div class="sets-header">
                <div class="col-ser">SER.</div>
                <div class="col-prev">PREVIA</div>
                <div class="col-kg">KG</div>
                <div class="col-reps">REPES</div>
                <div class="col-desc">DESC.</div>
                <div class="col-chk">✓</div>
            </div>
        `;
    }
    // ---------------------------------
    
    // Solo dibujamos series si no es Preparación ni Cardio
    if (!esPreparacion && !esCardio) {
        estadoLocal.series.forEach((serie, sIdx) => {
            const isChecked = serie.checked ? 'checked' : '';
            const isRowChecked = serie.checked ? 'row-checked' : '';
   let preData = '-';
            if (historialEj[sIdx]) {
                // Indicador visual del tipo de serie que se hizo
                let prefijoTipo = '';
                if (historialEj[sIdx].tipo === 'D') prefijoTipo = '<b style="color:#ff4500; font-size:10px;">[D]</b> ';
                if (historialEj[sIdx].tipo === 'R') prefijoTipo = '<b style="color:#ffcc00; font-size:10px;">[R]</b> ';
                if (historialEj[sIdx].tipo === 'F') prefijoTipo = '<b style="color:#1e90ff; font-size:10px;">[F]</b> ';

                preData = `${prefijoTipo}${historialEj[sIdx].kg}kg x ${historialEj[sIdx].reps}`;
                
                // Si fue Drop Set y hay datos guardados, mostramos cada bajada de peso
                if (historialEj[sIdx].tipo === 'D' && historialEj[sIdx].subDrops && historialEj[sIdx].subDrops.length > 0) {
                    // Filtramos los que están vacíos para que no salgan fantasmas
                    let validDrops = historialEj[sIdx].subDrops.filter(d => d.kg !== '' && d.reps !== '');
                    if (validDrops.length > 0) {
                        let dropsInfo = validDrops.map(d => `${d.kg}kg x ${d.reps}`).join('<br>↳ ');
                        // Letra más grande (12px) y un naranja brillante (#ff8833) mucho más legible
                        preData += `<br><span style="font-size: 12px; color: #ff4500; display:block; margin-top:4px; font-weight:600; line-height: 1.3;">↳ ${dropsInfo}</span>`;
                    }
                }

                // Si fue serie de Fuerza y hay nota, la mostramos
                if (historialEj[sIdx].tipo === 'F' && historialEj[sIdx].notaFuerza) {
                    preData += `<br><span style="font-size: 9px; color: #475461; display:block; margin-top:2px; line-height:1.1;">📝 ${historialEj[sIdx].notaFuerza}</span>`;
                }

                // Tiempo de descanso guardado
                if (historialEj[sIdx].descanso && historialEj[sIdx].descanso !== '-') {
                    preData += `<br><span style="font-size: 10px; color: #888; display:block; margin-top:2px;">⏱ ${historialEj[sIdx].descanso}</span>`;
                }
            }

            // Tiempo de descanso registrado
            let valDesc = serie.tiempoDescanso || '-';
          let descBox = serie.checked 
                ? `<div class="set-desc-text">${valDesc}</div>` 
                : `<div style="width:100%; text-align:center; color:#555; font-size:12px;">-</div>`;

            let tipoColor = '#333333';
            if(serie.tipo === 'D') tipoColor = '#ff4500';
            if(serie.tipo === 'R') tipoColor = '#ffcc00';
            if(serie.tipo === 'F') tipoColor = '#1e90ff';

            let htmlFila = `
                <div class="set-row ${isRowChecked}" id="row-${ejIndex}-${sIdx}" style="flex-wrap: wrap; height: auto; padding-bottom: 8px;">
                    <div class="col-ser" style="display:flex; justify-content:center; align-items:center;">
                        <button onclick="ciclarTipoSerie(${ejIndex}, ${sIdx})" style="background:${tipoColor}; color:white; border:none; border-radius:50%; width:28px; height:28px; font-weight:bold; cursor:pointer; font-size:12px; display:flex; align-items:center; justify-content:center; box-shadow:0 2px 5px rgba(0,0,0,0.3);" ${serie.checked ? 'disabled' : ''}>
                            ${serie.tipo}${sIdx + 1}
                        </button>
                    </div>
                    <div class="col-prev"><div class="set-prev-text">${preData}</div></div>
                    <div class="col-kg">
                        <input type="number" class="set-input inp-kg" placeholder="0" value="${serie.kg}" id="kg-${ejIndex}-${sIdx}" max="999" oninput="if(this.value.length > 4) this.value = this.value.slice(0,4);" ${serie.checked ? 'disabled' : ''}>
                    </div>
                    <div class="col-reps">
                        <input type="${serie.tipo === 'R' ? 'text' : 'number'}" class="set-input inp-reps" placeholder="${serie.tipo === 'R' ? '8+3' : '0'}" value="${serie.reps}" id="reps-${ejIndex}-${sIdx}" ${serie.tipo === 'R' ? '' : 'max="999" oninput="if(this.value.length > 4) this.value = this.value.slice(0,4);"'} ${serie.checked ? 'disabled' : ''}>
                    </div>
                    <div class="col-desc">${descBox}</div>
                    <div class="col-chk">
                        <button class="btn-check-set ${isChecked}" onclick="toggleSerie(${ejIndex}, ${sIdx})">✓</button>
                    </div>
            `;

            if (serie.tipo === 'F') {
                htmlFila += `
                    <div style="width: 100%; padding: 8px 10px 0 10px; flex-basis: 100%;">
                        <input type="text" id="nota-${ejIndex}-${sIdx}" placeholder="📝 Nota de Fuerza (ej: RPE 9, 2 reps reserva)" value="${serie.notaFuerza || ''}" style="width:100%; background:#1a1a1a; color:#fff; border:1px solid #1e90ff; border-radius:6px; padding:8px; font-size:12px;" ${serie.checked ? 'disabled' : ''}>
                    </div>
                `;
            }

        if (serie.tipo === 'D') {
                htmlFila += `<div style="flex: 1; padding-top: 8px; max-width: 100%; box-sizing: border-box;" id="drops-container-${ejIndex}-${sIdx}">`;
                serie.subDrops.forEach((drop, dIdx) => {
                    htmlFila += `
                        <div style="display:flex; gap:4px; margin-bottom:6px; align-items:center; background:#1a1a1a; padding:6px; border-radius:6px; border-left:3px solid #ff4500; box-sizing:border-box; width:100%; overflow:hidden;">
                            <span style="font-size:10px; color:#ff4500; font-weight:bold; white-space:nowrap; flex-shrink:0;">↳ Drop ${dIdx+1}:</span>
                            <input type="number" placeholder="KG" value="${drop.kg}" id="kg-${ejIndex}-${sIdx}-d${dIdx}" style="flex:1 1 0%; min-width:0; background:#111; border:1px solid #333; color:white; font-size:12px; padding:6px 2px; border-radius:4px; text-align:center;" ${serie.checked ? 'disabled' : ''}>
                            <input type="number" placeholder="Reps" value="${drop.reps}" id="reps-${ejIndex}-${sIdx}-d${dIdx}" style="flex:1 1 0%; min-width:0; background:#111; border:1px solid #333; color:white; font-size:12px; padding:6px 2px; border-radius:4px; text-align:center;" ${serie.checked ? 'disabled' : ''}>
                            <button onclick="eliminarSubDrop(${ejIndex}, ${sIdx}, ${dIdx})" style="background:none; border:none; color:#ff4444; font-size:20px; line-height:1; padding:0 2px; cursor:pointer; font-weight:bold; flex-shrink:0;" ${serie.checked ? 'disabled' : ''}>×</button>
                        </div>
                    `;
                });
                htmlFila += `
                    <button onclick="agregarSubDrop(${ejIndex}, ${sIdx})" style="background:none; border:1px dashed #ff4500; color:#ff4500; font-size:12px; padding:6px 12px; border-radius:6px; cursor:pointer; width:100%; margin-top:4px; box-sizing:border-box;" ${serie.checked ? 'disabled' : ''}>+ Añadir Drop Set</button>
                </div>`;
            }
            htmlFila += `</div>`;
            rowsContainer.innerHTML += htmlFila;
        });
    }
}

function navegarEjercicio(idx) {
    guardarInputsActuales();
    sesionActiva.currentIndex = idx;
    renderizarEjercicioActivo();
}

function guardarInputsActuales() {
    const ejIndex = sesionActiva.currentIndex;
    const estadoLocal = sesionActiva.datosSesion[ejIndex];
    
    // Evitamos buscar inputs si estamos en una pantalla sin ellos (Preparación o Cardio)
    if (estadoLocal.series.length === 0) return;

    estadoLocal.series.forEach((serie, sIdx) => {
        if(!serie.checked) {
            const kgInp = document.getElementById(`kg-${ejIndex}-${sIdx}`);
            const repsInp = document.getElementById(`reps-${ejIndex}-${sIdx}`);
            if(kgInp) serie.kg = kgInp.value;
            if(repsInp) serie.reps = repsInp.value;
            
            if(serie.tipo === 'F') {
                const notaInp = document.getElementById(`nota-${ejIndex}-${sIdx}`);
                if(notaInp) serie.notaFuerza = notaInp.value;
            }
            if(serie.tipo === 'D') {
                serie.subDrops.forEach((drop, dIdx) => {
                    const skg = document.getElementById(`kg-${ejIndex}-${sIdx}-d${dIdx}`);
                    const srp = document.getElementById(`reps-${ejIndex}-${sIdx}-d${dIdx}`);
                    if(skg) drop.kg = skg.value;
                    if(srp) drop.reps = srp.value;
                });
            }
        }
    });
}

function toggleSerie(ejIndex, sIdx, esCardio = false) {
    // 🌟 ESTA ES LA LÍNEA QUE DEBES AGREGAR:
    guardarInputsActuales(); 

    const estadoLocal = sesionActiva.datosSesion[ejIndex];
    const serie = estadoLocal.series[sIdx];
    
    if (!serie.checked) {
        const kgInput = document.getElementById(`kg-${ejIndex}-${sIdx}`);
        const repsInput = document.getElementById(`reps-${ejIndex}-${sIdx}`);
        
        const kg = kgInput ? kgInput.value : '';
        const reps = repsInput ? repsInput.value : '';
        
        if(kg === '' || (!esCardio && reps === '')) { 
            mostrarModalGenerico('Atención', esCardio ? 'Rellena los Minutos para completar la serie.' : 'Rellena KG y Repes para completar la serie.'); 
            return; 
        }
        
        serie.kg = kg; 
        serie.reps = reps; 
        serie.checked = true;
        
        // --- AQUÍ ESTÁ LA INTEGRACIÓN DEL DESCANSO ---
        if (typeof iniciarDescanso === "function") {
            iniciarDescanso(ejIndex, sIdx);
        } else {
            renderizarEjercicioActivo();
        }
    } else {
        serie.checked = false;
        serie.tiempoDescanso = null; // Limpia el tiempo si se quita el check
        renderizarEjercicioActivo();
    }
}

function ciclarTipoSerie(ejIndex, sIdx) {
    guardarInputsActuales();
    const estadoLocal = sesionActiva.datosSesion[ejIndex];
    const serie = estadoLocal.series[sIdx];
    const tipos = ['N', 'D', 'R', 'F'];
    const nombresTipos = { 'N': 'Normal / Fallo', 'D': 'Drop Set Activado', 'R': 'Rest-Pause Activado', 'F': 'Modo Fuerza Activado' };
    
    let nextIdx = (tipos.indexOf(serie.tipo) + 1) % tipos.length;
    serie.tipo = tipos[nextIdx];
    
    if(serie.tipo !== 'D') serie.subDrops = [];
    if(serie.tipo !== 'F') serie.notaFuerza = '';
    
    mostrarToastModo(`🔥 ${nombresTipos[serie.tipo]}`);
    renderizarEjercicioActivo();
}

function agregarSubDrop(ejIndex, sIdx) {
    guardarInputsActuales();
    sesionActiva.datosSesion[ejIndex].series[sIdx].subDrops.push({ kg: '', reps: '' });
    renderizarEjercicioActivo();
}

function mostrarToastModo(mensaje) {
    let toast = document.getElementById('toast-modo-serie');
    if(!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-modo-serie';
        toast.style.cssText = 'position:fixed; bottom:90px; left:50%; transform:translateX(-50%); background:rgba(0,0,0,0.85); color:white; padding:12px 25px; border-radius:25px; font-size:14px; z-index:10000; transition: opacity 0.3s; border: 1px solid #444; font-weight:bold; pointer-events:none; box-shadow: 0 4px 15px rgba(0,0,0,0.5);';
        document.body.appendChild(toast);
    }
    toast.innerText = mensaje;
    toast.style.opacity = '1';
    toast.style.display = 'block';
    
    clearTimeout(toast.timeout);
    toast.timeout = setTimeout(() => { toast.style.opacity = '0'; setTimeout(()=> toast.style.display='none', 300); }, 1500);
}

function añadirSerieExtra() {
    guardarInputsActuales();
    sesionActiva.datosSesion[sesionActiva.currentIndex].series.push({ kg: '', reps: '', checked: false });
    renderizarEjercicioActivo();
}

async function cancelarEntrenamiento() {
    if(await RNModal.show({ type: 'confirm', title: 'Cancelar', message: '¿Abandonar entrenamiento? Se perderán los datos de hoy.' })) {
        clearInterval(sesionActiva.timerInterval);
        cambiarSeccion('home');
    }
}

async function terminarEntrenamiento() {
    guardarInputsActuales();
    const confirm = await RNModal.show({ type: 'confirm', title: 'Terminar', message: '¿Finalizar y guardar el entrenamiento?' });
    if(!confirm) return;

    clearInterval(sesionActiva.timerInterval);
    
    let mejorasHtml = '';
    let volumenTotal = 0;

    sesionActiva.datosSesion.forEach(ej => {
        let maxKgHoy = 0;
        let ejVol = 0;
        let completadas = 0;

        const seriesHechas = ej.series.filter(s => s.checked);
        
       seriesHechas.forEach(s => {
            const k = parseFloat(s.kg) || 0;
            let r = 0;
            
            if (s.tipo === 'R' && typeof s.reps === 'string') {
                r = s.reps.split('+').reduce((sum, val) => sum + (parseInt(val.trim()) || 0), 0);
            } else {
                r = parseInt(s.reps) || 0;
            }
            
            if(k > maxKgHoy) maxKgHoy = k;
            ejVol += (k * r);

            if(s.tipo === 'D' && s.subDrops) {
                s.subDrops.forEach(sd => {
                    const sdk = parseFloat(sd.kg) || 0;
                    const sdr = parseInt(sd.reps) || 0;
                    ejVol += (sdk * sdr);
                });
            }
            completadas++;
        });

        volumenTotal += ejVol;

        // Solo registramos si es un ejercicio real con series completadas
        if(completadas > 0 && ej.nombre !== "🔥 Preparación") {
            const histAntiguo = historialMarcas[ej.nombre] || [];
            let maxKgPrevio = 0;
            histAntiguo.forEach(hs => { if(parseFloat(hs.kg) > maxKgPrevio) maxKgPrevio = parseFloat(hs.kg); });

            let statusClass = 'status-same'; let statusText = 'Mantenido';
            if(maxKgHoy > maxKgPrevio) { statusClass = 'status-up'; statusText = '¡NUEVO RÉCORD! 🚀'; }

            mejorasHtml += `
                <div class="improvement-card">
                    <span class="imp-name">${ej.nombre}</span>
                    <span class="imp-status ${statusClass}">${statusText} (Max ${maxKgHoy}kg)</span>
                </div>
            `;

     historialMarcas[ej.nombre] = seriesHechas.map(s => ({
    kg: s.kg, 
    reps: s.reps, 
    descanso: s.tiempoDescanso || '-',
    tipo: s.tipo,
    notaFuerza: s.notaFuerza,
    subDrops: s.subDrops
}));
        }
    });

   if(mejorasHtml === '') mejorasHtml = '<p style="color:#666; text-align:center;">No se registraron series completadas.</p>';

    guardarDatosApp();

    cambiarSeccion('summary');
    
    const mins = Math.floor(sesionActiva.segundos / 60);
    const secs = sesionActiva.segundos % 60;
    const textoTiempo = mins > 0 ? `${mins} min ${secs} seg` : `${secs} seg`;
    
    document.getElementById('summary-time').innerText = textoTiempo;
    document.getElementById('summary-vol').innerText = `${volumenTotal} kg`;
    document.getElementById('summary-improvements-list').innerHTML = mejorasHtml;
}
// ========================================================
// MOTOR DE GRÁFICOS VECTORIALES (CANVAS GLOBALES)
// ========================================================
function dibujarAvatarPerfil() {
    const canvas = document.getElementById('canvas-profile-avatar'); 
    if (!canvas) return;
    const ctx = canvas.getContext('2d'); 
    
    // Comprobamos si el usuario ya tiene una foto guardada en el dispositivo
    const fotoGuardada = localStorage.getItem('rn_foto_perfil');
    
    if (fotoGuardada) {
        // Si hay foto, la cargamos y la dibujamos en el canvas
        const img = new Image();
        img.onload = function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = fotoGuardada;
    } else {
        // Si NO hay foto, dibujamos la silueta gris por defecto que ya tenías
        ctx.fillStyle = '#0a0a0a'; 
        ctx.fillRect(0, 0, 100, 100);
        ctx.fillStyle = '#333333'; 
        ctx.beginPath(); 
        ctx.arc(50, 35, 18, 0, Math.PI * 2); 
        ctx.fill();
        ctx.beginPath(); 
        ctx.arc(50, 90, 35, Math.PI, 0); 
        ctx.fill();
    }
}

function ejecutarDibujoIconosVectoriales() {
    document.querySelectorAll('.symmetry-avatar-canvas').forEach(canvas => {
        const ctx = canvas.getContext('2d'); ctx.clearRect(0, 0, 44, 44);
        ctx.fillStyle = '#121212'; ctx.beginPath(); ctx.arc(22, 22, 20, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(14, 22); ctx.lineTo(30, 22); ctx.stroke();
        ctx.fillStyle = '#ff0000'; ctx.fillRect(11, 14, 3, 16); ctx.fillStyle = '#ffffff'; ctx.fillRect(7, 17, 3, 10);
        ctx.fillStyle = '#ff0000'; ctx.fillRect(30, 14, 3, 16); ctx.fillStyle = '#ffffff'; ctx.fillRect(34, 17, 3, 10);
    });
    document.querySelectorAll('.muscle-badge-canvas').forEach(canvas => {
        const ctx = canvas.getContext('2d'); ctx.clearRect(0, 0, 24, 24);
        ctx.strokeStyle = 'rgba(255, 0, 0, 0.6)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(12, 12, 8, 0, Math.PI * 2); ctx.stroke();
        ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(12, 12, 3, 0, Math.PI * 2); ctx.fill();
    });
}

function inicializarIconosFijosCanvas() {
    const dibujar = (id, strokeColor, lineWidth, drawFn) => {
        const canvas = document.getElementById(id); if (!canvas) return;
        const ctx = canvas.getContext('2d'); ctx.clearRect(0, 0, 24, 24);
        ctx.strokeStyle = strokeColor; ctx.lineWidth = lineWidth; ctx.beginPath(); drawFn(ctx); ctx.stroke();
    };
    dibujar('canvas-settings', '#888888', 2, ctx => { ctx.arc(12, 12, 4, 0, Math.PI * 2); for (let i = 0; i < 8; i++) { let a = i * Math.PI / 4; ctx.moveTo(12 + Math.cos(a) * 4, 12 + Math.sin(a) * 4); ctx.lineTo(12 + Math.cos(a) * 7, 12 + Math.sin(a) * 7); } });
    dibujar('nav-icon-train', '#ffffff', 2, ctx => { ctx.moveTo(4, 12); ctx.lineTo(20, 12); ctx.moveTo(6, 7); ctx.lineTo(6, 17); ctx.moveTo(18, 7); ctx.lineTo(18, 17); });
    dibujar('nav-icon-profile', '#ffffff', 2, ctx => { ctx.arc(12, 8, 4, 0, Math.PI * 2); ctx.moveTo(5, 19); ctx.bezierCurveTo(5, 15, 19, 15, 19, 19); });
    dibujar('nav-icon-plus', '#ffffff', 3, ctx => { ctx.moveTo(12, 6); ctx.lineTo(12, 18); ctx.moveTo(6, 12); ctx.lineTo(18, 12); });
}

// ========================================================
// GESTIÓN DE PERFIL (ACTUALIZADO CON SOPORTE DE FOTO)
// ========================================================
function cargarDatosPerfil() {
    const datosGuardados = localStorage.getItem('rn_perfil_usuario');
    if (datosGuardados) {
        const datos = JSON.parse(datosGuardados);
        
        if (datos.nombre) document.getElementById('perfil-nombre').value = datos.nombre;
        if (datos.peso) document.getElementById('perfil-peso').value = datos.peso;
        if (datos.altura) document.getElementById('perfil-altura').value = datos.altura;
        if (datos.genero) document.getElementById('perfil-genero').value = datos.genero;
        
        if (datos.anos) {
            document.getElementById('perfil-anos').value = datos.anos;
        } else if (datos.experiencia) {
            const inputAnos = document.getElementById('perfil-anos');
            if (datos.experiencia === "Principiante") inputAnos.value = 1;
            else if (datos.experiencia === "Intermedio") inputAnos.value = 4;
            else if (datos.experiencia === "Avanzado") inputAnos.value = 7;
        }
    }
    
    // NUEVO: Cada vez que cargamos los datos del perfil, dibujamos el avatar (sea foto o silueta)
    dibujarAvatarPerfil();
}

async function guardarPerfil() { 
    let datos = JSON.parse(localStorage.getItem('rn_perfil_usuario') || '{}');
    
    datos.nombre = document.getElementById('perfil-nombre').value;
    datos.peso = document.getElementById('perfil-peso').value;
    datos.altura = document.getElementById('perfil-altura').value;
    datos.genero = document.getElementById('perfil-genero').value;
    datos.anos = document.getElementById('perfil-anos').value;
    
    localStorage.setItem('rn_perfil_usuario', JSON.stringify(datos));

    await RNModal.show({ type: 'alert', title: '¡Guardado!', message: 'Tu perfil se ha guardado permanentemente.' }); 
}

// NUEVA FUNCIÓN: Procesa el archivo multimedia (Cámara o Galería) seleccionado por el usuario
function procesarNuevaFoto(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.getElementById('canvas-profile-avatar');
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Lógica de encuadre: Recortamos un cuadrado perfecto desde el centro de la foto
            const size = Math.min(img.width, img.height);
            const sourceX = (img.width - size) / 2;
            const sourceY = (img.height - size) / 2;
            
            // Pintamos la imagen recortada para adaptarla al círculo de tu perfil
            ctx.drawImage(
                img, 
                sourceX, sourceY, size, size, 
                0, 0, canvas.width, canvas.height
            );
            
            // Guardamos la imagen en Base64 de manera local e indefinida
            const dataURL = canvas.toDataURL('image/jpeg');
            localStorage.setItem('rn_foto_perfil', dataURL);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}
// ========================================================
// SISTEMA DE DESCANSO ÉLITE (CRONÓMETRO PROGRESIVO)
// ========================================================
let timerDescansoInterval;

function iniciarDescanso(ejIndex, sIdx) {
    let modalDescanso = document.getElementById('modal-descanso-elite');
    
    // 1. Si el modal no existe, lo inyectamos con el nuevo diseño sin botones de sumar/restar
    if (!modalDescanso) {
        document.body.insertAdjacentHTML('beforeend', `
            <div id="modal-descanso-elite" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.95); z-index:9999; justify-content:center; align-items:center; flex-direction:column; backdrop-filter: blur(5px);">
                <h2 style="color:white; font-size:28px; margin-bottom:10px; font-weight:800;">¡Serie Completada! 🔥</h2>
                <p style="color:#aaa; font-size:16px; margin-bottom:40px;">Descanso recomendado: 3 minutos</p>
                
                <div style="position:relative; width:180px; height:180px; display:flex; justify-content:center; align-items:center; margin-bottom:40px;">
                    <svg style="position:absolute; top:0; left:0; width:100%; height:100%; transform: rotate(-90deg);">
                        <circle cx="90" cy="90" r="80" fill="none" stroke="#222" stroke-width="8"></circle>
                        <circle id="descanso-progress" cx="90" cy="90" r="80" fill="none" stroke="#ff0000" stroke-width="8" stroke-dasharray="502" stroke-dashoffset="502" style="transition: stroke-dashoffset 1s linear;"></circle>
                    </svg>
                    <span id="texto-timer" style="color:white; font-size:45px; font-weight:bold; z-index:10; font-family: monospace;">00:00</span>
                </div>

                <button onclick="terminarDescanso()" style="background:#ff0000; color:white; border:none; padding:15px 40px; border-radius:12px; font-size:20px; font-weight:bold; cursor:pointer; box-shadow: 0 4px 15px rgba(255,0,0,0.4);">Volver a entrenar</button>
            </div>
        `);
        modalDescanso = document.getElementById('modal-descanso-elite');
    }

    // 2. Configuramos el tiempo para que cuente hacia arriba
    modalDescanso.style.display = 'flex';
    let tiempoDescansado = 0; 
    let tiempoObjetivo = 180; // 3 minutos = 180 segundos
    
    let textoTimer = document.getElementById('texto-timer');
    let progressBar = document.getElementById('descanso-progress');
    let perimetro = 2 * Math.PI * 80; // ~502

    const actualizarUI = () => {
        let m = Math.floor(tiempoDescansado / 60).toString().padStart(2, '0');
        let s = (tiempoDescansado % 60).toString().padStart(2, '0');
        textoTimer.innerText = `${m}:${s}`;
        
        // La barra se llena progresivamente hasta los 3 minutos
        let porcentaje = tiempoDescansado / tiempoObjetivo;
        if (porcentaje > 1) porcentaje = 1; // Se queda llena si se pasa del tiempo
        
        let offset = perimetro - (porcentaje * perimetro);
        progressBar.style.strokeDashoffset = offset;
        
        // Si cumple los 3 minutos, el borde se pone verde para avisarle
        if (tiempoDescansado >= tiempoObjetivo) {
            progressBar.style.stroke = "#00ff00"; 
        } else {
            progressBar.style.stroke = "#ff0000";
        }
    };
    
    actualizarUI();
    clearInterval(timerDescansoInterval);
    
    // 3. Función para detener y guardar (Solo se activa hundiendo el botón)
    window.terminarDescanso = () => {
        clearInterval(timerDescansoInterval);
        modalDescanso.style.display = 'none';
        
        // Guardamos el tiempo exacto que se tomó
        let minUsados = Math.floor(tiempoDescansado / 60);
        let segUsados = tiempoDescansado % 60;
        let textoGuardado = minUsados > 0 ? `${minUsados}m ${segUsados}s` : `${segUsados}s`;
        
        // Actualizamos la tabla
        sesionActiva.datosSesion[ejIndex].series[sIdx].tiempoDescanso = textoGuardado;
        renderizarEjercicioActivo();
    };

    // 4. Iniciar la cuenta hacia adelante
    timerDescansoInterval = setInterval(() => {
        tiempoDescansado++;
        actualizarUI();
    }, 1000);
}
// Al final de todo tu archivo app.js, libre y sin encerrar en otra función:
function eliminarSubDrop(ejIndex, sIdx, dIdx) {
    guardarInputsActuales();
    sesionActiva.datosSesion[ejIndex].series[sIdx].subDrops.splice(dIdx, 1);
    renderizarEjercicioActivo();
}
async function generarReportePDF() {
    const historialCompleto = JSON.parse(localStorage.getItem('rn_historial_marcas')) || {};
    
    if (Object.keys(historialCompleto).length === 0) {
        alert("Aún no tienes entrenamientos registrados en el historial para generar un reporte.");
        return;
    }
function nombreDeTuFuncion() {
    alert("¡SÍ ESTÁ LEYENDO EL CÓDIGO NUEVO!"); // <--- Agrega esto aquí
}
    // 1. PANTALLA DE CARGA ELEGANTE
    const pantallaCarga = document.createElement('div');
    pantallaCarga.style.position = 'fixed';
    pantallaCarga.style.top = '0';
    pantallaCarga.style.left = '0';
    pantallaCarga.style.width = '100vw';
    pantallaCarga.style.height = '100vh';
    pantallaCarga.style.backgroundColor = '#0a0a0a'; 
    pantallaCarga.style.zIndex = '9999999'; 
    pantallaCarga.style.display = 'flex';
    pantallaCarga.style.flexDirection = 'column';
    pantallaCarga.style.justifyContent = 'center';
    pantallaCarga.style.alignItems = 'center';
    pantallaCarga.innerHTML = `
        <style>
            @keyframes girarRN { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            .spinner-rn { 
                width: 45px; height: 45px; 
                border: 4px solid #222; border-top: 4px solid #e60000; 
                border-radius: 50%; 
                animation: girarRN 1s linear infinite; 
                margin-bottom: 20px; 
            }
        </style>
        <div class="spinner-rn"></div>
        <h3 style="font-family: Arial, sans-serif; font-weight: 600; margin: 0; color: #ffffff; font-size: 18px;">Generando PDF...</h3>
        <p style="color: #888888; font-family: Arial, sans-serif; font-size: 13px; margin-top: 8px;">Procesando historial de marcas</p>
    `;
    document.body.appendChild(pantallaCarga);

    // 2. EL TELÓN DE FONDO
    const telonContenedor = document.createElement('div');
    telonContenedor.style.position = 'fixed';
    telonContenedor.style.top = '0';
    telonContenedor.style.left = '0';
    telonContenedor.style.width = '100vw';
    telonContenedor.style.height = '100vh';
    telonContenedor.style.backgroundColor = '#ffffff';
    telonContenedor.style.zIndex = '999999'; 
    telonContenedor.style.overflowY = 'auto'; 
    telonContenedor.style.display = 'flex';
    telonContenedor.style.justifyContent = 'center';

    // 3. EL CONTENEDOR DEL REPORTE
    const contenedorTemporal = document.createElement('div');
    contenedorTemporal.className = 'pdf-render-container';
    contenedorTemporal.style.width = '790px'; 
    contenedorTemporal.style.background = '#ffffff';
    contenedorTemporal.style.padding = '40px';
    contenedorTemporal.style.boxSizing = 'border-box';

    telonContenedor.appendChild(contenedorTemporal);
    document.body.appendChild(telonContenedor);

    // 4. HTML BASE Y ESTILOS
    let htmlPDF = `
        <style>
            .pdf-render-container {
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                text-rendering: optimizeLegibility;
            }
            .pdf-render-container * {
                color: #1a1a1a !important; 
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
            }
            .pdf-render-container h1 { 
                color: #e60000 !important; 
                font-size: 28px !important; 
                font-weight: 800 !important;
                letter-spacing: -0.5px;
                margin: 0; 
            }
            .pdf-render-container h2 { 
                color: #111111 !important; 
                font-size: 19px !important; 
                font-weight: 700 !important;
                border-left: 5px solid #e60000 !important; 
                padding-left: 12px !important; 
                margin-top: 0;
                margin-bottom: 20px;
            }
            .pdf-render-container table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 15px;
            }
            .pdf-render-container table th { 
                background-color: #e60000 !important; 
                color: #ffffff !important; 
                padding: 10px 12px; 
                font-size: 12px;
                font-weight: 700;
                text-transform: uppercase;
                text-align: left; 
            }
            .pdf-render-container table td { 
                color: #333333 !important; 
                padding: 10px 12px; 
                font-size: 13px;
                border-bottom: 1px solid #eef0f2 !important; 
            }
            .pdf-render-container table tbody tr:hover {
                background-color: #f8f9fa !important;
            }
            .pdf-render-container .chart-wrapper { 
                background: #ffffff !important; 
                border: 1px solid #eef0f2 !important; 
                padding: 15px; 
                margin-bottom: 25px; 
                border-radius: 8px;
            }
        </style>

        <div style="border-bottom: 3px solid #e60000; padding-bottom: 20px; margin-bottom: 35px; display: table; width: 100%;">
            <div style="display: table-cell; vertical-align: middle;">
                <h1>REPORTE DE RENDIMIENTO</h1>
                <p style="margin: 6px 0 0 0; color: #555555 !important; font-size: 14px; font-weight: 500;">Evolución de Fuerza y Volumen de Trabajo</p>
            </div>
            <div style="display: table-cell; text-align: right; vertical-align: middle; color: #777777 !important; font-size: 13px; line-height: 1.5;">
                <strong>Fecha de Emisión:</strong> ${new Date().toLocaleDateString()}<br>
                <strong>Plataforma:</strong> RN Fitness App
            </div>
        </div>
    `;

    const listaGraficasAClonar = [];

    // =================================================================
//  RN FITNESS — GENERADOR DE REPORTE PDF v2 (Limpio y Corregido)
// =================================================================
async function generarReportePDF() {
    console.log('[RN PDF] Iniciando ejecución de generarReportePDF...');

    // ── PANTALLA DE CARGA (aparece primero siempre) ──────────────
    const pantallaCarga = document.createElement('div');
    pantallaCarga.style.cssText =
        'position:fixed;top:0;left:0;width:100vw;height:100vh;' +
        'background:#0a0a0a;z-index:9999999;' +
        'display:flex;flex-direction:column;justify-content:center;align-items:center;';
    pantallaCarga.innerHTML =
        '<style>' +
            '@keyframes _rnSpin{to{transform:rotate(360deg)}}' +
            '._rnSpinner{width:48px;height:48px;border:4px solid #222;' +
                'border-top:4px solid #e60000;border-radius:50%;' +
                'animation:_rnSpin .85s linear infinite}' +
        '</style>' +
        '<div class="_rnSpinner"></div>' +
        '<h3 style="font-family:Arial,sans-serif;font-weight:700;margin:20px 0 6px;' +
            'color:#fff;font-size:17px;">Construyendo tu reporte</h3>' +
        '<p style="color:#555;font-family:Arial,sans-serif;font-size:13px;margin:0;">' +
            'Calculando progresión semana a semana…</p>';
    document.body.appendChild(pantallaCarga);

    function limpiar() {
        if (document.body.contains(pantallaCarga))   document.body.removeChild(pantallaCarga);
        if (document.body.contains(telonContenedor)) document.body.removeChild(telonContenedor);
        console.log('[RN PDF] Pantallas de carga removidas del DOM.');
    }

    // Telón de aislamiento
    const telonContenedor = document.createElement('div');
    telonContenedor.style.cssText =
        'position:fixed;top:0;left:0;width:100vw;height:100vh;' +
        'background:#fff;z-index:999999;overflow-y:auto;display:flex;justify-content:center;';
    const contenedorTemporal = document.createElement('div');
    contenedorTemporal.style.cssText = 'width:794px;background:#fff;box-sizing:border-box;';
    telonContenedor.appendChild(contenedorTemporal);
    document.body.appendChild(telonContenedor);

    // ── TODO dentro de try/catch para evitar congelamientos silenciosos ──
    try {
        // ── LEER DATOS ────────────────────────────────────────────
        const historialCompleto = JSON.parse(localStorage.getItem('rn_historial_marcas') || '{}');

        if (Object.keys(historialCompleto).length === 0) {
            limpiar();
            alert("Aún no tienes entrenamientos registrados para generar un reporte.");
            return;
        }

        // ── HELPERS DE FECHA ──────────────────────────────────────
        function parsearFecha(raw) {
            try {
                const clean = String(raw || '').split(',')[0].split(' ')[0];
                const p = clean.split(/[-\/]/);
                if (p.length === 3) {
                    const a = +p[0], b = +p[1], c = +p[2];
                    return a > 31 ? new Date(a, b - 1, c) : new Date(c, b - 1, a);
                }
            } catch (e) { /* ignorar */ }
            return new Date();
        }

        function claveISO(d) {
            try {
                const f = new Date(d.getTime());
                f.setHours(0, 0, 0, 0);
                const dia = f.getDay() || 7;
                f.setDate(f.getDate() + 4 - dia);
                const año = f.getFullYear();
                const n = Math.ceil((((f - new Date(año, 0, 1)) / 864e5) + 1) / 7);
                return año + '-W' + String(n).padStart(2, '0');
            } catch (e) {
                return '2000-W01';
            }
        }

        // Corrección aplicada para evitar bucles en el cálculo de rangos de semanas
        function rangoSemana(clave) {
            try {
                const partes = clave.split('-W');
                const año = parseInt(partes[0], 10);
                const sem = parseInt(partes[1], 10);
                const jan4  = new Date(año, 0, 4);
                const diasALunes = (jan4.getDay() + 6) % 7;
                const lunes = new Date(jan4.getTime() - diasALunes * 864e5 + (sem - 1) * 7 * 864e5);
                const domingo = new Date(lunes.getTime() + 6 * 864e5);
                const op = { day: 'numeric', month: 'short' };
                return lunes.toLocaleDateString('es-ES', op) + ' – ' +
                       domingo.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
            } catch (e) {
                return clave;
            }
        }

        function fechaCorta(d) {
            try {
                return d.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' });
            } catch (e) { return '—'; }
        }

        // ── NORMALIZAR HISTORIAL ──────────────────────────────────
        const sinonimos = { 'PRESS DE BANCA INCLINADO': 'PRESS INCLINADO' };
        const historialLimpio = {};
        for (const orig in historialCompleto) {
            let key = String(orig).trim().toUpperCase();
            if (sinonimos[key]) key = sinonimos[key];
            if (!historialLimpio[key]) historialLimpio[key] = [];
            const arr = historialCompleto[orig];
            if (Array.isArray(arr)) historialLimpio[key] = historialLimpio[key].concat(arr);
        }

        // ── PROCESAR EJERCICIOS (últimos 4 meses) ────────────────
        const hace4Meses = new Date();
        hace4Meses.setMonth(hace4Meses.getMonth() - 4);

        const ejercicios = {};
        const fechasGlobales = new Set();

        for (const nombre in historialLimpio) {
            const registros = historialLimpio[nombre];
            if (!Array.isArray(registros) || registros.length === 0) continue;

            const porFecha = {};
            for (const reg of registros) {
                const fObj = parsearFecha(reg.fecha);
                if (fObj < hace4Meses) continue;
                const fStr = fObj.toLocaleDateString('es-ES');
                fechasGlobales.add(fStr);
                if (!porFecha[fStr]) porFecha[fStr] = { fObj, series: [] };
                const ss = (Array.isArray(reg.series) && reg.series.length > 0) ? reg.series : [reg];
                for (const s of ss) {
                    if ((parseFloat(s.kg) || 0) > 0 || s.reps > 0)
                        porFecha[fStr].series.push(s);
                }
            }

            const fechasOrd = Object.keys(porFecha).sort((a, b) => porFecha[a].fObj - porFecha[b].fObj);
            if (fechasOrd.length === 0) continue;

            const porSemana = {};
            for (const fStr of fechasOrd) {
                const clave = claveISO(porFecha[fStr].fObj);
                if (!porSemana[clave]) porSemana[clave] = { sesiones: {} };
                porSemana[clave].sessions = porSemana[clave].sessions || {}; 
                porSemana[clave].sesiones[fStr] = porFecha[fStr];
            }

            const labels = [], maxPesos = [];
            let primerMax = null, ultimoMax = null, prAbsoluto = 0;
            fechasOrd.forEach((fStr, i) => {
                const maxKg = porFecha[fStr].series.reduce((m, s) => {
                    const v = parseFloat(s.kg) || 0; return v > m ? v : m;
                }, 0);
                labels.push('S' + (i + 1));
                maxPesos.push(maxKg);
                if (primerMax === null && maxKg > 0) primerMax = maxKg;
                if (maxKg > 0) ultimoMax = maxKg;
                if (maxKg > prAbsoluto) prAbsoluto = maxKg;
            });

            ejercicios[nombre] = { porSemana, labels, maxPesos, primerMax, ultimoMax, prAbsoluto };
        }

        if (Object.keys(ejercicios).length === 0) {
            limpiar();
            alert("No hay datos en los últimos 4 meses para generar un reporte.");
            return;
        }

        // ── MÉTRICAS GLOBALES ─────────────────────────────────────
        const totalEj  = Object.keys(ejercicios).length;
        const totalSes = fechasGlobales.size;

        const semanasUnicas = new Set();
        for (const n in ejercicios)
            Object.keys(ejercicios[n].porSemana).forEach(k => semanasUnicas.add(k));
        const totalSem = semanasUnicas.size;

        let mejorPR = { nombre: '', ganancia: 0 };
        for (const n in ejercicios) {
            const { primerMax, ultimoMax } = ejercicios[n];
            if (primerMax && ultimoMax) {
                const g = +(ultimoMax - primerMax).toFixed(1);
                if (g > mejorPR.ganancia) mejorPR = { nombre: n, ganancia: g };
            }
        }

        const todasFechas = [...fechasGlobales].sort();
        const rangoTotal  = todasFechas.length > 0
            ? todasFechas[0] + ' → ' + todasFechas[todasFechas.length - 1]
            : '—';

        // Estilos CSS optimizados para html2canvas
        const CSS = `
        <style>
        .rnr{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;background:#fff;color:#111;width:794px;}
        .rnr * {box-sizing:border-box;margin:0;padding:0;}
        .rnr-cov{background:#0d0d0d;padding:52px 56px 44px;border-left:6px solid #e60000;}
        .rnr-eye{font-size:10px;font-weight:700;letter-spacing:3.5px;text-transform:uppercase;color:#e60000;margin-bottom:16px;}
        .rnr-tit{font-size:38px;font-weight:900;line-height:1.05;letter-spacing:-2px;color:#fff;margin-bottom:10px;}
        .rnr-tit-red{color:#e60000;}
        .rnr-sub{font-size:13px;color:#606060;margin-bottom:32px;}
        .rnr-cov-foot{border-top:1px solid #222;padding-top:20px;}
        .rnr-cov-l{font-size:12px;color:#888;}
        .rnr-cov-l strong{display:block;color:#ccc;font-size:13px;font-weight:600;margin-bottom:2px;}
        .rnr-cov-r{font-size:12px;color:#555;text-align:right;margin-top:4px;}
        .rnr-stats{padding:26px 56px 22px;background:#f7f7f7;border-bottom:1px solid #e0e0e0;}
        .rnr-slbl{font-size:10px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#aaa;margin-bottom:14px;}
        .rnr-ctbl{width:100%;border-collapse:collapse;}
        .rnr-ctbl td{width:25%;padding:16px 20px;background:#fff;border:1px solid #e2e2e2;vertical-align:top;}
        .rnr-cnum{font-size:28px;font-weight:800;line-height:1;color:#111;margin-bottom:4px;}
        .rnr-cnum.red{color:#e60000;}
        .rnr-clbl{font-size:11px;color:#888;font-weight:500;line-height:1.3;}
        .rnr-body{padding:0 56px 10px;}
        .rnr-ex{margin-top:38px;page-break-inside:avoid;}
        .rnr-exh{width:100%;border-collapse:collapse;border-bottom:2px solid #111;padding-bottom:10px;margin-bottom:16px;}
        .rnr-exh td{vertical-align:bottom;padding-bottom:10px;}
        .rnr-exn{font-size:15px;font-weight:800;color:#111;letter-spacing:-.3px;}
        .rnr-exmark{display:inline-block;width:7px;height:13px;background:#e60000;margin-right:9px;vertical-align:middle;position:relative;top:-1px;}
        .rnr-badge{display:inline-block;padding:5px 13px;font-size:11px;font-weight:700;border:1px solid;}
        .rnr-badge.up{background:#e8f5e9;color:#2e7d32;border-color:#c8e6c9;}
        .rnr-badge.dn{background:#fdecea;color:#c62828;border-color:#ffcdd2;}
        .rnr-badge.flat{background:#f3f4f6;color:#666;border-color:#e0e0e0;}
        .rnr-chbox{background:#fff;border:1px solid #e8e8e8;padding:14px 16px 10px;margin-bottom:16px;}
        .rnr-chcap{font-size:10px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#bbb;margin-bottom:8px;}
        .rnr-wk{margin-bottom:12px;}
        .rnr-wkh{background:#f3f3f3;border:1px solid #e0e0e0;padding:7px 14px;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#555;}
        .rnr-wkh em{font-style:normal;color:#aaa;font-weight:400;margin-left:6px;}
        .rnr-wtbl{width:100%;border-collapse:collapse;border:1px solid #e0e0e0;}
        .rnr-wtbl th{background:#f8f8f8;padding:8px 12px;font-size:10px;font-weight:700;letter-spacing:.8px;text-transform:uppercase;text-align:left;color:#888;border-bottom:1px solid #e4e4e4;}
        .rnr-wtbl td{padding:8px 12px;font-size:12px;color:#333;border-bottom:1px solid #f2f2f2;vertical-align:middle;}
        .rnr-wtbl tr:last-child td{border-bottom:none;}
        .rnr-wtbl .tdd{font-weight:600;font-size:11px;color:#111;background:#fefefe;border-right:1px solid #efefef;}
        .rnr-wtbl .tds{color:#bbb;font-size:11px;}
        .rnr-wtbl .tdk{font-weight:700;font-size:13px;color:#111;}
        .rnr-wtbl .tdk .rps{font-size:11px;font-weight:400;color:#999;}
        .rnr-wtbl .tdn{font-style:italic;font-size:11px;color:#999;}
        .pr-tag{display:inline-block;background:#e60000;color:#fff;font-size:9px;font-weight:700;padding:2px 5px;letter-spacing:.5px;margin-left:6px;vertical-align:middle;}
        .rnr-sep{height:1px;background:#ededed;margin:0 56px;}
        .rnr-foot{margin-top:44px;padding:18px 56px;border-top:2px solid #111;background:#f9f9f9;}
        .rnr-foot-brand{font-size:15px;font-weight:900;color:#111;letter-spacing:-.5px;}
        .rnr-foot-brand span{color:#e60000;}
        .rnr-foot-sub{font-size:10px;color:#bbb;margin-top:2px;}
        .rnr-foot-r{font-size:10px;color:#ccc;text-align:right;margin-top:-22px;}
        </style>`;

        // ── ESTRUCTURA GENERAL ────────────────────────────────────
        let html = CSS + `
        <div class="rnr">
        <div class="rnr-cov">
            <div class="rnr-eye">RN Fitness App · Análisis de rendimiento</div>
            <div class="rnr-tit">REPORTE DE<br><span class="rnr-tit-red">PROGRESIÓN</span></div>
            <div class="rnr-sub">Evolución de fuerza semana a semana · Últimos 4 meses</div>
            <div class="rnr-cov-foot">
                <div class="rnr-cov-l"><strong>Período analizado</strong>${rangoTotal}</div>
                <div class="rnr-cov-r">Emisión: ${new Date().toLocaleDateString('es-ES',{day:'numeric',month:'long',year:'numeric'})}</div>
            </div>
        </div>

        <div class="rnr-stats">
            <div class="rnr-slbl">Resumen del período</div>
            <table class="rnr-ctbl"><tr>
                <td><div class="rnr-cnum red">${totalSes}</div><div class="rnr-clbl">Sesiones completadas</div></td>
                <td><div class="rnr-cnum">${totalSem}</div><div class="rnr-clbl">Semanas activas</div></td>
                <td><div class="rnr-cnum">${totalEj}</div><div class="rnr-clbl">Ejercicios seguidos</div></td>
                <td><div class="rnr-cnum red">${mejorPR.ganancia > 0 ? '+' + mejorPR.ganancia + ' kg' : '—'}</div>
                    <div class="rnr-clbl">${mejorPR.nombre ? 'Mayor ganancia · ' + mejorPR.nombre.split(' ').slice(0,2).join(' ') : 'Sin variación'}</div></td>
            </tr></table>
        </div>`;

        const graficas = [];
        let numEj = 0;

        for (const nombre in ejercicios) {
            const { porSemana, labels, maxPesos, primerMax, ultimoMax, prAbsoluto } = ejercicios[nombre];
            const canvasId = 'rnc-' + nombre.replace(/[^a-zA-Z0-9]/g, '-').slice(0, 40);
            numEj++;

            let badge = '';
            if (primerMax !== null && ultimoMax !== null) {
                const diff = +(ultimoMax - primerMax).toFixed(1);
                const pct  = primerMax > 0 ? Math.round((diff / primerMax) * 100) : 0;
                if (diff > 0)      badge = `<span class="rnr-badge up">▲ +${diff} kg / +${pct}%</span>`;
                else if (diff < 0) badge = `<span class="rnr-badge dn">▼ ${diff} kg / ${pct}%</span>`;
                else               badge = `<span class="rnr-badge flat">→ Sin variación</span>`;
            } else {
                badge = `<span class="rnr-badge flat">1 sesión registrada</span>`;
            }

            html += (numEj > 1 ? '<div class="rnr-sep"></div>' : '') + `
            <div class="rnr-body"><div class="rnr-ex">
            <table class="rnr-exh"><tr>
                <td class="rnr-exn"><span class="rnr-exmark"></span>${nombre}</td>
                <td style="text-align:right">${badge}</td>
            </tr></table>
            <div class="rnr-chbox">
                <div class="rnr-chcap">Carga máxima por sesión (kg)</div>
                <canvas id="${canvasId}" width="656" height="160"></canvas>
            </div>`;

            const semanasOrd = Object.keys(porSemana).sort();
            for (const claveSem of semanasOrd) {
                const numSem = claveSem.split('-W')[1];
                const { sesiones } = porSemana[claveSem];
                const fechasEnSem  = Object.keys(sesiones).sort((a, b) => sesiones[a].fObj - sesiones[b].fObj);

                html += `
                <div class="rnr-wk">
                <div class="rnr-wkh">Semana ${numSem}<em>${rangoSemana(claveSem)}</em></div>
                <table class="rnr-wtbl"><thead><tr>
                    <th style="width:20%">Día</th>
                    <th style="width:13%">Serie</th>
                    <th style="width:24%">Carga</th>
                    <th>Notas / Variaciones</th>
                </tr></thead><tbody>`;

                for (const fStr of fechasEnSem) {
                    const { fObj, series } = sesiones[fStr];
                    const diaFmt = fechaCorta(fObj);
                    series.forEach((s, i) => {
                        const kg   = parseFloat(s.kg)  || 0;
                        const reps = parseInt(s.reps)  || 0;
                        const esPR = kg > 0 && kg >= prAbsoluto && prAbsoluto > 0;

                        let nota = '<span style="color:#ddd">—</span>';
                        if (s.tipo === 'D' && Array.isArray(s.subDrops)) {
                            const drops = s.subDrops.filter(d => d.kg !== '' && d.reps !== '');
                            if (drops.length) nota = '↳ Drop: ' + drops.map(d => d.kg + ' kg × ' + d.reps).join(' | ');
                        } else if (s.tipo === 'F' && s.notaFuerza) {
                            nota = '📝 ' + s.notaFuerza;
                        }

                        const celdaDia = i === 0 ? `<td class="tdd" rowspan="${series.length}">${diaFmt}</td>` : '';

                        html += `<tr>${celdaDia}
                        <td class="tds">Serie ${i + 1}</td>
                        <td class="tdk">${kg > 0 ? kg + ' kg' : '—'}${esPR ? '<span class="pr-tag">PR</span>' : ''}<br>
                            <span class="rps">× ${reps} reps</span></td>
                        <td class="tdn">${nota}</td></tr>`;
                    });
                }
                html += '</tbody></table></div>';
            }

            html += '</div></div>';
            if (labels.length > 0) graficas.push({ id: canvasId, labels, data: maxPesos });
        }

        // Footer
        html += `
        <div class="rnr-foot">
            <div class="rnr-foot-brand">RN <span>FITNESS</span></div>
            <div class="rnr-foot-sub">Reporte ${new Date().toLocaleDateString('es-ES',{day:'numeric',month:'long',year:'numeric'})} · Datos últimos 4 meses</div>
            <div class="rnr-foot-r">Confidencial · Solo para uso personal</div>
        </div>
        </div>`;

        contenedorTemporal.innerHTML = html;

        // Inyectar en el documento ANTES de procesar las gráficas para evitar cálculos en 0x0
        console.log('[RN PDF] Inyectando contenedor temporal al DOM de forma segura...');
        if (!document.body.contains(telonContenedor)) {
            document.body.appendChild(telonContenedor);
        }

        // ── RENDERIZAR GRÁFICAS ───────────────────────────────────
        console.log('[RN PDF] Renderizando ' + graficas.length + ' gráficas...');
        for (const g of graficas) {
            const canvas = contenedorTemporal.querySelector('#' + g.id);
            if (!canvas) continue;
            
            const ctx = canvas.getContext('2d');
            const grad = ctx.createLinearGradient(0, 0, 0, 160);
            grad.addColorStop(0, 'rgba(230,0,0,0.12)');
            grad.addColorStop(1, 'rgba(230,0,0,0.00)');
            
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: g.labels,
                    datasets: [{
                        data: g.data,
                        borderColor: '#e60000',
                        backgroundColor: grad,
                        borderWidth: 2.5,
                        pointBackgroundColor: '#e60000',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        tension: 0.2,
                        fill: true
                    }]
                },
                options: {
                    responsive: false, animation: false,
                    plugins: { legend: { display: false }, tooltip: { enabled: false } },
                    scales: {
                        y: { beginAtZero: false, grid: { color: '#f2f2f2' }, ticks: { font: { size: 9 }, color: '#bbb', callback: v => v + ' kg' }, border: { display: false } },
                        x: { grid: { display: false }, ticks: { font: { size: 9, weight: '600' }, color: '#999' }, border: { display: false } }
                    }
                }
            });
        }
        console.log('[RN PDF] Gráficas listas.');

        // ── COMPILACIÓN DEL PDF VIA HTML2PDF ───────────────────────
        console.log('[RN PDF] Invocando compilación con html2pdf.js...');
        await new Promise(resolve => setTimeout(resolve, 1000)); // Breve respiro para sincronizar renderizado

        const opcionesConfig = {
            margin:      [4, 4, 4, 4],
            filename:    'Reporte_RN_Fitness_' + new Date().toISOString().slice(0, 10) + '.pdf',
            image:       { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
                scale: 2, 
                useCORS: true, 
                backgroundColor: '#ffffff',
                scrollY: 0, 
                scrollX: 0, 
                logging: false 
            },
            jsPDF:       { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // Ejecución limpia del guardado
        await html2pdf().set(opcionesConfig).from(contenedorTemporal).save();
        console.log('[RN PDF] ¡Proceso completado! Archivo descargado exitosamente.');

    } catch (error) {
        console.error('[RN PDF] Error crítico durante la ejecución:', error);
        alert("Ocurrió un inconveniente al generar el reporte: " + error.message);
    } finally {
        limpiar();
    }
}
}
// --- LÓGICA DE AUTENTICACIÓN POR CORREO ---
  const auth = firebase.auth();

  // Monitorea si el usuario inicia o cierra sesión
  auth.onAuthStateChanged((user) => {
      const seccionAuthText = document.getElementById("auth-status-text");
      const divForm = document.getElementById("auth-form-inputs");
      const divUserInfo = document.getElementById("user-info");
      const spanName = document.getElementById("user-name");

      if (user) {
          // Usuario conectado
          if (seccionAuthText) seccionAuthText.innerText = "¡Sesión activa! Tu rutina se guardará en la nube.";
          if (divForm) divForm.style.display = "none";
          if (divUserInfo) {
              divUserInfo.style.display = "flex";
              // Mostramos la primera parte de su correo como su nombre
              spanName.innerText = user.email.split('@')[0];
          }

          // Descargar rutina al iniciar sesión
          cargarRutinaDesdeNube(user.uid);
      } else {
          // Usuario desconectado
          if (seccionAuthText) seccionAuthText.innerText = "Inicia sesión o regístrate para guardar tu rutina:";
          if (divForm) divForm.style.display = "flex";
          if (divUserInfo) divUserInfo.style.display = "none";
      }
  });

  // Registro de nuevo usuario
  function registrarUsuario() {
      const email = document.getElementById("auth-email").value.trim();
      const password = document.getElementById("auth-password").value;

      if (!email || !password) {
          alert("Por favor, introduce tu correo electrónico y tu contraseña.");
          return;
      }

      auth.createUserWithEmailAndPassword(email, password)
          .then((userCredential) => {
              alert("¡Cuenta creada con éxito! Bienvenido/a.");
          })
          .catch((error) => {
              console.error("Error al registrar:", error);
              alert(traducirErrorFirebase(error.code));
          });
  }

  // Inicio de sesión para cuentas existentes
  function iniciarSesion() {
      const email = document.getElementById("auth-email").value.trim();
      const password = document.getElementById("auth-password").value;

      if (!email || !password) {
          alert("Por favor, introduce tu correo electrónico y tu contraseña.");
          return;
      }

      auth.signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
              alert("¡Has iniciado sesión correctamente!");
          })
          .catch((error) => {
              console.error("Error al iniciar sesión:", error);
              alert(traducirErrorFirebase(error.code));
          });
  }

  // Cerrar Sesión
  function cerrarSesion() {
      auth.signOut();
  }

  // Traductor de mensajes de error de Firebase
  function traducirErrorFirebase(codigo) {
      switch (codigo) {
          case 'auth/email-already-in-use':
              return 'Este correo electrónico ya está registrado por otro usuario.';
          case 'auth/invalid-email':
              return 'El correo electrónico ingresado no tiene un formato válido.';
          case 'auth/weak-password':
              return 'La contraseña es muy débil. Debe tener al menos 6 caracteres.';
          case 'auth/user-not-found':
              return 'No encontramos ninguna cuenta asociada a este correo.';
          case 'auth/wrong-password':
              return 'La contraseña es incorrecta. Inténtalo de nuevo.';
          default:
              return 'Ocurrió un error inesperado al conectar con el servidor.';
      }
  }
  // --- FIN LÓGICA DE AUTENTICACIÓN POR CORREO ---
  // Inicializamos "El Almacén de Fuego" 🔥 (Firestore)
  // (Línea borrada porque 'db' ya existe al principio de tu archivo)

  // Función para GUARDAR la rutina en la nube
  function guardarRutinaEnNube(datosRutina) {
      const user = auth.currentUser;
      if (user) {
          // Guardamos los datos en la colección "usuarios", usando el ID único del usuario
          db.collection("usuarios").doc(user.uid).set({
              rutina: datosRutina,
              email: user.email
          }, { merge: true }) // merge: true actualiza sin borrar otros datos que pueda tener
          .then(() => {
              console.log("¡Rutina guardada con éxito en la nube!");
          })
          .catch((error) => {
              console.error("Error al guardar en la nube:", error);
          });
      }
  }

  // Función para DESCARGAR la rutina de la nube
  function cargarRutinaDesdeNube(uid) {
      db.collection("usuarios").doc(uid).get()
          .then((doc) => {
              if (doc.exists && doc.data().rutina) {
                  const miRutina = doc.data().rutina;
                  console.log("¡Rutina descargada!", miRutina);
                  
                  // >>> CARGAR LA RUTINA EN EL NAVEGADOR O CELULAR <<<
                  localStorage.setItem('rn_perfil_usuario', JSON.stringify(miRutina));
                  localStorage.setItem('rn_onboarding_completado', 'true');
                  
                  // Descargar también rutinas personalizadas e historial
                  if (doc.data().rutinasPersonalizadas) {
                      rutinasCreadasPorUsuario = doc.data().rutinasPersonalizadas;
                      localStorage.setItem('rn_rutinas_custom', JSON.stringify(rutinasCreadasPorUsuario));
                  }
                  if (doc.data().historial) {
                      historialMarcas = doc.data().historial;
                      localStorage.setItem('rn_historial_marcas', JSON.stringify(historialMarcas));
                  }

                  construirRutinasBase();
                  
                  // Cambiar la pantalla automáticamente sin tener que reiniciar
                  if (typeof inicializarIconosFijosCanvas === "function") inicializarIconosFijosCanvas();
                  if (typeof renderizarListaPersonalizada === "function") renderizarListaPersonalizada();
                  if (typeof dibujarAvatarPerfil === "function") dibujarAvatarPerfil();
                  if (typeof cambiarSeccion === "function") cambiarSeccion('home');
              } else {
                  console.log("El usuario no tiene rutinas guardadas aún.");
              }
          })
          .catch((error) => {
              console.error("Error al descargar la rutina:", error);
          });
  }
