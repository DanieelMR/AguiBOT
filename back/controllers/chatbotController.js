exports.responderPregunta = (req, res) => {
    const { pregunta } = req.body;
  
    const lowerPregunta = pregunta?.toLowerCase() || '';
    let respuesta = "Lo siento, no entendí la pregunta.";
  
    // Respuestas actualizadas sobre reinscripción
    if (lowerPregunta.includes('reinscripcion') && !lowerPregunta.includes('requisitos') && !lowerPregunta.includes('proceso') && !lowerPregunta.includes('fechas') && !lowerPregunta.includes('pago')) {
      respuesta = "La reinscripción es el proceso mediante el cual continúas oficialmente tus estudios en el Instituto Tecnológico de Cuautla para el siguiente semestre. Este trámite debe realizarse en las fechas establecidas por el Departamento de Servicios Escolares y consta de varios pasos incluyendo pago de cuotas, selección de materias y generación de horario.";
    } else if (lowerPregunta.includes('reinscripcion') && lowerPregunta.includes('requisitos')) {
      respuesta = "Los requisitos para reinscribirte son:\n\n" +
                "- No tener adeudos en biblioteca, laboratorios o financieros\n" +
                "- Haber aprobado al menos una materia en el semestre anterior\n" +
                "- No exceder el límite de 12 semestres para concluir la carrera\n" +
                "- Contar con seguro facultativo vigente (IMSS)\n" +
                "- Realizar el pago correspondiente al semestre\n" +
                "- No estar en baja definitiva\n\n" +
                "Si tienes dudas específicas, acude al Departamento de Servicios Escolares.";
    } else if (lowerPregunta.includes('reinscripcion') && lowerPregunta.includes('fechas')) {
      respuesta = "Las fechas de reinscripción generalmente son:\n\n" +
                "- Periodo ordinario: Durante las dos últimas semanas previas al inicio del semestre\n" +
                "- Periodo extemporáneo: Primera semana de clases (con recargo adicional)\n\n" +
                "Las fechas específicas se publican en la página web institucional, redes sociales y en los edificios del campus. Es importante realizar tu reinscripción en tiempo para asegurar tu lugar en los grupos.";
    } else if (lowerPregunta.includes('reinscripcion') && lowerPregunta.includes('proceso')) {
      respuesta = "El proceso de reinscripción consta de los siguientes pasos:\n\n" +
                "1. Consulta de fechas en el calendario escolar\n" +
                "2. Verificación de estatus académico (sin adeudos o materias pendientes)\n" +
                "3. Generación y pago de referencia bancaria\n" +
                "4. Ingreso al Sistema Integral de Información (SII) con tu número de control y NIP\n" +
                "5. Selección de materias y grupos según tu avance curricular\n" +
                "6. Generación e impresión de horario\n" +
                "7. Confirmación de carga académica con tu coordinador\n\n" +
                "Si tienes dudas durante el proceso, puedes acudir al Departamento de Servicios Escolares o con tu coordinador de carrera.";
    } else if (lowerPregunta.includes('reinscripcion') && lowerPregunta.includes('pago')) {
      respuesta = "Para realizar el pago de reinscripción:\n\n" +
                "1. Ingresa al SII con tu número de control y NIP\n" +
                "2. Selecciona la opción 'Reinscripción' y luego 'Referencia de pago'\n" +
                "3. Genera tu referencia bancaria\n" +
                "4. Realiza el pago en el banco indicado o mediante transferencia electrónica\n" +
                "5. Conserva tu comprobante de pago para cualquier aclaración\n\n" +
                "El costo de la reinscripción es de aproximadamente $2,400 MXN para el semestre. En periodo extemporáneo puede aplicar un recargo adicional.";
    } else if (lowerPregunta.includes('reinscripcion') && lowerPregunta.includes('materias')) {
      respuesta = "Para la selección de materias en reinscripción:\n\n" +
                "1. Revisa tu avance curricular y retícula\n" +
                "2. Identifica las materias que puedes y debes cursar según tu semestre y prerrequisitos\n" +
                "3. Ingresa al SII en las fechas programadas para tu carrera\n" +
                "4. Selecciona las materias disponibles según los grupos ofertados\n" +
                "5. Verifica que no haya traslapes de horario\n" +
                "6. Confirma tu selección y genera tu horario\n\n" +
                "Recuerda que tienes prioridad para inscribir materias de semestres anteriores que adeudes. La carga máxima es de 36 créditos por semestre (aproximadamente 6-7 materias).";
    } else if (lowerPregunta.includes('reinscripcion') && (lowerPregunta.includes('extemporanea') || lowerPregunta.includes('extemporánea'))) {
      respuesta = "La reinscripción extemporánea:\n\n" +
                "- Se realiza después del periodo ordinario, generalmente la primera semana de clases\n" +
                "- Tiene un costo adicional (recargo) al monto normal de reinscripción\n" +
                "- Requiere autorización especial del Departamento de Servicios Escolares\n" +
                "- La disponibilidad de grupos y materias puede ser limitada\n" +
                "- Debes presentar justificación por escrito del motivo de no reinscribirte en tiempo\n\n" +
                "Se recomienda reinscribirse en el periodo ordinario para evitar estos inconvenientes.";
    } else if (lowerPregunta.includes('reinscripcion') && lowerPregunta.includes('problemas')) {
      respuesta = "Problemas comunes durante la reinscripción y cómo solucionarlos:\n\n" +
                "- NIP olvidado: Acude a Servicios Escolares con una identificación oficial\n" +
                "- Error en el sistema: Toma captura de pantalla y reporta inmediatamente a soporte técnico\n" +
                "- Materias no disponibles: Consulta con tu coordinador de carrera para alternativas\n" +
                "- Traslape de horarios: Busca otros grupos disponibles o solicita autorización especial\n" +
                "- Adeudos: Regulariza tu situación antes del periodo de reinscripción\n\n" +
                "Si persisten los problemas, acude personalmente al Departamento de Servicios Escolares con tu número de control e identificación.";
    } else if (lowerPregunta.includes('reinscripcion') && (lowerPregunta.includes('baja temporal') || lowerPregunta.includes('reingreso'))) {
      respuesta = "Si deseas reinscribirte después de una baja temporal:\n\n" +
                "1. Solicita tu reingreso mediante un oficio dirigido al Departamento de Servicios Escolares\n" +
                "2. Presenta el oficio al menos 15 días antes del periodo de reinscripción\n" +
                "3. Espera la resolución de tu solicitud\n" +
                "4. Si es aprobada, deberás actualizar documentación y seguir el proceso normal de reinscripción\n\n" +
                "Recuerda que el tiempo máximo para concluir tus estudios es de 12 semestres contando desde tu ingreso original.";
    } else if (lowerPregunta.includes('beca')) {
      respuesta = "La beca será depositada hasta el mes de junio.";
    } else if (lowerPregunta.includes('kardex')) {
      respuesta = "Puedes consultar tu kardex entrando al SII y seleccionando la opción en el menú lateral.";
    } else if (lowerPregunta.includes('nip')) {
      respuesta = "Para recuperar tu NIP, debes acudir a la ventanilla de servicios escolares con una identificación oficial.";
    } else if (lowerPregunta.includes('proceso') && !lowerPregunta.includes('reinscripcion')) {
      respuesta = "El proceso de inscripción consta de 5 pasos: 1) Pago de cuota, 2) Selección de materias, 3) Generación de horario, 4) Validación, 5) Impresión de carga académica.";
    } else if (lowerPregunta.includes('fechas') && !lowerPregunta.includes('reinscripcion')) {
      respuesta = "Las fechas importantes para este semestre son:\n- Inscripciones: 15-19 de agosto\n- Inicio de clases: 22 de agosto\n- Evaluaciones: 10-14 de octubre.";
    } 
    
    // Respuestas sobre actividades complementarias
    else if (lowerPregunta.includes('actividades complementarias') && (lowerPregunta.includes('qué son') || lowerPregunta.includes('que son'))) {
      respuesta = "Las actividades complementarias son aquellas actividades que permiten al estudiante desarrollar competencias adicionales a su formación profesional, como parte integral de su plan de estudios. Estas actividades pueden incluir actividades deportivas, culturales, cívicas, entre otras.";
    } else if (lowerPregunta.includes('créditos') && lowerPregunta.includes('actividades complementarias')) {
      respuesta = "Las actividades complementarias tienen un valor de 5 créditos en los planes de estudio. Los estudiantes deben acumular estos créditos para poder titularse. Cada actividad complementaria otorga 1 crédito y se deben acumular 5 actividades en total durante la carrera.";
    } else if (lowerPregunta.includes('tipos') && lowerPregunta.includes('actividades complementarias')) {
      respuesta = "Existen diferentes tipos de actividades complementarias:\n\n" +
                "- Actividades deportivas: futbol, basquetbol, voleibol, etc.\n" +
                "- Actividades culturales: danza, música, teatro, artes plásticas, etc.\n" +
                "- Actividades cívicas: escolta, banda de guerra, etc.\n" +
                "- Actividades académicas: concursos de ciencias, participación en proyectos de investigación, etc.\n" +
                "- Actividades de emprendimiento: participación en eventos de innovación y emprendimiento.\n\n" +
                "Cada actividad debe tener una duración mínima de 20 horas para ser válida.";
    } else if (lowerPregunta.includes('inscribir') && lowerPregunta.includes('actividades complementarias')) {
      respuesta = "Para inscribirte a actividades complementarias debes seguir estos pasos:\n\n" +
                "1. Consultar la oferta de actividades complementarias al inicio del semestre.\n" +
                "2. Acudir al Departamento de Actividades Extraescolares para inscribirte.\n" +
                "3. Llenar el formato de inscripción correspondiente.\n" +
                "4. Participar constantemente en la actividad elegida.\n" +
                "5. Al finalizar, solicitar tu constancia de cumplimiento al responsable de la actividad.\n" +
                "6. Entregar la constancia en el Departamento de Servicios Escolares para su registro.";
    } else if (lowerPregunta.includes('requisitos') && lowerPregunta.includes('actividades complementarias')) {
      respuesta = "Los requisitos para acreditar actividades complementarias son:\n\n" +
                "- Cumplir con al menos 20 horas de participación en la actividad.\n" +
                "- Mantener una asistencia mínima del 80%.\n" +
                "- Cumplir con las actividades y evaluaciones establecidas por el instructor.\n" +
                "- Entregar la documentación requerida en tiempo y forma.\n" +
                "- Cada estudiante debe acumular 5 créditos (equivalente a 5 actividades) durante su carrera.";
    } else if (lowerPregunta.includes('documentos') && lowerPregunta.includes('actividades complementarias')) {
      respuesta = "Los documentos necesarios para el registro de actividades complementarias son:\n\n" +
                "1. Formato de inscripción a la actividad complementaria.\n" +
                "2. Constancia de cumplimiento firmada por el responsable de la actividad.\n" +
                "3. Evidencias de participación (fotografías, listas de asistencia, etc.).\n" +
                "4. Formato de liberación de actividad complementaria.\n\n" +
                "Estos documentos deben entregarse en el Departamento de Servicios Escolares para su registro oficial en el expediente del estudiante.";
    } else if (lowerPregunta.includes('horarios') && lowerPregunta.includes('actividades complementarias')) {
      respuesta = "Los horarios de las actividades complementarias generalmente son:\n\n" +
                "- Actividades deportivas: lunes a viernes de 14:00 a 16:00 hrs.\n" +
                "- Actividades culturales: lunes a viernes de 15:00 a 17:00 hrs.\n" +
                "- Actividades cívicas: según calendario de ensayos.\n\n" +
                "Para conocer los horarios específicos de cada periodo, consulta la convocatoria semestral publicada por el Departamento de Actividades Extraescolares o visita directamente sus oficinas.";
    } else if (lowerPregunta.includes('departamento') && lowerPregunta.includes('actividades complementarias')) {
      respuesta = "El Departamento de Actividades Extraescolares es el encargado de coordinar las actividades complementarias. Está ubicado en el edificio de Servicios Estudiantiles. Su horario de atención es de lunes a viernes de 9:00 a 14:00 hrs. Para mayor información, puedes contactarlos al correo: extraescolares@cuautla.tecnm.mx";
    } else if (lowerPregunta.includes('actividades culturales')) {
      respuesta = "Las actividades culturales disponibles incluyen:\n\n" +
                "- Danza folclórica\n" +
                "- Música y rondalla\n" +
                "- Teatro\n" +
                "- Artes plásticas\n" +
                "- Ajedrez\n" +
                "- Oratoria y declamación\n\n" +
                "Estas actividades se imparten en horarios vespertinos y cada una otorga 1 crédito al completar 20 horas de participación.";
    } else if (lowerPregunta.includes('actividades deportivas')) {
      respuesta = "Las actividades deportivas disponibles incluyen:\n\n" +
                "- Fútbol soccer\n" +
                "- Básquetbol\n" +
                "- Voleibol\n" +
                "- Atletismo\n" +
                "- Béisbol\n" +
                "- Taekwondo\n" +
                "- Natación\n\n" +
                "Estas actividades se realizan en las instalaciones deportivas del instituto y cada una otorga 1 crédito al completar 20 horas de participación.";
    }
    
    // Respuestas sobre credenciales
    else if (lowerPregunta.includes('credencial') && (lowerPregunta.includes('qué es') || lowerPregunta.includes('que es') || lowerPregunta.includes('información'))) {
      respuesta = "La credencial estudiantil es el documento oficial que te identifica como alumno del Instituto Tecnológico de Cuautla. Es necesaria para acceder a las instalaciones, hacer trámites, usar la biblioteca, participar en eventos institucionales y obtener descuentos estudiantiles. Es importante portarla siempre en lugar visible dentro de las instalaciones.";
    } else if (lowerPregunta.includes('credencial') && lowerPregunta.includes('nuevo ingreso')) {
      respuesta = "Para obtener tu credencial como estudiante de nuevo ingreso debes:\n\n" +
                "1. Estar oficialmente inscrito en el semestre.\n" +
                "2. Haber entregado toda tu documentación requerida en el proceso de inscripción.\n" +
                "3. Tomarte la fotografía en el Departamento de Servicios Escolares (se programa por carrera).\n" +
                "4. Esperar el tiempo de elaboración (aproximadamente 2 semanas).\n" +
                "5. Recoger tu credencial en el Departamento de Servicios Escolares presentando tu comprobante de pago de inscripción.\n\n" +
                "La credencial de nuevo ingreso no tiene costo adicional, ya que está incluida en tu pago de inscripción.";
    } else if ((lowerPregunta.includes('reponer') || lowerPregunta.includes('reposición') || lowerPregunta.includes('perdí') || lowerPregunta.includes('perdi') || lowerPregunta.includes('extravié')) && lowerPregunta.includes('credencial')) {
      respuesta = "Para reponer tu credencial en caso de pérdida o deterioro, debes seguir estos pasos:\n\n" +
                "1. Realizar un pago de $150 MXN en la cuenta bancaria institucional (solicita los datos en Servicios Escolares).\n" +
                "2. Acudir al Departamento de Servicios Escolares con tu comprobante de pago original.\n" +
                "3. Llenar la solicitud de reposición de credencial.\n" +
                "4. Tomarte una nueva fotografía si es necesario.\n" +
                "5. Esperar el tiempo de elaboración (aproximadamente 1 semana).\n" +
                "6. Recoger tu nueva credencial presentando tu identificación oficial.";
    } else if (lowerPregunta.includes('vigencia') && lowerPregunta.includes('credencial')) {
      respuesta = "La vigencia de la credencial estudiantil es de un año escolar completo. Al reinscribirte, deberás actualizarla con el holograma o sello correspondiente al nuevo periodo en el Departamento de Servicios Escolares. Si tu credencial está muy deteriorada, se te solicitará tramitar una reposición.";
    } else if (lowerPregunta.includes('fotografía') && lowerPregunta.includes('credencial')) {
      respuesta = "Para la fotografía de tu credencial debes considerar:\n\n" +
                "- Fondo blanco\n" +
                "- Vestimenta formal (camisa o blusa, de preferencia en colores claros)\n" +
                "- Sin lentes, gorras, sombreros o accesorios que cubran el rostro\n" +
                "- Rostro descubierto y expresión neutral\n\n" +
                "La toma de fotografías se realiza en el Departamento de Servicios Escolares según calendario por carrera.";
    } else if (lowerPregunta.includes('tiempo') && lowerPregunta.includes('credencial')) {
      respuesta = "El tiempo de elaboración de credenciales es:\n\n" +
                "- Nuevo ingreso: aproximadamente 2 semanas después de la toma de fotografía.\n" +
                "- Reposición: aproximadamente 1 semana después de realizar el trámite.\n\n" +
                "Puedes verificar si tu credencial está lista consultando los listados que se publican en el Departamento de Servicios Escolares o preguntando directamente en ventanilla.";
    } else if (lowerPregunta.includes('costo') && lowerPregunta.includes('credencial')) {
      respuesta = "Los costos relacionados con la credencial estudiantil son:\n\n" +
                "- Credencial de nuevo ingreso: Sin costo adicional (incluida en la inscripción)\n" +
                "- Reposición por pérdida o deterioro: $150 MXN\n" +
                "- Actualización semestral (holograma o sello): Sin costo\n\n" +
                "El pago para reposición debe realizarse en la cuenta bancaria institucional y presentar el comprobante original al solicitar el trámite.";
    } else if (lowerPregunta.includes('recoger') && lowerPregunta.includes('credencial')) {
      respuesta = "Para recoger tu credencial debes:\n\n" +
                "1. Verificar en las listas publicadas o en ventanilla si ya está disponible.\n" +
                "2. Acudir personalmente al Departamento de Servicios Escolares en horario de atención (8:00-14:00 hrs).\n" +
                "3. Presentar una identificación oficial o comprobante de inscripción.\n" +
                "4. Firmar de recibido.\n\n" +
                "Recuerda que la credencial es un documento personal e intransferible, solo el titular puede recogerla.";
    } else if (lowerPregunta.includes('uso') && lowerPregunta.includes('credencial')) {
      respuesta = "La credencial estudiantil del Instituto Tecnológico de Cuautla tiene los siguientes usos:\n\n" +
                "- Identificación oficial dentro del instituto\n" +
                "- Acceso a las instalaciones y laboratorios\n" +
                "- Préstamo de material en biblioteca\n" +
                "- Trámites escolares diversos\n" +
                "- Acceso a eventos institucionales\n" +
                "- Obtención de descuentos en transporte público y establecimientos comerciales\n" +
                "- Identificación para servicio social y residencias profesionales\n\n" +
                "Es obligatorio portarla en un lugar visible mientras estés dentro de las instalaciones del instituto.";
    }
    
    // Nuevas respuestas sobre departamentos académicos
    else if ((lowerPregunta.includes('departamentos') || lowerPregunta.includes('divisiones')) && lowerPregunta.includes('académicos') && (lowerPregunta.includes('cuáles') || lowerPregunta.includes('cuales') || lowerPregunta.includes('lista'))) {
      respuesta = "El Instituto Tecnológico de Cuautla cuenta con los siguientes departamentos académicos:\n\n" +
                "1. Departamento de Sistemas y Computación\n" +
                "2. Departamento de Ingeniería Industrial\n" +
                "3. Departamento de Ingeniería Electrónica\n" +
                "4. Departamento de Ingeniería Mecánica\n" +
                "5. Departamento de Ciencias Básicas\n" +
                "6. Departamento de Ciencias Económico-Administrativas\n" +
                "7. Departamento de Ingeniería en Gestión Empresarial\n" +
                "8. Departamento de Metal-Mecánica\n\n" +
                "Cada departamento es responsable de coordinar actividades académicas y administrativas relacionadas con sus respectivas carreras.";
    } else if (lowerPregunta.includes('departamento') && lowerPregunta.includes('sistemas') || (lowerPregunta.includes('sistemas') && lowerPregunta.includes('computación'))) {
      respuesta = "El Departamento de Sistemas y Computación:\n\n" +
                "- Atiende a estudiantes de la carrera de Ingeniería en Sistemas Computacionales\n" +
                "- Ubicación: Edificio A, segundo piso\n" +
                "- Horario de atención: Lunes a viernes de 9:00 a 17:00 hrs\n" +
                "- Jefe del departamento: M.C. Roberto Pérez Martínez\n" +
                "- Contacto: sistemas@cuautla.tecnm.mx\n\n" +
                "Este departamento coordina las materias especializadas en programación, redes, bases de datos, inteligencia artificial y desarrollo de software.";
    } else if (lowerPregunta.includes('departamento') && lowerPregunta.includes('industrial')) {
      respuesta = "El Departamento de Ingeniería Industrial:\n\n" +
                "- Atiende a estudiantes de la carrera de Ingeniería Industrial\n" +
                "- Ubicación: Edificio B, planta baja\n" +
                "- Horario de atención: Lunes a viernes de 8:00 a 16:00 hrs\n" +
                "- Jefe del departamento: M.I. Carlos Ramírez Sánchez\n" +
                "- Contacto: industrial@cuautla.tecnm.mx\n\n" +
                "Este departamento coordina las materias relacionadas con procesos de manufactura, control de calidad, logística, investigación de operaciones y seguridad industrial.";
    } else if (lowerPregunta.includes('departamento') && lowerPregunta.includes('electrónica')) {
      respuesta = "El Departamento de Ingeniería Electrónica:\n\n" +
                "- Atiende a estudiantes de la carrera de Ingeniería Electrónica\n" +
                "- Ubicación: Edificio C, primer piso\n" +
                "- Horario de atención: Lunes a viernes de 9:00 a 17:00 hrs\n" +
                "- Jefe del departamento: Dr. Alejandro Gutiérrez López\n" +
                "- Contacto: electronica@cuautla.tecnm.mx\n\n" +
                "Este departamento coordina las materias relacionadas con circuitos electrónicos, instrumentación, control automático, robótica y sistemas embebidos.";
    } else if (lowerPregunta.includes('departamento') && lowerPregunta.includes('mecánica')) {
      respuesta = "El Departamento de Ingeniería Mecánica:\n\n" +
                "- Atiende a estudiantes de la carrera de Ingeniería Mecánica\n" +
                "- Ubicación: Edificio D, planta baja\n" +
                "- Horario de atención: Lunes a viernes de 8:00 a 16:00 hrs\n" +
                "- Jefe del departamento: M.I. Fernando Torres Gómez\n" +
                "- Contacto: mecanica@cuautla.tecnm.mx\n\n" +
                "Este departamento coordina las materias relacionadas con diseño mecánico, termodinámica, materiales, procesos de manufactura y mantenimiento industrial.";
    } else if (lowerPregunta.includes('departamento') && lowerPregunta.includes('ciencias básicas')) {
      respuesta = "El Departamento de Ciencias Básicas:\n\n" +
                "- Atiende a estudiantes de todas las carreras\n" +
                "- Ubicación: Edificio E, segundo piso\n" +
                "- Horario de atención: Lunes a viernes de 8:00 a 17:00 hrs\n" +
                "- Jefe del departamento: M.C. María González Hernández\n" +
                "- Contacto: cienciasbasicas@cuautla.tecnm.mx\n\n" +
                "Este departamento coordina las materias de tronco común como matemáticas, física, química, álgebra lineal y cálculo diferencial e integral para todas las ingenierías.";
    } else if (lowerPregunta.includes('departamento') && (lowerPregunta.includes('económico') || lowerPregunta.includes('administrativas'))) {
      respuesta = "El Departamento de Ciencias Económico-Administrativas:\n\n" +
                "- Atiende a estudiantes de todas las carreras\n" +
                "- Ubicación: Edificio F, primer piso\n" +
                "- Horario de atención: Lunes a viernes de 9:00 a 16:00 hrs\n" +
                "- Jefe del departamento: M.A. Laura Morales Jiménez\n" +
                "- Contacto: economicoadmin@cuautla.tecnm.mx\n\n" +
                "Este departamento coordina las materias relacionadas con administración, contabilidad, economía, finanzas y desarrollo empresarial para todas las carreras.";
    } else if (lowerPregunta.includes('departamento') && lowerPregunta.includes('gestión empresarial')) {
      respuesta = "El Departamento de Ingeniería en Gestión Empresarial:\n\n" +
                "- Atiende a estudiantes de la carrera de Ingeniería en Gestión Empresarial\n" +
                "- Ubicación: Edificio G, planta baja\n" +
                "- Horario de atención: Lunes a viernes de 8:30 a 16:30 hrs\n" +
                "- Jefe del departamento: Dra. Patricia Mendoza Juárez\n" +
                "- Contacto: gestionempresarial@cuautla.tecnm.mx\n\n" +
                "Este departamento coordina las materias relacionadas con administración de empresas, gestión de proyectos, mercadotecnia, desarrollo organizacional y planeación estratégica.";
    } else if (lowerPregunta.includes('departamento') && lowerPregunta.includes('metal')) {
      respuesta = "El Departamento de Metal-Mecánica:\n\n" +
                "- Atiende a estudiantes de las carreras de Ingeniería Mecánica e Industrial\n" +
                "- Ubicación: Taller de Metal-Mecánica\n" +
                "- Horario de atención: Lunes a viernes de 8:00 a 16:00 hrs\n" +
                "- Jefe del departamento: Ing. Miguel Ángel Ortiz Flores\n" +
                "- Contacto: metalmeca@cuautla.tecnm.mx\n\n" +
                "Este departamento coordina las prácticas y laboratorios relacionados con manufactura, soldadura, máquinas y herramientas, y metrología dimensional.";
    } else if (lowerPregunta.includes('departamento') && lowerPregunta.includes('funciones')) {
      respuesta = "Las funciones principales de los departamentos académicos son:\n\n" +
                "- Coordinar las actividades docentes de sus respectivas áreas\n" +
                "- Administrar los laboratorios y talleres especializados\n" +
                "- Asesorar a estudiantes en temas académicos\n" +
                "- Validar cargas académicas de los estudiantes\n" +
                "- Gestionar procesos de residencias profesionales\n" +
                "- Coordinar proyectos de investigación\n" +
                "- Asignar asesores para tesis y proyectos\n" +
                "- Organizar eventos académicos como conferencias y talleres\n" +
                "- Validar opción de titulación de los estudiantes\n\n" +
                "Para más información específica, acude directamente al departamento de tu carrera.";
    } else if (lowerPregunta.includes('trámites') && lowerPregunta.includes('departamento académico')) {
      respuesta = "Los trámites comunes que puedes realizar en tu departamento académico son:\n\n" +
                "- Validación de carga académica\n" +
                "- Solicitud de asesorías académicas\n" +
                "- Asignación de asesor para residencias profesionales\n" +
                "- Validación de informes de residencia profesional\n" +
                "- Validación de proyectos para titulación integral\n" +
                "- Solicitud de laboratorios para prácticas especiales\n" +
                "- Solicitud de cartas de recomendación\n" +
                "- Validación de equivalencia de materias\n" +
                "- Gestión de visitas industriales\n\n" +
                "Para realizar cualquier trámite, acude en los horarios de atención con tu número de control e identificación.";
    } else if (lowerPregunta.includes('contactar') && lowerPregunta.includes('departamento académico')) {
      respuesta = "Para contactar a los departamentos académicos puedes:\n\n" +
                "1. Acudir personalmente en sus horarios de atención\n" +
                "2. Enviar un correo electrónico al jefe del departamento\n" +
                "3. Llamar a la extensión telefónica correspondiente\n" +
                "4. Enviar una solicitud a través del Sistema Integral de Información\n" +
                "5. Contactar a tu coordinador de carrera\n\n" +
                "Para obtener información específica de contacto de tu departamento, visita el directorio institucional en la página web del tecnológico.";
    }
  
    res.json({ respuesta });
  };
