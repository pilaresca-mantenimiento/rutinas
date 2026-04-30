const apiUrl = 'https://script.google.com/macros/s/AKfycbzS-2rOqZBEgl9R_V__ot-EuUIaL_099s0eVpSL8p90cm_VQ6xrG71TzSaO0hGVYSaQOg/exec';

// ── INICIALIZACIÓN DE MODO OSCURO ──
const savedTheme = localStorage.getItem('pmp_theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('pmp_theme', newTheme);
  const icon = document.getElementById('themeIcon');
  if (icon) icon.textContent = newTheme === 'dark' ? 'light_mode' : 'dark_mode';
  if (typeof renderDashboardCharts === 'function') renderDashboardCharts(); // re-render charts for colors
}

const EMAILS_RUTINAS = [
  'diego.sanchez@pilaresca.com.ar', 'dariogamba.pilaresca@gmail.com', 'francopaez.pilaresca@gmail.com',
  'raul.ledesma@pilaresca.com.ar', 'hugoescobar.pilaresca@gmail.com', 'hectoralegre.pilaresca@gmail.com',
  'rutinas.pilaresca@gmail.com', 'alejandro.ontivero@pilaresca.com.ar', 'tecnicos.pilaresca@gmail.com'
];

const LINEAS = {
  "Línea 1": [{ nombre: "Amasadora", checks: ["El equipo no funciona correctamente", "Se perciben movimientos, roces y/o ruidos extraños", "El equipo precisa lubricación", "El motor físicamente se encuentra sucio", "Las botoneras/ pulsadores/ selectoras no funcionan correctamente", "El caudalímetro presenta alguna pérdida", "Las cañerías de materia harina/azúcar presentan pérdidas", "El FRL precisa purgarse, tiene pérdidas y/o precisa cambio de filtro o manómetro", "Los carros se encuentran con filos/rebarbas peligrosos para el usuario", "El reductor de la amasadora no posee aceite y/o presenta pérdidas", "El tablero no se encuentra cerrado", "Se perciben ruidos extraños del tablero", "Otros"] }, { nombre: "Cortadora", checks: ["El equipo no funciona correctamente", "Se perciben movimientos, roces y/o ruidos extraños", "El motor se encuentra físicamente sucio", "No se encuentran todas sus protecciones colocadas", "La lona no se encuentra en buen estado", "La cortadora de alambre precisa lubricación", "Las correas del motor no se encuentran en buen estado", "La polea y bujes presentan huelgo y/o desgaste", "El tablero no se encuentra cerrado", "Se perciben ruidos extraños del tablero", "Las botoneras/ pulsadores/ selectoras funcionan correctamente", "Otros"] }, { nombre: "Dulcera", checks: ["El equipo no está funcionando correctamente", "El equipo presenta pérdidas", "Las mangueras se encuentran en buen estado", "El pistón está funcionando correctamente", "El buje que acopla el pistón con la válvula de inyectado está en buen estado", "Otros"] }, { nombre: "Cubo de dulce", checks: ["El mezclador no está funcionando", "El motor del mezclador presenta algún ruido extraño y/o huelgo", "El reductor del mezclador no posee aceite y/o presenta pérdidas", "La cadena precisa lubricación y/o posee desgaste", "El reductor se encuentra con pérdidas de aceite", "La bomba de transporte tiene pérdidas", "La cañería de transporte presenta alguna pérdida", "Otros"] }, { nombre: "Cinta intermedia de entrada", checks: ["La cinta intermedia se encuentra en mal estado", "Los bujes están obstruidos y/o se encuentran en mal estado", "Los rodillos están obstruidos y/o precisan limpieza", "Se precisan lubricar bujes y/o cadenas", "Faltan protecciones", "El motor presenta algún ruido extraño y/o huelgo", "Otros"] }, { nombre: "Horno", checks: ["Las alarmas de desplazamiento no funcionan correctamente", "El FRL precisa ser purgado, tiene pérdidas y/o requiere cambio de filtro o manómetro", "Las botoneras/pulsadores no funcionan correctamente", "No funciona el cepillo interno", "No funciona el cepillo externo", "Los rodillos grandes no tienen rapador", "Micarta en mal estado", "Otros"] }, { nombre: "Cinta intermedia de salida", checks: ["La cinta intermedia se encuentra en mal estado", "Los bujes están obstruidos y/o presentan huelgo", "Los rodillos están obstruidos y/o precisan limpieza", "Se precisan lubricar bujes y/o cadenas", "Faltan protecciones", "Otros"] }, { nombre: "Cinta de enfriado", checks: ["Varillas faltantes y/o en mal estado", "Malla en mal estado", "El equipo precisa lubricación", "La puntera del eje de cinta necesita ser revisada", "Funcionan los ventiladores", "Ventiladores sueltos y/o con falta de protección", "Otros"] }, { nombre: "Cinta de elevación", checks: ["Algunos laterales se encuentran rotos y/o sueltos", "El soporte del motor se encuentra en mal estado", "El motorreductor presenta perdidas de aceite y/ o falta de aceite", "Otros"] }, { nombre: "Cinta colectora de entrada a masipack", checks: ["Cinta en mal estado", "Piñones en mal estado", "El equipo precisa lubricación", "Rodamientos en mal estado", "El motorreductor presenta pérdidas de aceite y/o falta de aceite", "Otros"] }, { nombre: "Masipack", checks: ["El sellado vertical no está funcionando", "El sellado horizontal no está funcionando", "Hay vibradores lineales que no están funcionando", "Hay balanzas que no están funcionando", "El vibrador central no está funcionando", "Hay tolvas que no están abriendo y cerrando correctamente", "El panel de HMI no funciona correctamente", "Las seguridades de puertas no están funcionando", "Las mordazas necesitan lubricación", "Los tableros eléctricos no se encuentran cerrados", "El fechador no está funcionando", "Las temperaturas de las mordazas no pueden visualizarse en la pantalla", "No funcionan correctamente los pulsadores de marcha/parada", "No funciona correctamente la parada de emergencia", "Hay pérdidas de aire y/o aceite en el equipo", "Se escucha algún ruido extraño en la máquina y/o tableros", "El FRL necesita ser purgado y/o necesita cambio de filtro/manómetro", "Pérdidas de aceite en reductores", "Otros"] }, { nombre: "Detector de metales", checks: ["El equipo no funciona correctamente", "El indicador luminoso no está funcionando", "Ruidos anormales", "No está activado en el HMI el detector de metales y/o detectores de metales: parar marcha", "Otros"] }, { nombre: "Cerradora de cajas", checks: ["Cuchillas en mal estado", "Falta protección de cuchillas", "Bandas en mal estado", "Cama de rodillos con apoyo y/o patas faltantes", "Resortes en mal estado", "El fechador de cajas no funciona correctamente", "La parada de emergencia no funciona", "Ruidos anormales", "Otros"] }],
  "Línea 2": [{ nombre: "Amasadora", checks: ["Se perciben movimientos, roces y/o ruidos extraños", "El equipo precisa lubricación", "El motor físicamente se encuentra sucio", "Las botoneras/ pulsadores/ selectoras no funcionan correctamente", "El caudalímetro presenta alguna pérdida", "Las cañerías de materia harina/azúcar presentan pérdidas", "El FRL precisa purgarse, tiene pérdidas y/o precisa cambio de filtro o manómetro", "Los carros se encuentran con filos/rebarbas peligrosos para el usuario", "El reductor de la amasadora no posee aceite y/o presenta pérdidas", "El tablero no se encuentra cerrado", "Se perciben ruidos extraños del tablero", "Otros"] }, { nombre: "Rotativa", checks: ["Las protecciones no están colocadas", "Lona en mal estado", "Bujes están en mal estado", "El equipo precisa lubricación", "Las botoneras/ pulsadores/ selectoras funcionan correctamente", "Poleas en mal estado, con huelgo o desperfectos", "Cadenas/Correas en mal estado o con falta de lubricación", "Otros"] }, { nombre: "Cortadora", checks: ["Se perciben movimientos, roces y/o ruidos extraños", "El motor se encuentra físicamente sucio", "No se encuentran todas sus protecciones colocadas", "La lona no se encuentra en buen estado", "La cortadora de alambre precisa lubricación", "Las correas del motor no se encuentran en buen estado", "La polea presenta huelgo y/o desgaste", "El tablero no se encuentra cerrado", "Se perciben ruidos extraños del tablero", "Las botoneras/ pulsadores/ selectoras funcionan correctamente", "Otros"] }, { nombre: "Azucarador", checks: ["La sujeción del motovibrador está en mal estado", "Tacos de goma en mal estado", "Chapas de vibración en mal estado", "Bandeja recuperadora de azúcar en mal estado", "Otros"] }, { nombre: "Cinta intermedia de entrada", checks: ["La cinta intermedia se encuentra en mal estado", "Los bujes están obstruidos y/o se encuentran en mal estado", "Los rodillos están obstruidos y/o precisan limpieza", "Se precisan lubricar bujes y/o cadenas", "Faltan protecciones", "El motor presenta algún ruido extraño y/o huelgo", "Otros"] }, { nombre: "Horno", checks: ["Las alarmas de desplazamiento no funcionan correctamente", "El FRL precisa ser purgado, tiene pérdidas y/o requiere cambio de filtro o manómetro", "Las botoneras/pulsadores no funcionan correctamente", "No funciona el cepillo interno", "No funciona el cepillo externo", "Los rodillos grandes no tienen rapador", "El extractor de aire requiere revisión", "Micarta en mal estado", "Otros"] }, { nombre: "Cinta intermedia de salida", checks: ["La cinta intermedia se encuentra en mal estado", "Los bujes están obstruidos y/o presentan huelgo", "Los rodillos están obstruidos y/o precisan limpieza", "Se precisan lubricar bujes y/o cadenas", "Faltan protecciones", "Otros"] }, { nombre: "Cinta de enfriado", checks: ["Varillas faltantes y/o en mal estado", "Malla en mal estado", "El equipo precisa lubricación", "La puntera del eje de cinta necesita ser revisada", "Funcionan los ventiladores", "Ventiladores sueltos y/o con falta de protección", "Otros"] }, { nombre: "Cinta de elevación", checks: ["Algunos laterales se encuentran rotos y/o sueltos", "El soporte del motor se encuentra en mal estado", "El motorreductor presenta perdidas de aceite y/ o falta de aceite", "Otros"] }, { nombre: "Cinta colectora de entrada a masipack", checks: ["Cinta en mal estado", "Eje en mal estado", "El equipo precisa lubricación", "Rodamientos en mal estado", "El motorreductor presenta pérdidas de aceite y/o falta de aceite", "Otros"] }, { nombre: "Masipack", checks: ["El sellado vertical no está funcionando", "El sellado horizontal no está funcionando", "Hay vibradores lineales que no están funcionando", "Hay balanzas que no están funcionando", "El vibrador central no está funcionando", "Hay tolvas que no están abriendo y cerrando correctamente", "El panel de HMI no funciona correctamente", "Las seguridades de puertas no están funcionando", "Las mordazas necesitan lubricación", "Los tableros eléctricos no se encuentran cerrados", "El fechador no está funcionando", "Las temperaturas de las mordazas no pueden visualizarse en la pantalla", "No funcionan correctamente los pulsadores de marcha/parada", "No funciona correctamente la parada de emergencia", "Hay pérdidas de aire y/o aceite en el equipo", "Se escucha algún ruido extraño en la máquina y/o tableros", "El FRL necesita ser purgado y/o necesita cambio de filtro/manómetro", "Otros"] }, { nombre: "Detector de metales", checks: ["No funciona correctamente el paro de emergencia", "No funciona correctamente la botonera", "No funciona correctamente la pantalla", "Cinta en mal estado", "Ruidos anormales", "Otros"] }, { nombre: "Cerradora de cajas", checks: ["Cuchillas en mal estado", "Falta protección de cuchillas", "Bandas en mal estado", "Cama de rodillos con apoyo y/o patas faltantes", "Resortes en mal estado", "El fechador de cajas no funciona correctamente", "La parada de emergencia no funciona", "Ruidos anormales", "Otros"] }],
  "Línea 3": [{ nombre: "Amasadora", checks: ["Se denotan movimientos, roces y/o ruidos extraños", "El equipo precisa lubricación", "El motor físicamente se encuentra sucio", "Las botoneras/ pulsadores/ selectoras no funcionan correctamente", "El caudalímetro presenta alguna pérdida", "Las cañerías de materia harina/azúcar presentan pérdidas", "El FRL precisa purgarse, tiene pérdidas y/o precisa cambio de filtro o manómetro", "Los carros se encuentran con filos/rebarbas peligrosos para el usuario", "El reductor de la amasadora no posee aceite y/o presenta pérdidas", "El tablero no se encuentra cerrado", "Se perciben ruidos extraños del tablero", "Otros"] }, { nombre: "Rotativa", checks: ["Las protecciones no están colocadas", "Lona en mal estado", "Bujes están en mal estado", "El equipo precisa lubricación", "Las botoneras/ pulsadores/ selectoras funcionan correctamente", "Poleas en mal estado, con huelgo o desperfectos", "Cadenas/Correas en mal estado o con falta de lubricación", "Otros"] }, { nombre: "Cortadora", checks: ["Se perciben movimientos, roces y/o ruidos extraños", "El motor se encuentra físicamente sucio", "No se encuentran todas sus protecciones colocadas", "La lona no se encuentra en buen estado", "La cortadora de alambre precisa lubricación", "Las correas del motor no se encuentran en buen estado", "La polea presenta huelgo y/o desgaste", "El tablero no se encuentra cerrado", "Se perciben ruidos extraños del tablero", "Las botoneras/ pulsadores/ selectoras funcionan correctamente", "Otros"] }, { nombre: "Cinta intermedia de entrada", checks: ["La cinta intermedia se encuentra en mal estado", "Los bujes están obstruidos y/o se encuentran en mal estado", "Los rodillos están obstruidos y/o precisan limpieza", "Se precisan lubricar bujes y/o cadenas", "Faltan protecciones", "El motor presenta algún ruido extraño y/o huelgo", "Otros"] }, { nombre: "Horno", checks: ["Las alarmas de desplazamiento no funcionan correctamente", "El FRL precisa ser purgado, tiene pérdidas y/o requiere cambio de filtro o manómetro", "Las botoneras/pulsadores no funcionan correctamente", "No funciona el cepillo interno", "No funciona el cepillo externo", "Los rodillos grandes no tienen rapador", "El extractor de aire requiere revisión", "Micarta en mal estado", "Otros"] }, { nombre: "Cinta de enfriado 1", checks: ["Varillas faltantes y/o en mal estado", "Malla en mal estado", "El equipo precisa lubricación", "La puntera del eje de cinta necesita ser revisada", "Funcionan los ventiladores", "Ventiladores sueltos y/o con falta de protección", "Otros"] }, { nombre: "Stacker", checks: ["Cinta en mal estado", "Huelgo en poleas/ejes", "Reductores con pérdidas de aceite", "Guías sueltas y/o dañadas", "Ruidos anormales", "Otros"] }, { nombre: "Cinta de enfriado 2", checks: ["Varillas faltantes y/o en mal estado", "Malla en mal estado", "El equipo precisa lubricación", "La puntera del eje de cinta necesita ser revisada", "Otros"] }, { nombre: "Alipack", checks: ["No funcionan correctamente las seguridades", "No funciona correctamente el paro de emergencia", "No funciona correctamente la pantalla táctil", "El fechador no funciona correctamente", "No funciona correctamente el sellado", "Cinta de salida en mal estado", "Porta bobina flojo y/o funcionando mal", "Ruidos anormales", "Pérdidas de aire", "Las temperaturas de los motores exceden los 90°C", "Otros"] }, { nombre: "Fripack Backup", checks: ["La pantalla no está funcionando correctamente", "Porta bobina flojo y/o funcionando mal", "No están sellando los discos", "No está cortando la mordaza", "No está sellando la mordaza", "No funciona correctamente el paro de emergencia", "No funcionan las botoneras", "Las temperaturas de los motores exceden los 90°C", "Otros"] }, { nombre: "Detector de metales", checks: ["No funciona correctamente el paro de emergencia", "No funciona correctamente la botonera", "No funciona correctamente la pantalla", "Cinta en mal estado", "Ruidos anormales", "Otros"] }, { nombre: "Cerradora de cajas", checks: ["Cuchillas en mal estado", "Falta protección de cuchillas", "Bandas en mal estado", "Cama de rodillos con apoyo y/o patas faltantes", "Resortes en mal estado", "El fechador de cajas no funciona correctamente", "La parada de emergencia no funciona", "Ruidos anormales", "Otros"] }],
  "Línea 4": [{ nombre: "Batidora Tonelli", checks: ["Faltan protecciones", "Pérdidas de materia prima", "Pérdidas de masa", "Pérdidas de aceite", "El equipo presenta ruidos extraños", "Mangueras y/o abrazaderas en mal estado", "No funcionan las botoneras", "Cables desordenados, sueltos o en mal estado", "Correas en mal estado", "Piñones/Ejes con huelgo o desgaste", "Las temperaturas de los motores exceden los 90°C", "Otros"] }, { nombre: "Batidora Geomixer", checks: ["Faltan protecciones", "Pérdidas de masa", "Pérdidas de aceite", "El equipo presenta ruidos extraños", "No funcionan las botoneras", "Cables desordenados, sueltos o en mal estado", "Correas en mal estado", "Piñones/Ejes con huelgo o desgaste", "Las temperaturas de los motores exceden los 90°C", "Otros"] }, { nombre: "Capsuladora", checks: ["El equipo presenta ruidos extraños", "No se encuentran en buen estado los componentes de seguridad", "Pérdidas de aire", "Pérdidas de vacío", "Ventosas en mal estado", "Pérdidas de aceite", "Falta de protecciones", "Cables desordenados, sueltos o en mal estado", "No funcionan las botoneras", "Otros"] }, { nombre: "Cadenas transportadoras", checks: ["Piñones con huelgo o en mal estado", "Cadenas en mal estado", "Guías rotas, con desgaste o faltantes", "Ruedas guías trabadas o rotas", "Motores con alta temperatura y/o ruidos extraños", "Reductores con pérdidas de aceite y/o ruidos extraños", "Huelgo en ejes", "Las temperaturas de los motores exceden los 90°C", "Otros"] }, { nombre: "Dosificadora", checks: ["Pérdidas de masa", "Pérdidas de aire", "No se encuentran en buen estado los componentes de seguridad", "Protecciones faltantes", "Mangueras de aire en mal estado", "Movimiento extraño en la dosificadora", "No funcionan correctamente los sensores", "Otros"] }, { nombre: "Azucarador", checks: ["Lona en mal estado", "Tensor neumático en mal estado", "Protecciones faltantes", "Otros"] }, { nombre: "Bombas dosificadoras", checks: ["Protecciones faltantes", "Pérdidas de masa en bomba de vainilla", "Pérdidas de aceite", "Pérdidas de masa en bomba de chocolate", "Ruidos extraños", "Pérdidas en cañería de transporte de masa", "Manguera de vainilla en mal estado", "Manguera de chocolate en mal estado", "Tableros abiertos", "No funcionan las botoneras", "Cables sueltos y/o desordenados", "Las temperaturas de los motores exceden los 90°C", "Otros"] }, { nombre: "Horno", checks: ["No está funcionando correctamente el empujador de bandejas", "Taparelas rotas, faltantes o sueltas", "La cadena de tracción necesita lubricación o limpieza", "No funciona correctamente uno o más quemadores", "No funciona correctamente uno o más forzadores", "Ruidos extraños o anormales", "Controladores de llama sueltos o dañados", "No funcionan las botoneras", "Pantalla táctil en mal estado", "Pérdidas de aire", "Pérdidas de aceite", "No funciona alguno de los coolers de los motores laterales", "Las temperaturas de los motores exceden los 100°C", "Otros"] }, { nombre: "Buffer", checks: ["Sensores/Espejos en mal estado", "No se encuentran en buen estado los componentes de seguridad", "Guías en mal estado", "Mangueras de aire en mal estado", "Pérdidas de aire", "Pérdidas de aceite", "Las temperaturas de los motores exceden los 90°C", "Otros"] }, { nombre: "Inyectadora", checks: ["Pérdidas de dulce", "Pérdidas de aire", "No se encuentran en buen estado los componentes de seguridad", "Protecciones faltantes", "Mangueras de aire en mal estado", "Movimiento extraño en la inyectadora", "No funciona la calefacción de la tolva", "No funciona el agitador de dulce", "Guías y frenos de APM en mal estado", "No funcionan las botoneras", "Pantalla táctil en mal estado", "Otros"] }, { nombre: "Cubo de dulce", checks: ["No funciona correctamente el mezclador", "No funciona correctamente el pistón de prensa", "Pérdidas de dulce en cañería de transporte", "Pérdidas de dulce en bomba dosificadora", "No funcionan las botoneras", "Pérdidas de aire", "Pérdidas de aceite", "Las temperaturas de los motores exceden los 90°C", "Otros"] }, { nombre: "Desmoldeadora", checks: ["Varillas en mal estado", "Pérdidas de aceite", "No se encuentran en buen estado los componentes de seguridad", "El equipo precisa lubricación", "No funcionan correctamente los sensores", "Mangueras en mal estado", "Cadenas y cintas en mal estado", "Piñones con huelgo o desgaste", "Ruidos extraños o anormales", "Otros"] }, { nombre: "Cinta de enfriado", checks: ["Lona en mal estado", "Estructura floja o con tornillos faltantes", "Huelgo en ejes", "Ruidos extraños o anormales", "Pérdidas de aire", "Pérdidas de aceite", "Las temperaturas de los motores exceden los 90°C", "Mangueras en mal estado", "Otros"] }, { nombre: "Alineador, estaciones y cintas transportadoras", checks: ["Lonas en mal estado", "Estructura floja o con tornillos faltantes", "Huelgo en ejes", "Ruidos extraños o anormales", "Pérdidas de aire", "Pérdidas de aceite", "Piñones en mal estado y/o con huelgo", "Cadenas en mal estado", "No funcionan correctamente los sensores", "Cables sueltos o desordenados", "Las temperaturas de los motores exceden los 90°C", "Mangueras en mal estado", "Otros"] }, { nombre: "Fripack 1", checks: ["Cintas de transporte en mal estado", "Cinta de eslabones en mal estado", "Bandas verdes en mal estado", "Pérdidas de aceite", "Pérdidas de aire", "Punteras dañadas, trabadas o faltantes", "Guías rotas o faltantes", "Protecciones faltantes", "Cadena de índices en mal estado", "Tablero de cintas y/o tablero principal abiertos", "Ruidos extraños o anormales", "No funciona correctamente el porta bobina", "No funciona correctamente el auto-empalme", "No funcionan correctamente las botoneras", "No funcionan correctamente las resistencias de mordazas", "No funcionan correctamente las resistencias de los discos", "Las termocuplas no funcionan correctamente", "Colectores sucios", "Carbones sucios y/o gastados", "No funciona correctamente el HMI", "Las temperaturas de los motores exceden los 90°C", "No funcionan los coolers de enfriado de motores", "Mangueras en mal estado", "Otros"] }, { nombre: "Fripack 2", checks: ["Cintas de transporte en mal estado", "Cinta de eslabones en mal estado", "Bandas verdes en mal estado", "Pérdidas de aceite", "Pérdidas de aire", "Punteras dañadas, trabadas o faltantes", "Guías rotas o faltantes", "Protecciones faltantes", "Cadena de índices en mal estado", "Tablero de cintas y/o tablero principal abiertos", "Ruidos extraños o anormales", "No funciona correctamente el porta bobina", "No funciona correctamente el auto-empalme", "No funcionan correctamente las botoneras", "No funcionan correctamente las resistencias de mordazas", "No funcionan correctamente las resistencias de los discos", "Las termocuplas no funcionan correctamente", "Colectores sucios", "Carbones sucios y/o gastados", "No funciona correctamente el HMI", "Las temperaturas de los motores exceden los 90°C", "No funcionan los coolers de enfriado de motores", "Mangueras en mal estado", "Otros"] }, { nombre: "Alipack", checks: ["Cadena de índices en mal estado", "Cadena de aéreo en mal estado", "Pérdidas de aceite", "Pérdidas de aire", "Piñones con huelgo y/o desgaste", "Guías rotas o faltantes", "Protecciones faltantes", "Tablero abierto", "Ruidos extraños o anormales", "No funciona correctamente el porta bobina", "No funcionan correctamente las botoneras", "No funciona correctamente el encoder de fechado", "No funcionan correctamente las resistencias de mordazas", "No funcionan correctamente las resistencias de los discos", "Las termocuplas no funcionan correctamente", "Mercotac dañado y/o trabado", "No funciona correctamente el HMI", "Las temperaturas de los motores exceden los 90°C", "No funcionan los coolers del tablero", "Lona de cinta de salida en mal estado", "Mangueras en mal estado", "Otros"] }, { nombre: "Cinta de elevación", checks: ["Algunos laterales se encuentran rotos y/o sueltos", "El soporte del motor se encuentra en mal estado", "El motorreductor presenta perdidas de aceite y/ o falta de aceite", "Otros"] }, { nombre: "Masipack", checks: ["No funcionan correctamente las seguridades", "No funciona correctamente la pantalla táctil", "Faltan protecciones", "Cintas de entrada en mal estado", "El fechador no funciona correctamente", "No funciona correctamente el sellado vertical", "No funciona correctamente el sellado horizontal", "No funcionan todos los vibradores lineales", "No funcionan todas las balanzas", "El vibrador central no está funcionando", "No están funcionando todas las tolvas", "Las temperaturas de las mordazas no pueden visualizarse en la pantalla", "Cinta de salida en mal estado", "Desenrollador de bobina flojo y/o funcionando mal", "Ruidos anormales", "Pérdidas de aire", "Pérdidas de aceite", "Las temperaturas de los motores exceden los 90°C", "Mangueras en mal estado", "Otros"] }, { nombre: "Detector de metales", checks: ["No funciona correctamente la botonera", "No funciona correctamente la pantalla", "Cinta en mal estado", "Ruidos anormales", "Otros"] }, { nombre: "Cerradora de cajas", checks: ["Cuchillas en mal estado", "Falta protección de cuchillas", "Bandas en mal estado", "Cama de rodillos con apoyo y/o patas faltantes", "Resortes en mal estado", "El fechador de cajas no funciona correctamente", "La parada de emergencia no funciona", "Ruidos anormales", "Otros"] }],
  "Línea 5": [{ nombre: "Amasadora San Cassiano", checks: ["Protecciones faltantes", "Las botoneras no funcionan correctamente", "Los rodamientos de las ruedas no giran correctamente/se traban", "Ruidos anormales", "La sujeción de los batidores está en mal estado/le faltan bulones", "La válvula de dosificación de materia prima está trabada/rota/en mal estado", "Las mangueras se encuentran resecas", "El tablero eléctrico se encuentra abierto", "Acrílico roto/faltante/en mal estado", "HMI roto/en mal estado", "Ruedas de goma en mal estado", "Eje con huelgo", "Pérdidas de aceite", "Patas de anclaje en mal estado", "Otros"] }, { nombre: "Ollas de San Cassiano", checks: ["Olla 1 con ruedas en mal estado", "Olla 2 con ruedas en mal estado", "Olla 1 despintada, posible riesgo de contaminación", "Olla 2 despintada, posible riesgo de contaminación", "Otros"] }, { nombre: "Amasadora Previa", checks: ["Protecciones faltantes", "Las botoneras no funcionan correctamente", "Los rodamientos de las ruedas no giran correctamente/se traban", "Ruidos anormales", "La sujeción de los batidores está en mal estado/le faltan bulones", "La válvula de dosificación de materia prima está trabada/rota/en mal estado", "Las mangueras se encuentran resecas", "El tablero eléctrico se encuentra abierto", "Eje con huelgo", "Pérdidas de aceite", "Patas de anclaje en mal estado", "Ruedas de grillón en mal estado", "Otros"] }, { nombre: "Divisora Indupan", checks: ["Las seguridades no funcionan correctamente", "El equipo precisa lubricación", "Lona en mal estado", "Ruedas en mal estado", "Rodamientos trabados/en mal estado", "Ruidos anormales en equipo", "Eje con huelgo", "Rodillo de tracción de cinta en mal estado", "Protecciones faltantes", "Otros"] }, { nombre: "Divisora Cónica", checks: ["Las seguridades no funcionan correctamente", "El equipo precisa lubricación", "Lona en mal estado", "Ruedas en mal estado", "Rodamientos trabados/en mal estado", "Ruidos anormales en equipo", "Eje con huelgo", "Rodillo de tracción de cinta en mal estado", "Protecciones faltantes", "Otros"] }, { nombre: "Rebolladora Cónica", checks: ["Las seguridades no funcionan correctamente", "El harinador no se encuentra en buen estado", "El piñón presenta desgaste", "El equipo precisa lubricación", "Guías en mal estado", "Ruedas en mal estado", "Otros"] }, { nombre: "Rebolladora Plana", checks: ["Las seguridades no funcionan correctamente", "El harinador no se encuentra en buen estado", "El piñón presenta desgaste", "El equipo precisa lubricación", "Guías en mal estado", "Ruedas en mal estado", "Lona en mal estado", "Eje con desgaste", "Rodamiento trabado/en mal estado", "Faltante de protecciones", "Cadena en mal estado/destensada", "Otros"] }, { nombre: "Cámara de fermentación", checks: ["Luces quemadas", "Guías de carros en mal estado", "Manijas de puertas en mal estado", "Tableros eléctricos abiertos", "Las botoneras/manetas no funcionan correctamente", "Turbinas mal estado", "Mangueras de turbinas se encuentran sueltas", "Control de temperatura no funciona correctamente", "Control de humedad no funciona correctamente", "Otros"] }, { nombre: "Hornos (1-7)", checks: ["Manija de puerta en mal estado", "La posición de la flecha al detener el horno no es la correcta", "La elevación o rotación de carros no funciona correctamente", "Ruidos anormales en motores, reductores o rodamientos", "Manómetro de quemador roto/en mal estado", "El timbre no funciona correctamente", "Correa y/o polea con desgaste o huelgo", "Las botoneras no funcionan correctamente", "El quemador no posee la protección", "El vidrio se encuentra en mal estado", "El tablero eléctrico se encuentra abierto", "No abre/cierra correctamente la clapeta", "La rampa de entrada no se encuentra en buen estado", "Pérdidas de aceite", "Otros"] }, { nombre: "Zona de enfriado", checks: ["Aspas sueltas/en mal estado", "Tablero eléctrico abierto", "Las botoneras/selectoras no funcionan correctamente", "No están funcionando todos los motores", "Otros"] }, { nombre: "Tanque de alcohol", checks: ["Mangueras en mal estado", "Manómetro roto/en mal estado", "El sensor no funciona correctamente", "La alarma sonora no está funcionando correctamente", "Otros"] }, { nombre: "Fripack", checks: ["Cintas transportadoras en mal estado", "Pérdidas de aceite", "Pérdidas de aire", "Porta bobinas no funciona correctamente", "Freno de bobina en mal estado", "Rodillos trabados o frenados", "Cadena de índices en mal estado", "Los tableros eléctricos no se encuentran cerrados", "Punteras dañadas, trabadas o faltantes", "No funciona correctamente el HMI", "No funcionan correctamente las resistencias de mordazas", "No funcionan correctamente las resistencias de los discos", "Las termocuplas no funcionan correctamente", "No funcionan correctamente las botoneras", "Acrílicos rotos o en mal estado", "Cuchilla rota o con faltante de guías/resortes", "Las temperaturas de los motores exceden los 90°C", "No funcionan los coolers de enfriado de motores", "Otros"] }, { nombre: "Detector de Metales", checks: ["No funciona correctamente la botonera", "No funciona correctamente la pantalla", "Cinta en mal estado", "Ruidos anormales", "Otros"] }, { nombre: "Cerradora de cajas", checks: ["Cuchillas en mal estado", "Falta protección de cuchillas", "Bandas en mal estado", "Cama de rodillos con apoyo y/o patas faltantes", "Resortes en mal estado", "El fechador de cajas no funciona correctamente", "La parada de emergencia no funciona", "Ruidos anormales", "Otros"] }],
  "Línea 6": [{ nombre: "Geiger", checks: ["No funciona la seguridad de la tapa", "No funciona el paro de emergencia", "Faltan protecciones", "No funcionan las botoneras", "Faltan piezas en la máquina", "Ruido anormal", "Cuchillas en mal estado", "Las temperaturas de los motores exceden los 90°C", "Otros"] }, { nombre: "Mix 1", checks: ["No funciona la seguridad de la tapa", "No funciona el paro de emergencia", "Faltan protecciones", "Pérdida de crema", "Pérdida de agua", "Mangueras y/o abrazaderas de encamisado en mal estado", "No funcionan las botoneras", "Faltan piezas de la máquina", "Ruido anormal", "Cuchillas en mal estado", "Cables desordenados, sueltos o en mal estado", "Las temperaturas de los motores exceden los 90°C", "Otros"] }, { nombre: "KWL", checks: ["No funciona el paro de emergencia", "Faltan protecciones", "No funcionan las botoneras", "Conexiones desajustadas y/o sueltas", "Otros"] }, { nombre: "Chancha 1", checks: ["No funciona la seguridad de la tapa", "No funciona el paro de emergencia", "Faltan protecciones", "Conexiones de agua de recirculación en mal estado", "Pérdida de crema", "Pérdida de agua", "Mangueras y/o abrazaderas de encamisado en mal estado", "No funcionan las botoneras", "Faltan piezas de la máquina", "Ruido anormal", "Cables desordenados, sueltos o en mal estado", "Las temperaturas de los motores exceden los 90°C", "Otros"] }, { nombre: "Mix 2", checks: ["No funciona la seguridad de la tapa", "No funciona el paro de emergencia", "Faltan protecciones", "Pérdida de crema", "Pérdida de agua", "Mangueras y/o abrazaderas de encamisado en mal estado", "No funcionan las botoneras", "Faltan piezas de la máquina", "Ruido anormal", "Cuchillas en mal estado", "Cables desordenados, sueltos o en mal estado", "Las temperaturas de los motores exceden los 90°C", "Otros"] }, { nombre: "Chancha 2", checks: ["No funciona la seguridad de la tapa", "No funciona el paro de emergencia", "Faltan protecciones", "Conexiones de agua de recirculación en mal estado", "Pérdida de crema", "Pérdida de agua", "Mangueras y/o abrazaderas de encamisado en mal estado", "No funcionan las botoneras", "Faltan piezas de la máquina", "Ruido anormal", "Cables desordenados, sueltos o en mal estado", "Las temperaturas de los motores exceden los 90°C", "Otros"] }, { nombre: "Amasado", checks: ["No funciona la batidora", "No funciona la bomba de transporte", "No funciona el paro de emergencia", "Faltan protecciones", "No funcionan las botoneras", "No funciona o tiene pérdidas el caudalímetro", "Pérdida de masa por empaquetadura", "Ruido anormal", "Las temperaturas de los motores exceden los 90°C", "Otros"] }, { nombre: "Horno", checks: ["Se encuentran puertas abiertas", "Faltan protecciones", "No funciona el paro de emergencia", "No funcionan las botoneras", "Cadena de barredores en mal estado", "Clapetas en mal estado", "No funciona correctamente la pantalla táctil", "No funciona correctamente la bomba de dosificado", "Cadena de sincronismo en mal estado", "No funcionan correctamente los sopladores", "Abre/Cierra planchas en mal estado", "Faltan correas y/o están en mal estado (salida del horno)", "No funcionan correctamente los sensores de temperatura", "No funcionan correctamente los sensores de posición de placas", "Extracción de aire no está funcionando y/o presenta ruidos anormales", "Las temperaturas de los motores exceden los 90°C", "Faltan barredores", "El patín de la cadena de barredores se encuentra con desgaste", "Otros"] }, { nombre: "Torre de enfriado", checks: ["Faltan correas y/o están en mal estado", "No funcionan correctamente las correas centradoras", "Guías desajustadas o rotas", "Varillas en mal estado", "No funcionan correctamente los sensores", "Las temperaturas de los motores exceden los 90°C", "Otros"] }, { nombre: "Dosificadora de crema/encremadora", checks: ["No funciona correctamente la seguridad", "No funciona correctamente el paro de emergencia", "No funciona correctamente la pantalla táctil", "No funcionan correctamente los sensores", "Faltan protecciones", "No funciona correctamente el primer encremado", "No funciona correctamente el segundo encremado", "Faltan correas o están en mal estado (en caso afirmativo especificar en dónde)", "Falta y/o está roto el acrílico del espiral", "Las temperaturas de los motores exceden los 90°C", "Otros"] }, { nombre: "Varpe", checks: ["Están funcionando correctamente los motores", "Faltan o están gastadas las bandas", "Las temperaturas de los motores exceden los 90°C", "Otros"] }, { nombre: "Heladera", checks: ["Las puertas están abiertas", "No funciona correctamente el paro de emergencia", "No funcionan correctamente los sensores", "Faltan correas", "Ganchos doblados", "Cableado desordenado", "Otros"] }, { nombre: "Cortadora", checks: ["No funciona correctamente la seguridad", "No funciona correctamente el paro de emergencia", "No funciona correctamente la pantalla táctil", "Bandas en mal estado", "No funciona correctamente el apilador", "No funciona correctamente el segundo corte", "No funcionan correctamente los sensores", "No funcionan correctamente las botoneras", "Cinta de salida en mal estado", "No funciona correctamente el empujador aéreo", "Cinta de empujador aéreo en mal estado", "Cinta curva en mal estado", "Faltan tensores en la cinta curva", "Las temperaturas de los motores exceden los 90°C", "Otros"] }, { nombre: "Focus", checks: ["No funcionan correctamente las seguridades", "No funciona correctamente el paro de emergencia", "No funciona correctamente la pantalla táctil", "Faltan protecciones", "Cintas de entrada en mal estado", "Las temperaturas de las mordazas pueden visualizarse en la pantalla", "Empujador de índices en mal estado y/o con faltantes", "El fechador no funciona correctamente", "No funciona correctamente el sellado", "Cinta de salida en mal estado", "Porta bobina flojo y/o funcionando mal", "Ruidos anormales", "Pérdidas de aire", "Las temperaturas de los motores exceden los 90°C", "Otros"] }, { nombre: "Cinta de elevación", checks: ["Algunos laterales se encuentran rotos y/o sueltos", "El soporte del motor se encuentra en mal estado", "El motorreductor presenta perdidas de aceite y/ o falta de aceite", "Otros"] }, { nombre: "Masipack", checks: ["No funcionan correctamente las seguridades", "No funciona correctamente la pantalla táctil", "Faltan protecciones", "Cintas de entrada en mal estado", "El fechador no funciona correctamente", "No funciona correctamente el sellado vertical", "No funciona correctamente el sellado horizontal", "No funcionan todos los vibradores lineales", "No funcionan todas las balanzas", "El vibrador central no está funcionando", "No están funcionando todas las tolvas", "Las temperaturas de las mordazas no pueden visualizarse en la pantalla", "Cinta de salida en mal estado", "Desenrollador de bobina flojo y/o funcionando mal", "Ruidos anormales", "Pérdidas de aire", "Pérdidas de aceite", "Las temperaturas de los motores exceden los 90°C", "Otros"] }, { nombre: "Detector de metales", checks: ["No funciona correctamente la botonera", "No funciona correctamente la pantalla", "Cinta en mal estado", "Ruidos anormales", "Otros"] }, { nombre: "Fripack Fourpack", checks: ["El equipo no está funcionando correctamente", "La pantalla no está funcionando correctamente", "Porta bobina flojo y/o funcionando mal", "No están sellando los discos", "No está cortando la mordaza", "No está sellando la mordaza", "No funciona correctamente el paro de emergencia", "No funcionan las botoneras", "Las temperaturas de los motores exceden los 90°C", "Otros"] }, { nombre: "Cerradora de cajas", checks: ["Cuchillas en mal estado", "Falta protección de cuchillas", "Bandas en mal estado", "Cama de rodillos con apoyo y/o patas faltantes", "Resortes en mal estado", "El fechador de cajas no funciona correctamente", "La parada de emergencia no funciona", "Ruidos anormales", "Otros"] }],
  "Línea 7": [{ nombre: "Geiger", checks: ["No funciona la seguridad de la tapa", "No funciona el paro de emergencia", "Faltan protecciones", "No funcionan las botoneras", "Faltan piezas en la máquina", "Ruido anormal", "Cuchillas en mal estado", "Las temperaturas de los motores exceden los 90°C", "Otros"] }, { nombre: "Mix 1", checks: ["No funciona la seguridad de la tapa", "No funciona el paro de emergencia", "Faltan protecciones", "Pérdida de crema", "Pérdida de agua", "Mangueras y/o abrazaderas de encamisado en mal estado", "No funcionan las botoneras", "Faltan piezas de la máquina", "Ruido anormal", "Cuchillas en mal estado", "Cables desordenados, sueltos o en mal estado", "La temperatura del motor excede los 90°C", "Otros"] }, { nombre: "KWL", checks: ["No funciona el paro de emergencia", "Faltan protecciones", "No funcionan las botoneras", "Conexiones desajustadas y/o sueltas", "Otros"] }, { nombre: "Chancha 1", checks: ["No funciona la seguridad de la tapa", "No funciona el paro de emergencia", "Faltan protecciones", "Conexiones de agua de recirculación en mal estado", "Pérdida de crema", "Pérdida de agua", "Mangueras y/o abrazaderas de encamisado en mal estado", "No funcionan las botoneras", "Faltan piezas de la máquina", "Ruido anormal", "Cables desordenados, sueltos o en mal estado", "La temperatura del motor excede los 90°C", "Otros"] }, { nombre: "Amasado", checks: ["No funciona la batidora", "No funciona la bomba de transporte", "No funciona el paro de emergencia", "Faltan protecciones", "No funcionan las botoneras", "No funciona o tiene pérdidas el caudalímetro", "Pérdida de masa por empaquetadura", "Ruido anormal", "La temperatura del motor excede los 90°C", "Otros"] }, { nombre: "Horno", checks: ["Se encuentran puertas abiertas", "Faltan protecciones", "No funciona el paro de emergencia", "No funcionan las botoneras", "Cadena de barredores en mal estado", "Clapetas en mal estado", "No funciona correctamente la pantalla táctil", "No funciona correctamente la bomba de dosificado", "Cadena de sincronismo en mal estado", "No funcionan correctamente los sopladores", "Abre/Cierra planchas en mal estado", "Faltan correas y/o están en mal estado (salida del horno)", "No funcionan correctamente los sensores de temperatura", "No funcionan correctamente los sensores de posición de placas", "Extracción de aire no está funcionando y/o presenta ruidos anormales", "La temperatura del motor excede los 90°C", "Faltan barredores", "El patín de la cadena de barredores se encuentra con desgaste", "Otros"] }, { nombre: "Torre de enfriado", checks: ["Faltan correas y/o están en mal estado", "No funcionan correctamente las correas centradoras", "Guías desajustadas o rotas", "Varillas en mal estado", "No funcionan correctamente los sensores", "Las temperaturas de los motores exceden los 90°C", "Otros"] }, { nombre: "Dosificado de crema/encremadora", checks: ["No funciona correctamente la seguridad", "No funciona correctamente el paro de emergencia", "No funciona correctamente la pantalla táctil", "No funcionan correctamente los sensores", "Faltan protecciones", "No funciona correctamente la encremadora", "Faltan correas o están en mal estado (en caso afirmativo especificar en dónde)", "Falta y/o está roto el acrílico del espiral", "Las temperaturas de los motores exceden los 90°C", "Otros"] }, { nombre: "Heladera", checks: ["Se encuentran puertas abiertas", "No funciona correctamente el paro de emergencia", "No funcionan correctamente los sensores", "Faltan o están en mal estado las correas", "Ganchos doblados o rotos", "Cableado desordenado y/o en mal estado", "Otros"] }, { nombre: "Cortadora", checks: ["No funciona correctamente la seguridad", "No funciona correctamente el paro de emergencia", "No funciona correctamente la pantalla táctil", "Bandas en mal estado", "No funciona correctamente el apilador", "No funciona correctamente el segundo corte", "No funcionan correctamente los sensores", "No funcionan correctamente las botoneras", "Cinta de salida en mal estado", "No funciona correctamente el empujador aéreo", "Cinta de empujador aéreo en mal estado", "Cinta curva en mal estado", "Faltan tensores en la cinta curva", "Las temperaturas de los motores exceden los 90°C", "Otros"] }, { nombre: "Focus", checks: ["No funcionan correctamente las seguridades", "No funciona correctamente el paro de emergencia", "No funciona correctamente la pantalla táctil", "Faltan protecciones", "Cintas de entrada en mal estado", "Empujador de índices en mal estado y/o con faltantes", "El fechador no funciona correctamente", "No funciona correctamente el sellado", "Cinta de salida en mal estado", "Porta bobina flojo y/o funcionando mal", "Ruidos anormales", "Pérdidas de aire", "Las temperaturas de los motores exceden los 90°C", "Otros"] }, { nombre: "Fripack Fourpack", checks: ["El equipo no está funcionando correctamente", "La pantalla no está funcionando correctamente", "Porta bobina flojo y/o funcionando mal", "No están sellando los discos", "No está cortando la mordaza", "No está sellando la mordaza", "No funciona correctamente el paro de emergencia", "No funcionan las botoneras", "Las temperaturas de los motores exceden los 90°C", "Otros"] }, { nombre: "Detector de metales", checks: ["No funciona correctamente el paro de emergencia", "No funciona correctamente la botonera", "No funciona correctamente la pantalla", "Cinta en mal estado", "Ruidos anormales", "Otros"] }, { nombre: "Cerradora de cajas", checks: ["Cuchillas en mal estado", "Falta protección de cuchillas", "Bandas en mal estado", "Cama de rodillos con apoyo y/o patas faltantes", "Resortes en mal estado", "El fechador de cajas no funciona correctamente", "La parada de emergencia no funciona", "Ruidos anormales", "Otros"] }],
  "Silos y Plastificadores": [{ nombre: "Silo de huevo 1", checks: ["El equipo no está funcionando correctamente", "El condensador se encuentra sucio", "Temperatura", "Otros"] }, { nombre: "Silo de huevo 2", checks: ["El equipo no está funcionando correctamente", "El condensador se encuentra sucio", "Temperatura", "Otros"] }, { nombre: "Silo de harina repicky 1", checks: ["Correas en mal estado", "Filtros en mal estado o tapados", "Bajo nivel de aceite", "Presión de salida", "Otros"] }, { nombre: "Silo de harina repicky 2", checks: ["Correas en mal estado", "Filtros en mal estado o tapados", "Bajo nivel de aceite", "Presión de salida", "Otros"] }, { nombre: "Silo de harina y azucar 1", checks: ["No está funcionando la rosca 1 de harina", "No está funcionando la rosca 2 de harina", "No está funcionando correctamente la rosca 1 de azúcar", "No está funcionando correctamente la rosca 2 de azúcar", "Rodamientos en mal estado", "Cadenas de tracción en mal estado", "No están funcionando correctamente el motoreductores", "No está funcionando correctamente la saranda", "No está funcionando correctamente la esclusa", "Se encuentran pérdidas de materia prima", "Se encuentran pérdidas de aceite", "Otros"] }, { nombre: "Silo de harina y azucar 2", checks: ["No está funcionando la rosca 3 de harina", "No está funcionando la rosca 4 de harina", "No está funcionando correctamente la rosca 3 de azúcar", "No está funcionando correctamente la rosca 4 de azúcar", "Rodamientos en mal estado", "Cadenas de tracción en mal estado", "No están funcionando correctamente el motoreductores", "No está funcionando correctamente la saranda", "No está funcionando correctamente la esclusa", "Se encuentran pérdidas de materia prima", "Se encuentran pérdidas de aceite", "Otros"] }, { nombre: "Silo de harina línea 5", checks: ["No está funcionando la rosca 5", "No está funcionando la rosca 6", "Rodamientos en mal estado", "Cadenas de tracción en mal estado", "No está funcionando correctamente el motoreductor", "No está funcionando correctamente la saranda", "No está funcionando correctamente la esclusa", "Se encuentran pérdidas de materia prima", "Se encuentran pérdidas de aceite", "Otros"] }, { nombre: "Plastificador 1", checks: ["El sistema no está funcionando correctamente", "Agitador detenido", "No está plastificando correctamente", "Control de temperatura", "Otros"] }, { nombre: "Plastificador 2", checks: ["El sistema no está funcionando correctamente", "Agitador detenido", "No está plastificando correctamente", "Control de temperatura", "Otros"] }, { nombre: "Plastificador 3", checks: ["El sistema no está funcionando correctamente", "Agitador detenido", "No está plastificando correctamente", "Control de temperatura", "Otros"] }, { nombre: "Plastificador 4", checks: ["El sistema no está funcionando correctamente", "Agitador detenido", "No está plastificando correctamente", "Control de temperatura", "Otros"] }]
};

