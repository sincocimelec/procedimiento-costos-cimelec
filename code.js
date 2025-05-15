// Espera a que todo el contenido HTML esté cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', function () {

    // --- SELECCIÓN DE ELEMENTOS DEL DOM (Interfaz de Usuario) ---
    const flujoVisualContainer = document.getElementById('flujo-proceso-visual-container');
    const detallesEtapaContainer = document.getElementById('detalles-etapa-container');
    const glosarioContainer = document.getElementById('glosario-container');
    const responsablesContainer = document.getElementById('responsables-container');
    const anexosContainer = document.getElementById('anexos-container');

    const btnVolverAlFlujo = document.getElementById('btn-volver-al-flujo');
    const tituloEtapaSeleccionada = document.getElementById('titulo-etapa-seleccionada');
    const divInfoGeneralEtapa = document.getElementById('info-general-etapa');
    const descripcionGeneralEtapaTexto = document.getElementById('descripcion-general-etapa-texto');
    const entradasPrincipalesEtapaLista = document.getElementById('entradas-principales-etapa-lista');
    const salidasPrincipalesEtapaLista = document.getElementById('salidas-principales-etapa-lista');
    const descripcionEtapaSeleccionada = document.getElementById('descripcion-etapa-seleccionada');
    const listaSubprocesosEtapaDiv = document.getElementById('lista-subprocesos-etapa');

    const detalleSubProcesoEspecificoDiv = document.getElementById('detalle-sub-proceso-especifico');
    const btnVolverAEtapa = document.getElementById('btn-volver-a-etapa');
    const tituloSubprocesoSeleccionado = document.getElementById('titulo-subproceso-seleccionado');
    const subprocesoEntradasLista = document.getElementById('subproceso-entradas-lista');
    const subprocesoPasosLista = document.getElementById('subproceso-pasos-lista');
    const subprocesoIntervinientesTexto = document.getElementById('subproceso-intervinientes-texto');
    const subprocesoSalidasTexto = document.getElementById('subproceso-salidas-texto');
    const subprocesoTipsContainer = document.getElementById('subproceso-tips-container');
    const subprocesoTipsLista = document.getElementById('subproceso-tips-lista');


    // --- DATOS DE LA GUÍA INTERACTIVA ---
    const datosGuia = {
        'B_PLANIFICACION': {
            nombre: '1. Planificación y Elaboración del Presupuesto (Sección 6.1)',
            descripcionGeneral: 'Esta etapa inicial es fundamental para establecer las bases del proyecto. Comprende la recopilación de información, la configuración del sistema SINCO ERP, la definición detallada de costos y la aprobación formal del presupuesto que guiará la ejecución del proyecto.',
            entradasPrincipales: [
                'Solicitud de elaboración de presupuesto.',
                'Documentación de la nueva empresa/consorcio (RUT, acuerdo consorcial, cédula RL, composición accionaria).',
                'Formatos SINCO (IMF30IMF30, conocimiento de contrapartes, autorización base de datos).',
                'Datos históricos de costos y presupuestos anteriores.',
                'Propuesta económica de la licitación.',
                'Especificaciones técnicas, pliegos de condiciones.',
                'Requerimientos mínimos de maquinaria y personal.',
                'Precios unitarios de venta.',
                'Cotizaciones de insumos, equipos y servicios.',
                'AIU presupuestado en el contrato ofertado.'
            ],
            salidasPrincipales: [
                'Base de datos en SINCO ERP creada y configurada para el proyecto.',
                'Estructura de desglose de trabajo (EDT) presupuestada.',
                'Presupuesto preliminar con costos y utilidad estimada.',
                'Presupuesto detallado y aprobado formalmente en SINCO ERP.',
                'Informe de ítems con potencial de pérdida identificados antes del inicio del proyecto.'
            ],
            subprocesos: {
                'solicitud_bd_sinco': {
                    nombre: 'Actividad: Solicitud de base de datos en SINCO ERP para nuevas empresas o consorcios',
                    referenciaDoc: 'Pág. 8',
                    entradas: [
                        'Solicitud de elaboración de presupuesto (del área de licitaciones).',
                        'RUT de la nueva empresa que va a desarrollar el proyecto.',
                        'Documento de acuerdo consorcial.',
                        'Cédula del representante legal.',
                        'Certificado de composición accionaria.',
                        'Logo para la nueva empresa o consorcio (solicitar al área de comunicaciones).'
                    ],
                    pasos: [
                        '<strong>Recopilación de Documentos:</strong> El Área de Licitaciones proporciona los documentos listados.',
                        '<strong>Solicitud de Logo:</strong> Adicionalmente, se solicita al área de comunicaciones la creación de un logo para la nueva entidad.',
                        '<strong>Diligenciamiento de Formatos SINCO:</strong> Se completan los siguientes formatos: <ul><li>"IMF30IMF30_Formato_unico_para_creacion_de_base_de_datos_008"</li><li>"Formato de conocimiento de contrapartes"</li><li>"Autorización de base de datos"</li></ul>',
                        '<strong>Creación de Carpeta y Consolidación:</strong> Se crea una nueva carpeta con el nombre de la nueva empresa dentro de <code>SINCO/IMPLEMENTACIÓN EMPRESAS</code>. Se consolida toda la información.',
                        '<strong>Envío de Solicitud a SINCO ERP:</strong> Se envía la solicitud de creación a SINCO ERP por medio de un caso CAPTA.'
                    ],
                    intervinientes: 'Dirección de Presupuestos y Costos, Área de Licitaciones, SINCO SOFT.',
                    salidas: 'Creación de base de datos en SINCO.',
                    tips: ['Asegurar que todos los formatos estén completamente diligenciados para evitar demoras.']
                },
                'config_inicial_proyecto_sinco': {
                    nombre: 'Actividad: Configuración inicial de proyecto en SINCO',
                    referenciaDoc: 'Pág. 8-9',
                    entradas: ['Base de datos creada en SINCO.'],
                    pasos: [
                        '<strong>Configuración Inicial (Usuarios y Perfiles):</strong> Antes de la implementación en SINCO, crear usuarios y perfiles, asignarlos al proyecto y sucursal correspondiente. Establecer montos de aprobación asignados a cada usuario.',
                        '<strong>Configuración de Sucursal y Proyecto:</strong> Contemplar la creación de la sucursal y asignarle el proyecto correspondiente dentro de la configuración del proyecto.',
                        '<strong>Configuración de Consecutivos:</strong> Generar los consecutivos iniciales para la numeración de contratos. Se recomienda que conserven la numeración del proyecto y sucursal; de lo contrario, el usuario podrá digitar el consecutivo inicial específico.',
                        '<strong>Configuración de Semanas de Pago:</strong> Configurar en el sistema las semanas de pago según el día de la semana en que se realizan. Esta configuración es única por año y aplica a todas las obras de la empresa.',
                        '<strong>Configuración de Plantillas:</strong> De acuerdo con los formatos del área de calidad, realizar las plantillas con las variables solicitadas para contratos de transporte, servicios profesionales, órdenes de compra y mano de obra.'
                    ],
                    intervinientes: 'Dirección de Presupuestos y Costos, SINCO SOFT.',
                    salidas: 'Base de datos en SINCO configurada.',
                    tips: ['La configuración de semanas y plantillas es crucial para la operatividad y estandarización.']
                },
                'descomposicion_costos_preliminares': {
                     nombre: 'Actividad: Descomposición del proyecto en actividades y costos preliminares',
                     referenciaDoc: 'Pág. 9',
                     entradas: ['Solicitud de presupuesto.', 'Propuesta económica.', 'Bases de datos de APU\'s de referencia.', 'Información de proyectos anteriores.'],
                     pasos: [
                        '<strong>Análisis de Propuesta:</strong> Se analiza la propuesta económica y se plantean las actividades para estimar los costos directos e indirectos aproximados.',
                        '<strong>Consulta de APU\'s y Plantilla Excel:</strong> Con la información de capítulos y actividades de la propuesta económica, se consultan APU\'S en bases de datos de entidades de referencia y proyectos anteriores. Se realiza una plantilla del presupuesto en Excel que incluya: <ul><li>Desglose de costos directos por capítulos.</li><li>Desglose de capítulos por actividades.</li><li>Desglose de actividades por APU\'S.</li><li>Costos indirectos contendrán un capítulo específico para la administración (nómina profesional y administrativa, arriendos de oficinas, impuestos, pólizas, gastos ambientales, sociales, SST y tránsito).</li></ul>',
                        '<strong>Solicitud de Cotizaciones:</strong> Se solicita al área de compras las cotizaciones de al menos el 80% del valor de los insumos que componen los APU\'S del presupuesto preliminar, priorizando insumos mayores como: Concretos, Agregados, Asfaltos, Transporte de materiales, Maquinaria pesada, Tubería y ductería.'
                     ],
                     intervinientes: 'Dirección de Presupuestos y Costos, Área de compras.',
                     salidas: 'Estructura de desglose de trabajo presupuestada (EDT), organizada por Costos Directos e Indirectos, capítulos y actividades.',
                     tips: ['Priorizar cotizaciones de insumos de mayor impacto económico. La plantilla Excel es clave para la organización inicial.']
                },
                'estimacion_costos_utilidad': {
                    nombre: 'Actividad: Estimación de costos y utilidad',
                    referenciaDoc: 'Pág. 10',
                    entradas: ['Cotizaciones pertinentes.', 'Precios preliminares por actividades directas e indirectas.', 'Propuesta económica (precio de venta).'],
                    pasos: [
                        '<strong>Actualización de Precios Preliminares:</strong> Con las cotizaciones, se actualizan los precios preliminares por actividades directas e indirectas.',
                        '<strong>Comparación Costo vs. Venta:</strong> Se realiza la comparación de los costos versus el precio de venta de acuerdo con la propuesta económica.',
                        '<strong>Análisis de Rentabilidad:</strong> Finalmente, se realiza el análisis de rentabilidad por actividad y la rentabilidad esperada por el proyecto (costo a costo).'
                    ],
                    intervinientes: 'Dirección de Presupuestos y Costos, Equipo de Proyecto.',
                    salidas: 'Presupuesto preliminar con costos y utilidad estimada.',
                    tips: ['Este análisis de rentabilidad es crucial para la toma de decisiones.']
                },
                'registro_aprobacion_presupuesto': {
                    nombre: 'Actividad: Registro y aprobación del presupuesto',
                    referenciaDoc: 'Pág. 10',
                    entradas: ['Plantilla de presupuesto finalizada.', 'Análisis de rentabilidad.'],
                    pasos: [
                        '<strong>Cargue en SINCO:</strong> Luego de finalizar la plantilla, se realiza el cargue del presupuesto preliminar en SINCO.',
                        '<strong>Revisión y Ajustes Gerenciales:</strong> El presupuesto es revisado y ajustado por parte de la gerencia.',
                        '<strong>Aprobación Final:</strong> La gerencia da la aprobación final al presupuesto.'
                    ],
                    intervinientes: 'Gerencia General, Dirección de Presupuestos y Costos.',
                    salidas: 'Presupuesto detallado y aprobado en SINCO ERP.',
                    tips: ['Asegurar que todos los ajustes gerenciales queden reflejados en SINCO antes de la aprobación.']
                },
                'identificacion_items_perdida_preinicio': {
                    nombre: 'Actividad: Identificación de Ítems a pérdida antes de iniciar el proyecto',
                    referenciaDoc: 'Pág. 10',
                    entradas: ['Presupuesto inicial aprobado en SINCO ERP.'],
                    pasos: [
                        '<strong>Revisión en SINCO ERP:</strong> Se revisa el presupuesto inicial en SINCO ERP para identificar ítems con sobrecostos o baja rentabilidad.',
                        '<strong>Documentación en Reporte de Control:</strong> Cada ítem identificado se documenta en un reporte de control que incluye al menos: Número de ítem, Descripción valor de la pérdida, Valor de pérdida, Alternativas de solución.',
                        '<strong>Establecimiento de Objetivos:</strong> Se establecen objetivos concretos y medibles para reducir las pérdidas financieras.',
                        '<strong>Definición de Estrategias:</strong> Las estrategias pueden incluir: Reclamaciones a la entidad contratante, Presentación de ítems de reemplazo, Implementación de controles internos adicionales para mitigar riesgos.',
                        '<strong>Entrega de Informe:</strong> Este informe se entregará a la dirección del proyecto y a la gerencia para la toma de decisiones.'
                    ],
                    intervinientes: 'Gerencia General, Dirección de Presupuestos y Costos, Dirección de proyectos.',
                    salidas: 'Informe de ítems a pérdida antes de la ejecución del proyecto.',
                    tips: ['Una identificación temprana de estos ítems permite tomar acciones preventivas.']
                }
            }
        },
        'C_EJECUCION': {
            nombre: '2. Ejecución del Presupuesto de Proyectos (Sección 6.2)',
            descripcionGeneral: 'Esta fase se centra en la materialización del proyecto según lo planificado. Implica la adquisición y gestión de recursos, el registro diario de consumos y avances, la gestión de cambios y la creación de nuevas actividades o insumos si es necesario, todo dentro del marco del presupuesto aprobado y utilizando SINCO ERP.',
            entradasPrincipales: [
                'Presupuesto aprobado en SINCO ERP.',
                'Plan de trabajo del proyecto.',
                'Presupuesto asignado a cada actividad.',
                'Informes diarios de ejecución del proyecto.',
                'Registro de consumos en SINCO ERP.',
                'Memorias de cálculo.',
                'Reportes de avance financiero y físico del proyecto.',
                'Gastos reales registrados en SINCO ERP.'
            ],
            salidasPrincipales: [
                'Recursos distribuidos y optimizados según presupuesto.',
                'Actividades ejecutadas dentro de los parámetros presupuestarios.',
                'Presupuesto ajustado según requerimientos del proyecto.',
                'Actividades no previstas incorporadas al presupuesto (si aplica).',
                'Nuevos insumos incorporados al presupuesto (si aplica).',
                'Reportes de avance del proyecto en SINCO ERP y Power BI.'
            ],
            subprocesos: {
                 'adquisicion_recursos': {
                    nombre: 'Actividad: Adquisición de recursos',
                    referenciaDoc: 'Pág. 11',
                    entradas: ['Necesidades del proyecto.', 'Parámetros del procedimiento de compras.'],
                    pasos: [
                        '<strong>Registro de Pedidos en SINCO:</strong> El equipo del proyecto registra los pedidos mediante la plataforma SINCO.',
                        '<strong>Aprobación por Director de Proyecto:</strong> El director del proyecto aprueba los pedidos de acuerdo con las necesidades.',
                        '<strong>Gestión de Compras:</strong> El área de compras gestiona la adquisición y entrega de los insumos siguiendo los parámetros de su procedimiento.',
                        '<strong>Servicios Especializados:</strong> Si se requieren especialistas, profesionales, contratistas de mano de obra, alquiler inmobiliario y/o laboratorios, se debe realizar una solicitud al área de contratos para la gestión correspondiente (Ver Anexo 3, capítulos 3 y 4 para mayor claridad).'
                    ],
                    intervinientes: 'Director del proyecto, Equipo de proyecto, Área de compras, Área de recursos humanos (para contratos).',
                    salidas: 'Recursos distribuidos y optimizados según el presupuesto.',
                    tips: ['La comunicación clara con el área de compras y contratos es vital.']
                 },
                 'registro_consumido_proyecto': {
                    nombre: 'Actividad: Registro de lo consumido en el proyecto',
                    referenciaDoc: 'Pág. 11',
                    entradas: ['Consumos de materiales diarios.', 'Actividades ejecutadas por contratistas/prestadores de servicio.'],
                    pasos: [
                        '<strong>Gestión de Salidas de Almacén:</strong> Diariamente, el equipo de proyecto gestiona las salidas de almacén según los consumos de materiales.',
                        '<strong>Registro de Cortes de Obra:</strong> Se registran los cortes de obra de acuerdo con las actividades ejecutadas por los contratistas y/o prestadores de servicio.',
                        '<strong>Complemento por Área Contable:</strong> El área contable complementará el registro de los costos indirectos (Nómina e impuestos).',
                        '<strong>Enlace por Área de Costos:</strong> Posteriormente, el área de costos enlazará estos registros a los informes del proyecto por medio de cuentas control.'
                    ],
                    intervinientes: 'Equipo de proyecto, Área Contable, Área de Costos.',
                    salidas: 'Actividades ejecutadas dentro de los parámetros presupuestarios, con costos registrados.',
                    tips: ['La precisión y oportunidad en el registro diario son fundamentales para el control.']
                 },
                 'gestion_cambios_ajustes_linea_base': {
                    nombre: 'Actividad: Gestión de cambios y ajustes en la línea base del presupuesto',
                    referenciaDoc: 'Pág. 11',
                    entradas: ['Necesidad de ajuste en cantidades o estructuras unitarias.', 'Estimaciones de costo adicional.'],
                    pasos: [
                        '<strong>Solicitud de Ajustes en SINCO ("Pre-ajustes"):</strong> El ingeniero de presupuestos del proyecto realiza la solicitud de ajustes al presupuesto (cambio en cantidades presupuestadas o en estructuras unitarias de actividades) mediante la herramienta "Pre-ajustes" en SINCO, con el fin de liberar o restringir cantidades de pedidos o contratación.',
                        '<strong>Evaluación por Dirección de Presupuestos y Costos:</strong> La dirección de presupuestos y costos evalúa la viabilidad de la proyección, de acuerdo con estimaciones de costo adicional. Puede solicitar al equipo un balance o la necesidad de un requerimiento a la entidad contratante para reconocer una actividad no prevista, o justificar un imprevisto imputable al proyecto.'
                    ],
                    intervinientes: 'Ingeniero de presupuestos del proyecto, Dirección de Presupuestos y Costos, Equipo de proyecto.',
                    salidas: 'Presupuesto ajustado según requerimientos del proyecto.',
                    tips: ['Documentar bien la justificación de los "Pre-ajustes".']
                 },
                 'creacion_actividades_no_previstas': {
                    nombre: 'Actividad: Creación de actividades no previstas',
                    referenciaDoc: 'Pág. 11',
                    entradas: ['Necesidad de incorporar actividades no contempladas inicialmente.'],
                    pasos: [
                        '<strong>Estructuración de APU en SINCO:</strong> El ingeniero de presupuestos del proyecto estructura el análisis de precios unitarios (APU) de la actividad no prevista dentro de la plataforma SINCO ERP.',
                        '<strong>Informar a Dirección de Presupuestos y Costos:</strong> Se informa a la dirección de presupuestos y costos para que valide los requerimientos adicionales de la actividad.',
                        '<strong>Presentación de Información Adicional:</strong> Paralelamente, el ingeniero de presupuestos del proyecto debe presentar: <ul><li>Nombre de la actividad no prevista a presentar ante la entidad contratante.</li><li>Costo a costo de la actividad contemplando un margen de ganancia entre el 20% y el 30%.</li><li>Aprobación de la actividad no prevista por parte de la gerencia técnica del proyecto, previo a la radicación ante la entidad contratante.</li></ul>'
                    ],
                    intervinientes: 'Ingeniero de presupuestos del proyecto, Dirección de Presupuestos y Costos, Gerencia Técnica del proyecto, Gerencia.',
                    salidas: 'Actividad no prevista incorporada al presupuesto del proyecto en SINCO. Solicitud de incorporación de la actividad no prevista ante la entidad contratante.',
                    tips: ['Es crucial obtener la aprobación interna antes de presentar a la entidad contratante.']
                 },
                 'creacion_nuevos_insumos': {
                    nombre: 'Actividad: Creación de nuevos insumos',
                    referenciaDoc: 'Pág. 12',
                    entradas: ['Necesidad de un insumo no existente en el "Maestro de Insumos" de SINCO ERP.'],
                    pasos: [
                        '<strong>Solicitud a Dirección de Presupuestos y Control:</strong> El ingeniero de presupuestos del proyecto realiza la solicitud detallando el nombre comercial y la unidad de medida del insumo.',
                        '<strong>Validación por Dirección de Presupuestos:</strong> La dirección de presupuestos valida: <ul><li>Que no exista un insumo similar para evitar duplicidad.</li><li>Crea el insumo según parámetros y lo clasifica en su agrupación respectiva.</li><li>Si es un insumo central (herramienta menor, papelería, dotación, señalización, etc.), configura el factor de conversión para reducir proyecciones adicionales.</li></ul>',
                        '<strong>Comunicación del Código Creado:</strong> Se envía el código del insumo creado al ingeniero de presupuestos del proyecto para que pueda dar trámite a su necesidad.'
                    ],
                    intervinientes: 'Ingeniero de presupuestos del proyecto, Dirección de Presupuestos y Control.',
                    salidas: 'Incorporación de nuevo insumo al presupuesto del proyecto en SINCO ERP.',
                    tips: ['Una buena descripción del nuevo insumo ayuda a la correcta clasificación.']
                 },
                 'reporte_avance_proyecto': {
                    nombre: 'Actividad: Reporte de avance del proyecto',
                    referenciaDoc: 'Pág. 12',
                    entradas: ['Informes diarios de ejecución.', 'Trazabilidad del equipo del proyecto.'],
                    pasos: [
                        '<strong>Control de Avance Físico:</strong> Se adelanta el control de avance físico del proyecto mediante las actas de avance de ejecución cliente en SINCO.',
                        '<strong>Registro por Ingeniero de Presupuestos:</strong> El ingeniero de presupuestos registra las actividades ejecutadas según informes diarios y trazabilidad del equipo.',
                        '<strong>Estados de Actas Avance Cliente:</strong> La información se puede registrar en tres estados: <ul><li><strong>Aprobada:</strong> Actas de avance cliente facturadas.</li><li><strong>Generada:</strong> Actas de avance clientes a facturar en el próximo periodo.</li><li><strong>Preaprobada:</strong> Actas de avance cliente sin facturar donde se registran actividades no previstas en trámite de aprobación por la entidad.</li></ul>',
                        '<strong>Consolidación del Valor Ejecutado:</strong> La suma de las actas mostrará el valor ejecutado del proyecto en los informes.'
                    ],
                    intervinientes: 'Ingeniero de presupuesto, Equipo de proyecto.',
                    salidas: 'Reporte de avance del proyecto en SINCO ERP y Power BI.',
                    tips: ['La correcta categorización de las actas es importante para el seguimiento financiero.']
                 }
            }
        },
        'D_SEGUIMIENTO': {
            nombre: '3. Verificación y Seguimiento Presupuestal (Sección 6.3)',
            descripcionGeneral: 'Esta etapa se enfoca en el monitoreo continuo del desempeño presupuestal, la identificación proactiva de desviaciones, el análisis de sus causas y la implementación de medidas correctivas. Es un ciclo constante de revisión y ajuste para asegurar que el proyecto se mantenga dentro de los objetivos financieros.',
            entradasPrincipales: [
                'Presupuesto aprobado en SINCO ERP.',
                'Reportes de control en SINCO ERP y Power BI.',
                'Información contable y financiera consolidada.',
                'Solicitudes de ajustes contractuales.',
                'Registro de lo consumido en el proyecto.',
                'Reporte de avance del proyecto.'
            ],
            salidasPrincipales: [
                'Reportes de control actualizados en SINCO ERP y Power BI.',
                'Informe de ítems a pérdida y de baja rentabilidad identificados y analizados.',
                'Medidas correctivas implementadas en partidas críticas.',
                'Informe de actividades por cobrar.',
                'Presupuesto ajustado según reasignaciones.',
                'Informes de auditoría (si se realizan en esta etapa).'
            ],
            subprocesos: {
                'identificacion_items_perdida_baja_rentabilidad_ejecucion': {
                    nombre: 'Actividad: Identificación de ítems a pérdida y baja rentabilidad durante la ejecución',
                    referenciaDoc: 'Pág. 13',
                    entradas: ['Información de actas de avance del cliente.', 'Registro actualizado del consumo en SINCO ERP.'],
                    pasos: [
                        '<strong>Actualización Tablero Power BI:</strong> Se actualiza el tablero de Power BI con la información reportada.',
                        '<strong>Seguimientos Semanales y Mensuales:</strong> Se realizan seguimientos para comparar consumido vs. ejecutado, priorizando ítems con pérdidas según criterios:',
                        '<ul><li><strong>Ítems sin ejecución:</strong> Consumo sin ejecución/proyección. En Power BI (INFORME/ITEM) aparecerán con utilidad "-Infinito" en columna U%=(E-C)/E.</li><li><strong>Ítems a pérdida:</strong> Consumo > ejecutado (utilidad negativa). En Power BI (NIFORME/ITEM) en U%=(E-C)/E tendrán porcentaje < 0.</li><li><strong>Ítems con baja utilidad:</strong> Relación consumo/ejecutado < estimación inicial. En Power BI (NIFORME/ITEM) se identifican en U%=(E-C)/E.</li></ul>'
                    ],
                    intervinientes: 'Dirección de Presupuestos y Costos, Equipo de proyecto.',
                    salidas: 'Reportes de control en SINCO ERP y Power BI. Informe de ítems a pérdida.',
                    tips: ['El análisis U%=(E-C)/E es clave; E=Ejecutado, C=Consumido.']
                },
                'evaluacion_items_perdida_reasignaciones': {
                    nombre: 'Actividad: Evaluación de ítems a pérdida y reasignaciones presupuestales',
                    referenciaDoc: 'Pág. 13-14',
                    entradas: ['Informe de ítems a pérdida.', 'Aclaraciones del ingeniero de presupuestos del proyecto.'],
                    pasos: [
                        '<strong>Análisis de Causas:</strong> La Dirección de Costos y Presupuestos analiza si los ítems en pérdida se deben a sobrecostos reales o registros mal asignados.',
                        '<strong>Reasignación Presupuestal (según aclaración del Ing. de Presupuestos):</strong> Se realiza la reasignación al ítem correspondiente. Tipos de reasignación:',
                        '<ul><li><strong>Imputación contratos por grupos:</strong> Modificar asignación presupuestal de contratos (Insumos y Actividades), incluso con pagos realizados (no editables en pantalla de contratos).</li><li><strong>Reasignación de actas generales:</strong> Ajustar asignación presupuestal de actas generales (Insumos y Actividades) ya causadas o con pagos (no modificables en edición de actas).</li><li><strong>Asignación presupuestal de salidas de almacén:</strong> Editar el ítem de imputación de la salida de almacén, afectando el consumo.</li><li><strong>Asignación órdenes de compra:</strong> Visualizar, editar y/o agregar detalles a la asignación presupuestal de cantidades aseguradas en la OC; condiciona asignación de cantidades invertidas (entradas de almacén y devoluciones).</li><li><strong>Asignación presupuestal traslados:</strong> Mover recursos dentro del presupuesto a un ítem específico (afecta comprado, asegurado, invertido). Tipos de movimiento: Salida por traslado (insumo invertido en un ítem), Entrada por traslado (insumo presupuestado/proyectado en un ítem). Cada insumo solo puede asignarse a un ítem a la vez.</li><li><strong>Cuentas control:</strong> Configurar y consultar información de contabilidad para afectar control de proyecto (registro por proyecto de relaciones entre ítems del sistema, cuentas contables, tipos de cuentas, centros de costo e insumos). Enfocado a reasignación de gastos de nómina e impuestos.</li></ul>',
                        '<strong>Alineación y Continuación de Análisis:</strong> Después de reasignar, se tendrán alineadas actividades de consumo e inversión con ejecutadas para continuar análisis de utilidades por ítem e identificar nuevamente ítems a pérdida/baja rentabilidad.',
                        '<strong>Estrategias de Recuperación (si hay pérdida real por sobrecostos, rendimientos mayores, desperdicios, garantías):</strong> Desarrollar estrategias para recuperación según valores unitarios sin cobro o sin proyección, calculados con: <code>CPC = C / (RP * E)</code> (CPC: Cantidad pendiente por cobrar, C: Cantidad consumida, RP: Rendimiento presupuestado, E: Cantidad Ejecutada).',
                        '<strong>Cálculo de Rubro a Cobrar (con AIU):</strong> <code>VPC = CPC * (1 + AIU) * VUv</code> (VPC: Valor por cobrar, AIU: % admin, imprevistos, utilidad, VUv: Valor unitario de venta).'
                    ],
                    intervinientes: 'Dirección de Presupuestos y Costos, Ingeniero de presupuestos del proyecto, Gerencia (para estrategias de recuperación).',
                    salidas: 'Informe de actividades por cobrar. Medidas correctivas implementadas en partidas críticas. Presupuesto ajustado.',
                    tips: ['La correcta aplicación de las herramientas de reasignación de SINCO es crucial. Documentar las justificaciones de las reasignaciones.']
                },
                'auditorias_periodicas': { // Movido de H_AUDITORIAS para que esté en la secuencia lógica
                    nombre: 'Actividad: Auditorías Periódicas Internas',
                    referenciaDoc: 'Pág. 15',
                    entradas: ['Datos de proyectos activos.'],
                    pasos: [
                        '<strong>Frecuencia:</strong> Realizar cada seis meses.',
                        '<strong>Procesos a Auditar:</strong>',
                        '<ul><li><strong>Requisiciones (Pedidos):</strong> Pedidos presupuestados o no contractuales, sin aprobación o sin OC mayor a 7 días.</li><li><strong>Contratos:</strong> Cierre de contratos sin saldos pendientes, por aprobar, de terceros sin vinculación o con anticipos.</li><li><strong>Caja Menor:</strong> Caja sin legalizar, actas sin soportes y desviaciones presupuestales.</li><li><strong>Compras / Almacén:</strong> Órdenes y anticipos pendientes, entradas y salidas sin registrar, validación de inventarios.</li><li><strong>Radicación de Facturas:</strong> Facturas sin asignar, pendientes de nota crédito o mal digitadas.</li><li><strong>Control de Presupuesto:</strong> Ítems sin insumos, sin proyección de cobro, utilidades negativas, revisión de rendimientos y reasignaciones.</li><li><strong>Ejecución:</strong> Actas de avance registradas, facturadas, por facturar o sin facturar en estado preaprobado.</li></ul>',
                        '<strong>Entrega de Informe:</strong> Se entregará un informe por proyecto con las novedades e inconformidades de cada área al equipo de trabajo.'
                    ],
                    intervinientes: 'Dirección de Presupuestos y Costos, Equipo del proyecto.',
                    salidas: 'Informe de auditoría por proyecto.',
                    tips: ['Las auditorías son preventivas y ayudan a identificar puntos de mejora continua.']
                }
            }
        },
        'E_CIERRE': {
            nombre: '4. Cierre y Evaluación del Presupuesto (Sección 6.4)',
            descripcionGeneral: 'Esta es la etapa final del ciclo presupuestal del proyecto. Se enfoca en asegurar que todas las actividades y obligaciones estén completadas y registradas correctamente, realizar la evaluación final del desempeño presupuestal y generar la documentación de cierre necesaria.',
            entradasPrincipales: [
                'Actividades del proyecto finalizadas.',
                'Conciliación de inventarios de almacén.',
                'Informes finales de ejecución presupuestaria.',
                'Análisis de desviaciones y sobrecostos.',
                'Indicadores financieros y de rendimiento del proyecto.',
                'Informes de cierre aprobados (si hay un proceso previo de aprobación de estos informes).'
            ],
            salidasPrincipales: [
                'Actividades sin movimientos, finalizadas y bloqueadas presupuestalmente en SINCO ERP.',
                'Recomendaciones para optimización de costos en futuros proyectos.',
                'Informe final de análisis de costos y desviaciones, guardado en la ruta designada.'
            ],
            subprocesos: {
                'verificacion_cierre_presupuesto_sinco': {
                    nombre: 'Actividad: Verificación para Cierre de Presupuesto en SINCO',
                    referenciaDoc: 'Pág. 15-16',
                    entradas: ['Proyecto en fase de finalización.'],
                    pasos: [
                        '<strong>Revisión de Objetivos y Entregables:</strong> Verificar si se cumplieron los objetivos y entregables del proyecto mediante una lista de chequeo de cierre que contenga:',
                        '<strong>1. Estado de las actividades:</strong> Validar que el valor asegurado (compras + contratos) sea igual al valor consumido (sin cortes de proyecto pendientes por ejecutar o entradas de almacén pendientes por ingresar).',
                        '<strong>2. Cierre de contratos:</strong> Antes de finalizar, verificar que no existan valores pendientes de ejecución ni saldos de anticipo por amortizar. Garantizar que no queden cortes y/o retegarantías por realizar al contratista. Si existen, elaborar acta de liquidación y proceder con cierre del contrato.',
                        '<strong>3. Órdenes de compra completadas:</strong> Verificar en sistema si existen remisiones pendientes de ingreso en almacén. Si hay remisiones sin registrar, el almacenista debe ingresarlas. Si el proveedor tiene material pendiente por despachar, decidir si se cancela la entrega o se espera. Actualizar sistema, notificar a partes y cerrar OC, asegurando que no queden pendientes.',
                        '<strong>4. Cierre de pedidos:</strong> Para garantizar que no existan pedidos pendientes al liquidar el contrato, verificar en sistema solicitudes de compra no procesadas. Revisar pedidos en curso y validar si corresponden a actividades pendientes. Si se detectan pedidos sin justificación o no asociados a actividades pendientes, proceder con rechazo formal en SINCO y notificar. Actualizar estado de cada pedido asegurando que todos queden comprados o rechazados.',
                        '<strong>5. Bloqueo de actividad (SINCO ADPRO):</strong> El estado de ítems en SINCO ADPRO permite habilitar o cerrar actividades en almacén y contratos, garantizando control progresivo en liquidación. Facilita bloqueo de actividades en ejecución por cantidad o valor (evitando exceder presupuesto y restringiendo movimientos en actividades cerradas). Controla salidas de almacén para evitar modificaciones en actividades concluidas. Inhabilita carga de actas de avance del cliente, impidiendo registro de ejecución o cobro a entidad contratante una vez cerradas actividades.',
                        '<strong>6. Liquidación del Personal:</strong> Área de Recursos Humanos procede con liquidación del personal asignado al proyecto (pago de salarios, prestaciones, indemnizaciones, etc.), conforme a normatividad, garantizando que no existan obligaciones laborales abiertas.',
                        '<strong>7. Cierre del área financiera y contable:</strong> Realizar conciliación de todas las cuentas, registrar últimos movimientos, declarar impuestos correspondientes y garantizar que estados financieros reflejen con precisión la situación económica. Proceder con cierre financiero definitivo, asegurando que no queden registros pendientes y contabilidad esté en orden.'
                    ],
                    intervinientes: 'Dirección de Presupuestos y Costos, Equipo del proyecto, Recursos Humanos, Área Contable y Financiera, Almacenista.',
                    salidas: 'Actividades sin movimientos, finalizadas y bloqueadas presupuestalmente en SINCO ERP.',
                    tips: ['La lista de chequeo es una herramienta poderosa para no omitir ningún paso. El bloqueo de actividades en SINCO ADPRO es clave para un cierre ordenado.']
                },
                'evaluacion_final_presupuesto': {
                    nombre: 'Actividad: Evaluación final del presupuesto',
                    referenciaDoc: 'Pág. 17',
                    entradas: ['Presupuesto aprobado.', 'Costos reales del proyecto.'],
                    pasos: [
                        '<strong>Comparación Presupuesto vs. Real:</strong> Se compara el presupuesto aprobado con los costos reales.',
                        '<strong>Identificación de Desviaciones y Oportunidades:</strong> Se identifican desviaciones y oportunidades de mejora.',
                        '<strong>Repetir Proceso "Evaluación de ítems a pérdida":</strong> Se realiza nuevamente el proceso de "Evaluación de ítems a pérdida" (descrito en la etapa de Seguimiento) para optimizar la planificación y gestión financiera en futuros proyectos.'
                    ],
                    intervinientes: 'Dirección de Presupuestos y Costos, Equipo de Proyecto, Área Contable y Financiera.',
                    salidas: 'Recomendaciones para optimización de costos en futuros proyectos.',
                    tips: ['Las lecciones aprendidas de esta evaluación son muy valiosas.']
                },
                'generacion_informes_cierre': {
                    nombre: 'Actividad: Generación de informes de cierre',
                    referenciaDoc: 'Pág. 17',
                    entradas: ['Análisis de rentabilidad final.', 'Datos de costos y desviaciones.'],
                    pasos: [
                        '<strong>Elaboración de Informe Resumen:</strong> Se genera un informe que resuma los ítems con rentabilidad alta, baja y negativa, describiendo los aspectos más relevantes que generaron el porcentaje de rentabilidad final.',
                        '<strong>Almacenamiento del Informe:</strong> El informe de cierre deberá ser guardado en una carpeta nueva en la ruta del servidor: <code>OBRAS/AÑO/PROYECTO/SINCO/CIERRE DE PROYECTO</code>.'
                    ],
                    intervinientes: 'Dirección de Presupuestos y Costos, Gerencia General.',
                    salidas: 'Informe final de análisis de costos y desviaciones.',
                    tips: ['Una estructura clara y concisa del informe facilita su consulta futura.']
                }
            }
        },
        // IDs de elementos transversales que coinciden con el diagrama
        'G_SINCO_CFG': {
            nombre: 'Configuración Inicial SINCO ERP',
            descripcionGeneral: 'Este es un conjunto de actividades preparatorias cruciales realizadas al inicio, antes o durante la elaboración detallada del presupuesto. Asegura que la plataforma SINCO ERP esté lista para gestionar el nuevo proyecto o la nueva entidad legal (empresa/consorcio). Los detalles específicos de estas actividades se encuentran dentro de la Etapa de Planificación.',
            entradasPrincipales: ['Solicitud de elaboración de presupuesto', 'Documentación legal de la nueva entidad', 'Requerimientos de usuarios y perfiles.'],
            salidasPrincipales: ['Base de datos en SINCO ERP creada y configurada.', 'Usuarios y perfiles definidos.', 'Plantillas de documentos listas en el sistema.'],
            subprocesos: {
                'ver_en_planificacion_g_sinco_cfg': {
                    nombre: 'Ver Detalles en Etapa de Planificación',
                    referenciaDoc: 'Pág. 8-9',
                    entradas: [],
                    pasos: ['Las actividades específicas de Configuración Inicial de SINCO ERP se detallan en: <ul><li>"Actividad: Solicitud de base de datos en SINCO ERP para nuevas empresas o consorcios"</li><li>"Actividad: Configuración inicial de proyecto en SINCO"</li></ul>Ambas se encuentran dentro de la Etapa 1: Planificación y Elaboración del Presupuesto.'],
                    intervinientes: '',
                    salidas: '',
                    tips: ['Es fundamental completar esta configuración correctamente antes de cargar el presupuesto.']
                }
            }
        },
        'H_AUDITORIAS': {
            nombre: 'Auditorías Periódicas',
            descripcionGeneral: 'Proceso de revisión y verificación que se realiza de forma cíclica (cada seis meses según el documento) sobre los proyectos activos. Su objetivo es asegurar el cumplimiento de los procedimientos establecidos, la correcta gestión de los recursos y la identificación de posibles desviaciones o áreas de mejora en diversos procesos clave.',
            entradasPrincipales: ['Registros de transacciones del proyecto (pedidos, contratos, facturas, etc.).', 'Ejecución presupuestal registrada en SINCO ERP.', 'Documentación de soporte de las operaciones.'],
            salidasPrincipales: ['Informe de auditoría por proyecto, detallando novedades e inconformidades.', 'Plan de acciones correctivas (si aplica).'],
            subprocesos: {
                 'ver_en_seguimiento_h_auditorias': {
                    nombre: 'Ver Detalles en Etapa de Seguimiento',
                    referenciaDoc: 'Pág. 15',
                    entradas: [],
                    pasos: ['El detalle de los procesos a auditar se encuentra en la "Actividad: Auditorías Periódicas Internas" dentro de la Etapa 3: Verificación y Seguimiento Presupuestal.'],
                    intervinientes: '',
                    salidas: '',
                    tips: ['Las auditorías son una herramienta de control preventivo y de mejora continua.']
                }
            }
        },
         'I_INDICADORES': {
            nombre: 'Análisis de Indicadores (Sección 7)',
            descripcionGeneral: 'Consiste en la medición y seguimiento de métricas clave (KPIs) para evaluar el desempeño del presupuesto y la rentabilidad del proyecto. Estos indicadores proporcionan información valiosa para la toma de decisiones gerenciales y la identificación de áreas de mejora. Se calculan y analizan durante las etapas de Seguimiento y Cierre.',
            entradasPrincipales: ['Datos de ejecución presupuestal (costos reales, valores facturados).', 'Costos presupuestados.', 'Datos de actividades sin cobro o no previstas.'],
            salidasPrincipales: ['Reportes con el cálculo de los indicadores definidos.', 'Análisis de tendencias y desviaciones de los indicadores.'],
            subprocesos: {
                'seguimiento_actividades_sin_cobro': {
                    nombre: 'Indicador: Seguimiento a Actividades sin cobro',
                    referenciaDoc: 'Pág. 17',
                    entradas: ['Valor de hallazgo no identificado en cobro o proyección.', 'Valor facturado acumulado.', 'Valor facturado periodo actual.'],
                    pasos: ['<strong>Objetivo:</strong> Medir la cantidad o porcentaje de actividades realizadas sin generar ingresos directos, para minimizarlas o asegurar su contribución al éxito a largo plazo.',
                           '<strong>Indicador 1:</strong> <code>(Valor de hallazgo no identificado en cobro o proyección / Valor facturado acumulado) * 100</code>',
                           '<strong>Indicador 2:</strong> <code>(Valor de hallazgo no identificado en cobro o proyección / Valor facturado periodo actual) * 100</code>'
                    ],
                    intervinientes: 'Dirección de Presupuestos y Costos.',
                    salidas: 'Valor porcentual de actividades sin cobro respecto al facturado.',
                    tips: ['Un valor alto puede indicar problemas en la facturación o en la definición del alcance contractual.']
                },
                'control_costos_administrativos': {
                    nombre: 'Indicador: Control de costos administrativos por centro de costo',
                    referenciaDoc: 'Pág. 18',
                    entradas: ['Costos indirectos reales.', 'Costos presupuestados (administrativos).', 'Definición de Centros de costos (Administración Compartida, Administración propia, Campamento, Maquinaria, Equipo menor y Licitaciones).'],
                    pasos: ['<strong>Objetivo:</strong> Definir objetivos y métricas de costos para áreas administrativas, asignar costos directos e indirectos a cada centro, detectar ineficiencias y aplicar correctivos.',
                           '<strong>Indicador:</strong> <code>(Costos indirectos reales / Costos presupuestados) * 100</code>'
                    ],
                    intervinientes: 'Dirección de Presupuestos y Costos, Gerencia.',
                    salidas: 'Porcentaje de ejecución de costos administrativos respecto al presupuesto.',
                    tips: ['Permite optimizar recursos y mejorar la rentabilidad general de la Empresa.']
                },
                'valor_recuperado_actividades_cobrar': {
                    nombre: 'Indicador: Valor recuperado de actividades por cobrar',
                    referenciaDoc: 'Pág. 18',
                    entradas: ['Valor facturado de recuperaciones (de actividades no cobradas / no previstas).', 'Valor total de las actividades por cobrar (identificadas en seguimientos).'],
                    pasos: ['<strong>Objetivo:</strong> Evaluar el porcentaje del valor de recuperación de actividades no cobradas y/o no previstas, evidenciadas en los seguimientos de presupuesto y costo antes del cierre.',
                           '<strong>Indicador:</strong> <code>(Valor facturado de recuperación / Valor total de las actividades por cobrar) * 100</code>'
                    ],
                    intervinientes: 'Dirección de Presupuestos y Costos, Dirección de Proyectos.',
                    salidas: 'Porcentaje de recuperación de valores pendientes de cobro.',
                    tips: ['Un seguimiento riguroso de las actividades no previstas es clave para mejorar este indicador.']
                }
            }
        }
    };

    // ... (EL RESTO DEL CÓDIGO JAVASCRIPT PERMANECE IGUAL QUE EN LA ÚLTIMA VERSIÓN QUE TE DI) ...
    // (Funciones: mostrarSeccionPrincipal, configurarClicksDiagrama, manejarClickNodoDiagrama, mostrarDetalleSubproceso)
    // (Listeners para botones: btnVolverAlFlujo, btnVolverAEtapa)
    // (Listeners para navegación principal del header)
    // (Inicialización: MutationObserver, currentYear, llamada inicial a mostrarSeccionPrincipal)

    /**
     * Oculta todas las secciones de contenido principal y activa la especificada.
     * @param {string} sectionIdToShow - El ID del contenedor de sección a mostrar.
     */
    function mostrarSeccionPrincipal(sectionIdToShow) {
        [flujoVisualContainer, detallesEtapaContainer, glosarioContainer, responsablesContainer, anexosContainer].forEach(container => {
            container.classList.add('hidden-section');
            container.classList.remove('active-section');
        });

        const seccionAMostrar = document.getElementById(sectionIdToShow);
        if (seccionAMostrar) {
            seccionAMostrar.classList.remove('hidden-section');
            seccionAMostrar.classList.add('active-section');
            // Solo hacer scroll si no es el flujo principal, para evitar saltos al cargar
            if (sectionIdToShow !== 'flujo-proceso-visual-container') {
                 seccionAMostrar.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }

        document.querySelectorAll('.main-navigation a').forEach(navLink => {
            navLink.classList.remove('active-nav-link');
            if (navLink.getAttribute('href') === `#${sectionIdToShow}`) {
                navLink.classList.add('active-nav-link');
            }
        });
    }

    function configurarClicksDiagrama() {
        const nodosDiagrama = flujoVisualContainer.querySelectorAll('.mermaid svg .node');
        nodosDiagrama.forEach(nodo => {
            const idNodo = nodo.id;
            if (datosGuia[idNodo]) {
                nodo.classList.add('clickableNode');
                nodo.addEventListener('click', () => manejarClickNodoDiagrama(idNodo));
            }
        });
    }

    function manejarClickNodoDiagrama(idNodoEtapa) {
        const datosEtapa = datosGuia[idNodoEtapa];
        if (!datosEtapa) {
            console.warn(`No se encontraron datos para la etapa con ID: ${idNodoEtapa}`);
            return;
        }

        mostrarSeccionPrincipal('detalles-etapa-container');

        tituloEtapaSeleccionada.textContent = datosEtapa.nombre;
        descripcionGeneralEtapaTexto.innerHTML = datosEtapa.descripcionGeneral || 'No hay descripción general disponible para esta etapa.';

        entradasPrincipalesEtapaLista.innerHTML = '';
        (datosEtapa.entradasPrincipales || ['N/A']).forEach(entrada => {
            const li = document.createElement('li');
            li.innerHTML = entrada;
            entradasPrincipalesEtapaLista.appendChild(li);
        });

        salidasPrincipalesEtapaLista.innerHTML = '';
        (datosEtapa.salidasPrincipales || ['N/A']).forEach(salida => {
            const li = document.createElement('li');
            li.innerHTML = salida;
            salidasPrincipalesEtapaLista.appendChild(li);
        });

        divInfoGeneralEtapa.classList.remove('hidden-section');
        descripcionEtapaSeleccionada.textContent = 'Seleccione una actividad de la lista para ver sus pasos, entradas y salidas específicas.';

        listaSubprocesosEtapaDiv.innerHTML = '';
        detalleSubProcesoEspecificoDiv.classList.add('hidden-section');

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
         // Scroll al inicio de la sección de detalles de etapa
        detallesEtapaContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function mostrarDetalleSubproceso(infoSubproceso) {
        listaSubprocesosEtapaDiv.classList.add('hidden-section');
        detalleSubProcesoEspecificoDiv.classList.remove('hidden-section');

        tituloSubprocesoSeleccionado.textContent = infoSubproceso.nombre + (infoSubproceso.referenciaDoc ? ` (Ref. Doc: ${infoSubproceso.referenciaDoc})` : '');

        subprocesoEntradasLista.innerHTML = '';
        (infoSubproceso.entradas || ['N/A']).forEach(entrada => {
            const li = document.createElement('li');
            li.innerHTML = entrada;
            subprocesoEntradasLista.appendChild(li);
        });

        subprocesoPasosLista.innerHTML = '';
        (infoSubproceso.pasos || ['Pasos no detallados.']).forEach(paso => {
            const li = document.createElement('li');
            li.innerHTML = paso;
            subprocesoPasosLista.appendChild(li);
        });

        subprocesoIntervinientesTexto.innerHTML = infoSubproceso.intervinientes || 'No especificado.';
        subprocesoSalidasTexto.innerHTML = infoSubproceso.salidas || 'No especificado.';

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

    btnVolverAlFlujo.addEventListener('click', () => {
        mostrarSeccionPrincipal('flujo-proceso-visual-container');
    });

    btnVolverAEtapa.addEventListener('click', () => {
        detalleSubProcesoEspecificoDiv.classList.add('hidden-section');
        listaSubprocesosEtapaDiv.classList.remove('hidden-section');
        // Scroll al título de la etapa para que se vea la lista de subprocesos
        tituloEtapaSeleccionada.scrollIntoView({ behavior: 'smooth', block: 'start' });

    });

    document.querySelectorAll('.main-navigation a').forEach(navLink => {
        navLink.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            mostrarSeccionPrincipal(targetId);
        });
    });

    const mermaidContainer = flujoVisualContainer.querySelector('.mermaid');
    if (mermaidContainer) {
        const observer = new MutationObserver((mutationsList, obs) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    if (mermaidContainer.querySelector("svg")) {
                        configurarClicksDiagrama();
                        obs.disconnect();
                        return;
                    }
                }
            }
        });
        observer.observe(mermaidContainer, { childList: true, subtree: true });
    } else {
        console.error("Contenedor del diagrama Mermaid no encontrado.");
    }

    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    mostrarSeccionPrincipal('flujo-proceso-visual-container');
});