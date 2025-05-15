// Espera a que todo el contenido HTML esté cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', function () {

    // --- SELECCIÓN DE ELEMENTOS DEL DOM (Interfaz de Usuario) ---
    // Guardamos referencias a los elementos HTML con los que vamos a interactuar.
    // Esto hace el código más legible y eficiente, ya que no tenemos que buscar
    // los elementos cada vez que los necesitamos.

    // Contenedores principales de secciones
    const flujoVisualContainer = document.getElementById('flujo-proceso-visual-container');
    const detallesEtapaContainer = document.getElementById('detalles-etapa-container');
    const glosarioContainer = document.getElementById('glosario-container');
    const responsablesContainer = document.getElementById('responsables-container');
    const anexosContainer = document.getElementById('anexos-container');

    // Elementos dentro de la sección de detalles de etapa
    const btnVolverAlFlujo = document.getElementById('btn-volver-al-flujo');
    const tituloEtapaSeleccionada = document.getElementById('titulo-etapa-seleccionada');
    const descripcionEtapaSeleccionada = document.getElementById('descripcion-etapa-seleccionada'); // Nuevo
    const listaSubprocesosEtapaDiv = document.getElementById('lista-subprocesos-etapa');

    // Elementos dentro de la sección de detalle de subproceso específico
    const detalleSubProcesoEspecificoDiv = document.getElementById('detalle-sub-proceso-especifico');
    const btnVolverAEtapa = document.getElementById('btn-volver-a-etapa');
    const tituloSubprocesoSeleccionado = document.getElementById('titulo-subproceso-seleccionado');
    const subprocesoEntradasLista = document.getElementById('subproceso-entradas-lista');
    const subprocesoPasosLista = document.getElementById('subproceso-pasos-lista');
    const subprocesoIntervinientesTexto = document.getElementById('subproceso-intervinientes-texto');
    const subprocesoSalidasTexto = document.getElementById('subproceso-salidas-texto');
    const subprocesoTipsContainer = document.getElementById('subproceso-tips-container'); // Nuevo
    const subprocesoTipsLista = document.getElementById('subproceso-tips-lista'); // Nuevo


    // --- DATOS DE LA GUÍA INTERACTIVA ---
    // Aquí definimos toda la información que se mostrará.
    // Cada ID (ej: 'B_PLANIFICACION') debe coincidir con el ID del nodo en el diagrama Mermaid.
    const datosGuia = {
        'B_PLANIFICACION': {
            nombre: '1. Planificación y Elaboración del Presupuesto',
            descripcion: 'Esta etapa crucial cubre todas las actividades desde la solicitud inicial y configuración en SINCO ERP hasta la aprobación final del presupuesto detallado del proyecto. El objetivo es asegurar una base sólida y realista para la ejecución.',
            subprocesos: {
                'solicitud_bd_sinco': {
                    nombre: 'Actividad 1.1: Solicitud y Configuración de Base de Datos en SINCO ERP',
                    referenciaDoc: 'Página 8',
                    entradas: [
                        'Solicitud formal de elaboración de presupuesto (puede venir del área de licitaciones o gerencia).',
                        'RUT (Registro Único Tributario) de la nueva empresa o consorcio que desarrollará el proyecto.',
                        'Documento de acuerdo consorcial (si aplica).',
                        'Cédula del representante legal de la nueva entidad.',
                        'Certificado de composición accionaria actualizado.',
                        'Logo de la nueva empresa o consorcio (solicitar al área de comunicaciones).'
                    ],
                    pasos: [
                        '<strong>Recopilación Documental:</strong> El área de Licitaciones (o quien corresponda) reúne todos los documentos listados en "Entradas". Es vital verificar la vigencia y exactitud de cada uno.',
                        '<strong>Diligenciamiento de Formatos SINCO:</strong> Se completan los formatos requeridos por SINCO ERP para la creación de nuevas entidades. Principalmente: <ul><li>"IMF30IMF30_Formato_unico_para_creacion_de_base_de_datos_008"</li><li>"Formato de conocimiento de contrapartes"</li><li>Formato de "Autorización de base de datos" (si existe).</li></ul>',
                        '<strong>Creación de Carpeta Estructurada:</strong> Se debe crear una nueva carpeta con el nombre exacto de la nueva empresa/consorcio dentro de la ruta: <code>SINCO/IMPLEMENTACIÓN EMPRESAS</code> en el servidor o sistema de archivos designado. Esta carpeta contendrá la documentación del proyecto.',
                        '<strong>Solicitud Formal a SINCO ERP:</strong> Con toda la información y formatos diligenciados, se envía la solicitud de creación de la base de datos al equipo de SINCO ERP. Este proceso usualmente se gestiona a través de un "caso CAPTA" o el sistema de tickets de soporte de SINCO.'
                    ],
                    intervinientes: 'Área de Licitaciones, Dirección de Presupuestos y Costos, Soporte SINCO SOFT (para la creación).',
                    salidas: 'Creación efectiva de la nueva base de datos en el entorno de SINCO ERP para la empresa/consorcio.',
                    tips: [
                        'Asegurar que el logo solicitado a comunicaciones tenga buena resolución y formato adecuado.',
                        'Verificar que todos los formatos de SINCO estén completamente diligenciados para evitar reprocesos.',
                        'Mantener una comunicación fluida con SINCO SOFT durante el proceso de creación de la BD.'
                    ]
                },
                'config_inicial_proyecto_sinco': {
                    nombre: 'Actividad 1.2: Configuración Inicial del Proyecto en SINCO ERP',
                    referenciaDoc: 'Página 8',
                    entradas: [
                        'Base de datos de la nueva empresa/consorcio ya creada en SINCO ERP.',
                        'Información básica del proyecto (nombre, código si existe, sucursal asociada).',
                        'Lista de usuarios que requerirán acceso y sus roles/perfiles.',
                        'Formatos de calidad para plantillas de contratos y órdenes.'
                    ],
                    pasos: [
                        '<strong>Configuración de Usuarios y Perfiles:</strong> Crear los usuarios necesarios en SINCO ERP. Asignarles los perfiles y permisos adecuados según su rol en el proyecto. Es fundamental definir correctamente los montos de aprobación para cada usuario según las políticas de la empresa.',
                        '<strong>Configuración de Sucursal y Proyecto:</strong> Dentro de SINCO ERP, crear la "Sucursal" (si no existe o es específica) y luego el "Proyecto", asociándolo a la sucursal correspondiente. Esto estructura la información dentro del ERP.',
                        '<strong>Configuración de Consecutivos:</strong> Generar los rangos de consecutivos iniciales para la numeración de contratos, órdenes de compra, etc. Se recomienda que estos consecutivos mantengan una relación con la numeración o código del proyecto y la sucursal para fácil identificación.',
                        '<strong>Configuración de Semanas de Pago:</strong> El usuario (generalmente de Presupuestos y Costos) debe configurar en el sistema las semanas de pago, indicando el día específico de la semana en que se realizan los pagos. Esta configuración suele hacerse una vez al año y aplica a todas las obras de la empresa que utilicen esa instancia de SINCO.',
                        '<strong>Configuración de Plantillas:</strong> De acuerdo con los formatos establecidos por el área de Calidad, se deben crear o ajustar las plantillas dentro de SINCO ERP para: <ul><li>Contratos de transporte</li><li>Contratos de servicios profesionales</li><li>Órdenes de compra</li><li>Contratos de mano de obra (si aplica)</li></ul> Esto asegura la estandarización documental.'
                    ],
                    intervinientes: 'Dirección de Presupuestos y Costos, Administrador de SINCO ERP (si es un rol separado), Área de Calidad (para formatos).',
                    salidas: 'Base de datos en SINCO ERP completamente configurada y lista para la carga del presupuesto y la gestión del proyecto específico.',
                    tips: [
                        'Realizar una doble verificación de los perfiles y montos de aprobación asignados a los usuarios.',
                        'Documentar los rangos de consecutivos definidos para el proyecto.',
                        'Es crucial que las plantillas de SINCO reflejen fielmente los formatos aprobados por Calidad.'
                    ]
                },
                // **¡¡DEBES CONTINUAR AQUÍ CON EL RESTO DE SUBPROCESOS DE PLANIFICACIÓN Y LAS OTRAS ETAPAS!!**
                // Ejemplo:
                'descomposicion_costos_preliminares': {
                     nombre: 'Actividad 1.3: Descomposición del Proyecto y Costos Preliminares',
                     referenciaDoc: 'Página 9',
                     // ... completar entradas, pasos, intervinientes, salidas, tips ...
                }
            }
        },
        'C_EJECUCION': {
            nombre: '2. Ejecución del Presupuesto',
            descripcion: 'Esta fase comprende la gestión activa de los recursos, la ejecución de las actividades planificadas y el registro continuo de los consumos y avances del proyecto, siempre alineados con el presupuesto aprobado.',
            subprocesos: {
                 'adquisicion_recursos': {
                    nombre: 'Actividad 2.1: Adquisición de Recursos',
                    referenciaDoc: 'Página 11',
                    // ... completar ...
                 }
            }
        },
        'D_SEGUIMIENTO': {
            nombre: '3. Verificación y Seguimiento Presupuestal',
            descripcion: 'Etapa de monitoreo constante donde se compara lo ejecutado versus lo presupuestado, se identifican desviaciones, se analizan sus causas y se toman acciones correctivas. Incluye la generación de reportes y el seguimiento a indicadores.',
            subprocesos: {}
        },
        'E_CIERRE': {
            nombre: '4. Cierre y Evaluación del Presupuesto',
            descripcion: 'Fase final que implica la liquidación de todas las obligaciones, el cierre formal de actividades en SINCO ERP, la evaluación del desempeño presupuestal y la generación de informes finales y lecciones aprendidas.',
            subprocesos: {}
        },
        // Elementos Transversales (los IDs deben coincidir con el diagrama)
        'G_SINCO_CFG': {
            nombre: 'Configuración Inicial SINCO ERP',
            descripcion: 'Este es un paso fundamental que prepara la plataforma SINCO ERP para un nuevo proyecto o empresa. Se detalla como parte de la etapa de Planificación.',
            subprocesos: {
                'detalle_config_sinco': {
                    nombre: 'Ver Detalle en Planificación (Actividad 1.2)',
                    referenciaDoc: 'Página 8',
                    entradas: ['Ver Actividad 1.2'],
                    pasos: ['Este proceso se detalla completamente en la "Actividad 1.2: Configuración Inicial del Proyecto en SINCO ERP" dentro de la Etapa de Planificación.'],
                    intervinientes: 'Ver Actividad 1.2',
                    salidas: 'Ver Actividad 1.2'
                }
            }
        },
        'H_AUDITORIAS': {
            nombre: 'Auditorías Periódicas',
            descripcion: 'Proceso de revisión sistemática para verificar el cumplimiento de los procedimientos, la correcta asignación de costos y la eficiencia en la gestión presupuestal. Se realizan según lo definido por la empresa.',
            subprocesos: {}
        },
        'I_INDICADORES': {
            nombre: 'Análisis de Indicadores',
            descripcion: 'Medición y seguimiento de métricas clave (KPIs) para evaluar el desempeño del presupuesto y la rentabilidad del proyecto. Ayuda en la toma de decisiones gerenciales.',
            subprocesos: {}
        }
    };

    // --- FUNCIONES AUXILIARES ---

    /**
     * Oculta todas las secciones de contenido principal y activa la especificada.
     * @param {string} sectionIdToShow - El ID del contenedor de sección a mostrar.
     */
    function mostrarSeccionPrincipal(sectionIdToShow) {
        // Ocultar todas las secciones principales primero
        [flujoVisualContainer, detallesEtapaContainer, glosarioContainer, responsablesContainer, anexosContainer].forEach(container => {
            container.classList.add('hidden-section');
            container.classList.remove('active-section');
        });

        // Mostrar la sección deseada
        const seccionAMostrar = document.getElementById(sectionIdToShow);
        if (seccionAMostrar) {
            seccionAMostrar.classList.remove('hidden-section');
            seccionAMostrar.classList.add('active-section');
            seccionAMostrar.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // Actualizar enlace activo en la navegación
        document.querySelectorAll('.main-navigation a').forEach(navLink => {
            navLink.classList.remove('active-nav-link');
            if (navLink.getAttribute('href') === `#${sectionIdToShow}`) {
                navLink.classList.add('active-nav-link');
            }
        });
    }


    // --- LÓGICA DE INTERACCIÓN DEL DIAGRAMA MERMAID ---

    /**
     * Configura los listeners de clic para los nodos del diagrama Mermaid.
     * Se ejecuta después de que Mermaid ha renderizado el SVG.
     */
    function configurarClicksDiagrama() {
        const nodosDiagrama = flujoVisualContainer.querySelectorAll('.mermaid svg .node'); // Selector general para nodos
        nodosDiagrama.forEach(nodo => {
            const idNodo = nodo.id;
            // Solo hacer clickables los nodos que tienen datos definidos en `datosGuia`
            if (datosGuia[idNodo]) {
                nodo.classList.add('clickableNode'); // Clase para aplicar estilos hover y cursor
                nodo.addEventListener('click', () => manejarClickNodoDiagrama(idNodo));
            }
        });
    }

    /**
     * Maneja el evento de clic en un nodo del diagrama.
     * @param {string} idNodoEtapa - El ID del nodo del diagrama que fue clickeado.
     */
    function manejarClickNodoDiagrama(idNodoEtapa) {
        const datosEtapa = datosGuia[idNodoEtapa];
        if (!datosEtapa) return; // Salir si no hay datos para este nodo

        mostrarSeccionPrincipal('detalles-etapa-container'); // Cambia a la vista de detalles de etapa

        // Rellenar la información de la etapa seleccionada
        tituloEtapaSeleccionada.textContent = datosEtapa.nombre;
        descripcionEtapaSeleccionada.textContent = datosEtapa.descripcion || 'Seleccione una actividad para ver los detalles.';

        // Limpiar y rellenar la lista de subprocesos (actividades) de la etapa
        listaSubprocesosEtapaDiv.innerHTML = ''; // Limpiar botones anteriores
        detalleSubProcesoEspecificoDiv.classList.add('hidden-section'); // Ocultar detalle de subproceso anterior

        if (datosEtapa.subprocesos && Object.keys(datosEtapa.subprocesos).length > 0) {
            Object.entries(datosEtapa.subprocesos).forEach(([idSubproceso, infoSubproceso]) => {
                const botonSubproceso = document.createElement('button');
                botonSubproceso.textContent = infoSubproceso.nombre + (infoSubproceso.referenciaDoc ? ` (Ref. ${infoSubproceso.referenciaDoc})` : '');
                botonSubproceso.addEventListener('click', () => mostrarDetalleSubproceso(infoSubproceso));
                listaSubprocesosEtapaDiv.appendChild(botonSubproceso);
            });
            listaSubprocesosEtapaDiv.classList.remove('hidden-section');
        } else {
            listaSubprocesosEtapaDiv.innerHTML = '<p>No hay actividades detalladas para esta etapa en la guía.</p>';
            listaSubprocesosEtapaDiv.classList.remove('hidden-section');
        }
    }


    // --- LÓGICA PARA MOSTRAR DETALLES DE SUBPROCESO (ACTIVIDAD) ---

    /**
     * Muestra los detalles de un subproceso (actividad) específico.
     * @param {object} infoSubproceso - El objeto con la información del subproceso.
     */
    function mostrarDetalleSubproceso(infoSubproceso) {
        listaSubprocesosEtapaDiv.classList.add('hidden-section'); // Ocultar lista de botones
        detalleSubProcesoEspecificoDiv.classList.remove('hidden-section'); // Mostrar contenedor de detalles

        // Rellenar los campos con la información del subproceso
        tituloSubprocesoSeleccionado.textContent = infoSubproceso.nombre + (infoSubproceso.referenciaDoc ? ` (Ref. Doc: ${infoSubproceso.referenciaDoc})` : '');

        // Rellenar lista de Entradas
        subprocesoEntradasLista.innerHTML = ''; // Limpiar
        (infoSubproceso.entradas || ['N/A']).forEach(entrada => {
            const li = document.createElement('li');
            li.innerHTML = entrada; // Usar innerHTML para permitir etiquetas <strong>, <ul>, etc.
            subprocesoEntradasLista.appendChild(li);
        });

        // Rellenar lista de Pasos
        subprocesoPasosLista.innerHTML = ''; // Limpiar
        (infoSubproceso.pasos || ['Pasos no detallados.']).forEach(paso => {
            const li = document.createElement('li');
            li.innerHTML = paso; // Usar innerHTML
            subprocesoPasosLista.appendChild(li);
        });

        subprocesoIntervinientesTexto.innerHTML = infoSubproceso.intervinientes || 'No especificado.'; // Usar innerHTML
        subprocesoSalidasTexto.innerHTML = infoSubproceso.salidas || 'No especificado.'; // Usar innerHTML

        // Rellenar Puntos Clave / Consejos (Nuevo)
        if (infoSubproceso.tips && infoSubproceso.tips.length > 0) {
            subprocesoTipsLista.innerHTML = '';
            infoSubproceso.tips.forEach(tip => {
                const li = document.createElement('li');
                li.innerHTML = tip;
                subprocesoTipsLista.appendChild(li);
            });
            subprocesoTipsContainer.style.display = 'block';
        } else {
            subprocesoTipsContainer.style.display = 'none';
        }


        detalleSubProcesoEspecificoDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // --- EVENT LISTENERS PARA BOTONES DE NAVEGACIÓN GENERAL ---

    btnVolverAlFlujo.addEventListener('click', () => {
        mostrarSeccionPrincipal('flujo-proceso-visual-container');
    });

    btnVolverAEtapa.addEventListener('click', () => {
        detalleSubProcesoEspecificoDiv.classList.add('hidden-section');
        listaSubprocesosEtapaDiv.classList.remove('hidden-section');
    });

    // --- EVENT LISTENERS PARA LA NAVEGACIÓN PRINCIPAL DEL HEADER ---
    document.querySelectorAll('.main-navigation a').forEach(navLink => {
        navLink.addEventListener('click', function (event) {
            event.preventDefault(); // Prevenir el comportamiento por defecto del enlace
            const targetId = this.getAttribute('href').substring(1); // Obtener el ID sin el '#'
            mostrarSeccionPrincipal(targetId);
        });
    });


    // --- INICIALIZACIÓN ---

    // Esperar a que Mermaid renderice el SVG. Usar MutationObserver para mayor fiabilidad.
    const mermaidContainer = flujoVisualContainer.querySelector('.mermaid');
    if (mermaidContainer) {
        const observer = new MutationObserver((mutationsList, obs) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    // Verificar si el SVG ya fue añadido
                    if (mermaidContainer.querySelector("svg")) {
                        configurarClicksDiagrama();
                        obs.disconnect(); // Dejar de observar una vez que el SVG está listo
                        return;
                    }
                }
            }
        });
        observer.observe(mermaidContainer, { childList: true, subtree: true });
    } else {
        console.error("Contenedor del diagrama Mermaid no encontrado.");
    }

    // Actualizar el año en el footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Mostrar la sección de flujo principal por defecto al cargar la página
    mostrarSeccionPrincipal('flujo-proceso-visual-container');

}); // Fin de DOMContentLoaded