// ─────────────────────────────────────────────────────────────────────
//  DIRECTORIO DE USUARIOS (nombre, PIN, rol, email futuro)
//  Rol: 'tecnico' | 'supervisor' | 'panol'
// ─────────────────────────────────────────────────────────────────────
const USUARIOS = [
  { nombre: 'Alexis Monsalvo', pin: '1234', rol: 'tecnico', email: '' },
  { nombre: 'Jose Garcia', pin: '1234', rol: 'tecnico', email: '' },
  { nombre: 'Juan Escobar', pin: '1234', rol: 'tecnico', email: '' },
  { nombre: 'Dante Vera', pin: '1234', rol: 'tecnico', email: '' },
  { nombre: 'Tomas Lopez', pin: '1234', rol: 'tecnico', email: '' },
  { nombre: 'Ruben Friedrich', pin: '1234', rol: 'tecnico', email: '' },
  { nombre: 'Miguel Bianchi', pin: '1234', rol: 'tecnico', email: '' },
  { nombre: 'Raul Ledesma', pin: '1234', rol: 'tecnico', email: '' },
  { nombre: 'Diego Sanchez', pin: '1234', rol: 'tecnico', email: '' },
  { nombre: 'Alejandro Ontivero', pin: '1234', rol: 'tecnico', email: '' },
  { nombre: 'Hector Alegre', pin: '1234', rol: 'admin', email: 'hectoralegre.pilaresca@gmail.com' },
  { nombre: 'Hugo Escobar', pin: '1234', rol: 'supervisor', email: 'hugoescobar.pilaresca@gmail.com' },
  { nombre: 'Franco Paez', pin: '1234', rol: 'supervisor', email: 'francopaez.pilaresca@gmail.com' },
  { nombre: 'Dario Gamba', pin: '1234', rol: 'supervisor', email: 'dariogamba.pilaresca@gmail.com' },
];

const TECNICOS = USUARIOS.filter(u => u.rol === 'tecnico' || u.rol === 'admin').map(u => u.nombre);
const SUPERVISORES = USUARIOS.filter(u => u.rol === 'supervisor').map(u => u.nombre);

Object.values(LINEAS).forEach(linea => {
  linea.forEach(eq => {
    if (eq.checks) eq.checks = [...new Set(eq.checks)];
  });
});

let currentTab = 'rutinas';
let _dashboardRefreshInterval = null;  // auto-refresh dashboard
let _correctivosRefreshInterval = null; // auto-refresh correctivos al estar en esa tab
const DASHBOARD_REFRESH_MS = 3 * 60 * 1000;   // 3 minutos
const CORRECTIVOS_REFRESH_MS = 2 * 60 * 1000; // 2 minutos
let app = {
  linea: localStorage.getItem('linea') || 'Línea 1',
  tecnico: localStorage.getItem('tecnico') || '',
  supervisor: localStorage.getItem('supervisor') || '',
  producto: localStorage.getItem('producto') || '',
  userEmail: localStorage.getItem('userEmail') || '',
  userName: localStorage.getItem('userName') || '',
  abiertos: JSON.parse(localStorage.getItem('abiertos') || '{}')
};
let paniolData = [];  // [['M0001MAS', 'CADENA AC07404672...'], ...]
app.datos = JSON.parse(localStorage.getItem('datos_' + app.linea) || '{}');

const SESSION_TIMEOUT_MS = 8 * 60 * 60 * 1000; // 8 horas = 1 turno

function checkLogin() {
  // El dashboard (supervisores) es publico -- no requiere login
  if (currentTab === 'supervisores') {
    document.getElementById('loginModal').style.display = 'none';
    _updateUserMenuHeader();
    return true;
  }
  // Verificar timeout de sesion
  if (app.userEmail) {
    const sessionTs = parseInt(localStorage.getItem('session_ts') || '0');
    if (sessionTs && (Date.now() - sessionTs) > SESSION_TIMEOUT_MS) {
      // Sesion expirada: logout silencioso
      console.log('Sesion expirada -- cerrando automaticamente.');
      app.userEmail = ''; app.userName = '';
      app.tecnico = ''; app.supervisor = '';
      // Detener auto-refresh intervals
  clearInterval(_dashboardRefreshInterval); _dashboardRefreshInterval = null;
  clearInterval(_correctivosRefreshInterval); _correctivosRefreshInterval = null;
  ['userEmail', 'userName', 'tecnico', 'supervisor', 'session_ts'].forEach(k => localStorage.removeItem(k));
    }
  }
  if (!app.userEmail) {
    document.getElementById('loginModal').style.display = 'flex';
    setTimeout(_initLoginModal, 50);
    _updateUserMenuHeader();
    return false;
  } else {
    // Renovar timestamp en cada interaccion
    localStorage.setItem('session_ts', String(Date.now()));
    document.getElementById('loginModal').style.display = 'none';
    _updateUserMenuHeader();
    return true;
  }
}

// ── PIN LOGIN SYSTEM ──────────────────────────────────────────────────
let _pinBuffer = '';

function _initLoginModal() {
  const sel = document.getElementById('loginUserSelect');
  if (!sel) return;
  // Limpiar opciones previas (evita usuario predefinido en recarga)
  while (sel.options.length > 1) sel.remove(1);
  sel.value = '';
  _pinBuffer = '';
  _updatePinDots();
  const btn = document.getElementById('loginBtn');
  if (btn) { btn.disabled = true; btn.style.opacity = '0.4'; }
  USUARIOS.forEach(u => {
    const opt = document.createElement('option');
    opt.value = u.nombre;
    opt.textContent = u.nombre + (u.rol === 'supervisor' ? ' ⭐' : u.rol === 'admin' ? ' 🛡️' : '');
    sel.appendChild(opt);
  });
}

function pinLoginActualizarUsuario() {
  _pinBuffer = '';
  _updatePinDots();
  const btn = document.getElementById('loginBtn');
  if (btn) { btn.disabled = true; btn.style.opacity = '0.4'; }
  const errEl = document.getElementById('loginError');
  if (errEl) errEl.textContent = '';
}

function pinLoginKey(k) {
  if (_pinBuffer.length >= 4) return;
  _pinBuffer += k;
  _updatePinDots();
  if (_pinBuffer.length === 4) _tryAutoSubmit();
}

function pinLoginDel() {
  _pinBuffer = _pinBuffer.slice(0, -1);
  _updatePinDots();
  const btn = document.getElementById('loginBtn');
  if (btn) { btn.disabled = true; btn.style.opacity = '0.4'; }
}

function _updatePinDots() {
  const dots = document.querySelectorAll('.pin-dot');
  dots.forEach((d, i) => d.classList.toggle('filled', i < _pinBuffer.length));
}

function _tryAutoSubmit() {
  const btn = document.getElementById('loginBtn');
  if (btn) { btn.disabled = false; btn.style.opacity = '1'; }
  // Auto-submit after brief delay for UX feel
  setTimeout(pinLoginSubmit, 200);
}

async function pinLoginSubmit() {
  const sel = document.getElementById('loginUserSelect');
  const name = sel ? sel.value.trim() : '';
  const errEl = document.getElementById('loginError');

  if (!name) {
    if (errEl) errEl.textContent = 'Seleccioná tu nombre primero.';
    _pinBuffer = ''; _updatePinDots(); return;
  }

  const usuario = USUARIOS.find(u => u.nombre === name);
  if (!usuario) {
    if (errEl) errEl.textContent = 'Usuario no encontrado.';
    _pinBuffer = ''; _updatePinDots(); return;
  }

  const pinOk = await _verifyPin(usuario.nombre, _pinBuffer, usuario.pin);
  if (!pinOk) {
    if (errEl) errEl.textContent = '❌ PIN incorrecto. Intentá de nuevo.';
    _pinBuffer = ''; _updatePinDots();
    const dotsEl = document.getElementById('pinDots');
    if (dotsEl) { dotsEl.style.animation = 'shake 0.4s'; setTimeout(() => dotsEl.style.animation = '', 400); }
    return;
  }

  // ✅ Login exitoso
  const emailEfectivo = usuario.email || (name.toLowerCase().replace(/\s+/g, '.') + '@tecnico.local');
  app.userEmail = emailEfectivo;
  app.userName = name;

  // Asignar tecnico/supervisor según rol
  // admin actúa como tecnico (puede elegir línea) pero NO como supervisor
  if (usuario.rol === 'tecnico' || usuario.rol === 'admin') {
    app.tecnico = name;
    app.supervisor = localStorage.getItem('supervisor') || '';
  } else if (usuario.rol === 'supervisor') {
    app.tecnico = '';
    app.supervisor = name;
  } else {
    // panol u otro
    app.tecnico = '';
    app.supervisor = '';
  }

  localStorage.setItem('userEmail', app.userEmail);
  localStorage.setItem('userName', app.userName);
  localStorage.setItem('tecnico', app.tecnico);
  localStorage.setItem('supervisor', app.supervisor);
  localStorage.setItem('session_ts', String(Date.now())); // para timeout de sesion
  save();

  // Supervisor y admin: acceso al Dashboard
  if (usuario.rol === 'supervisor' || usuario.rol === 'admin') {
    dashState.loggedIn = true;
    dashState.email = emailEfectivo;
    dashState.nombre = name;
  }
  // Pañol, admin y supervisor: acceso al Pañol
  if (usuario.rol === 'panol' || usuario.rol === 'supervisor' || usuario.rol === 'admin') {
    paniolState.loggedIn = true;
    paniolState.email = emailEfectivo;
    paniolState.nombre = name;
  }

  _pinBuffer = '';
  document.getElementById('loginModal').style.display = 'none';
  _updateUserMenuHeader();
  render();
  if (usuario.rol === 'supervisor' || usuario.rol === 'admin') cargarDashboard();
  if (usuario.rol === 'panol' || usuario.rol === 'supervisor' || usuario.rol === 'admin') cargarPedidosPaniol();
}

// Google OAuth (legacy - kept for backwards compat but PIN is primary)
function handleCredentialResponse(response) {
  try {
    const base64Url = response.credential.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    const data = JSON.parse(jsonPayload);
    app.userEmail = data.email;
    app.userName = data.name;
    localStorage.setItem('userEmail', app.userEmail);
    localStorage.setItem('userName', app.userName);
    save();
    if (checkLogin()) { render(); }
  } catch (e) { console.error('OAuth error', e); }
}

function loginManual() { } // deprecated, PIN system replaces this

// ── PIN HELPERS (WebCrypto hash) ──────────────────────────────
const PIN_DEFAULT = '1234';

// ── PIN HELPERS — hash SHA-256 + sync con GAS (global entre dispositivos) ────

async function _hashPin(pin) {
  const encoder = new TextEncoder();
  const data = encoder.encode('pmp_salt_pilares_' + pin);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function _storePin(nombreUsuario, pin) {
  const hash = await _hashPin(pin);
  // Guardar local como cache inmediato
  localStorage.setItem('pinhash_' + nombreUsuario, hash);
  localStorage.removeItem('pin_' + nombreUsuario);
  // Sincronizar con GAS (global, persiste entre dispositivos)
  try {
    await fetch(apiUrl, {
      method: 'POST', mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'payload=' + encodeURIComponent(JSON.stringify({
        tipo: 'updatePin',
        nombre: nombreUsuario,
        hash
      }))
    });
  } catch (e) {
    console.warn('No se pudo sincronizar PIN con GAS, queda solo local:', e);
  }
}

async function _fetchPinHashFromGAS(nombreUsuario) {
  // Trae el hash del GAS para este usuario (cache remoto)
  try {
    const url = `${apiUrl}?action=getPin&nombre=${encodeURIComponent(nombreUsuario)}`;
    const res = await fetch(url);
    const json = await res.json();
    return json.hash || null;
  } catch (e) {
    return null;
  }
}

async function _verifyPin(nombreUsuario, pinIngresado, pinDefault) {
  const inputHash = await _hashPin(pinIngresado);

  // 1. Intentar con hash local (mas rapido, funciona offline)
  const localHash = localStorage.getItem('pinhash_' + nombreUsuario);
  if (localHash) {
    if (inputHash === localHash) return true;
    // Hash local no matchea — puede estar desactualizado, consultar GAS
  }

  // 2. Consultar GAS (hash global, actualizado desde cualquier dispositivo)
  const remoteHash = await _fetchPinHashFromGAS(nombreUsuario);
  if (remoteHash) {
    if (inputHash === remoteHash) {
      // Actualizar cache local con el hash remoto
      localStorage.setItem('pinhash_' + nombreUsuario, remoteHash);
      return true;
    }
    return false;
  }

  // 3. Sin hash en ningun lado: primer uso — verificar contra default
  const pinBase = pinDefault || PIN_DEFAULT;
  if (pinIngresado === pinBase) {
    await _storePin(nombreUsuario, pinIngresado); // migrar a hash
    return true;
  }
  return false;
}

async function _resetPin(nombreUsuario) {
  // Borrar local
  localStorage.removeItem('pinhash_' + nombreUsuario);
  localStorage.removeItem('pin_' + nombreUsuario);
  // Borrar en GAS
  try {
    await fetch(apiUrl, {
      method: 'POST', mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'payload=' + encodeURIComponent(JSON.stringify({
        tipo: 'resetPin',
        nombre: nombreUsuario
      }))
    });
  } catch (e) {
    console.warn('No se pudo resetear PIN en GAS:', e);
  }
}

// ── LOGOUT UNIFICADO ─────────────────────────────────────
function logoutUsuario() {
  app.userEmail = ''; app.userName = '';
  app.tecnico = ''; app.supervisor = '';
  dashState.loggedIn = false; dashState.email = ''; dashState.nombre = '';
  paniolState.loggedIn = false; paniolState.email = ''; paniolState.nombre = '';
  // Limpiar estado de correctivos para evitar datos cruzados entre sesiones
  correctivoState.tecnicoManual = '';
  correctivoState.supervisorManual = '';
  correctivoState.linea = '';
  correctivoState.equipo = '';
  correctivoState.descripcion = '';
  correctivoState.tipoFalla = '';
  correctivoState.subtipoFalla = '';
  correctivoState.otroFalla = '';
  correctivoState.horaAviso = '';
  correctivoState.horaInicio = '';
  correctivoState.horaFin = '';
  correctivoState.ultimoId = null;
  ['userEmail', 'userName', 'tecnico', 'supervisor', 'session_ts'].forEach(k => localStorage.removeItem(k));
  save();
  _updateUserMenuHeader();
  checkLogin();
  render();
}

// ── USER MENU (header engranaje) ───────────────────────────
function _updateUserMenuHeader() {
  const wrap = document.getElementById('userMenuWrap');
  const nameEl = document.getElementById('userMenuName');
  if (!wrap || !nameEl) return;
  if (app.userName) {
    wrap.style.display = 'block';
    nameEl.textContent = app.userName.split(' ')[0]; // first name only in header
  } else {
    wrap.style.display = 'none';
    document.getElementById('userMenuFixed')?.remove();
  }
}

function toggleUserMenu() {
  // Remove any existing dropdown
  let dd = document.getElementById('userMenuFixed');
  if (dd) { dd.remove(); return; }

  // Build items HTML
  const usuarioActual = USUARIOS.find(u => u.nombre === app.userName);
  const isAdmin = usuarioActual?.rol === 'admin';
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const bg = isDark ? '#1e293b' : '#ffffff';
  const txt = isDark ? '#f8fafc' : '#0f172a';
  const sep = isDark ? '#334155' : '#f1f5f9';
  const hov = isDark ? '#334155' : '#f8fafc';

  dd = document.createElement('div');
  dd.id = 'userMenuFixed';
  dd.style.cssText = [
    'position:fixed',
    'z-index:999999',
    `background:${bg}`,
    `color:${txt}`,
    'border-radius:16px',
    `border:1px solid ${sep}`,
    'box-shadow:0 16px 48px rgba(0,0,0,0.22)',
    'min-width:240px',
    'overflow:hidden',
    'animation:menuFadeIn 0.15s ease'
  ].join(';');

  dd.innerHTML = `
      <div style="padding:14px 18px 10px; font-size:11px; font-weight:800; color:#94a3b8; text-transform:uppercase; letter-spacing:1.2px; white-space:nowrap;">${app.userName}</div>
      <div style="height:1px; background:${sep}; margin:0 8px;"></div>
      <button class="umenu-item" onclick="_closeUserMenu(); mostrarCambiarPIN();">
        <span class="material-icons-round" style="font-size:18px; flex-shrink:0;">lock</span>
        <span>Cambiar mi PIN</span>
      </button>
      ${isAdmin ? `
      <button class="umenu-item" onclick="_closeUserMenu(); mostrarAdminReset();">
        <span class="material-icons-round" style="font-size:18px; flex-shrink:0;">admin_panel_settings</span>
        <span>Resetear PIN (Admin)</span>
      </button>` : ''}
      <div style="height:1px; background:${sep}; margin:0 8px;"></div>
      <button class="umenu-item" style="color:#ef4444;" onclick="_closeUserMenu(); logoutUsuario();">
        <span class="material-icons-round" style="font-size:18px; flex-shrink:0; color:#ef4444;">logout</span>
        <span>Cerrar sesión</span>
      </button>`;

  document.body.appendChild(dd);

  // Position: align to right edge of the trigger button
  const btn = document.getElementById('userMenuBtn');
  const rect = btn.getBoundingClientRect();
  const ddW = 240;
  let left = rect.right - ddW;
  let top = rect.bottom + 8;
  if (left < 8) left = 8;
  dd.style.left = left + 'px';
  dd.style.top = top + 'px';

  // Close when clicking outside
  setTimeout(() => {
    document.addEventListener('click', _closeUserMenuOutside, { once: true });
  }, 0);
}

function _closeUserMenuOutside(e) {
  const dd = document.getElementById('userMenuFixed');
  const btn = document.getElementById('userMenuBtn');
  if (dd && btn && !btn.contains(e.target) && !dd.contains(e.target)) {
    dd.remove();
  } else if (dd && btn && btn.contains(e.target)) {
    // clicked trigger again — do nothing, toggleUserMenu already handled
  }
}

function _closeUserMenu() {
  document.getElementById('userMenuFixed')?.remove();
}

// ── CAMBIAR PIN ──────────────────────────────────────────
function mostrarCambiarPIN() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const bg = isDark ? '#1e293b' : 'white';
  const clr = isDark ? '#f8fafc' : '#0f172a';
  const bdr = isDark ? '#334155' : '#e2e8f0';

  const overlay = document.createElement('div');
  overlay.id = 'pinChangeOverlay';
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;';
  overlay.innerHTML = `
      <div style="background:${bg};color:${clr};border-radius:20px;padding:32px 28px;width:90%;max-width:340px;box-shadow:0 24px 48px rgba(0,0,0,0.3);">
        <div style="font-weight:800;font-size:18px;margin-bottom:6px;">Cambiar mi PIN</div>
        <div style="font-size:12px;color:#94a3b8;margin-bottom:20px;">Ingresá tu PIN actual y elegí uno nuevo de 4 dígitos.</div>
        <label style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;display:block;">PIN Actual</label>
        <input type="password" id="pinActualInput" maxlength="4" inputmode="numeric" placeholder="1234"
          style="width:100%;padding:12px;border-radius:10px;border:1.5px solid ${bdr};background:${isDark ? '#0f172a' : bg};color:${clr};font-size:18px;letter-spacing:4px;text-align:center;box-sizing:border-box;margin-bottom:12px;">
        <label style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;display:block;">Nuevo PIN</label>
        <input type="password" id="pinNuevoInput" maxlength="4" inputmode="numeric" placeholder="••••"
          style="width:100%;padding:12px;border-radius:10px;border:1.5px solid ${bdr};background:${isDark ? '#0f172a' : bg};color:${clr};font-size:18px;letter-spacing:4px;text-align:center;box-sizing:border-box;margin-bottom:12px;">
        <label style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;display:block;">Confirmar Nuevo PIN</label>
        <input type="password" id="pinConfirmarInput" maxlength="4" inputmode="numeric" placeholder="••••"
          style="width:100%;padding:12px;border-radius:10px;border:1.5px solid ${bdr};background:${isDark ? '#0f172a' : bg};color:${clr};font-size:18px;letter-spacing:4px;text-align:center;box-sizing:border-box;margin-bottom:20px;">
        <p id="pinChangeError" style="color:#ef4444;font-size:12px;min-height:16px;margin-bottom:10px;"></p>
        <div style="display:flex;gap:10px;">
          <button onclick="document.getElementById('pinChangeOverlay').remove()" style="flex:1;padding:12px;border-radius:10px;border:1.5px solid ${bdr};background:transparent;color:${clr};font-weight:700;cursor:pointer;">Cancelar</button>
          <button onclick="confirmarCambiarPIN()" style="flex:2;padding:12px;border-radius:10px;border:none;background:#10b981;color:white;font-weight:800;cursor:pointer;">Guardar PIN</button>
        </div>
      </div>`;
  document.body.appendChild(overlay);
}

async function confirmarCambiarPIN() {
  const actual = document.getElementById('pinActualInput')?.value.trim();
  const nuevo = document.getElementById('pinNuevoInput')?.value.trim();
  const confirmar = document.getElementById('pinConfirmarInput')?.value.trim();
  const errEl = document.getElementById('pinChangeError');
  const usuario = USUARIOS.find(u => u.nombre === app.userName);

  if (!usuario) { if (errEl) errEl.textContent = 'Error: usuario no encontrado.'; return; }
  const pinOk = await _verifyPin(usuario.nombre, actual, usuario.pin);
  if (!pinOk) { if (errEl) errEl.textContent = '\u274c PIN actual incorrecto.'; return; }
  if (nuevo.length !== 4 || !/^\d+$/.test(nuevo)) { if (errEl) errEl.textContent = 'El nuevo PIN debe tener 4 dígitos.'; return; }
  if (nuevo !== confirmar) { if (errEl) errEl.textContent = 'Los PINs nuevos no coinciden.'; return; }

  await _storePin(usuario.nombre, nuevo);
  document.getElementById('pinChangeOverlay')?.remove();
  mostrarToast('\u2714\ufe0f PIN actualizado correctamente.', 'success');
}

// ── RESET PIN (solo Hector Alegre) ─────────────────────
function mostrarAdminReset() {
  const usuarioActual = USUARIOS.find(u => u.nombre === app.userName);
  if (usuarioActual?.rol !== 'admin') return;
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const bg = isDark ? '#1e293b' : 'white'; const clr = isDark ? '#f8fafc' : '#0f172a'; const bdr = isDark ? '#334155' : '#e2e8f0';
  const overlay = document.createElement('div');
  overlay.id = 'adminResetOverlay';
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;';
  const opts = USUARIOS.filter(u => u.rol === 'tecnico').map(u => `<option value="${u.nombre}">${u.nombre}</option>`).join('');
  overlay.innerHTML = `
      <div style="background:${bg};color:${clr};border-radius:20px;padding:32px 28px;width:90%;max-width:340px;box-shadow:0 24px 48px rgba(0,0,0,0.3);">
        <div style="font-weight:800;font-size:18px;margin-bottom:4px;">\ud83d\udd12 Admin: Resetear PIN</div>
        <div style="font-size:12px;color:#94a3b8;margin-bottom:20px;">El PIN del técnico volverá a <strong>1234</strong>.</div>
        <select id="adminResetSelect" style="width:100%;padding:12px;border-radius:10px;border:1.5px solid ${bdr};background:${isDark ? '#0f172a' : bg};color:${clr};font-size:14px;margin-bottom:20px;">
          <option value="">Seleccioná el técnico...</option>${opts}
        </select>
        <div style="display:flex;gap:10px;">
          <button onclick="document.getElementById('adminResetOverlay').remove()" style="flex:1;padding:12px;border-radius:10px;border:1.5px solid ${bdr};background:transparent;color:${clr};font-weight:700;cursor:pointer;">Cancelar</button>
          <button onclick="confirmarAdminReset()" style="flex:2;padding:12px;border-radius:10px;border:none;background:#ef4444;color:white;font-weight:800;cursor:pointer;">Resetear PIN</button>
        </div>
      </div>`;
  document.body.appendChild(overlay);
}

async function confirmarAdminReset() {
  const sel = document.getElementById('adminResetSelect');
  const nombre = sel?.value;
  if (!nombre) { mostrarToast('Seleccioná un técnico.', 'warning'); return; }
  mostrarToast('Reseteando PIN...', 'info');
  await _resetPin(nombre);
  document.getElementById('adminResetOverlay')?.remove();
  mostrarToast(`\u2714\ufe0f PIN de ${nombre} reseteado a 1234.`, 'success');
}

function save() {
  localStorage.setItem('linea', app.linea);
  localStorage.setItem('tecnico', app.tecnico);
  localStorage.setItem('supervisor', app.supervisor);
  localStorage.setItem('producto', app.producto);
  localStorage.setItem('datos_' + app.linea, JSON.stringify(app.datos));
  localStorage.setItem('repuestos_' + app.linea, JSON.stringify(app.repuestos || {}));
  localStorage.setItem('abiertos', JSON.stringify(app.abiertos));
}

function cambiarLinea(val) {
  save();
  app.linea = val;
  app.datos = JSON.parse(localStorage.getItem('datos_' + app.linea) || '{}');
  app.repuestos = JSON.parse(localStorage.getItem('repuestos_' + app.linea) || '{}');
  app.abiertos = {};
  save();
  render();
}

function switchTab(tab) {
  currentTab = tab;
  ['rutinas', 'tickets', 'inspeccion', 'paniol', 'correctivos', 'supervisores'].forEach(t => {
    document.getElementById('tab-' + t)?.classList.remove('active');
  });
  document.getElementById('tab-' + tab)?.classList.add('active');

  // Detener todos los intervals al cambiar de tab
  clearInterval(_dashboardRefreshInterval); _dashboardRefreshInterval = null;
  clearInterval(_correctivosRefreshInterval); _correctivosRefreshInterval = null;

  render();

  // Arrancar interval segun tab destino
  if (tab === 'supervisores' && app.userEmail) {
    _dashboardRefreshInterval = setInterval(() => {
      if (currentTab === 'supervisores') cargarDashboard();
    }, DASHBOARD_REFRESH_MS);
  }
  if (tab === 'correctivos' && app.userEmail) {
    _correctivosRefreshInterval = setInterval(() => {
      if (currentTab === 'correctivos') cargarCorrectivosLista(getSemanaISO());
    }, CORRECTIVOS_REFRESH_MS);
  }
}

function updateBtnGuardar() {
  const btn = document.getElementById('btnGuardar');
  if (!btn) return;
  const u = USUARIOS.find(u => u.nombre === app.userName);
  const rolU = u?.rol || '';
  const tecOk = !!(app.tecnico || (['tecnico', 'admin'].includes(rolU) ? app.userName : ''));
  const supOk = !!(app.supervisor || (rolU === 'supervisor' ? app.userName : ''));
  btn.disabled = !tecOk || !supOk;
}

function vibratePhone() {
  if (navigator.vibrate) navigator.vibrate(10);
}

function toggleCheck(ei, ci) {
  if (!app.datos[ei]) app.datos[ei] = {};
  if (!app.datos[ei][ci]) app.datos[ei][ci] = { m: false, c: '' };
  app.datos[ei][ci].m = !app.datos[ei][ci].m;

  // Al desmarcar: limpiar todo y eliminar la clave para no contaminar el badge
  if (!app.datos[ei][ci].m) {
    delete app.datos[ei][ci]; // eliminar clave completamente
    // Limpiar textarea en DOM
    const checkEl = document.querySelector(`[data-checkpoint="${ei}-${ci}"]`);
    if (checkEl) {
      const ta = checkEl.querySelector('textarea');
      if (ta) ta.value = '';
    }
    // Limpiar repuestos
    if (app.repuestos?.[ei]) {
      delete app.repuestos[ei][ci];
      localStorage.setItem('repuestos_' + app.linea, JSON.stringify(app.repuestos));
    }
    renderBadges(ei, ci);
  }

  vibratePhone();
  save();
  updateCheckpointDOM(ei, ci);
  actualizarBadgeEquipo(ei);
}

function updateComment(ei, ci, value) {
  if (!app.datos[ei]) app.datos[ei] = {};
  if (!app.datos[ei][ci]) app.datos[ei][ci] = { m: false, c: '' };
  app.datos[ei][ci].c = value;
  save();
}

function actualizarBadgeEquipo(ei) {
  const eq = (LINEAS[app.linea] || [])[ei];
  if (!eq) return;
  const badgeEl = document.querySelector(`[data-equipo="${ei}"] .equipo-progress-badge`);
  if (!badgeEl) return;
  const datosEquipo = app.datos[ei] || {};
  const totalChecks = eq.checks.length;
  const marcados = Object.values(datosEquipo).filter(d => d.m === true).length;
  const inspeccionados = Object.values(datosEquipo).filter(d => d.m === true || d.c).length;

  badgeEl.className = 'equipo-progress-badge' +
    (marcados > 0 ? ' tiene-fallas' : inspeccionados === totalChecks ? ' completo' : '');
  badgeEl.textContent = marcados > 0
    ? `⚠ ${marcados} falla${marcados > 1 ? 's' : ''}`
    : inspeccionados > 0 ? `✓ ${inspeccionados}/${totalChecks}` : `${totalChecks}`;

  // Actualizar badge del tab Rutinas
  const totalFallas = Object.values(app.datos).reduce((sum, eq) =>
    sum + Object.values(eq).filter(d => d.m).length, 0);
  const labelEl = document.querySelector('#tab-rutinas .tab-label');
  if (labelEl) labelEl.textContent = totalFallas > 0 ? `Rutinas (${totalFallas})` : 'Rutinas';
}

function updateCheckpointDOM(ei, ci) {
  const checkEl = document.querySelector(`[data-checkpoint="${ei}-${ci}"]`);
  if (!checkEl) return;
  const d = app.datos?.[ei]?.[ci];
  if (d && d.m) checkEl.classList.add('marcado');
  else checkEl.classList.remove('marcado');
}

function toggleEquipoDOM(ei) {
  const equipoEl = document.querySelector(`[data-equipo="${ei}"]`);
  if (!equipoEl) return;
  if (app.abiertos[ei]) equipoEl.classList.add('abierto');
  else equipoEl.classList.remove('abierto');
}

async function cargarPaniol() {
  // Intentar desde localStorage primero (cache de 24hs)
  const cached = localStorage.getItem('paniol_cache');
  const cachedTs = parseInt(localStorage.getItem('paniol_cache_ts') || '0');
  const ahora = Date.now();
  const UN_DIA = 24 * 60 * 60 * 1000;

  if (cached && (ahora - cachedTs) < UN_DIA) {
    try {
      paniolData = JSON.parse(cached);
      console.log(`Pañol desde cache: ${paniolData.length} ítems`);
      return;
    } catch (e) { /* ignorar, recargar */ }
  }

  // Cargar desde GitHub Pages
  try {
    const url = window.location.origin + window.location.pathname.replace(/[^/]*$/, '') + 'paniol_data.json';
    const res = await fetch(url);
    if (!res.ok) throw new Error('no ok');
    paniolData = await res.json();
    localStorage.setItem('paniol_cache', JSON.stringify(paniolData));
    localStorage.setItem('paniol_cache_ts', String(Date.now()));
    console.log(`Pañol cargado: ${paniolData.length} ítems`);
  } catch (e) {
    console.warn('No se pudo cargar pañol_data.json:', e.message);
    paniolData = [];
  }

  // Inicializar Fuse.js para búsqueda difusa con sinónimos locales
  if (typeof Fuse !== 'undefined' && paniolData.length) {
    const formattedData = paniolData.map(item => ({ codigo: item[0], desc: item[1], item: item }));
    // Diccionario de sinónimos argentinos comunes en taller
    const synonyms = {
      'ruleman': 'rodamiento',
      'bolillero': 'rodamiento',
      'oring': 'o-ring',
      'o\'ring': 'o-ring',
      'reten': 'sello',
      'precinto': 'sujetacables'
    };

    // Función custom para Fuse que reemplace sinónimos en la query
    const originalSearch = Fuse.prototype.search;
    Fuse.prototype.search = function (query) {
      let q = query.toLowerCase();
      for (const s in synonyms) {
        if (q.includes(s)) q = q.replace(s, synonyms[s]);
      }
      return originalSearch.call(this, q);
    };

    window.fusePaniol = new Fuse(formattedData, {
      keys: ['codigo', 'desc'],
      threshold: 0.3,
      ignoreLocation: true,
      minMatchCharLength: 2
    });
  }
}

// Configuración Predictiva y Repuestos Históricos Global
let globalConfig = { riesgosCheckpoint: {}, repuestosHistoricos: {} };

async function initGlobalConfig() {
  const cached = localStorage.getItem('global_config_cache');
  const cachedTs = parseInt(localStorage.getItem('global_config_ts') || '0');
  const UN_DIA = 24 * 60 * 60 * 1000;

  if (cached && (Date.now() - cachedTs) < UN_DIA) {
    try { globalConfig = JSON.parse(cached); return; } catch (e) { }
  }

  try {
    const url = `${apiUrl}?action=getDashboard`;
    const res = await fetch(url);
    const json = await res.json();
    if (json.ok && json.predictivo) {
      globalConfig.riesgosCheckpoint = json.predictivo.riesgosCheckpoint || {};
      globalConfig.repuestosHistoricos = json.predictivo.repuestosHistoricos || {};
      localStorage.setItem('global_config_cache', JSON.stringify(globalConfig));
      localStorage.setItem('global_config_ts', String(Date.now()));
    }
  } catch (e) { console.warn('No se pudo cargar config global', e); }
}

// Inicializar config global al arrancar
initGlobalConfig();

// ── 4. Funciones de búsqueda de repuesto ────────────────────────────────

function buscarRepuesto(query, ei, ci) {
  const input = document.getElementById(`rep-input-${ei}-${ci}`);
  let lista = document.getElementById(`rep-lista-${ei}-${ci}`);
  if (!input || !lista) return;

  // Mover al body para escapar de cualquier overflow/clip padre
  if (lista.parentElement !== document.body) {
    document.body.appendChild(lista);
    lista = document.getElementById(`rep-lista-${ei}-${ci}`);
  }

  const q = query.trim();

  // Buscar histórico de sugerencias para este checkpoint
  let sugeridosHtml = '';
  if (q.length < 1) {
    try {
      const linea = app.linea;
      const equipo = app.equipos[ei].nombre;
      const check = app.equipos[ei].checks[ci].texto;
      const keyChk = linea + '|' + equipo + '|' + check;

      if (globalConfig.repuestosHistoricos && globalConfig.repuestosHistoricos[keyChk]) {
        const topSugeridos = globalConfig.repuestosHistoricos[keyChk];
        if (topSugeridos.length > 0) {
          sugeridosHtml = `<div style="padding:8px 12px; background:#fffbeb; color:#92400e; font-size:11px; font-weight:800; border-bottom:1px solid #fde68a;">🌟 REPUESTOS SUGERIDOS</div>` +
            topSugeridos.map(r => `
              <div class="repuesto-item"
                   onmousedown="window._repuestoTouching = true;"
                   onclick="seleccionarRepuesto('${r.codigo}', '${r.desc.replace(/'/g, "\\'")}', ${ei}, ${ci})">
                <div class="rep-cod">${r.codigo}</div>
                <div class="rep-desc">${r.desc}</div>
                <div style="font-size:10px; color:#b45309; margin-top:2px;">Pedido ${r.cant} veces antes</div>
              </div>
            `).join('');
        }
      }
    } catch (e) { }

    if (sugeridosHtml) {
      lista.innerHTML = sugeridosHtml;
      lista.classList.add('visible');
      reposicionarLista(input, lista);
    } else {
      lista.classList.remove('visible');
    }
    return;
  }

  // Buscar resultados
  let top8 = [];
  if (window.fusePaniol) {
    const resultados = window.fusePaniol.search(q);
    top8 = resultados.slice(0, 8).map(r => ({ item: r.item.item }));
  } else {
    // Fallback original
    const qUpper = q.toUpperCase();
    const qLower = q.toLowerCase();
    const tokens = qLower.split(/\s+/).filter(t => t.length >= 1);
    const resultados = [];

    for (const item of paniolData) {
      const codigo = item[0].toUpperCase();
      const desc = item[1].toLowerCase();
      const full = codigo + ' ' + desc;
      if (codigo === qUpper) { resultados.push({ item, score: 200 }); continue; }
      if (tokens.length === 1 && codigo.startsWith(qUpper)) { resultados.push({ item, score: 150 }); continue; }
      const matchCount = tokens.filter(t => full.includes(t)).length;
      if (matchCount === tokens.length) resultados.push({ item, score: 50 + matchCount * 10 });
      else if (matchCount > 0 && tokens.length > 1) resultados.push({ item, score: matchCount });
    }

    resultados.sort((a, b) => b.score - a.score);
    top8 = resultados.slice(0, 8);
  }
  if (!top8.length && !sugeridosHtml) { lista.classList.remove('visible'); return; }

  let resultadosHtml = '';
  if (top8.length) {
    resultadosHtml = top8.map(({ item }) => {
      // Si el item viene de Fuse, la estructura puede ser un objeto.
      // Si viene del fallback original o de paniolData, es un array.
      const isArray = Array.isArray(item);
      const codigoRaw = isArray ? item[0] : item.codigo;
      const descRaw = isArray ? item[1] : item.desc;

      const cod = codigoRaw.replace(/'/g, '&#39;');
      const dsc = descRaw.replace(/'/g, '&#39;');
      return `<div class="repuesto-item"
        onmousedown="event.preventDefault(); seleccionarRepuesto('${cod}','${dsc}',${ei},${ci})">
        <div class="repuesto-item-code">${codigoRaw}</div>
        <div class="repuesto-item-desc">${descRaw}</div>
      </div>`;
    }).join('');
  }

  lista.innerHTML = sugeridosHtml + resultadosHtml;
  lista.classList.add('visible');

  // Touch: distinguir tap (seleccionar) de swipe (scroll)
  // No usamos ontouchstart global porque cancela el scroll del contenedor
  lista.querySelectorAll('.repuesto-item').forEach(el => {
    let touchStartY = 0;
    let touchStartX = 0;
    el.addEventListener('touchstart', e => {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    el.addEventListener('touchend', e => {
      const dy = Math.abs(e.changedTouches[0].clientY - touchStartY);
      const dx = Math.abs(e.changedTouches[0].clientX - touchStartX);
      // Solo seleccionar si el movimiento fue menor a 8px (tap, no scroll)
      if (dy < 8 && dx < 8) {
        e.preventDefault();
        const cod = el.querySelector('.repuesto-item-code').textContent;
        const dsc = el.querySelector('.repuesto-item-desc').textContent;
        seleccionarRepuesto(cod, dsc, ei, ci);
      }
    }, { passive: false });
  });

  lista.classList.add('visible');

  // Posicionamiento — visualViewport da coords reales con teclado abierto en mobile
  requestAnimationFrame(() => {
    const rect = input.getBoundingClientRect();

    // Offset del visualViewport (teclado virtual desplaza el viewport en algunos browsers)
    const vvOffsetTop = (window.visualViewport ? window.visualViewport.offsetTop : 0);
    const vvOffsetLeft = (window.visualViewport ? window.visualViewport.offsetLeft : 0);
    const vvHeight = (window.visualViewport ? window.visualViewport.height : window.innerHeight);

    const top = rect.bottom + vvOffsetTop;
    const left = rect.left + vvOffsetLeft;
    const spaceBelow = vvHeight - rect.bottom;
    const alturaMax = Math.min(260, Math.max(spaceBelow - 12, 120));

    lista.style.cssText = `
      position: fixed;
      left: ${Math.max(8, left)}px;
      width: ${rect.width}px;
      z-index: 999999;
      max-height: ${alturaMax}px;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0,0,0,.18);
    `;

    // Abrir arriba si no hay espacio abajo
    if (spaceBelow < 150 && rect.top > spaceBelow) {
      const alturaArriba = Math.min(260, Math.max(rect.top + vvOffsetTop - 12, 100));
      lista.style.top = 'auto';
      lista.style.bottom = (vvHeight - rect.top + vvOffsetTop + 4) + 'px';
      lista.style.maxHeight = alturaArriba + 'px';
    } else {
      lista.style.top = top + 4 + 'px';
      lista.style.bottom = 'auto';
    }
  });
}

function seleccionarRepuesto(codigo, desc, ei, ci) {
  window._repuestoTouching = true;
  if (!app.repuestos) app.repuestos = {};
  if (!app.repuestos[ei]) app.repuestos[ei] = {};
  if (!Array.isArray(app.repuestos[ei][ci])) app.repuestos[ei][ci] = [];
  // Evitar duplicado
  if (app.repuestos[ei][ci].some(r => r.codigo === codigo)) {
    const input = document.getElementById(`rep-input-${ei}-${ci}`);
    const lista = document.getElementById(`rep-lista-${ei}-${ci}`);
    if (input) input.value = '';
    if (lista) lista.classList.remove('visible');
    window._repuestoTouching = false;
    return;
  }
  app.repuestos[ei][ci].push({ codigo, desc, cantidad: 1 });
  localStorage.setItem('repuestos_' + app.linea, JSON.stringify(app.repuestos));
  const input = document.getElementById(`rep-input-${ei}-${ci}`);
  const lista = document.getElementById(`rep-lista-${ei}-${ci}`);
  if (input) input.value = '';
  if (lista) lista.classList.remove('visible');
  renderBadges(ei, ci);
  setTimeout(() => { window._repuestoTouching = false; }, 300);
}

function limpiarRepuesto(ei, ci, idx) {
  if (app.repuestos && app.repuestos[ei] && Array.isArray(app.repuestos[ei][ci])) {
    app.repuestos[ei][ci].splice(idx, 1);
    if (app.repuestos[ei][ci].length === 0) delete app.repuestos[ei][ci];
    localStorage.setItem('repuestos_' + app.linea, JSON.stringify(app.repuestos));
  }
  renderBadges(ei, ci);
  const input = document.getElementById(`rep-input-${ei}-${ci}`);
  if (input) input.focus();
}

function cambiarCantidad(ei, ci, idx, delta) {
  if (!app.repuestos?.[ei] || !Array.isArray(app.repuestos[ei][ci])) return;
  const r = app.repuestos[ei][ci][idx];
  if (!r) return;
  r.cantidad = Math.max(1, (r.cantidad || 1) + delta);
  app.repuestos[ei][ci][idx] = r;
  localStorage.setItem('repuestos_' + app.linea, JSON.stringify(app.repuestos));
  // Actualizar solo el número sin re-renderizar todo el badge
  const numEl = document.getElementById(`rep-qty-${ei}-${ci}-${idx}`);
  if (numEl) numEl.textContent = r.cantidad;
}

function renderBadges(ei, ci) {
  const wrap = document.getElementById(`rep-badges-${ei}-${ci}`);
  if (!wrap) return;
  const lista = (app.repuestos && app.repuestos[ei] && Array.isArray(app.repuestos[ei][ci]))
    ? app.repuestos[ei][ci] : [];
  if (!lista.length) { wrap.innerHTML = ''; return; }
  wrap.innerHTML = lista.map((r, idx) => `
    <div class="repuesto-badge visible" style="margin-top:${idx === 0 ? '8px' : '6px'};">
      <div class="repuesto-badge-info">
        <div class="repuesto-badge-code">${r.codigo}</div>
        <div class="repuesto-badge-desc">${r.desc}</div>
      </div>
      <div class="repuesto-qty">
        <button class="repuesto-qty-btn"
          onmousedown="event.preventDefault(); cambiarCantidad(${ei},${ci},${idx},-1)"
          ontouchstart="event.preventDefault(); cambiarCantidad(${ei},${ci},${idx},-1)"
          type="button">−</button>
        <span class="repuesto-qty-num" id="rep-qty-${ei}-${ci}-${idx}">${r.cantidad || 1}</span>
        <button class="repuesto-qty-btn"
          onmousedown="event.preventDefault(); cambiarCantidad(${ei},${ci},${idx},1)"
          ontouchstart="event.preventDefault(); cambiarCantidad(${ei},${ci},${idx},1)"
          type="button">+</button>
      </div>
      <button class="repuesto-badge-del"
        onmousedown="event.preventDefault(); limpiarRepuesto(${ei},${ci},${idx})"
        ontouchstart="event.preventDefault(); limpiarRepuesto(${ei},${ci},${idx})"
        type="button">
        <span class="material-icons-round" style="font-size:20px; pointer-events:none;">delete</span>
      </button>
    </div>`).join('');
}

function render() {
  if (!checkLogin()) return;

  if (currentTab === 'tickets') {
    let ht = `<div class="section">
        <h3 style="margin-bottom: 24px; color: var(--text); font-weight:800; font-size: 20px;">Reportar Ticket</h3>
        <div class="field" style="margin-bottom: 16px;">
          <label class="label">Reportado por</label>
          <input type="text" value="${app.userName || 'Anónimo'}" disabled
            style="background:#e2e8f0; border:none; font-weight:700; color:var(--primary);">
        </div>
        <div class="field" style="margin-bottom: 16px;">
          <label class="label">Tipo de Ticket *</label>
          <select id="ticketType">
            <option value="Servicios/Edilicio">Servicios / Edilicio</option>
            <option value="Equipo Directo">Equipo Directo</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
        <div class="field" style="margin-bottom: 16px;">
          <label class="label">Ubicación / Área *</label>
          <input type="text" id="ticketArea" placeholder="Ej: Pasillo Línea 2, Baños, etc.">
        </div>
        <div class="field" style="margin-bottom: 16px;">
          <label class="label">Descripción del Problema *</label>
          <textarea id="ticketDesc" placeholder="Describa el problema detalladamente..." style="min-height: 120px;"></textarea>
        </div>
        <div class="field" style="margin-bottom: 24px;">
          <label class="label">Urgencia</label>
          <select id="ticketUrgency" style="font-weight: 700; border: 2px solid var(--warning); color: var(--warning);">
            <option value="Baja">Baja</option>
            <option value="Media" selected>Media</option>
            <option value="Alta">Alta</option>
          </select>
        </div>
        <button class="btn-guardar" onclick="guardarTicket()" style="width:100%;"><span class="material-icons-round">send</span> Enviar Ticket al Sistema</button>
      </div>`;
    document.getElementById('main').innerHTML = ht;
    return;
  }

  if (currentTab === 'paniol') {
    renderPaniol();
    return;
  }

  if (currentTab === 'correctivos') {
    renderCorrectivos();
    return;
  }

  if (currentTab === 'supervisores') {
    renderSupervisores();
    return;
  }

  // Permiso basado en rol: tecnicos, supervisores y admin pueden cargar rutinas
  const usuarioActualRender = USUARIOS.find(u => u.nombre === app.userName);
  const rolActual = usuarioActualRender?.rol || '';
  const puedeCargarRutinas = ['tecnico', 'supervisor', 'admin'].includes(rolActual)
    || EMAILS_RUTINAS.includes(app.userEmail.toLowerCase());

  if (!puedeCargarRutinas) {
    let html = `<div class="section" style="text-align:center; padding:60px 20px;">
        <span class="material-icons-round" style="font-size:64px; color:#cbd5e1; display:block; margin-bottom:20px;">lock</span>
        <h3 style="color:#334155; margin-bottom:12px; font-weight:800; font-size:22px;">Acceso restringido</h3>
        <p style="color:#64748b; font-size:15px; margin-bottom: 30px;">Tu cuenta no tiene permiso para cargar rutinas.<br>Podés usar la sección de Tickets de Trabajo.</p>
        <button class="btn-guardar" onclick="switchTab('tickets')" style="margin:0 auto; width:auto; padding:16px 32px;">
          <span class="material-icons-round">build</span> Ir a Tickets
        </button>
      </div>`;
    document.getElementById('main').innerHTML = html;
    return;
  }

  let html = ``;

  const equipos = LINEAS[app.linea] || [];
  html += `<div class="section">
      <div class="field">
        <label class="label">Área / Zona a inspeccionar</label>
        <select onchange="cambiarLinea(this.value)" style="font-size: 18px; font-weight:800; border-color: var(--primary); color: var(--primary);">
          ${Object.keys(LINEAS).map(l => `<option ${app.linea === l ? 'selected' : ''}>${l}</option>`).join('')}
        </select>
      </div>
    </div>`;

  html += `<div class="section grid5">
      <div class="field">
        <label class="label">Técnico Asignado *</label>
        ${rolActual === 'tecnico'
          ? `<input type="text" value="${app.tecnico || app.userName}" disabled style="background:#e2e8f0; border:none; font-weight:700; color:var(--primary);">`
          : `<select onchange="app.tecnico=this.value; save(); updateBtnGuardar()">
          <option value="">Selecciona...</option>
          ${TECNICOS.map(t => `<option ${app.tecnico === t ? 'selected' : ''}>${t}</option>`).join('')}
        </select>`}
      </div>
      <div class="field">
        <label class="label">Supervisor *</label>
        ${rolActual === 'supervisor'
          ? `<input type="text" value="${app.supervisor || app.userName}" disabled style="background:#e2e8f0; border:none; font-weight:700; color:var(--primary);">`
          : `<select onchange="app.supervisor=this.value; save(); updateBtnGuardar()">
          <option value="">Selecciona...</option>
          ${SUPERVISORES.map(s => `<option ${app.supervisor === s ? 'selected' : ''}>${s}</option>`).join('')}
        </select>`}
      </div>
      <div class="field">
        <label class="label">Producto Corriendo</label>
        <input type="text" placeholder="Ej: Vainilla" value="${app.producto}" onchange="app.producto=this.value; save()">
      </div>
      <div class="field">
        <label class="label">Fecha Inicio</label>
        <input type="text" value="${new Date().toLocaleDateString('es-AR')}" disabled style="background:#e2e8f0; border:none;">
      </div>
    </div>`;

  // Badge de fallas en tab Rutinas
  const totalFallas = Object.values(app.datos).reduce((sum, eq) =>
    sum + Object.values(eq).filter(d => d.m).length, 0);
  const labelEl = document.querySelector('#tab-rutinas .tab-label');
  if (labelEl) labelEl.textContent = totalFallas > 0 ? `Rutinas (${totalFallas})` : 'Rutinas';

  html += `<div class="expand-controls">
      <button class="btn-expand" onclick="expandirTodo(true)">
        <span class="material-icons-round" style="font-size:14px;">unfold_more</span> Expandir todo
      </button>
      <button class="btn-expand" onclick="expandirTodo(false)">
        <span class="material-icons-round" style="font-size:14px;">unfold_less</span> Colapsar todo
      </button>
    </div>`;

  equipos.forEach((eq, ei) => {
    // Calcular progreso del equipo
    const totalChecks = eq.checks.length;
    const datosEquipo = app.datos[ei] || {};
    const marcados = Object.values(datosEquipo).filter(d => d.m === true).length;
    const inspeccionados = Object.values(datosEquipo).filter(d => d.m === true || d.c).length;
    const progressClass = marcados > 0 ? 'tiene-fallas' : inspeccionados === totalChecks ? 'completo' : '';
    const progressLabel = marcados > 0
      ? `⚠ ${marcados} falla${marcados > 1 ? 's' : ''}`
      : inspeccionados > 0 ? `✓ ${inspeccionados}/${totalChecks}` : `${totalChecks}`;

    html += `<div class="equipo ${app.abiertos[ei] ? 'abierto' : ''}" data-equipo="${ei}">
        <div class="equipo-head" onclick="app.abiertos[${ei}]=!app.abiertos[${ei}]; vibratePhone(); save(); toggleEquipoDOM(${ei})">
          <div class="equipo-nombre"><span class="number">${ei + 1}</span> <span>${eq.nombre}</span></div>
          <div class="equipo-progress">
            <span class="equipo-progress-badge ${progressClass}">${progressLabel}</span>
          </div>
          <div class="equipo-toggle"><span class="material-icons-round">expand_more</span></div>
        </div>
        <div class="equipo-body">`;

    eq.checks.forEach((cp, ci) => {
      const d = app.datos?.[ei]?.[ci] || { m: false, c: '' };
      html += `<div class="checkpoint ${d.m ? 'marcado' : ''}" data-checkpoint="${ei}-${ci}">
          <div class="check-header">
            <div class="check-texto">${cp}</div>
            <label class="toggle-switch">
              <input type="checkbox" ${d.m ? 'checked' : ''} onchange="toggleCheck(${ei},${ci})">
              <div class="toggle-slider"></div>
            </label>
            <div class="toggle-label">${d.m ? 'Falla' : 'OK'}</div>
          </div>
           <div class="check-comment">
            <textarea onchange="updateComment(${ei},${ci},this.value)" placeholder="Describa el inconveniente encontrado aquí claramente...">${d.c}</textarea>
            <div class="repuesto-wrap">
              <span class="repuesto-label">🔧 Repuesto necesario (opcional)</span>
              <div class="repuesto-input-row">
                <input class="repuesto-input" id="rep-input-${ei}-${ci}"
                  type="text" autocomplete="off"
                  placeholder="Buscá por código o palabras clave..."
                  oninput="buscarRepuesto(this.value, ${ei}, ${ci})"
                  onfocus="buscarRepuesto(this.value, ${ei}, ${ci})"
                  onblur="setTimeout(() => { if(!window._repuestoTouching) { const l = document.getElementById('rep-lista-${ei}-${ci}'); if(l) l.classList.remove('visible'); }}, 250)">
              </div>
              <div class="repuesto-sugerencias" id="rep-lista-${ei}-${ci}"></div>
              <div id="rep-badges-${ei}-${ci}">
                ${(() => {
          const lista = (app.repuestos && app.repuestos[ei] && Array.isArray(app.repuestos[ei][ci]))
            ? app.repuestos[ei][ci] : [];
          return lista.map((r, idx) => `
                    <div class="repuesto-badge visible" style="margin-top:${idx === 0 ? '8px' : '6px'};">
                      <div class="repuesto-badge-info">
                        <div class="repuesto-badge-code">${r.codigo}</div>
                        <div class="repuesto-badge-desc">${r.desc}</div>
                      </div>
                      <button class="repuesto-badge-del" onmousedown="limpiarRepuesto(${ei},${ci},${idx})" type="button">
                        <span class="material-icons-round" style="font-size:20px; pointer-events:none;">delete</span>
                      </button>
                    </div>`).join('');
        })()}
              </div>
            </div>
          </div>
        </div>`;
    });

    html += `</div></div>`;
  });

  html += `
    <div class="action-dock">
      <button class="btn-otro" onclick="limpiarLinea()" title="Resetear datos"><span class="material-icons-round">backspace</span></button>
      <button class="btn-guardar" id="btnGuardar" onclick="mostrarResumen()" ${!app.tecnico || !app.supervisor ? 'disabled' : ''}><span class="material-icons-round">summarize</span> Revisar y Enviar</button>
      <button class="btn-otro" onclick="exportar()" title="Backup CSV"><span class="material-icons-round">download</span></button>
    </div>`;

  document.getElementById('main').innerHTML = html;
}

window.addEventListener('online', processQueue);
window.addEventListener('offline', updateOfflineBanner);

function updateOfflineBanner() {
  document.getElementById('offlineBanner').style.display = navigator.onLine ? 'none' : 'flex';
}

function processQueue() {
  updateOfflineBanner();
  if (!navigator.onLine) return;
  const offlineQueue = JSON.parse(localStorage.getItem('offlineQueue') || '[]');
  if (offlineQueue.length === 0) return;
  const batch = [...offlineQueue];
  localStorage.setItem('offlineQueue', '[]');
  Promise.all(batch.map(item =>
    fetch(apiUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'payload=' + encodeURIComponent(JSON.stringify(item.payloadSheet))
    })
  )).then(() => {
    console.log("Cola enviada!!!");
  }).catch(() => {
    enqueueOffline(batch);
  });
}

function enqueueOffline(items) {
  const offlineQueue = JSON.parse(localStorage.getItem('offlineQueue') || '[]');
  offlineQueue.push(...items);
  localStorage.setItem('offlineQueue', JSON.stringify(offlineQueue));
  updateOfflineBanner();
}

async function sendOrQueue(payloadSheet, forceQueue = false) {
  if (!navigator.onLine || forceQueue) {
    enqueueOffline([{ id: Date.now(), type: payloadSheet.tipo || 'rutina', payloadSheet }]);
    mostrarToast('Sin conexión — guardado localmente. Se enviará al volver.', 'warning');
    return;
  }
  try {
    document.body.style.pointerEvents = 'none';
    await fetch(apiUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'payload=' + encodeURIComponent(JSON.stringify(payloadSheet))
    });
    mostrarToast('✓ Enviado correctamente a la nube de Planta.', 'success');
  } catch (err) {
    sendOrQueue(payloadSheet, true);
  } finally {
    document.body.style.pointerEvents = 'auto';
  }
}

async function guardarTicket() {
  const area = document.getElementById('ticketArea').value;
  const desc = document.getElementById('ticketDesc').value;
  if (!area || !desc) { mostrarToast('Completá el área y la descripción.', 'warning'); return; }
  const payloadSheet = {
    tipo: 'ticket',
    fecha: new Date().toISOString(),
    usuario: app.userEmail,
    reportadoPor: app.userName || 'Anonimo',
    categoria: document.getElementById('ticketType').value,
    area: area,
    descripcion: desc,
    urgencia: document.getElementById('ticketUrgency').value
  };
  await sendOrQueue(payloadSheet);
  switchTab('rutinas');
}

function buildPayload() {
  const equipos = LINEAS[app.linea] || [];
  const u = USUARIOS.find(u => u.nombre === app.userName);
  const rolU = u?.rol || '';
  const tecnicoEfectivo = app.tecnico || (['tecnico', 'admin'].includes(rolU) ? app.userName : '');
  const supervisorEfectivo = app.supervisor || (rolU === 'supervisor' ? app.userName : '');
  return {
    fecha: new Date().toISOString(),
    linea: app.linea,
    tecnico: tecnicoEfectivo,
    supervisor: supervisorEfectivo,
    producto: app.producto,
    equipos: equipos.map((eq, ei) => ({
      nombre: eq.nombre,
      checks: eq.checks.map((cp, ci) => {
        const d = (app.datos[ei] && app.datos[ei][ci]) || { m: false, c: '' };
        const rep = (app.repuestos && app.repuestos[ei] && Array.isArray(app.repuestos[ei][ci]))
          ? app.repuestos[ei][ci] : [];
        return {
          texto: cp,
          marcado: d.m,
          comentario: d.c,
          repuestos: rep  // [ { codigo, desc, cantidad }, ... ]
        };
      })
    }))
  };
}

function generarReporte(payload) {
  const fecha = new Date(payload.fecha);
  const fechaStr = fecha.toLocaleDateString('es-AR');
  const horaStr = fecha.toLocaleTimeString('es-AR');
  const totalChecks = payload.equipos.reduce((s, eq) => s + eq.checks.length, 0);
  const novedades = payload.equipos.reduce((s, eq) => s + eq.checks.filter(c => c.marcado).length, 0);
  const ok = totalChecks - novedades;

  let equiposHtml = '';
  payload.equipos.forEach(eq => {
    const tieneNovedades = eq.checks.some(c => c.marcado);
    const estadoEquipo = tieneNovedades ? '⚠ Falla / Novedad' : '✓ Limpio / OK';
    const colorEquipo = tieneNovedades ? '#fef2f2' : '#f0fdf4';
    const colorBorde = tieneNovedades ? '#ef4444' : '#10b981';
    let checksHtml = '';
    eq.checks.forEach(ch => {
      const esNovedad = ch.marcado;
      const bg = esNovedad ? '#fef2f2' : '#ffffff';
      const borde = esNovedad ? '#ef4444' : '#cbd5e1';
      const icono = esNovedad ? '⚠' : '✓';
      const color = esNovedad ? '#b91c1c' : '#059669';
      const peso = esNovedad ? 'bold' : 'normal';
      checksHtml += `
        <div style="display:flex;gap:12px;align-items:flex-start;padding:12px 16px;
                    background:${bg};border-left:4px solid ${borde};
                    border-radius:8px;margin-bottom:8px;">
          <span style="color:${color};font-weight:bold;min-width:20px;font-size:16px;">${icono}</span>
          <div style="flex:1;">
            <span style="font-size:14px;color:${esNovedad ? '#7f1d1d' : '#334155'};font-weight:${peso};">${ch.texto}</span>
            ${ch.marcado && ch.comentario ? `<div style="font-size:13px;color:#b91c1c;margin-top:6px;font-style:italic;">"${ch.comentario}"</div>` : ''}
          </div>
        </div>`;
    });
    equiposHtml += `
      <div style="margin-bottom:20px;border:1px solid ${colorBorde};border-radius:12px;overflow:hidden;">
        <div style="background:${colorEquipo};padding:14px 20px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid ${colorBorde}">
          <span style="font-weight:800;font-size:16px;color:${tieneNovedades ? '#991b1b' : '#064e3b'};">${eq.nombre}</span>
          <span style="font-size:12px;font-weight:800;color:${tieneNovedades ? '#ef4444' : '#10b981'};text-transform:uppercase;">${estadoEquipo}</span>
        </div>
        <div style="padding:14px;">${checksHtml}</div>
      </div>`;
  });

  const html = `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>VOUCHER PMP — ${payload.linea}</title></head>
<body style="font-family:-apple-system,sans-serif;background:#f8fafc;color:#0f172a;">
  <div style="background:linear-gradient(135deg,#10b981,#059669);padding:30px 24px;color:white;text-align:center;">
    <h1 style="font-size:24px;font-weight:800;margin-bottom:6px;">Voucher de Inspección PMP</h1>
    <p style="font-size:14px;opacity:.9;">Pilares Compañía Alimenticia</p>
  </div>
  <div style="background:white;padding:20px 24px;display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:16px;border-bottom:1px solid #e2e8f0;">
    <div><div style="font-size:11px;font-weight:800;color:#94a3b8;text-transform:uppercase;margin-bottom:4px;">Línea</div><div style="font-size:15px;font-weight:700;">${payload.linea}</div></div>
    <div><div style="font-size:11px;font-weight:800;color:#94a3b8;text-transform:uppercase;margin-bottom:4px;">Técnico</div><div style="font-size:15px;font-weight:700;">${payload.tecnico}</div></div>
    <div><div style="font-size:11px;font-weight:800;color:#94a3b8;text-transform:uppercase;margin-bottom:4px;">Supervisor</div><div style="font-size:15px;font-weight:700;">${payload.supervisor}</div></div>
    <div><div style="font-size:11px;font-weight:800;color:#94a3b8;text-transform:uppercase;margin-bottom:4px;">Fecha</div><div style="font-size:15px;font-weight:700;">${fechaStr} ${horaStr}</div></div>
  </div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding:24px;background:#f8fafc;">
    <div style="background:white;border-radius:16px;padding:20px;text-align:center;border:1px solid #e2e8f0;">
      <div style="font-size:36px;font-weight:800;">${totalChecks}</div><div style="font-size:12px;font-weight:700;color:#64748b;text-transform:uppercase;">Evaluados</div>
    </div>
    <div style="background:white;border-radius:16px;padding:20px;text-align:center;border:2px solid #10b981;">
      <div style="font-size:36px;font-weight:800;color:#10b981;">${ok}</div><div style="font-size:12px;font-weight:700;color:#64748b;text-transform:uppercase;">Aprobados</div>
    </div>
    <div style="background:white;border-radius:16px;padding:20px;text-align:center;border:2px solid #ef4444;">
      <div style="font-size:36px;font-weight:800;color:#ef4444;">${novedades}</div><div style="font-size:12px;font-weight:700;color:#64748b;text-transform:uppercase;">Fallas</div>
    </div>
  </div>
  <div style="padding:0 24px 40px;max-width:800px;margin:0 auto;">
    <button onclick="window.print()" style="display:block;width:100%;padding:18px;background:#1e293b;color:white;border:none;border-radius:14px;font-size:16px;font-weight:800;cursor:pointer;margin-bottom:24px;">Guardar copia PDF</button>
    ${equiposHtml}
  </div>
</body></html>`;

  const blob = new Blob([html], { type: 'text/html' });
  window.open(URL.createObjectURL(blob), '_blank');
}

async function guardar() {
  const uG = USUARIOS.find(u => u.nombre === app.userName);
  const rolG = uG?.rol || '';
  const tecG = app.tecnico || (['tecnico', 'admin'].includes(rolG) ? app.userName : '');
  const supG = app.supervisor || (rolG === 'supervisor' ? app.userName : '');
  if (!tecG || !supG) {
    mostrarToast('⚠ Seleccioná técnico y supervisor antes de enviar.', 'warning');
    return;
  }
  vibratePhone();
  const payload = buildPayload();
  let rutinas = JSON.parse(localStorage.getItem('rutinas') || '[]');
  let total = 0, marcados = 0;
  payload.equipos.forEach(eq => { eq.checks.forEach(ch => { total++; if (ch.marcado) marcados++; }); });
  rutinas.unshift({ ...payload, porcentaje: total ? Math.round(marcados * 100 / total) : 0 });
  localStorage.setItem('rutinas', JSON.stringify(rutinas));
  const payloadSheet = {
    fecha: payload.fecha,
    linea: payload.linea,
    tecnico: payload.tecnico,
    supervisor: payload.supervisor,
    producto: payload.producto,
    equipos: payload.equipos.map(eq => {
      const conNovedad = eq.checks.filter(ch => ch.marcado);
      if (conNovedad.length > 0) {
        return { nombre: eq.nombre, checks: conNovedad };
      } else {
        return { nombre: eq.nombre, checks: [{ texto: 'Inspección completada — sin novedades', marcado: true, comentario: '' }] };
      }
    })
  };
  sendOrQueue(payloadSheet);

  // ── Enviar pedidos de repuestos al Sheet (hoja Pedidos_Repuestos) ──
  const equipos = LINEAS[app.linea] || [];
  const pedidosRepuestos = [];
  equipos.forEach((eq, ei) => {
    eq.checks.forEach((cp, ci) => {
      const reps = (app.repuestos && app.repuestos[ei] && Array.isArray(app.repuestos[ei][ci]))
        ? app.repuestos[ei][ci] : [];
      reps.forEach(rep => {
        pedidosRepuestos.push({
          semana: getSemanaISO(),
          fecha: payload.fecha,
          linea: app.linea,
          equipo: eq.nombre,
          checkpoint: cp,
          tecnico: app.tecnico,
          supervisor: app.supervisor,
          codigo: rep.codigo,
          descripcion: rep.desc,
          cantidad: String(rep.cantidad || 1),
          nota: '',
          estado: 'Pendiente'
        });
      });
    });
  });

  if (pedidosRepuestos.length > 0) {
    const payloadPedidos = { tipo: 'pedidosRepuestos', pedidos: pedidosRepuestos };
    // Guardar en cache local para el Pañol
    const cachedPedidos = JSON.parse(localStorage.getItem('paniol_pedidos_cache') || '[]');
    cachedPedidos.push(...pedidosRepuestos);
    localStorage.setItem('paniol_pedidos_cache', JSON.stringify(cachedPedidos));
    // Enviar al Sheet (sin bloquear)
    fetch(apiUrl, {
      method: 'POST', mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'payload=' + encodeURIComponent(JSON.stringify(payloadPedidos))
    }).catch(() => { });
  }

  generarReporte(payload);
  app.producto = '';
  app.tecnico = '';
  app.supervisor = '';
  app.datos = {};
  app.repuestos = {};
  app.abiertos = {};
  save();
  render();
}

function exportar() {
  const rutinas = JSON.parse(localStorage.getItem('rutinas') || '[]');
  if (!rutinas.length) { mostrarToast('No hay rutinas almacenadas localmente.', 'warning'); return; }
  let csv = 'RUTINAS PMP - ' + new Date().toLocaleDateString('es-AR') + '\n\n';
  rutinas.forEach(r => {
    csv += r.linea + ' | ' + new Date(r.fecha).toLocaleDateString('es-AR') + ' | ' + r.tecnico + ' | ' + r.supervisor + '\n\n';
  });
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'rutinas-pmp-' + new Date().toISOString().split('T')[0] + '.csv';
  a.click();
}

// ── EXPANDIR / COLAPSAR TODO ─────────────────────────────────────────────
function expandirTodo(abrir) {
  const equipos = LINEAS[app.linea] || [];
  equipos.forEach((_, ei) => {
    app.abiertos[ei] = abrir;
    toggleEquipoDOM(ei);
  });
  save();
}

// ── MODAL DE CONFIRMACIÓN PROPIO (reemplaza confirm() nativo) ────────────
function mostrarConfirm({ titulo, cuerpo, labelOk = 'Confirmar', tipo = 'danger', onOk }) {
  const overlay = document.createElement('div');
  overlay.className = 'confirm-overlay';
  overlay.innerHTML = `
      <div class="confirm-sheet">
        <div class="confirm-title">${titulo}</div>
        <div class="confirm-body">${cuerpo}</div>
        <div class="confirm-actions">
          <button class="confirm-cancel" id="confirmCancel">Cancelar</button>
          <button class="confirm-ok ${tipo}" id="confirmOk">${labelOk}</button>
        </div>
      </div>`;
  document.body.appendChild(overlay);
  overlay.querySelector('#confirmCancel').onclick = () => overlay.remove();
  overlay.querySelector('#confirmOk').onclick = () => { overlay.remove(); onOk(); };
  overlay.onclick = e => { if (e.target === overlay) overlay.remove(); };
}

// ── MODAL RESUMEN ANTES DE ENVIAR ────────────────────────────────────────
function mostrarResumen() {
  if (!app.tecnico || !app.supervisor) {
    // Scroll al primer campo faltante
    const seccion = document.querySelector('.section.grid5');
    if (seccion) seccion.scrollIntoView({ behavior: 'smooth', block: 'center' });
    mostrarToast('⚠ Seleccioná técnico y supervisor antes de enviar.', 'warning');
    return;
  }

  const equipos = LINEAS[app.linea] || [];
  let totalChecks = 0, fallas = 0, repuestosTotal = 0;
  let olvidadosHtml = '';

  equipos.forEach((eq, ei) => {
    eq.checks.forEach((chk, ci) => {
      totalChecks++;
      const isInspeccionado = app.datos[ei]?.[ci]?.m;
      if (isInspeccionado) {
        fallas++;
      } else {
        // Check predictivo: si no está inspeccionado pero suele fallar
        const keyChk = app.linea + '|' + eq.nombre + '|' + chk.texto;
        const riesgo = globalConfig.riesgosCheckpoint && globalConfig.riesgosCheckpoint[keyChk];
        if (riesgo && riesgo.total >= 2) {
          olvidadosHtml += `<li style="margin-bottom:4px;"><strong>${eq.nombre}:</strong> ${chk.texto} <span style="color:#d97706;">(Suele fallar)</span></li>`;
        }
      }
      if (Array.isArray(app.repuestos?.[ei]?.[ci])) repuestosTotal += app.repuestos[ei][ci].length;
    });
  });

  // Recalcular las fallas reales (porque m true no siempre es falla, depende del texto)
  // Espera, el código original hacía "if (app.datos[ei]?.[ci]?.m) fallas++;". Lo mantengo.
  fallas = 0;
  equipos.forEach((eq, ei) => {
    eq.checks.forEach((_, ci) => {
      if (app.datos[ei]?.[ci]?.m) fallas++;
    });
  });

  const inspeccionados = equipos.reduce((sum, _, ei) =>
    sum + Object.keys(app.datos[ei] || {}).length, 0);

  const overlay = document.createElement('div');
  overlay.className = 'confirm-overlay';
  overlay.innerHTML = `
      <div class="confirm-sheet">
        <div style="display:flex; align-items:center; gap:10px; margin-bottom:20px;">
          <span class="material-icons-round" style="font-size:24px; color:var(--primary);">summarize</span>
          <div class="confirm-title" style="margin:0;">Resumen de rutina</div>
        </div>
        ${olvidadosHtml ? `
        <div style="background:#fffbeb; border:1px solid #fde68a; border-radius:8px; padding:12px; margin-bottom:16px;">
          <div style="color:#b45309; font-weight:800; font-size:13px; margin-bottom:6px; display:flex; align-items:center;">
            <span class="material-icons-round" style="font-size:16px; margin-right:4px;">warning</span>
            Atención: Puntos frecuentes sin revisar
          </div>
          <ul style="margin:0; padding-left:20px; font-size:12px; color:#92400e;">
            ${olvidadosHtml}
          </ul>
        </div>` : ''}
        <div style="background:#f8fafc; border-radius:14px; padding:4px 16px; margin-bottom:20px;">
          <div class="resumen-stat">
            <div class="resumen-stat-num" style="color:#10b981;">${inspeccionados}</div>
            <div class="resumen-stat-label">Puntos inspeccionados de ${totalChecks}</div>
          </div>
          <div class="resumen-stat">
            <div class="resumen-stat-num" style="color:${fallas > 0 ? '#ef4444' : '#10b981'};">${fallas}</div>
            <div class="resumen-stat-label">Fallas / novedades detectadas</div>
          </div>
          <div class="resumen-stat">
            <div class="resumen-stat-num" style="color:#f59e0b;">${repuestosTotal}</div>
            <div class="resumen-stat-label">Repuestos solicitados al pañol</div>
          </div>
        </div>
        <div style="font-size:13px; color:var(--text-soft); margin-bottom:20px; line-height:1.5;">
          <strong>${app.tecnico}</strong> · ${app.linea}<br>
          Supervisor: <strong>${app.supervisor}</strong>
          ${app.producto ? `<br>Producto: ${app.producto}` : ''}
        </div>
        <div class="confirm-actions">
          <button class="confirm-cancel" id="resumenCancel">Volver</button>
          <button class="confirm-ok primary" id="resumenOk">
            <span class="material-icons-round" style="font-size:18px; vertical-align:middle; margin-right:6px;">send</span>
            Enviar rutina
          </button>
        </div>
      </div>`;
  document.body.appendChild(overlay);
  overlay.querySelector('#resumenCancel').onclick = () => overlay.remove();
  overlay.querySelector('#resumenOk').onclick = () => { overlay.remove(); guardar(); };
  overlay.onclick = e => { if (e.target === overlay) overlay.remove(); };
}

// Header compacto desactivado — ver comentario en CSS

// ── TEXTAREA AUTO-RESIZE ─────────────────────────────────────────────────
document.addEventListener('input', e => {
  if (e.target.tagName === 'TEXTAREA' && e.target.closest('.check-comment')) {
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px';
  }
});

// ── LIMPIAR LÍNEA con modal propio ────────────────────────────────────────
function limpiarLinea() {
  mostrarConfirm({
    titulo: 'Limpiar rutina',
    cuerpo: '¿Seguro que querés borrar todos los datos de la rutina actual? Esta acción no se puede deshacer.',
    labelOk: 'Sí, limpiar',
    tipo: 'danger',
    onOk: () => {
      app.datos = {};
      app.repuestos = {};
      app.abiertos = {};
      save();
      render();
      mostrarToast('Rutina limpiada.', 'success');
    }
  });
}

let inspeccionPuntos = [];

function abrirModalInspeccion() {
  // Resolución de técnico y supervisor desde el usuario logueado
  const tecInsp = app.tecnico || app.userName || '';
  const supInsp = app.supervisor || '';

  if (!tecInsp && !supInsp) {
    mostrarToast('⚠ Necesitás estar logueado para usar Inspección.', 'warning');
    return;
  }
  const elTec = document.getElementById('insp-info-tecnico');
  const elSup = document.getElementById('insp-info-supervisor');
  if (elTec) elTec.textContent = '👤 ' + (tecInsp || supInsp);
  if (elSup) elSup.textContent = '🔍 ' + (supInsp || '—');
  inspeccionPuntos = [];
  renderizarPuntos();
  agregarPunto();
  document.getElementById('modalInspeccion').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function cerrarModalInspeccion() {
  const tieneDatos = inspeccionPuntos.some(p =>
    p.linea || p.equipo || p.checkpoint || p.observacion.trim()
  );
  if (tieneDatos) {
    mostrarConfirm({
      titulo: 'Cancelar inspección',
      cuerpo: '¿Seguro? Se perderán todos los puntos cargados.',
      labelOk: 'Sí, cancelar',
      tipo: 'danger',
      onOk: () => {
        document.getElementById('modalInspeccion').style.display = 'none';
        document.body.style.overflow = '';
        inspeccionPuntos = [];
      }
    });
    return;
  }
  document.getElementById('modalInspeccion').style.display = 'none';
  document.body.style.overflow = '';
  inspeccionPuntos = [];
}

function agregarPunto() {
  inspeccionPuntos.push({ linea: '', equipo: '', checkpoint: '', observacion: '' });
  renderizarPuntos();
  setTimeout(() => {
    const items = document.querySelectorAll('.insp-punto');
    if (items.length) items[items.length - 1].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 100);
}

function eliminarPunto(idx) {
  if (inspeccionPuntos.length <= 1) return;
  inspeccionPuntos.splice(idx, 1);
  renderizarPuntos();
}

function onInspLineaChange(idx) {
  const sel = document.getElementById(`insp-linea-${idx}`);
  inspeccionPuntos[idx].linea = sel.value;
  inspeccionPuntos[idx].equipo = '';
  inspeccionPuntos[idx].checkpoint = '';
  renderPuntoEquipo(idx);
  renderPuntoCheckpoint(idx);
}

function onInspEquipoChange(idx) {
  const sel = document.getElementById(`insp-equipo-${idx}`);
  inspeccionPuntos[idx].equipo = sel.value;
  inspeccionPuntos[idx].checkpoint = '';
  renderPuntoCheckpoint(idx);
}

function onInspCheckChange(idx) {
  const sel = document.getElementById(`insp-check-${idx}`);
  inspeccionPuntos[idx].checkpoint = sel.value;
}

function onInspObsChange(idx) {
  const ta = document.getElementById(`insp-obs-${idx}`);
  inspeccionPuntos[idx].observacion = ta.value;
}

function renderPuntoEquipo(idx) {
  const wrap = document.getElementById(`insp-equipo-wrap-${idx}`);
  const linea = inspeccionPuntos[idx].linea;
  if (!linea || !LINEAS[linea]) { wrap.innerHTML = ''; return; }
  const opts = LINEAS[linea].map(e => `<option value="${e.nombre}">${e.nombre}</option>`).join('');
  wrap.innerHTML = `<div class="field"><span class="label">Equipo</span>
      <select id="insp-equipo-${idx}" onchange="onInspEquipoChange(${idx})">
        <option value="">— Seleccioná equipo —</option>${opts}
      </select></div>`;
  if (inspeccionPuntos[idx].equipo) document.getElementById(`insp-equipo-${idx}`).value = inspeccionPuntos[idx].equipo;
}

function renderPuntoCheckpoint(idx) {
  const wrap = document.getElementById(`insp-check-wrap-${idx}`);
  const linea = inspeccionPuntos[idx].linea;
  const equipoNombre = inspeccionPuntos[idx].equipo;
  if (!linea || !equipoNombre) { wrap.innerHTML = ''; return; }
  const equipoData = (LINEAS[linea] || []).find(e => e.nombre === equipoNombre);
  if (!equipoData) { wrap.innerHTML = ''; return; }
  const opts = equipoData.checks.map(c => `<option value="${c}">${c}</option>`).join('');
  wrap.innerHTML = `<div class="field"><span class="label">Checkpoint</span>
      <select id="insp-check-${idx}" onchange="onInspCheckChange(${idx})">
        <option value="">— Seleccioná punto —</option>${opts}
      </select></div>`;
  if (inspeccionPuntos[idx].checkpoint) document.getElementById(`insp-check-${idx}`).value = inspeccionPuntos[idx].checkpoint;
}

function renderizarPuntos() {
  const container = document.getElementById('insp-puntos-container');
  container.innerHTML = '';
  inspeccionPuntos.forEach((p, idx) => {
    const lineasOpts = Object.keys(LINEAS).map(l =>
      `<option value="${l}" ${p.linea === l ? 'selected' : ''}>${l}</option>`
    ).join('');
    const div = document.createElement('div');
    div.className = 'insp-punto';
    div.id = `insp-punto-${idx}`;
    div.innerHTML = `
        <div class="insp-punto-header">
          <span class="insp-punto-num">Punto ${idx + 1}</span>
          ${inspeccionPuntos.length > 1
        ? `<button class="insp-btn-del" onclick="eliminarPunto(${idx})" type="button">
                 <span class="material-icons-round" style="font-size:18px;">close</span>
               </button>`
        : ''}
        </div>
        <div class="field">
          <span class="label">Línea</span>
          <select id="insp-linea-${idx}" onchange="onInspLineaChange(${idx})">
            <option value="">— Seleccioná línea —</option>
            ${lineasOpts}
          </select>
        </div>
        <div id="insp-equipo-wrap-${idx}"></div>
        <div id="insp-check-wrap-${idx}"></div>
        <div class="field" style="margin-top:4px;">
          <span class="label">Observación</span>
          <textarea id="insp-obs-${idx}" placeholder="Describí lo que encontraste..." rows="3"
            onchange="onInspObsChange(${idx})" oninput="onInspObsChange(${idx})">${p.observacion}</textarea>
        </div>`;
    container.appendChild(div);
    if (p.linea) renderPuntoEquipo(idx);
    if (p.equipo) renderPuntoCheckpoint(idx);
  });
}

async function enviarInspeccion() {
  const tecnico = app.tecnico?.trim() || app.userName || '';
  const supervisor = app.supervisor?.trim() || '';

  if (!tecnico) {
    mostrarToast('⚠ No se pudo identificar al técnico. Verificá tu sesión.', 'warning');
    return;
  }

  for (let i = 0; i < inspeccionPuntos.length; i++) {
    const p = inspeccionPuntos[i];
    if (!p.linea || !p.equipo || !p.checkpoint || !p.observacion.trim()) {
      mostrarToast(`⚠ Completá todos los campos del Punto ${i + 1}.`, 'warning');
      return;
    }
  }

  const btnEnviar = document.getElementById('insp-btn-enviar');
  btnEnviar.disabled = true;
  btnEnviar.innerHTML = '<span class="material-icons-round" style="animation:spin 1s linear infinite;">sync</span> Enviando...';

  const payload = {
    tipo: 'inspeccion',
    tecnico,
    supervisor,
    fecha: new Date().toISOString(),
    puntos: inspeccionPuntos
  };

  try {
    const formData = new FormData();
    formData.append('payload', JSON.stringify(payload));
    await fetch(apiUrl, { method: 'POST', body: formData, mode: 'no-cors' });
    inspeccionPuntos = [];
    document.getElementById('modalInspeccion').style.display = 'none';
    document.body.style.overflow = '';
    mostrarToast('✓ Inspección enviada correctamente.', 'success');
  } catch (err) {
    mostrarToast('✗ Error al enviar. Revisá conexión.', 'error');
  } finally {
    btnEnviar.disabled = false;
    btnEnviar.innerHTML = '<span class="material-icons-round">send</span> Enviar inspección';
  }
}

function mostrarToast(msg, tipo) {
  let toast = document.getElementById('pmp-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'pmp-toast';
    document.body.appendChild(toast);
  }
  const colores = {
    success: { bg: '#064E3B', border: '#10b981' },
    warning: { bg: '#78350F', border: '#F59E0B' },
    error: { bg: '#7F1D1D', border: '#EF4444' }
  };
  const c = colores[tipo] || colores.success;
  toast.style.cssText = `
      position:fixed; bottom:100px; left:50%; transform:translateX(-50%);
      background:${c.bg}; color:white; padding:14px 24px;
      border-radius:14px; font-weight:700; font-size:14px;
      border-left:4px solid ${c.border};
      box-shadow:0 8px 24px rgba(0,0,0,0.2);
      z-index:99999; opacity:1; transition:opacity 0.4s;
      white-space:nowrap; max-width:90vw;`;
  toast.textContent = msg;
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => { toast.style.opacity = '0'; }, 3000);
}

// ── MIGRACIÓN: limpiar claves fantasma {m:false, c:''} dejadas por versión anterior ──
function limpiarDatosFantasma() {
  const migrado = localStorage.getItem('pmp_migrado_v2');
  if (migrado) return;
  Object.keys(LINEAS).forEach(linea => {
    const key = 'datos_' + linea;
    const raw = localStorage.getItem(key);
    if (!raw) return;
    try {
      const datos = JSON.parse(raw);
      let cambio = false;
      Object.keys(datos).forEach(ei => {
        Object.keys(datos[ei]).forEach(ci => {
          const d = datos[ei][ci];
          if (!d.m && !d.c) { delete datos[ei][ci]; cambio = true; }
        });
        if (Object.keys(datos[ei]).length === 0) { delete datos[ei]; cambio = true; }
      });
      if (cambio) localStorage.setItem(key, JSON.stringify(datos));
    } catch (e) { }
  });
  localStorage.setItem('pmp_migrado_v2', '1');
}

// Cargar datos de repuestos de la línea actual
app.repuestos = JSON.parse(localStorage.getItem('repuestos_' + app.linea) || '{}');
limpiarDatosFantasma();

render();
updateOfflineBanner();
processQueue();
cargarPaniol();

// Reposicionar cualquier dropdown de repuesto visible cuando el teclado aparece/desaparece
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', () => {
    const listas = document.querySelectorAll('.repuesto-sugerencias.visible');
    listas.forEach(lista => {
      const idParts = lista.id.replace('rep-lista-', '').split('-');
      const ei = idParts[0], ci = idParts[1];
      const input = document.getElementById(`rep-input-${ei}-${ci}`);
      if (!input) return;
      const rect = input.getBoundingClientRect();
      const vvOffTop = window.visualViewport.offsetTop;
      const vvOffLeft = window.visualViewport.offsetLeft;
      const vvH = window.visualViewport.height;
      const spaceBelow = vvH - rect.bottom;
      lista.style.left = Math.max(8, rect.left + vvOffLeft) + 'px';
      lista.style.width = rect.width + 'px';
      if (spaceBelow < 150 && rect.top > spaceBelow) {
        lista.style.top = 'auto';
        lista.style.bottom = (vvH - rect.top + vvOffTop + 4) + 'px';
      } else {
        lista.style.top = (rect.bottom + vvOffTop + 4) + 'px';
        lista.style.bottom = 'auto';
      }
    });
  });
}


// ── MÓDULO CORRECTIVOS ───────────────────────────────────────────────────────

const EMAILS_SUPERVISORES = [
  'dariogamba.pilaresca@gmail.com',
  'francopaez.pilaresca@gmail.com',
  'hugoescobar.pilaresca@gmail.com',
  'hectoralegre.pilaresca@gmail.com'
];

let correctivoState = {
  turno: '', linea: '', equipo: '', horaAviso: '', horaInicio: '', horaFin: '',
  descripcion: '', ultimoId: null, enviando: false,
  tipoFalla: '', subtipoFalla: '', otroFalla: '',
  breakdown: false,
  // Para supervisores que no tienen app.tecnico seteado
  tecnicoManual: '', supervisorManual: ''
};

const FALLAS = {
  'Eléctrico': ['Cortocircuito', 'Componente defectuoso / quemado', 'Pérdida de programación', 'Falta de tensión', 'Falso contacto', 'Otro'],
  'Mecánico': ['Atasco / traba', 'Desajuste', 'Falta de alineación', 'Rodamiento en mal estado', 'Desgaste / corrosión', 'Huelgo', 'Rotura', 'Otro'],
  'Neumático': ['Componente defectuoso', 'Accionamiento atascado', 'Falta / pérdida de presión de aire', 'Otro'],
  'Operativo': ['Atasco / traba', 'Desconocimiento', 'Falla en el armado', 'Uso inadecuado', 'Regulación / parametrización', 'Otro']
};

function detectarTurno() {
  const h = new Date().getHours();
  if (h >= 6 && h < 14) return '06 a 14';
  if (h >= 14 && h < 22) return '14 a 22';
  return '22 a 06';
}

// ── PULL-TO-REFRESH ─────────────────────────────────────────────────────────
function _initPullToRefresh(container, onRefresh) {
  let startY = 0;
  let pulling = false;
  let indicator = null;

  function _getIndicator() {
    if (!indicator) {
      indicator = document.createElement('div');
      indicator.id = 'ptr-indicator';
      indicator.style.cssText = [
        'text-align:center', 'padding:0', 'font-size:12px',
        'color:var(--primary)', 'font-weight:700', 'height:0',
        'overflow:hidden', 'transition:height 0.2s, padding 0.2s',
        'display:flex', 'align-items:center', 'justify-content:center', 'gap:6px'
      ].join(';');
      indicator.innerHTML = '<span class="material-icons-round" style="font-size:16px;transition:transform 0.3s;">refresh</span><span>Soltar para actualizar</span>';
      container.prepend(indicator);
    }
    return indicator;
  }

  container.addEventListener('touchstart', e => {
    if (container.scrollTop === 0) { startY = e.touches[0].clientY; pulling = true; }
  }, { passive: true });

  container.addEventListener('touchmove', e => {
    if (!pulling) return;
    const dy = e.touches[0].clientY - startY;
    if (dy > 10 && dy < 80) {
      const ind = _getIndicator();
      ind.style.height = Math.min(dy, 56) + 'px';
      ind.style.padding = '8px 0';
      const icon = ind.querySelector('.material-icons-round');
      if (icon) icon.style.transform = `rotate(${Math.min(dy * 3, 360)}deg)`;
    }
  }, { passive: true });

  container.addEventListener('touchend', e => {
    if (!pulling) return;
    pulling = false;
    const dy = e.changedTouches[0].clientY - startY;
    const ind = document.getElementById('ptr-indicator');
    if (ind) { ind.style.height = '0'; ind.style.padding = '0'; }
    if (dy > 50) {
      mostrarToast('Actualizando...', 'info');
      onRefresh();
    }
    startY = 0;
  }, { passive: true });
}

function renderCorrectivos() {
  const main = document.getElementById('main');
  if (!main) return;
  if (!app.userEmail) { checkLogin(); return; }
  if (!correctivoState.turno) correctivoState.turno = detectarTurno();

  const usuarioCorr = USUARIOS.find(u => u.nombre === app.userName);
  const rolCorr = usuarioCorr?.rol || '';
  const esTecnicoCorr = rolCorr === 'tecnico' || rolCorr === 'admin';
  const esSupCorr = rolCorr === 'supervisor';

  // Auto-pre-fill desde el usuario logueado
  if (esTecnicoCorr) {
    correctivoState.tecnicoManual = app.tecnico || app.userName;
  } else if (app.tecnico) {
    correctivoState.tecnicoManual = app.tecnico;
  }
  if (esSupCorr) {
    correctivoState.supervisorManual = app.userName;
  } else if (app.supervisor) {
    correctivoState.supervisorManual = app.supervisor;
  }

  // Técnico y supervisor efectivos
  const tecEfectivo = correctivoState.tecnicoManual || app.tecnico || '';
  const supEfectivo = correctivoState.supervisorManual || app.supervisor || '';

  // Selector tipo de falla
  const tiposFalla = Object.keys(FALLAS);
  const subtipesActuales = correctivoState.tipoFalla ? FALLAS[correctivoState.tipoFalla] : [];
  const esOtroSub = correctivoState.subtipoFalla === 'Otro';

  let html = `<div class="correctivo-form">
      <h3 style="font-weight:800;font-size:18px;margin-bottom:18px;color:#0f172a;">
        <span class="material-icons-round" style="vertical-align:middle;margin-right:6px;color:var(--primary);">build</span>
        Nuevo Correctivo
      </h3>

      ${/* Técnico */ ''}
      ${esTecnicoCorr
        ? `<div class="field" style="margin-bottom:14px;">
        <label class="label">Técnico</label>
        <input type="text" value="${tecEfectivo}" disabled style="background:#e2e8f0;border:none;font-weight:700;color:var(--primary);">
      </div>`
        : `<div class="field" style="margin-bottom:14px;">
        <label class="label">Técnico *</label>
        <select onchange="correctivoState.tecnicoManual=this.value">
          <option value="">— Seleccioná técnico —</option>
          ${TECNICOS.map(t => `<option ${correctivoState.tecnicoManual === t ? 'selected' : ''}>${t}</option>`).join('')}
        </select>
      </div>`}
      ${/* Supervisor */ ''}
      ${esSupCorr
        ? `<div class="field" style="margin-bottom:14px;">
        <label class="label">Supervisor</label>
        <input type="text" value="${supEfectivo}" disabled style="background:#e2e8f0;border:none;font-weight:700;color:var(--primary);">
      </div>`
        : `<div class="field" style="margin-bottom:14px;">
        <label class="label">Supervisor *</label>
        <select onchange="correctivoState.supervisorManual=this.value">
          <option value="">— Seleccioná supervisor —</option>
          ${SUPERVISORES.map(s => `<option ${correctivoState.supervisorManual === s ? 'selected' : ''}>${s}</option>`).join('')}
        </select>
      </div>`}

      <div class="field" style="margin-bottom:16px;">
        <label class="label">Turno</label>
        <div class="turno-selector">
          ${[['06 a 14', '☀️'], ['14 a 22', '🌤️'], ['22 a 06', '🌙']].map(([val, icon]) =>
    `<button class="turno-btn ${correctivoState.turno === val ? 'activo' : ''}"
              onclick="correctivoState.turno='${val}';renderCorrectivos()">
              <span class="turno-icon">${icon}</span><span>${val}</span>
            </button>`).join('')}
        </div>
      </div>

      <div class="field" style="margin-bottom:14px;">
        <label class="label">Línea / Área</label>
        <select onchange="correctivoState.linea=this.value;correctivoState.equipo='';renderCorrectivos()">
          <option value="">— Seleccioná —</option>
          ${Object.keys(LINEAS).map(l => `<option ${correctivoState.linea === l ? 'selected' : ''}>${l}</option>`).join('')}
        </select>
      </div>

      ${correctivoState.linea ? `
      <div class="field" style="margin-bottom:14px;">
        <label class="label">Equipo</label>
        <select onchange="correctivoState.equipo=this.value">
          <option value="">— Seleccioná equipo —</option>
          ${(LINEAS[correctivoState.linea] || []).map(eq =>
      `<option ${correctivoState.equipo === eq.nombre ? 'selected' : ''}>${eq.nombre}</option>`).join('')}
        </select>
      </div>` : ''}

      <div class="tiempo-inputs" style="margin-bottom:14px;">
        <div class="field">
          <label class="label">Hora Aviso</label>
          <input type="time" value="${correctivoState.horaAviso}" onchange="correctivoState.horaAviso=this.value">
        </div>
        <div class="field">
          <label class="label">Hora Inicio</label>
          <input type="time" value="${correctivoState.horaInicio}" onchange="correctivoState.horaInicio=this.value">
        </div>
        <div class="field">
          <label class="label">Hora Fin</label>
          <input type="time" value="${correctivoState.horaFin}" onchange="correctivoState.horaFin=this.value">
        </div>
      </div>

      <div class="field" style="margin-bottom:14px;">
        <label class="label">Tipo de falla</label>
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;">
          ${tiposFalla.map(tipo => {
        const colores = { 'Eléctrico': '#fef9c3', 'Mecánico': '#fce7f3', 'Neumático': '#e0f2fe', 'Operativo': '#dcfce7' };
        const coloresAct = { 'Eléctrico': '#ca8a04', 'Mecánico': '#be185d', 'Neumático': '#0284c7', 'Operativo': '#16a34a' };
        const activo = correctivoState.tipoFalla === tipo;
        return `<button class="falla-btn ${activo ? 'activo' : ''}" style="padding:10px 8px;border-radius:12px;font-size:13px;font-weight:700;
                      border:2px solid ${activo ? coloresAct[tipo] : '#e2e8f0'};
                      background:${activo ? colores[tipo] : 'white'};
                      color:${activo ? coloresAct[tipo] : '#64748b'};cursor:pointer;transition:all 0.2s;"
              onclick="correctivoState.tipoFalla='${tipo}';correctivoState.subtipoFalla='';correctivoState.otroFalla='';renderCorrectivos()">
              ${tipo}
            </button>`;
      }).join('')}
        </div>
      </div>

      ${correctivoState.tipoFalla ? `
      <div class="field" style="margin-bottom:14px;">
        <label class="label">Subtipo — ${correctivoState.tipoFalla}</label>
        <select onchange="correctivoState.subtipoFalla=this.value;correctivoState.otroFalla='';renderCorrectivos()">
          <option value="">— Seleccioná subcategoría —</option>
          ${subtipesActuales.map(s =>
        `<option ${correctivoState.subtipoFalla === s ? 'selected' : ''}>${s}</option>`).join('')}
        </select>
      </div>
      ${esOtroSub ? `
      <div class="field" style="margin-bottom:14px;">
        <label class="label">Especificá "Otro"</label>
        <input type="text" placeholder="Describí brevemente el tipo de falla..."
          value="${correctivoState.otroFalla}"
          onchange="correctivoState.otroFalla=this.value"
          oninput="correctivoState.otroFalla=this.value">
      </div>` : ''}` : ''}

      <div class="field" style="margin-bottom:18px;">
        <label class="label">Descripción de la intervención</label>
        <textarea placeholder="Describí la falla encontrada y la intervención realizada..." style="min-height:100px;"
          onchange="correctivoState.descripcion=this.value"
          oninput="correctivoState.descripcion=this.value">${correctivoState.descripcion}</textarea>
      </div>

      <div class="field" style="margin-bottom:24px; display:flex; align-items:center; gap:12px; background:#fff1f2; padding:16px; border-radius:12px; border:1px solid #fecaca; cursor:pointer;" onclick="correctivoState.breakdown=!correctivoState.breakdown; renderCorrectivos();">
        <div style="flex:1;">
          <div style="font-weight:800; color:#e11d48; font-size:14px; margin-bottom:4px;">Aplica Breakdown</div>
          <div style="font-size:12px; color:#be185d;">Contá esta intervención como Breakdown.</div>
        </div>
        <div style="width:48px; height:24px; background:${correctivoState.breakdown ? '#e11d48' : '#cbd5e1'}; border-radius:12px; position:relative; transition:0.3s;">
          <div style="width:20px; height:20px; background:white; border-radius:50%; position:absolute; top:2px; left:${correctivoState.breakdown ? '26px' : '2px'}; transition:0.3s; box-shadow:0 1px 3px rgba(0,0,0,0.2);"></div>
        </div>
      </div>

      <button class="btn-guardar" style="width:100%;" onclick="enviarCorrectivo()"
        ${correctivoState.enviando ? 'disabled' : ''}>
        <span class="material-icons-round" style="${correctivoState.enviando ? 'animation:spin 1s linear infinite;' : ''}">
          ${correctivoState.enviando ? 'sync' : 'send'}
        </span>
        ${correctivoState.enviando ? 'Enviando...' : 'Registrar Correctivo'}
      </button>
    </div>`;

  if (correctivoState.ultimoId) {
    html += `<div class="correctivo-id-badge">
        <span class="material-icons-round" style="font-size:28px;opacity:0.8;">check_circle</span>
        <div>
          <div style="font-size:12px;opacity:0.75;margin-bottom:4px;">Correctivo registrado</div>
          <div class="correctivo-id-num">${correctivoState.ultimoId}</div>
          <div style="font-size:12px;opacity:0.7;margin-top:4px;">Pendiente de aprobación</div>
        </div>
      </div>`;
  }

  html += `<div id="correctivos-lista-wrap">
      <div class="dash-empty">
        <span class="material-icons-round" style="display:block;margin-bottom:8px;animation:spin 1s linear infinite;">sync</span>
        Cargando...
      </div>
    </div>`;

  main.innerHTML = html;
  cargarCorrectivosLista(getSemanaISO());
  _initPullToRefresh(main, () => cargarCorrectivosLista(getSemanaISO()));
}

async function cargarCorrectivosLista(semana) {
  const wrap = document.getElementById('correctivos-lista-wrap');
  if (!wrap) return;
  try {
    const url = `${apiUrl}?action=getCorrectivos&email=${encodeURIComponent(app.userEmail)}&semana=${semana}`;
    const res = await fetch(url);
    const json = await res.json();
    if (!json.ok || !json.correctivos?.length) {
      wrap.innerHTML = `<div class="dash-empty">Sin correctivos esta semana.</div>`;
      return;
    }
    const esSup = json.esSupervisor === true;
    const ahora = new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
    wrap.innerHTML = `
        <div class="dash-section-title" style="margin-top:8px; display:flex; justify-content:space-between; align-items:center;">
          <span style="display:flex; align-items:center; gap:6px;">
            <span class="material-icons-round" style="font-size:16px;">list_alt</span>
            Correctivos ${semana}${esSup ? ' <span style="font-size:11px;color:#94a3b8;font-weight:500;">(vista supervisor)</span>' : ''}
          </span>
          <span style="font-size:10px; color:#94a3b8; font-weight:500;">
            <span class="material-icons-round" style="font-size:11px; vertical-align:middle;">schedule</span>
            ${ahora}
          </span>
        </div>
        ${json.correctivos.map(c => renderCorrectivoBadge(c, esSup)).join('')}`;
  } catch (e) {
    wrap.innerHTML = `<div class="dash-empty">No se pudo cargar.</div>`;
  }
}

function renderCorrectivoBadge(c, esSup) {
  const estado = (c.estado || 'Pendiente').toLowerCase();
  const domId = c.id.replace(/-/g, '_');
  const colorFalla = { 'Eléctrico': '#fef9c3', 'Mecánico': '#fce7f3', 'Neumático': '#e0f2fe', 'Operativo': '#dcfce7' };
  const colorFallaText = { 'Eléctrico': '#92400e', 'Mecánico': '#9d174d', 'Neumático': '#075985', 'Operativo': '#14532d' };
  const tf = c.tipoFalla || '';
  return `<div class="correctivo-lista-item ${estado}">
      <div class="correctivo-header-row">
        <span style="font-size:13px;font-weight:800;font-family:monospace;">${c.id}</span>
        <span class="aprobacion-badge ${estado}">${c.estado || 'Pendiente'}</span>
      </div>
      <div style="font-size:14px;font-weight:600;margin-bottom:4px;">${c.linea} · ${c.equipo}</div>
      ${tf ? `<div style="margin-bottom:6px;">
        <span style="display:inline-block;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:800;
                     background:${colorFalla[tf] || '#f1f5f9'};color:${colorFallaText[tf] || '#334155'};">
          ${tf}${c.subtipoFalla ? ' · ' + c.subtipoFalla : ''}
        </span>
      </div>` : ''}
      <div class="correctivo-meta">
        <span>👤 ${c.tecnico}</span>
        <span>⏰ ${c.turno}</span>
        ${c.horaAviso ? `<span>📢 ${c.horaAviso}</span>` : ''}
        ${c.horaInicio ? `<span>▶ ${c.horaInicio}</span>` : ''}
        ${c.horaFin ? `<span>⏹ ${c.horaFin}</span>` : ''}
      </div>
      ${c.descripcion ? `<div style="font-size:13px;color:#475569;margin-top:6px;line-height:1.4;">${c.descripcion}</div>` : ''}
      ${esSup && estado === 'pendiente' ? `
        <div class="correctivo-aprobacion">
          <div style="font-size:12px;font-weight:800;color:#64748b;margin-bottom:10px;text-transform:uppercase;">✅ Aprobación del supervisor</div>
          <div class="tiempo-inputs" style="margin-bottom:10px;">
            <div class="field"><label class="label">Hora Aviso</label>
              <input type="time" id="apr-av-${domId}" value="${c.horaAviso || ''}"></div>
            <div class="field"><label class="label">Hora Inicio</label>
              <input type="time" id="apr-in-${domId}" value="${c.horaInicio || ''}"></div>
            <div class="field"><label class="label">Hora Fin</label>
              <input type="time" id="apr-fi-${domId}" value="${c.horaFin || ''}"></div>
          </div>
          <div class="field" style="margin-bottom:10px;">
            <label class="label">Comentario</label>
            <input type="text" id="apr-com-${domId}" placeholder="Observación opcional...">
          </div>
          <div style="display:flex;gap:8px;">
            <button onclick="aprobarCorrectivo('${c.id}','${domId}',true)"
              style="flex:2;background:#10b981;color:white;border:none;border-radius:12px;
                     padding:12px;font-weight:700;font-size:14px;cursor:pointer;">
              <span class="material-icons-round" style="font-size:16px;vertical-align:middle;">check</span> Aprobar
            </button>
            <button onclick="aprobarCorrectivo('${c.id}','${domId}',false)"
              style="flex:1;background:#fef2f2;color:#ef4444;border:2px solid #fca5a5;
                     border-radius:12px;padding:12px;font-weight:700;font-size:14px;cursor:pointer;">Rechazar</button>
          </div>
        </div>` : ''}
      ${c.comentarioSupervisor && c.comentarioSupervisor !== '' ?
      `<div style="margin-top:8px;padding:8px 12px;background:#f0fdf4;border-radius:8px;
                     font-size:12px;color:#065f46;font-style:italic;">
          💬 ${c.comentarioSupervisor}</div>` : ''}
    </div>`;
}

function calcularDowntime(inicio, fin) {
  if (!inicio || !fin) return 0;
  const [h1, m1] = inicio.split(':').map(Number);
  const [h2, m2] = fin.split(':').map(Number);
  let min1 = h1 * 60 + m1;
  let min2 = h2 * 60 + m2;
  if (min2 < min1) min2 += 24 * 60; // Cruzó la medianoche
  return min2 - min1;
}

async function enviarCorrectivo() {
  const tecEfectivo = app.tecnico || correctivoState.tecnicoManual;
  const supEfectivo = app.supervisor || correctivoState.supervisorManual;

  if (!correctivoState.linea || !correctivoState.equipo) {
    mostrarToast('⚠ Seleccioná línea y equipo.', 'warning'); return;
  }
  if (!tecEfectivo || !supEfectivo) {
    mostrarToast('⚠ Seleccioná técnico y supervisor.', 'warning'); return;
  }
  if (!correctivoState.tipoFalla) {
    mostrarToast('⚠ Seleccioná el tipo de falla.', 'warning'); return;
  }
  if (!correctivoState.subtipoFalla) {
    mostrarToast('⚠ Seleccioná la subcategoría de falla.', 'warning'); return;
  }
  if (correctivoState.subtipoFalla === 'Otro' && !correctivoState.otroFalla.trim()) {
    mostrarToast('⚠ Especificá el tipo de falla en "Otro".', 'warning'); return;
  }
  if (!correctivoState.descripcion.trim()) {
    mostrarToast('⚠ Escribí una descripción.', 'warning'); return;
  }

  correctivoState.enviando = true;
  renderCorrectivos();

  const subtipo = correctivoState.subtipoFalla === 'Otro'
    ? `Otro: ${correctivoState.otroFalla}`
    : correctivoState.subtipoFalla;

  try {
    const res = await fetch(apiUrl, {
      method: 'POST', mode: 'cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'payload=' + encodeURIComponent(JSON.stringify({
        tipo: 'correctivo', fecha: new Date().toISOString(),
        turno: correctivoState.turno,
        linea: correctivoState.linea,
        equipo: correctivoState.equipo,
        tecnico: tecEfectivo,
        supervisor: supEfectivo,
        horaAviso: correctivoState.horaAviso,
        horaInicio: correctivoState.horaInicio,
        horaFin: correctivoState.horaFin,
        tipoFalla: correctivoState.tipoFalla,
        subtipoFalla: subtipo,
        descripcion: correctivoState.descripcion,
        breakdown: correctivoState.breakdown,
        downtimeMinutos: calcularDowntime(correctivoState.horaInicio, correctivoState.horaFin)
      }))
    });
    const json = await res.json();
    correctivoState.ultimoId = json.id || null;
    correctivoState.descripcion = '';
    correctivoState.horaAviso = '';
    correctivoState.horaInicio = '';
    correctivoState.horaFin = '';
    correctivoState.equipo = '';
    correctivoState.tipoFalla = '';
    correctivoState.subtipoFalla = '';
    correctivoState.otroFalla = '';
    mostrarToast(`✓ Correctivo ${json.id} registrado.`, 'success');
  } catch (e) { mostrarToast('Error al registrar.', 'error'); }
  finally { correctivoState.enviando = false; renderCorrectivos(); }
}

async function aprobarCorrectivo(corId, domId, aprobado) {
  const payload = {
    tipo: 'aprobarCorrectivo', id: corId, aprobado,
    supervisor: app.userEmail,
    horaAviso: document.getElementById(`apr-av-${domId}`)?.value || '',
    horaInicio: document.getElementById(`apr-in-${domId}`)?.value || '',
    horaFin: document.getElementById(`apr-fi-${domId}`)?.value || '',
    comentario: document.getElementById(`apr-com-${domId}`)?.value || ''
  };
  try {
    await fetch(apiUrl, {
      method: 'POST', mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'payload=' + encodeURIComponent(JSON.stringify(payload))
    });
    mostrarToast(aprobado ? `✓ ${corId} aprobado.` : `${corId} rechazado.`, aprobado ? 'success' : 'warning');
    renderCorrectivos();
  } catch (e) { mostrarToast('Error al enviar aprobación.', 'error'); }
}


// ── MÓDULO SUPERVISORES (DASHBOARD) ──────────────────────────────────────────

let dashState = { loggedIn: false, email: '', periodo: 'semana', datos: null, cargando: false, ultimaActualizacion: null };

function renderSupervisores() {
  const main = document.getElementById('main');
  if (!main) return;
  if (!dashState.loggedIn) {
    main.innerHTML = `<div class="dash-login-wrap">
        <div style="background:#dbeafe;width:72px;height:72px;border-radius:50%;
                    display:flex;align-items:center;justify-content:center;margin:0 auto 20px;">
          <span class="material-icons-round" style="font-size:36px;color:#1e40af;">bar_chart</span>
        </div>
        <h2 style="font-weight:800;font-size:22px;margin-bottom:8px;">Dashboard Supervisores</h2>
        <p style="color:#64748b;font-size:14px;margin-bottom:28px;">Acceso exclusivo para supervisores.</p>
        <div class="field" style="margin-bottom:14px;text-align:left;">
          <label class="label">Correo electrónico</label>
          <input type="email" id="dash-email-input" placeholder="supervisor@pilaresca.com.ar"
            onkeydown="if(event.key==='Enter') loginDashboard()">
        </div>
        <button class="btn-guardar" onclick="loginDashboard()" style="width:100%;background:#1e40af;">
          <span class="material-icons-round">login</span> Ingresar
        </button>
      </div>`;
    return;
  }
  if (dashState.cargando) {
    main.innerHTML = `<div class="dash-empty" style="padding:60px 20px;">
        <span class="material-icons-round" style="font-size:48px;display:block;margin-bottom:12px;animation:spin 1s linear infinite;">sync</span>
        Cargando datos...
      </div>`;
    return;
  }
  const d = dashState.datos;
  if (!d) {
    main.innerHTML = `<div class="dash-empty">No se pudieron cargar los datos.<br>
        <button class="btn-guardar" onclick="cargarDashboard()"
          style="margin:16px auto;width:auto;padding:12px 24px;background:#1e40af;">Reintentar</button></div>`;
    return;
  }

  const semAct = getSemanaISO(); const semAnt = getSemanaAnterior();
  const rSem = d.rutinas?.porSemana?.[semAct] || { total: 0, novedades: 0, ok: 0 };
  const rSemAnt = d.rutinas?.porSemana?.[semAnt] || { total: 0, novedades: 0, ok: 0 };
  const cSem = d.correctivos?.porSemana?.[semAct] || { total: 0, pendientes: 0 };
  const cumplAct = rSem.total ? Math.round((rSem.ok / rSem.total) * 100) : 0;
  const cumplAnt = rSemAnt.total ? Math.round((rSemAnt.ok / rSemAnt.total) * 100) : 0;
  const delta = cumplAct - cumplAnt;

  let html = `<div class="dash-header">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
        <div>
          <div style="font-size:18px;font-weight:800;display:flex;align-items:center;gap:8px;">
            <span class="material-icons-round" style="font-size:20px;">bar_chart</span> Dashboard PMP
            ${dashState.ultimaActualizacion ? `<span style="font-size:10px;color:#94a3b8;font-weight:500;margin-left:8px;"><span class="material-icons-round" style="font-size:11px;vertical-align:middle;">schedule</span> ${dashState.ultimaActualizacion}</span>` : ''}
          </div>
          <div style="font-size:11px;opacity:0.75;margin-top:4px;">${dashState.nombre || dashState.email}</div>
        </div>
        <div style="display:flex;gap:6px;flex-shrink:0;">
          <button onclick="cargarDashboard()"
            style="background:rgba(255,255,255,0.2);border:none;border-radius:10px;
                   width:36px;height:36px;padding:0;color:white;cursor:pointer;
                   display:flex;align-items:center;justify-content:center;">
            <span class="material-icons-round" style="font-size:18px;">refresh</span></button>
          <button onclick="dashState.loggedIn=false;renderSupervisores();"
            style="background:rgba(255,255,255,0.15);border:none;border-radius:10px;
                   width:36px;height:36px;padding:0;color:white;cursor:pointer;
                   display:flex;align-items:center;justify-content:center;">
            <span class="material-icons-round" style="font-size:18px;">logout</span></button>
        </div>
      </div>
    </div>
    <div class="dash-period-tabs">
      ${[['semana', 'Semana'], ['comparativa', 'Comparativa'], ['mes', 'Mes'], ['predictivo', 'Predictivo']].map(([val, lbl]) =>
    `<button class="dash-period-btn ${dashState.periodo === val ? 'activo' : ''}"
          onclick="dashState.periodo='${val}';renderSupervisores()">${lbl}</button>`).join('')}
    </div>`;

  if (dashState.periodo === 'semana' || dashState.periodo === 'comparativa') {
    html += `<div class="dash-kpi-grid">
        <div class="dash-kpi">
          <div class="dash-kpi-num" style="color:#10b981;">${cumplAct}%</div>
          <div class="dash-kpi-label">Cumplimiento</div>
          <div class="dash-kpi-delta ${delta > 0 ? 'sube' : delta < 0 ? 'baja' : 'igual'}">${delta >= 0 ? '▲' : '▼'}${Math.abs(delta)}% sem.ant.</div>
        </div>
        <div class="dash-kpi">
          <div class="dash-kpi-num" style="color:#ef4444;">${rSem.novedades}</div>
          <div class="dash-kpi-label">Novedades</div>
          <div class="dash-kpi-delta igual">${semAct}</div>
        </div>
        <div class="dash-kpi">
          <div class="dash-kpi-num" style="color:#3b82f6;">${cSem.total}</div>
          <div class="dash-kpi-label">Correctivos</div>
          <div class="dash-kpi-delta ${(cSem.pendientes || 0) > 0 ? 'baja' : 'igual'}">${cSem.pendientes || 0} pendientes</div>
        </div>
        <div class="dash-kpi">
          <div class="dash-kpi-num" style="color:#f59e0b;">${rSem.total}</div>
          <div class="dash-kpi-label">Registros</div>
          <div class="dash-kpi-delta igual">sem. actual</div>
        </div>
      </div>`;

    if (dashState.periodo === 'comparativa') {
      const items = [['Total', rSem.total, rSemAnt.total, false], ['Novedades', rSem.novedades, rSemAnt.novedades, true], ['Sin novedad', rSem.ok, rSemAnt.ok, false]];
      html += `<div class="dash-section">
          <div class="dash-section-title"><span class="material-icons-round" style="font-size:16px;">compare_arrows</span> Comparativa semanal</div>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:8px;">
            <div style="font-size:11px;font-weight:700;color:#94a3b8;">Métrica</div>
            <div style="font-size:11px;font-weight:700;color:#1e40af;text-align:center;">${semAct}</div>
            <div style="font-size:11px;font-weight:700;color:#94a3b8;text-align:center;">${semAnt}</div>
          </div>
          ${items.map(([label, act, ant, inv]) => {
        const dlt = act - ant; const mejor = inv ? dlt < 0 : dlt > 0;
        const col = dlt === 0 ? '#94a3b8' : mejor ? '#10b981' : '#ef4444';
        return `<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;padding:8px 0;border-bottom:1px solid #f1f5f9;">
              <div style="font-size:12px;color:#334155;font-weight:600;">${label}</div>
              <div style="font-size:16px;font-weight:800;text-align:center;">${act}</div>
              <div style="font-size:14px;font-weight:700;color:#64748b;text-align:center;">${ant}
                <span style="font-size:11px;color:${col};">${dlt >= 0 ? '▲' : '▼'}${Math.abs(dlt)}</span>
              </div></div>`;
      }).join('')}
        </div>`;
    }

    const lineas = d.rutinas?.porSemana?.[semAct]?.lineas || {};
    if (Object.keys(lineas).length) {
      html += `<div class="dash-section" style="padding-bottom: 24px;">
          <div class="dash-section-title"><span class="material-icons-round" style="font-size:16px;">factory</span> Novedades por Línea — ${semAct}</div>
          <canvas id="chartLineas" width="100%" height="220"></canvas>
        </div>`;
    }

    const tecs = d.rutinas?.porSemana?.[semAct]?.tecnicos || {};
    if (Object.keys(tecs).length) {
      html += `<div class="dash-section" style="padding-bottom: 24px;">
          <div class="dash-section-title"><span class="material-icons-round" style="font-size:16px;">engineering</span> Novedades por Técnico</div>
          <canvas id="chartTecnicos" width="100%" height="220"></canvas>
        </div>`;
    }

    const checks = d.rutinas?.porSemana?.[semAct]?.checkpoints || {};
    const top5 = Object.entries(checks).sort((a, b) => b[1] - a[1]).slice(0, 5);
    if (top5.length) {
      html += `<div class="dash-section">
          <div class="dash-section-title"><span class="material-icons-round" style="font-size:16px;">warning</span> Puntos críticos frecuentes</div>
          ${top5.map(([cp, cnt], i) => `
            <div class="check-list-item">
              <span class="check-list-num">${i + 1}.</span>
              <span style="flex:1;font-size:12px;">${cp.length > 60 ? cp.slice(0, 60) + '…' : cp}</span>
              <span style="font-weight:800;color:#ef4444;margin-left:8px;">${cnt}×</span>
            </div>`).join('')}
        </div>`;
    }

    const topRep = d.repuestos?.topCodigos || [];
    if (topRep.length) {
      html += `<div class="dash-section">
          <div class="dash-section-title"><span class="material-icons-round" style="font-size:16px;">inventory</span> Repuestos más solicitados</div>
          ${topRep.slice(0, 5).map((r, i) => `
            <div class="check-list-item">
              <span class="check-list-num">${i + 1}.</span>
              <span style="flex:1;font-size:11px;"><b style="color:#059669;">${r.codigo}</b> ${(r.desc || '').slice(0, 40)}</span>
              <span style="font-weight:800;color:#f59e0b;margin-left:8px;">${r.total}u</span>
            </div>`).join('')}
        </div>`;
    }

    const porTurno = d.correctivos?.porTurno || {};
    if (Object.keys(porTurno).length) {
      const maxTu = Math.max(...Object.values(porTurno), 1);
      html += `<div class="dash-section">
          <div class="dash-section-title"><span class="material-icons-round" style="font-size:16px;">schedule</span> Correctivos por turno</div>
          <div class="bar-chart-wrap">${[['06 a 14', '☀️'], ['14 a 22', '🌤️'], ['22 a 06', '🌙']].map(([t, ic]) => {
        const v = porTurno[t] || 0; const pct = Math.round((v / maxTu) * 100);
        return `<div class="bar-row">
              <div class="bar-label">${ic} ${t}</div>
              <div class="bar-track"><div class="bar-fill amarillo" style="width:${pct}%;">${v}</div></div>
              <div class="bar-val">${v}</div>
            </div>`;
      }).join('')}
          </div>
        </div>`;
    }

  } else if (dashState.periodo === 'mes') {
    const porMes = d.rutinas?.porMes || {};
    const meses = Object.entries(porMes).sort((a, b) => a[0].localeCompare(b[0])).slice(-6);
    if (meses.length) {
      const maxM = Math.max(...meses.map(([, v]) => v.total), 1);
      html += `<div class="dash-section">
          <div class="dash-section-title"><span class="material-icons-round" style="font-size:16px;">calendar_month</span> Cumplimiento mensual</div>
          <div class="bar-chart-wrap">${meses.map(([mes, v]) => {
        const pct = Math.round((v.total / maxM) * 100);
        const cumpl = v.total ? Math.round((v.ok / v.total) * 100) : 0;
        return `<div class="bar-row">
              <div class="bar-label" style="font-size:11px;">${mes}</div>
              <div class="bar-track"><div class="bar-fill ${cumpl < 70 ? 'rojo' : 'verde'}" style="width:${pct}%;">${v.total}</div></div>
              <div class="bar-val">${cumpl}%</div>
            </div>`;
      }).join('')}
          </div>
        </div>`;
      const mesKey = new Date().getFullYear() + '-' + String(new Date().getMonth() + 1).padStart(2, '0');
      const mAct = porMes[mesKey] || { total: 0, novedades: 0, ok: 0 };
      const cumplM = mAct.total ? Math.round((mAct.ok / mAct.total) * 100) : 0;
      html += `<div class="dash-kpi-grid" style="margin-top:16px;">
          <div class="dash-kpi">
            <div class="dash-kpi-num" style="color:#10b981;">${cumplM}%</div>
            <div class="dash-kpi-label">Cumplimiento ${mesKey}</div>
          </div>
          <div class="dash-kpi">
            <div class="dash-kpi-num" style="color:#ef4444;">${mAct.novedades}</div>
            <div class="dash-kpi-label">Novedades mes</div>
          </div>
        </div>`;
    } else {
      html += `<div class="dash-empty">Sin datos mensuales aún.</div>`;
    }
  } else if (dashState.periodo === 'predictivo') {
    const riesgos = d.predictivo?.riesgosEquipo || {};
    // Equipos con más de 2 fallas en total (rutinas + correctivos)
    const equiposRiesgo = Object.values(riesgos).sort((a, b) => b.total - a.total).filter(e => e.total >= 2);

    html += `<div class="dash-section" style="background: linear-gradient(to bottom right, #ffffff, #fff1f2); border-color: #fecaca;" data-predictivo="true">
        <div class="dash-section-title" style="color: #9f1239;">
          <span class="material-icons-round" style="font-size:18px;">auto_graph</span> Mantenimiento Predictivo
        </div>
        <p style="font-size:13px; color:#475569; margin-bottom:16px;">El sistema ha detectado patrones de falla repetitivos en los siguientes equipos. Se sugiere una revisión preventiva urgente.</p>
        
        <div class="dash-chart-container" style="height:350px; margin-bottom: 24px; border: 1px solid #fecaca; border-radius: 12px; background: white; padding: 12px;">
          <canvas id="chartPredictivo"></canvas>
        </div>
        `;

    if (equiposRiesgo.length) {
      html += equiposRiesgo.map(eq => {
        const olvidado = eq.rutinas >= 2 && eq.correctivos === 0;
        return `<div class="check-list-item" style="background:white; padding:14px; border-radius:12px; margin-bottom:10px; border: 1px solid ${olvidado ? '#f59e0b' : '#fecaca'}; box-shadow: 0 4px 12px rgba(225,29,72,0.05);">
            <div style="display:flex; align-items:center; gap:12px; width:100%;">
              <div style="background:${olvidado ? '#fef3c7' : '#ffe4e6'}; border-radius:50%; width:40px; height:40px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                <span class="material-icons-round" style="color:${olvidado ? '#d97706' : '#e11d48'};">${olvidado ? 'priority_high' : 'warning'}</span>
              </div>
              <div style="flex:1;">
                <div style="font-size:14px; font-weight:800; color:${olvidado ? '#92400e' : '#881337'};">${eq.linea} · ${eq.equipo}</div>
                <div style="font-size:12px; color:${olvidado ? '#b45309' : '#be123c'}; margin-top:2px; font-weight:600;">
                  ${eq.rutinas} Novedades | ${eq.correctivos} Correctivos
                </div>
                ${olvidado ? '<div style="font-size:11px; color:#d97706; margin-top:4px; font-weight:800;">⚠ Atento: Reportado sin correctivo</div>' : ''}
              </div>
              <div style="text-align:right;">
                <div style="font-weight:800; color:${olvidado ? '#d97706' : '#e11d48'}; font-size:22px;">${eq.total}</div>
                <div style="font-size:10px; color:${olvidado ? '#b45309' : '#9f1239'}; text-transform:uppercase; font-weight:700;">Alertas</div>
              </div>
            </div>
          </div>`;
      }).join('');
    } else {
      html += `<div class="predictivo-empty" style="text-align:center; padding:32px 20px; background:white; border-radius:12px; border:1px solid #e2e8f0;">
          <span class="material-icons-round" style="font-size:32px; color:#10b981; margin-bottom:8px; display:block;">check_circle</span>
          No se detectaron patrones de riesgo inminente.
        </div>`;
    }
    html += `</div>`;

    html += `<div class="dash-section" data-predictivo="true">
        <div class="dash-section-title"><span class="material-icons-round" style="font-size:16px;">precision_manufacturing</span> Tiempos Muertos — Breakdown Mensual</div>
        <p style="font-size:12px; color:#64748b; margin-bottom:8px;">
          Minutos de parada acumulados por mes (todas las líneas). La línea roja marca el centerline: <strong>40 h = 2.400 min/mes</strong>.
        </p>
        <div class="dash-chart-container" style="height:260px; margin-bottom:16px;">
          <canvas id="chartBreakdown"></canvas>
        </div>
        <div id="breakdownEquipos"></div>
      </div>`;
  }
  main.innerHTML = html;

  if (dashState.periodo === 'semana' || dashState.periodo === 'predictivo') {
    setTimeout(renderDashboardCharts, 50);
  }
}

function getSemanaAnterior() {
  const d = new Date(); d.setDate(d.getDate() - 7);
  return getSemanaISO(d);
}

function loginDashboard() {
  const input = document.getElementById('dash-email-input');
  if (!input) return;
  const em = input.value.trim().toLowerCase();
  if (!em.includes('@')) { mostrarToast('Email inválido.', 'warning'); return; }
  if (!EMAILS_SUPERVISORES.includes(em)) { mostrarToast('⚠ No autorizado.', 'error'); return; }
  dashState.loggedIn = true; dashState.email = em;
  renderSupervisores();
  cargarDashboard();
}

async function cargarDashboard() {
  dashState.cargando = true; renderSupervisores();
  try {
    const semana = getSemanaISO(); const semAnt = getSemanaAnterior();
    const mes = new Date().getFullYear() + '-' + String(new Date().getMonth() + 1).padStart(2, '0');
    const url = `${apiUrl}?action=getDashboard&semana=${semana}&semanaAnterior=${semAnt}&mes=${mes}&supervisor=${encodeURIComponent(dashState.email)}`;
    const res = await fetch(url); const json = await res.json();
    dashState.datos = json.ok ? json : null;

    if (json.ok && json.predictivo && json.predictivo.riesgosEquipo) {
      const riesgos = Object.values(json.predictivo.riesgosEquipo).filter(e => e.total >= 2);
      const olvidados = Object.values(json.predictivo.riesgosEquipo).filter(e => e.rutinas >= 2 && e.correctivos === 0);

      if (olvidados.length > 0) {
        setTimeout(() => {
          mostrarToast(`⚠ Predictivo: ¡Atento! ${olvidados.length} equipo(s) con fallas reiteradas SIN correctivo.`, 'warning');
        }, 500);
      } else if (riesgos.length > 0) {
        setTimeout(() => {
          mostrarToast(`⚠ Predictivo: ${riesgos.length} equipo(s) en riesgo detectado(s). Revisar pestaña Predictivo.`, 'error');
        }, 500);
      }
    }
  } catch (e) { dashState.datos = null; }
  finally {
    dashState.cargando = false;
    dashState.ultimaActualizacion = new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
    renderSupervisores();
  }
}

const EMAILS_PANIOL = [
  'hectoralegre.pilaresca@gmail.com',
  'alan.barraza@pilaresca.com.ar',
  'franco.sanabria@pilaresca.com.ar',
  'hugoescobar.pilaresca@gmail.com',
  'francopaez.pilaresca@gmail.com',
  'dariogamba.pilaresca@gmail.com'
];

let paniolState = {
  loggedIn: false,
  email: '',
  filtroLinea: '',
  filtroEquipo: '',
  filtroTecnico: '',
  editandoIdx: null,
  pedidos: []
};

async function cargarPedidosPaniol() {
  try {
    const url = apiUrl + '?action=getPedidos&semana=' + getSemanaISO();
    const res = await fetch(url);
    const json = await res.json();
    if (json && Array.isArray(json.pedidos)) {
      paniolState.pedidos = json.pedidos;
    }
  } catch (e) {
    const cached = localStorage.getItem('paniol_pedidos_cache');
    if (cached) paniolState.pedidos = JSON.parse(cached);
  }
  renderPaniol();
}

function getSemanaISO(fecha) {
  // Usa Intl para calculo correcto ISO 8601 -- robusto en semana 52/53
  const d = fecha ? new Date(fecha) : new Date();
  const fmt = new Intl.DateTimeFormat('en', { weekYear: 'numeric', week: 'numeric' });
  const parts = fmt.formatToParts(d);
  const year = parts.find(p => p.type === 'weekYear')?.value;
  const week = parts.find(p => p.type === 'week')?.value?.padStart(2, '0');
  return `${year}-W${week}`;
}

async function guardarEdicionPedido(idx) {
  const p = paniolState.pedidos[idx];
  const cantInput = document.getElementById('paniol-edit-cant');
  const codInput = document.getElementById('paniol-edit-cod');
  const descInput = document.getElementById('paniol-edit-desc');
  const notaInput = document.getElementById('paniol-edit-nota');
  const estadoSel = document.getElementById('paniol-edit-estado');

  if (cantInput) p.cantidad = cantInput.value.trim() || p.cantidad;
  if (codInput) p.codigo = codInput.value.trim() || p.codigo;
  if (descInput) p.descripcion = descInput.value.trim() || p.descripcion;
  if (notaInput) p.nota = notaInput.value.trim();
  if (estadoSel) p.estado = estadoSel.value;

  paniolState.pedidos[idx] = p;
  paniolState.editandoIdx = null;

  localStorage.setItem('paniol_pedidos_cache', JSON.stringify(paniolState.pedidos));

  try {
    await fetch(apiUrl, {
      method: 'POST', mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'payload=' + encodeURIComponent(JSON.stringify({
        tipo: 'editarPedido',
        editor: paniolState.email,
        pedido: p
      }))
    });
  } catch (e) { }

  renderPaniol();
}

function descargarExcelPaniol() {
  const pedidos = pedidosFiltrados();
  if (!pedidos.length) { mostrarToast('No hay pedidos para descargar.', 'warning'); return; }

  const sep = ';';
  const bom = '\uFEFF';
  const cabecera = ['Semana', 'Fecha', 'Línea', 'Equipo', 'Técnico', 'Código', 'Descripción', 'Cantidad', 'Nota', 'Estado'].join(sep);
  const filas = pedidos.map(p => [
    p.semana || getSemanaISO(),
    p.fecha || '',
    p.linea || '',
    p.equipo || '',
    p.tecnico || '',
    p.codigo || '',
    (p.descripcion || '').replace(/;/g, ','),
    p.cantidad || '1',
    (p.nota || '').replace(/;/g, ','),
    p.estado || 'Pendiente'
  ].join(sep));

  const csv = bom + cabecera + '\n' + filas.join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `pedidos-paniol-${getSemanaISO()}.csv`;
  a.click();
  mostrarToast('✓ Descarga iniciada.', 'success');
}

function pedidosFiltrados() {
  return paniolState.pedidos.filter(p => {
    if (paniolState.filtroLinea && p.linea !== paniolState.filtroLinea) return false;
    if (paniolState.filtroEquipo && p.equipo !== paniolState.filtroEquipo) return false;
    if (paniolState.filtroTecnico && p.tecnico !== paniolState.filtroTecnico) return false;
    return true;
  });
}

function onPaniolFiltro(campo, val) {
  paniolState[campo] = val;
  if (campo === 'filtroLinea') {
    paniolState.filtroEquipo = '';
  }
  paniolState.editandoIdx = null;
  renderPaniol();
}

function renderPaniol() {
  const main = document.getElementById('main');
  if (!main) return;

  if (!paniolState.loggedIn) {
    main.innerHTML = `
        <div class="paniol-login-wrap">
          <div style="background:#ecfdf5; width:72px; height:72px; border-radius:50%;
                      display:flex; align-items:center; justify-content:center; margin:0 auto 20px;">
            <span class="material-icons-round" style="font-size:36px; color:#10b981;">inventory_2</span>
          </div>
          <h2 style="font-weight:800; font-size:22px; margin-bottom:8px;">Acceso Pañol</h2>
          <p style="color:#64748b; font-size:14px; margin-bottom:28px;">
            Ingresá con tu correo habilitado para ver y gestionar los pedidos de repuestos.
          </p>
          <div class="field" style="margin-bottom:14px; text-align:left;">
            <label class="label">Correo electrónico</label>
            <input type="email" id="paniol-email-input"
              placeholder="tu_correo@gmail.com"
              onkeydown="if(event.key==='Enter') loginPaniol()"
              style="margin-bottom:0;">
          </div>
          <button class="btn-guardar" onclick="loginPaniol()" style="width:100%; margin-top:4px;">
            <span class="material-icons-round">login</span> Ingresar
          </button>
          <p style="font-size:12px; color:#94a3b8; margin-top:20px;">
            Solo emails autorizados por el supervisor de planta.
          </p>
        </div>`;
    return;
  }

  const pedidos = pedidosFiltrados();
  const todasLineas = [...new Set(paniolState.pedidos.map(p => p.linea).filter(Boolean))].sort();
  const todosEquipos = [...new Set(
    paniolState.pedidos
      .filter(p => !paniolState.filtroLinea || p.linea === paniolState.filtroLinea)
      .map(p => p.equipo).filter(Boolean)
  )].sort();
  const todosTecnicos = [...new Set(paniolState.pedidos.map(p => p.tecnico).filter(Boolean))].sort();

  let html = `
    <div class="paniol-header-badge">
      <div style="flex:1; min-width:0;">
        <div style="font-size:18px; font-weight:800; display:flex; align-items:center; gap:8px;">
          <span class="material-icons-round" style="font-size:20px;">inventory_2</span>
          Pedidos de Pañol
        </div>
        <div style="font-size:11px; opacity:.75; margin-top:5px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
          Semana ${getSemanaISO()} · ${paniolState.nombre || paniolState.email}
        </div>
      </div>
      <div style="display:flex; gap:6px; align-items:center; flex-shrink:0; margin-left:12px;">
        <button onclick="cargarPedidosPaniol()" title="Actualizar"
          style="background:rgba(255,255,255,0.2); border:none; border-radius:10px;
                 width:40px; height:40px; padding:0; color:white; cursor:pointer;
                 display:flex; align-items:center; justify-content:center; flex-shrink:0;">
          <span class="material-icons-round" style="font-size:20px;">refresh</span>
        </button>
        <button onclick="descargarExcelPaniol()" title="Descargar Excel"
          style="background:rgba(255,255,255,0.2); border:none; border-radius:10px;
                 height:40px; padding:0 14px; color:white; font-weight:700; font-size:13px; cursor:pointer;
                 display:flex; align-items:center; gap:6px; flex-shrink:0; white-space:nowrap;">
          <span class="material-icons-round" style="font-size:18px;">download</span>
          <span class="paniol-excel-label">Excel</span>
        </button>
        <button onclick="logoutUsuario()" title="Cerrar sesión"
          style="background:rgba(255,255,255,0.15); border:none; border-radius:10px;
                 width:40px; height:40px; padding:0; color:white; cursor:pointer;
                 display:flex; align-items:center; justify-content:center; flex-shrink:0;">
          <span class="material-icons-round" style="font-size:18px;">logout</span>
        </button>
      </div>
    </div>

    <div class="paniol-filtros">
      <div class="field">
        <label class="label">Línea</label>
        <select onchange="onPaniolFiltro('filtroLinea', this.value)">
          <option value="">Todas</option>
          ${todasLineas.map(l => `<option ${paniolState.filtroLinea === l ? 'selected' : ''} value="${l}">${l}</option>`).join('')}
        </select>
      </div>
      <div class="field">
        <label class="label">Equipo</label>
        <select onchange="onPaniolFiltro('filtroEquipo', this.value)">
          <option value="">Todos</option>
          ${todosEquipos.map(e => `<option ${paniolState.filtroEquipo === e ? 'selected' : ''} value="${e}">${e}</option>`).join('')}
        </select>
      </div>
      <div class="field">
        <label class="label">Técnico</label>
        <select onchange="onPaniolFiltro('filtroTecnico', this.value)">
          <option value="">Todos</option>
          ${todosTecnicos.map(t => `<option ${paniolState.filtroTecnico === t ? 'selected' : ''} value="${t}">${t}</option>`).join('')}
        </select>
      </div>
    </div>`;

  if (!pedidos.length) {
    html += `<div class="paniol-table-wrap">
        <div class="paniol-empty">
          <span class="material-icons-round" style="font-size:48px; display:block; margin-bottom:12px;">inventory_2</span>
          <p style="font-size:15px; font-weight:600;">Sin pedidos para esta semana</p>
          <p style="font-size:13px; margin-top:6px;">Los pedidos generados en las rutinas aparecerán acá.</p>
        </div>
      </div>`;
  } else {
    html += `<div class="paniol-table-wrap" style="overflow-x:auto;">
        <table class="paniol-table">
          <thead>
            <tr>
              <th>Línea / Equipo</th>
              <th>Técnico</th>
              <th>Código</th>
              <th>Descripción</th>
              <th>Cant.</th>
              <th>Nota</th>
              <th>Estado</th>
              <th style="width:48px;"></th>
            </tr>
          </thead>
          <tbody>`;

    pedidos.forEach((p, i) => {
      const realIdx = paniolState.pedidos.indexOf(p);
      const esEdicion = paniolState.editandoIdx === realIdx;
      const estadoClass = {
        'Pendiente': 'paniol-estado-pendiente',
        'Entregado': 'paniol-estado-entregado',
        'Observado': 'paniol-estado-observado',
        'Vencido': 'paniol-estado-vencido'
      }[p.estado] || 'paniol-estado-pendiente';

      if (esEdicion) {
        html += `<tr class="paniol-edit-row">
            <td>
              <div class="paniol-badge-linea">${p.linea || '—'}</div>
              <div style="font-size:12px; color:#64748b; margin-top:4px;">${p.equipo || ''}</div>
            </td>
            <td style="font-size:12px;">${p.tecnico || '—'}</td>
            <td><input class="paniol-edit-input" id="paniol-edit-cod"
              value="${p.codigo || ''}" style="width:110px;"></td>
            <td><input class="paniol-edit-input" id="paniol-edit-desc"
              value="${p.descripcion || ''}" style="min-width:160px;"></td>
            <td><input class="paniol-edit-input" id="paniol-edit-cant"
              value="${p.cantidad || '1'}" style="width:54px;"></td>
            <td><input class="paniol-edit-input" id="paniol-edit-nota"
              value="${p.nota || ''}" style="min-width:120px;"></td>
            <td>
              <select class="paniol-edit-input" id="paniol-edit-estado" style="width:110px;">
                <option ${p.estado === 'Pendiente' ? 'selected' : ''}>Pendiente</option>
                <option ${p.estado === 'Entregado' ? 'selected' : ''}>Entregado</option>
                <option ${p.estado === 'Observado' ? 'selected' : ''}>Observado</option>
                <option ${p.estado === 'Vencido' ? 'selected' : ''}>Vencido</option>
              </select>
            </td>
            <td>
              <button onclick="guardarEdicionPedido(${realIdx})"
                style="background:#10b981; color:white; border:none; border-radius:8px;
                       padding:6px 10px; font-size:12px; font-weight:700; cursor:pointer; white-space:nowrap;">
                <span class="material-icons-round" style="font-size:16px; vertical-align:middle;">check</span>
              </button>
              <button onclick="paniolState.editandoIdx=null; renderPaniol();"
                style="background:#f1f5f9; color:#475569; border:none; border-radius:8px;
                       padding:6px 8px; font-size:12px; font-weight:700; cursor:pointer; margin-top:4px;">
                <span class="material-icons-round" style="font-size:16px; vertical-align:middle;">close</span>
              </button>
            </td>
          </tr>`;
      } else {
        html += `<tr>
            <td>
              <div class="paniol-badge-linea">${p.linea || '—'}</div>
              <div style="font-size:12px; color:#64748b; margin-top:4px;">${p.equipo || ''}</div>
            </td>
            <td style="font-size:12px;">${p.tecnico || '—'}</td>
            <td style="font-weight:800; color:#059669; font-size:12px;">${p.codigo || '—'}</td>
            <td style="max-width:200px;">${p.descripcion || '—'}</td>
            <td style="font-weight:700; text-align:center;">${p.cantidad || '1'}</td>
            <td style="font-size:12px; color:#64748b; font-style:italic;">${p.nota || ''}</td>
            <td><span class="paniol-badge-estado ${estadoClass}">${p.estado || 'Pendiente'}</span></td>
            <td>
              <button onclick="paniolState.editandoIdx=${realIdx}; renderPaniol();"
                style="background:#f1f5f9; color:#475569; border:none; border-radius:8px;
                       width:34px; height:34px; padding:0; cursor:pointer;
                       display:flex; align-items:center; justify-content:center;">
                <span class="material-icons-round" style="font-size:16px;">edit</span>
              </button>
            </td>
          </tr>`;
      }
    });

    html += `</tbody></table></div>`;
  }

  main.innerHTML = html;
}

function loginPaniol() {
  const emailInput = document.getElementById('paniol-email-input');
  if (!emailInput) return;
  const em = emailInput.value.trim().toLowerCase();
  if (!em.includes('@')) {
    mostrarToast('Ingresá un email válido.', 'warning');
    return;
  }
  if (!EMAILS_PANIOL.includes(em)) {
    mostrarToast('⚠ Email no autorizado para Pañol.', 'error');
    return;
  }
  paniolState.loggedIn = true;
  paniolState.email = em;
  paniolState.pedidos = [];
  const cached = localStorage.getItem('paniol_pedidos_cache');
  if (cached) {
    try { paniolState.pedidos = JSON.parse(cached); } catch (e) { }
  }
  cargarPedidosPaniol();
}

let charts = {};

function renderDashboardCharts() {
  if (typeof Chart === 'undefined') return;

  const semAct = getSemanaISO();
  const d = dashState.datos;
  if (!d) return;

  if (charts.lineas) charts.lineas.destroy();
  if (charts.tecnicos) charts.tecnicos.destroy();
  if (window.chartPredictivoInst) window.chartPredictivoInst.destroy();
  if (window.chartBreakdownInst) window.chartBreakdownInst.destroy();

  const lineas = d.rutinas?.porSemana?.[semAct]?.lineas || {};
  if (Object.keys(lineas).length) {
    const ctxLineas = document.getElementById('chartLineas');
    if (ctxLineas) {
      const dataLineas = Object.entries(lineas).sort((a, b) => b[1].total - a[1].total);
      const labels = dataLineas.map(x => x[0].replace('Línea ', 'L'));
      const novedades = dataLineas.map(x => x[1].novedades);
      const ok = dataLineas.map(x => x[1].ok);

      charts.lineas = new Chart(ctxLineas, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            { label: 'Novedades', data: novedades, backgroundColor: '#ef4444', borderRadius: 4 },
            { label: 'OK', data: ok, backgroundColor: '#10b981', borderRadius: 4 }
          ]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          scales: { x: { stacked: true }, y: { stacked: true } },
          plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 8 } } }
        }
      });
    }
  }

  const tecs = d.rutinas?.porSemana?.[semAct]?.tecnicos || {};
  if (Object.keys(tecs).length) {
    const ctxTecnicos = document.getElementById('chartTecnicos');
    if (ctxTecnicos) {
      const dataTecs = Object.entries(tecs).sort((a, b) => b[1].novedades - a[1].novedades).slice(0, 5);
      const labels = dataTecs.map(x => x[0].split(' ')[0]);
      const novedades = dataTecs.map(x => x[1].novedades);

      charts.tecnicos = new Chart(ctxTecnicos, {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [{
            label: 'Novedades',
            data: novedades,
            backgroundColor: ['#f43f5e', '#f97316', '#eab308', '#3b82f6', '#8b5cf6'],
            borderWidth: 2,
            hoverOffset: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '65%',
          plugins: {
            legend: { position: 'right', labels: { usePointStyle: true, boxWidth: 8, font: { size: 11 } } }
          }
        }
      });
    }
  }

  // 3. Gráfico Predictivo (Bar Chart Horizontal)
  if (dashState.periodo === 'predictivo') {
    const ctxPredictivo = document.getElementById('chartPredictivo');
    if (ctxPredictivo && d.predictivo?.riesgosCheckpoint) {
      const dataChecks = Object.entries(d.predictivo.riesgosCheckpoint)
        .sort((a, b) => b[1].total - a[1].total)
        .filter(e => e[1].total >= 2)
        .slice(0, 8); // Top 8 fallas

      const labels = dataChecks.map(x => `${x[1].equipo}: ${x[1].check.substring(0, 25)}${x[1].check.length > 25 ? '...' : ''}`);
      const rutinasData = dataChecks.map(x => x[1].rutinas);
      const correctivosData = dataChecks.map(x => x[1].correctivos);

      charts.predictivo = new Chart(ctxPredictivo, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            { label: 'Fallas (Rutinas)', data: rutinasData, backgroundColor: '#f43f5e', borderRadius: 4 },
            { label: 'Reparaciones (Correctivos)', data: correctivosData, backgroundColor: '#10b981', borderRadius: 4 }
          ]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: { stacked: false, ticks: { precision: 0 } },
            y: { stacked: false, ticks: { font: { size: 10 } } }
          },
          plugins: {
            legend: { position: 'top', labels: { usePointStyle: true, boxWidth: 8 } },
            tooltip: { mode: 'index', intersect: false }
          }
        }
      });
    }
  }

  // 4. Gráfico Breakdown Mensual con centerline 40h
  const ctxBD = document.getElementById('chartBreakdown');
  if (ctxBD) {
    const porMes = d.predictivo?.breakdowns?.porMes || {};
    // Generar últimos 6 meses
    const meses = [];
    const hoy = new Date();
    for (let i = 5; i >= 0; i--) {
      const dt = new Date(hoy.getFullYear(), hoy.getMonth() - i, 1);
      const key = dt.getFullYear() + '-' + String(dt.getMonth() + 1).padStart(2, '0');
      meses.push({ key, label: dt.toLocaleString('es-AR', { month: 'short', year: '2-digit' }).replace('.', '') });
    }
    const bdData = meses.map(m => Math.round(porMes[m.key] || 0));
    const bdLabels = meses.map(m => m.label);
    const CENTERLINE = 2400; // 40 horas en minutos

    window.chartBreakdownInst = new Chart(ctxBD, {
      type: 'bar',
      data: {
        labels: bdLabels,
        datasets: [
          {
            label: 'Downtime (min)',
            data: bdData,
            backgroundColor: bdData.map(v => v > CENTERLINE ? '#ef4444' : '#10b981'),
            borderRadius: 6,
            borderSkipped: false
          },
          {
            label: 'Centerline 40h (2400 min)',
            data: bdLabels.map(() => CENTERLINE),
            type: 'line',
            borderColor: '#ef4444',
            borderWidth: 2,
            borderDash: [6, 4],
            pointRadius: 0,
            fill: false,
            tension: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: v => v >= 60 ? `${Math.round(v / 60)}h` : `${v}m`
            },
            grid: { color: 'rgba(0,0,0,0.05)' }
          },
          x: { grid: { display: false } }
        },
        plugins: {
          legend: { position: 'top', labels: { usePointStyle: true, boxWidth: 8, font: { size: 11 } } },
          tooltip: {
            callbacks: {
              label: ctx => {
                const v = ctx.parsed.y;
                const h = Math.floor(v / 60);
                const m = v % 60;
                return ctx.dataset.label === 'Centerline 40h (2400 min)'
                  ? '  Centerline: 40h'
                  : `  Downtime: ${h}h ${m}m (${v} min)`;
              }
            }
          }
        }
      }
    });

    // Tabla Top Equipos con más downtime
    const equipos = d.predictivo?.breakdowns?.equipos || {};
    const topEquipos = Object.entries(equipos)
      .sort((a, b) => b[1].downtime - a[1].downtime)
      .slice(0, 5);

    const wrap = document.getElementById('breakdownEquipos');
    if (wrap && topEquipos.length) {
      const totalMin = bdData.reduce((s, v) => s + v, 0);
      wrap.innerHTML = `
        <div style="font-size:12px; font-weight:800; color:#64748b; text-transform:uppercase; letter-spacing:1px; margin-bottom:8px;">
          🔥 Top Equipos — Mayor Downtime Acumulado
        </div>
        <div style="display:flex; flex-direction:column; gap:6px;">
          ${topEquipos.map(([key, eq]) => {
        const pct = totalMin ? Math.round(eq.downtime * 100 / totalMin) : 0;
        const hh = Math.floor(eq.downtime / 60), mm = eq.downtime % 60;
        const color = eq.downtime > 300 ? '#ef4444' : eq.downtime > 120 ? '#f97316' : '#10b981';
        return `<div style="display:flex; align-items:center; gap:10px; padding:8px 12px; background:white; border-radius:10px; border:1px solid #e2e8f0;">
              <div style="flex:1; min-width:0;">
                <div style="font-size:12px; font-weight:700; color:#0f172a; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${key}</div>
                <div style="font-size:11px; color:#64748b;">${eq.eventos} evento${eq.eventos !== 1 ? 's' : ''} · ${hh}h ${mm}m total</div>
              </div>
              <div style="text-align:right; flex-shrink:0;">
                <div style="font-size:13px; font-weight:800; color:${color};">${pct}%</div>
                <div style="width:60px; height:4px; background:#f1f5f9; border-radius:2px; overflow:hidden; margin-top:3px;">
                  <div style="height:100%; width:${Math.min(pct, 100)}%; background:${color}; border-radius:2px;"></div>
                </div>
              </div>
            </div>`;
      }).join('')}
        </div>`;
    }
  }
}
