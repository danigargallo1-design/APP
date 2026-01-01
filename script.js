let currentLessonErrors = [];   // Errores de la lección original
let currentReviewErrors = [];   // Errores cometidos DURANTE el repaso actual
let originalLesson = null;      // Referencia para repetir la lección completa
let currentLessonCorrect = 0;   // Contador de aciertos
let activeLessonSession = null;
let currentLessonXP = 0; // XP temporal durante la lección

const mainContainer = document.getElementById('main-container');

const skills = [
    { name: "Negociar" },
    { name: "Improvisar" },
    { name: "Desarrollo personal" },
    { name: "Comunicación efectiva" }
];


const skillData = {
"Negociar": {
    lessons:[
        {
            title: "Preparación estratégica",
            content: "Antes de negociar, define tus objetivos, límites y tu BATNA (mejor alternativa si no hay acuerdo).",
            questions: [
                {
                    question: "Antes de negociar, ¿qué debes definir primero?",
                    options: [
                        "Tus objetivos y límites",
                        "Solo tu oferta inicial, para marcar posición",
                        "La primera excusa que darás si la negociación falla",
                        "Intentar predecir la estrategia de la otra parte"
                    ],
                    correct: 0,
                    explanation: "Si no decides hasta dónde llegas antes, lo decidirá la presión por ti."
                },
                {
                    question: "¿Qué es BATNA?",
                    options: [
                        "Mejor alternativa si no hay acuerdo",
                        "Una estrategia agresiva para presionar al otro",
                        "Un punto de negociación para intimidar",
                        "Un método para negociar sin escuchar a la otra parte"
                    ],
                    correct: 0,
                    explanation: "Sin BATNA, tu única opción es aceptar o perderlo todo."
                },
                {
                    question: "Por qué es importante investigar a la otra parte?",
                    options: [
                        "Para imponer tus condiciones rápidamente",
                        "Para conocer sus intereses y necesidades",
                        "Para anticipar ataques y defenderte antes de tiempo",
                        "No es necesario si confías en tu intuición"
                    ],
                    correct: 1,
                    explanation: "Negociar sin saber qué quiere el otro es hablar mucho y acertar poco."
                },
                {
                    question: "¿Qué papel juega la información en la negociación?",
                    options: [
                        "Permite manipular mejor",
                        "Te ayuda a tomar decisiones informadas",
                        "Sirve para confundir a la otra parte",
                        "No tiene relevancia si eres carismático"
                    ],
                    correct: 1,
                    explanation: "Cuanto más sabes, mejor adaptas tu estrategia."
                },
                {
                    question: "¿Cuál es el riesgo de no preparar una negociación?",
                    options: [
                        "Que todo salga perfectamente",
                        "Perder oportunidades o aceptar acuerdos desfavorables",
                        "Que la otra parte no se presente",
                        "Ganar siempre sin esfuerzo"
                    ],
                    correct: 1,
                    explanation: "Improvisar suele significar ceder demasiado o malgastar opciones."
                },
                {
                    question: "¿Por qué es clave establecer límites claros?",
                    options: [
                        "Para aparentar seguridad",
                        "Para saber cuándo aceptar o rechazar una oferta",
                        "Para intimidar a la otra parte",
                        "No es necesario si confías en tu intuición"
                    ],
                    correct: 1,
                    explanation: "Sin límites claros, corres el riesgo de ceder demasiado."
                }
            ]
        },
        {
            title: "Escucha activa y rapport",
            content: "Escuchar activamente y hacer preguntas abiertas genera confianza y comprensión mutua.",
            questions: [
                {
                    question: "¿Qué es más importante al construir rapport?",
                    options: [
                        "Hablar para impresionar y mostrar autoridad",
                        "Escuchar y hacer preguntas estratégicas",
                        "Imponer tu punto de vista para ganar control",
                        "Hacer que la otra persona se sienta cómoda aunque no avance la negociación"
                    ],
                    correct: 1,
                    explanation: "Hablar mucho no conecta. Sentirse entendido, sí."
                },
                {
                    question: "¿Qué tipo de preguntas son mejores?",
                    options: [
                        "Preguntas cerradas para dirigir la conversación",
                        "Preguntas abiertas que revelan motivaciones",
                        "Preguntas que prueban y atrapan a la otra parte",
                        "Preguntas indirectas para confundir y controlar"
                    ],
                    correct: 1,
                    explanation: "Quien hace buenas preguntas no empuja: guía."
                },
                {
                    question: "Escuchar activamente significa:",
                    options: [
                        "Interrumpir para dar tu opinión",
                        "Prestar atención, repetir y resumir lo que dice la otra persona",
                        "Solo asentir sin pensar",
                        "Esperar tu turno para hablar"
                    ],
                    correct: 1,
                    explanation: "Escuchar activamente implica comprender y reflejar lo que escuchas."
                },
                {
                    question: "¿Por qué es importante el lenguaje corporal?",
                    options: [
                        "No es importante si hablas bien",
                        "Refuerza confianza y apertura",
                        "Sirve para intimidar",
                        "Solo importa la voz"
                    ],
                    correct: 1,
                    explanation: "El cuerpo comunica tanto como las palabras, especialmente confianza."
                },
                {
                    question: "El rapport se fortalece cuando:",
                    options: [
                        "Ignoras emociones y te concentras en datos",
                        "Muestras interés genuino por la otra persona",
                        "Das órdenes claras",
                        "Hablas rápido y con seguridad"
                    ],
                    correct: 1,
                    explanation: "Interesarte genuinamente genera conexión y confianza."
                },
                {
                    question: "Errores comunes al hacer preguntas:",
                    options: [
                        "Hacer preguntas cerradas o que intimiden",
                        "Hacer preguntas abiertas que invitan a dialogar",
                        "Escuchar atentamente las respuestas",
                        "Tomar notas de lo que dicen"
                    ],
                    correct: 0,
                    explanation: "Preguntas cerradas o manipuladoras limitan la información que obtienes."
                }
            ]
        },
        {
            title: "Negociación basada en intereses",
            content: "Céntrate en los intereses reales de ambas partes y separa personas de problemas.",
            questions: [
                {
                    question: "¿Qué debemos priorizar?",
                    options: [
                        "Posiciones rígidas que protejan tu postura",
                        "Intereses reales de ambas partes",
                        "Amenazas sutiles para presionar",
                        "Evitar comprometerse para no perder control"
                    ],
                    correct: 1,
                    explanation: "Las posiciones chocan. Los intereses encajan."
                },
                {
                    question: "Separar a las personas del problema significa:",
                    options: [
                        "Ignorar emociones para ser racional",
                        "Evitar discutir para mantener la relación",
                        "Tratar problemas, no atacar personas",
                        "Solo pensar en dinero o recursos tangibles"
                    ],
                    correct: 2,
                    explanation: "Cuando atacas a la persona, el problema deja de resolverse."
                },
                {
                    question: "Centrarse en intereses reales permite:",
                    options: [
                        "Encontrar soluciones creativas",
                        "Mantener conflictos ocultos",
                        "Imponer condiciones",
                        "Evitar escuchar a la otra parte"
                    ],
                    correct: 0,
                    explanation: "Los intereses comunes abren espacio a acuerdos mutuamente beneficiosos."
                },
                {
                    question: "¿Qué pasa si solo consideramos posiciones?",
                    options: [
                        "Todo sale mejor",
                        "Se generan bloqueos y conflictos",
                        "La otra parte cede más rápido",
                        "No tiene importancia"
                    ],
                    correct: 1,
                    explanation: "Las posiciones suelen chocar; los intereses permiten negociación real."
                },
                {
                    question: "Negociar intereses vs posiciones ayuda a:",
                    options: [
                        "Ganar siempre sin ceder",
                        "Encontrar soluciones sostenibles",
                        "Confundir a la otra parte",
                        "Evitar tener que preparar la negociación"
                    ],
                    correct: 1,
                    explanation: "Intereses claros permiten acuerdos duraderos y satisfactorios."
                },
                {
                    question: "Una negociación efectiva requiere:",
                    options: [
                        "Centrarse en la persona más que el problema",
                        "Separar personas de problemas y centrarse en intereses",
                        "Evitar compromisos",
                        "Tomar decisiones al azar"
                    ],
                    correct: 1,
                    explanation: "Separar emociones y centrarse en intereses es la base de negociación efectiva."
                }
            ]
        },
        {
            title: "Estrategias prácticas",
            content: "Usa win-win, anchoring y MESO para generar acuerdos beneficiosos para ambos.",
            questions: [
                {
                    question: "Qué es una estrategia win-win?",
                    options: [
                        "Ganar tú y que la otra parte pierda",
                        "Ganar ambos",
                        "Ceder todo sin condiciones para que todo salga bien",
                        "Imponer condiciones sin escuchar al otro"
                    ],
                    correct: 1,
                    explanation: "Si alguien sale perdiendo, el conflicto solo se aplaza."
                },
                {
                    question: "Qué es anchoring?",
                    options: [
                        "Primera oferta que fija el rango de negociación",
                        "Una táctica para ignorar al otro y forzar la ventaja",
                        "Un estilo de lenguaje corporal intimidante",
                        "Un tipo de pregunta para confundir a la otra parte"
                    ],
                    correct: 0,
                    explanation: "El primer número no decide el acuerdo, pero sí el terreno."
                },
                {
                    question: "MESO significa:",
                    options: [
                        "Ofertas múltiples equivalentes simultáneas",
                        "Amenazar al otro con perder todo",
                        "Negociar sin preparación",
                        "Aceptar lo que la otra parte ofrece"
                    ],
                    correct: 0,
                    explanation: "Presentar varias opciones aumenta las posibilidades de acuerdo."
                },
                {
                    question: "Una táctica win-win busca:",
                    options: [
                        "Que ambas partes sientan beneficio",
                        "Que solo tú ganes",
                        "Que la otra parte ceda todo",
                        "Evitar acuerdos complicados"
                    ],
                    correct: 0,
                    explanation: "Un buen acuerdo es satisfactorio para todos, no solo para uno."
                },
                {
                    question: "Anchoring es efectivo porque:",
                    options: [
                        "Confunde a la otra parte",
                        "Define un punto de referencia psicológico para el valor",
                        "Garantiza el acuerdo",
                        "Fuerza a la otra parte a ceder todo"
                    ],
                    correct: 1,
                    explanation: "El primer número establece un marco de referencia, aunque no determine el resultado final."
                },
                {
                    question: "MESO permite:",
                    options: [
                        "Aumentar flexibilidad y opciones de acuerdo",
                        "Reducir la interacción con la otra parte",
                        "Ceder inmediatamente",
                        "Imponer condiciones sin negociación"
                    ],
                    correct: 0,
                    explanation: "Ofrecer varias alternativas facilita llegar a un acuerdo que beneficie a todos."
                }
            ]
        },
        {
            title: "Control de emociones",
            content: "Mantén la calma, controla tus emociones y usa la empatía para identificar intereses.",
            questions: [
                {
                    question: "Por qué es importante controlar tus emociones?",
                    options: [
                        "Para pensar con claridad y tomar decisiones",
                        "Para impresionar al otro con autocontrol",
                        "Porque no tiene relevancia en la negociación",
                        "Para manipular sin que se note"
                    ],
                    correct: 0,
                    explanation: "La emoción no te hace débil. Te hace predecible."
                },
                {
                    question: "La empatía durante la negociación sirve para:",
                    options: [
                        "Demostrar debilidad ante la otra parte",
                        "Entender la perspectiva del otro",
                        "Ceder para evitar conflicto aunque pierdas valor",
                        "Evitar preguntas incómodas que podrían incomodar"
                    ],
                    correct: 1,
                    explanation: "Entender no es ceder. Es dejar de negociar a oscuras."
                },
                {
                    question: "Mantener la calma ayuda a:",
                    options: [
                        "Tomar decisiones racionales",
                        "Asustar a la otra parte",
                        "Imponer tus condiciones sin escuchar",
                        "Ignorar la situación"
                    ],
                    correct: 0,
                    explanation: "La calma permite evaluar opciones y negociar mejor."
                },
                {
                    question: "Emociones descontroladas pueden causar:",
                    options: [
                        "Confianza mutua",
                        "Decisiones impulsivas y pérdida de oportunidades",
                        "Mejor comunicación",
                        "Acuerdos más sólidos"
                    ],
                    correct: 1,
                    explanation: "El descontrol emocional nubla el juicio y la estrategia."
                },
                {
                    question: "Empatía permite:",
                    options: [
                        "Manipular a la otra persona",
                        "Identificar verdaderos intereses y necesidades",
                        "Evitar la negociación",
                        "Ceder todo sin razón"
                    ],
                    correct: 1,
                    explanation: "Comprender al otro ayuda a generar soluciones efectivas."
                },
                {
                    question: "El autocontrol en negociaciones ayuda a:",
                    options: [
                        "Mantener relaciones y decisiones efectivas",
                        "Hacer que la otra parte se sienta intimidada",
                        "Ignorar los intereses propios",
                        "Evitar preparación previa"
                    ],
                    correct: 0,
                    explanation: "Controlar tus reacciones permite negociar con eficacia y respeto mutuo."
                }
            ]
        }
    ]
},




"Improvisar": {
    lessons: [
        {
            title: "Responder rápido",
            content: "Aprende a reaccionar de manera efectiva ante situaciones inesperadas, manteniendo calma y creatividad, y tomando decisiones inteligentes bajo presión.",
            questions: [
                {
                    question: "Si enfrentas un problema inesperado y tu primer instinto es bloquearte, ¿qué estrategia tiene más impacto real?",
                    options: [
                        "Respirar, analizar la situación y actuar con creatividad",
                        "Decidir lo primero que venga",
                        "Esperar a que alguien más solucione el problema",
                        "Ignorar la situación"
                    ],
                    correct: 0,
                    explanation: "Bloquearse es humano. Quedarse ahí es una decisión."
                },
                {
                    question: "Cuando improvisas en la vida diaria, ¿por qué no basta con solo reaccionar rápido?",
                    options: [
                        "Porque la rapidez sin reflexión puede causar errores",
                        "Porque siempre se necesita un plan exacto",
                        "Porque improvisar es solo para artistas",
                        "Porque reaccionar rápido siempre es suficiente"
                    ],
                    correct: 0,
                    explanation: "Velocidad sin dirección suele acabar en problemas más grandes."
                },
                {
                    question: "Para mantener coherencia al improvisar, lo más efectivo es:",
                    options: [
                        "Escuchar activamente y conectar tus ideas con lo que ya existe",
                        "Decir cualquier cosa sin pensar",
                        "Romper la lógica a propósito",
                        "Ignorar lo que los demás dicen"
                    ],
                    correct: 0,
                    explanation: "Improvisar no es inventar de cero, es construir sobre lo que ya hay."
                },
                {
                    question: "Por qué la calma es clave al improvisar?",
                    options: [
                        "Porque permite evaluar opciones y actuar con claridad",
                        "Para aparentar confianza",
                        "No es relevante si eres rápido",
                        "Para evitar actuar"
                    ],
                    correct: 0,
                    explanation: "La calma te permite pensar antes de actuar, evitando errores impulsivos."
                },
                {
                    question: "La creatividad al improvisar se potencia cuando:",
                    options: [
                        "Ignoras todo contexto",
                        "Usas lo que tienes disponible y lo adaptas",
                        "Solo repites lo aprendido",
                        "Intentas sorprender sin sentido"
                    ],
                    correct: 1,
                    explanation: "Improvisar bien significa adaptar recursos y contexto de manera inteligente."
                },
                {
                    question: "La práctica de improvisar mejora:",
                    options: [
                        "La capacidad de reaccionar bajo presión y encontrar soluciones",
                        "Solo la memoria",
                        "La planificación estricta",
                        "Nada, depende solo del talento natural"
                    ],
                    correct: 0,
                    explanation: "Improvisar es una habilidad que se fortalece con la práctica y exposición a situaciones reales."
                }
            ]
        },
        {
            title: "Actuar sin plan",
            content: "Desarrolla la capacidad de desenvolverte sin guion, confiando en tus instintos y adaptándote a la interacción con los demás.",
            questions: [
                {
                    question: "Si una situación inesperada te obliga a actuar sin preparación, ¿cuál es la actitud más poderosa?",
                    options: [
                        "Confiar en tus instintos y adaptarte",
                        "Seguir un guion rígido",
                        "No involucrarte",
                        "Hacer lo contrario de lo que se espera"
                    ],
                    correct: 0,
                    explanation: "El instinto afinado responde mejor que cualquier plan que ya no encaja."
                },
                {
                    question: "Cuando improvisas, ¿por qué la flexibilidad mental es más valiosa que memorizar técnicas?",
                    options: [
                        "Porque permite ajustarse a cambios inesperados",
                        "Porque solo sirve en juegos",
                        "No es relevante",
                        "Para sorprender sin sentido"
                    ],
                    correct: 0,
                    explanation: "Las técnicas fallan cuando la realidad cambia. La flexibilidad no."
                },
                {
                    question: "Si cometes un error al improvisar, lo más útil es:",
                    options: [
                        "Integrarlo creativamente y seguir adelante",
                        "Pretender que no sucedió",
                        "Detener todo hasta resolverlo",
                        "Evitar improvisar de nuevo"
                    ],
                    correct: 0,
                    explanation: "Un error mal gestionado se nota. Uno integrado pasa desapercibido."
                },
                {
                    question: "Confiar en tus instintos significa:",
                    options: [
                        "Actuar sin analizar nada",
                        "Escuchar señales internas y adaptarse al momento",
                        "Ignorar la lógica",
                        "Seguir siempre la primera idea"
                    ],
                    correct: 1,
                    explanation: "El instinto informado se basa en experiencia y observación, no en impulsos ciegos."
                },
                {
                    question: "Adaptarse a otros durante la improvisación ayuda a:",
                    options: [
                        "Crear interacción y soluciones más efectivas",
                        "Evitar la improvisación",
                        "Imponer tu idea",
                        "Ignorar las reacciones"
                    ],
                    correct: 0,
                    explanation: "La improvisación social requiere leer y reaccionar a otros, no actuar solo."
                },
                {
                    question: "Una actitud flexible permite:",
                    options: [
                        "Resolver problemas inesperados con creatividad",
                        "Evitar responsabilidades",
                        "Seguir siempre un plan rígido",
                        "Hacer las cosas al azar"
                    ],
                    correct: 0,
                    explanation: "La flexibilidad es la base de improvisar con eficacia."
                }
            ]
        },
        {
            title: "Historias espontáneas",
            content: "Crea narrativas rápidas y coherentes sobre la marcha, usando imaginación y una estructura mínima para mantener la atención de tu audiencia.",
            questions: [
                {
                    question: "Cuando cuentas una historia espontánea, ¿por qué es importante mantener una estructura mínima?",
                    options: [
                        "Para que la historia sea comprensible y atractiva",
                        "Para improvisar sin sentido",
                        "Para confundir al público",
                        "Para repetir historias conocidas"
                    ],
                    correct: 0,
                    explanation: "Sin estructura, el oyente se pierde antes que tú."
                },
                {
                    question: "Si notas que tu audiencia pierde atención mientras improvisas, ¿qué estrategia tiene más impacto?",
                    options: [
                        "Variar ritmo, tono y añadir detalles interesantes",
                        "Hablar monótonamente",
                        "Ignorar sus reacciones",
                        "Hacer la historia más larga"
                    ],
                    correct: 0,
                    explanation: "Si no reaccionas a tu público, improvisas solo."
                },
                {
                    question: "Improvisar historias te ayuda a…",
                    options: [
                        "Desarrollar creatividad y adaptabilidad",
                        "Solo para juegos de rol",
                        "No tiene utilidad real",
                        "Memorizar guiones"
                    ],
                    correct: 0,
                    explanation: "La vida rara vez sigue un guion. Improvisar te prepara para eso."
                },
                {
                    question: "Una buena historia improvisada mantiene:",
                    options: [
                        "Coherencia y conexión con la audiencia",
                        "Solo diversión sin sentido",
                        "Confusión para captar atención",
                        "Detalles irrelevantes"
                    ],
                    correct: 0,
                    explanation: "La coherencia y conexión captan y retienen la atención del público."
                },
                {
                    question: "Para mejorar tus historias espontáneas conviene:",
                    options: [
                        "Practicar imaginación y adaptación rápida",
                        "Memorizar guiones exactos",
                        "Evitar contar historias",
                        "Seguir un esquema rígido"
                    ],
                    correct: 0,
                    explanation: "La práctica fortalece creatividad y capacidad de adaptación."
                },
                {
                    question: "Adaptar la historia al público significa:",
                    options: [
                        "Leer sus reacciones y ajustar contenido y estilo",
                        "Contar siempre lo mismo",
                        "Ignorar sus expresiones",
                        "Imponer un mensaje sin importar la audiencia"
                    ],
                    correct: 0,
                    explanation: "La improvisación efectiva es dinámica y centrada en la audiencia."
                }
            ]
        }
    ]
},


"Desarrollo personal": {
    lessons: [
        {
            title: "Autoconocimiento profundo",
            content: "Conocerte a ti mismo te permite tomar decisiones más conscientes, identificar áreas de mejora y vivir con mayor coherencia.",
            questions: [
                {
                    question: "Si constantemente evitas reflexionar sobre tus emociones y decisiones, ¿qué impacto puede tener en tu vida?",
                    options: [
                        "Tendrás más claridad y control",
                        "Seguirás repitiendo errores sin darte cuenta",
                        "No tiene impacto",
                        "Te hace más popular"
                    ],
                    correct: 1,
                    explanation: "Lo que no revisas, lo repites."
                },
                {
                    question: "Cuando descubres una debilidad importante en ti mismo, ¿qué actitud genera más crecimiento?",
                    options: [
                        "Negarla y seguir igual",
                        "Analizarla y buscar cómo mejorar",
                        "Culpar a otros",
                        "Ignorarla hasta que desaparezca sola"
                    ],
                    correct: 1,
                    explanation: "Negar una debilidad no la elimina, solo la hace más fuerte."
                },
                {
                    question: "¿Por qué es valioso recibir feedback de otros sobre ti mismo?",
                    options: [
                        "Para impresionar a los demás",
                        "Para descubrir áreas ciegas y crecer",
                        "Para compararte con otros",
                        "Para sentirte criticado"
                    ],
                    correct: 1,
                    explanation: "Tú no te ves completo desde dentro."
                },
                {
                    question: "El autoconocimiento permite:",
                    options: [
                        "Tomar decisiones más conscientes y alineadas con tus valores",
                        "Evitar responsabilidades",
                        "Seguir la corriente sin reflexionar",
                        "Ignorar emociones"
                    ],
                    correct: 0,
                    explanation: "Conocerte a ti mismo te da claridad para actuar según tus objetivos."
                },
                {
                    question: "Explorar tus emociones difíciles ayuda a:",
                    options: [
                        "Evitar conflictos internos",
                        "Comprender patrones y mejorar la toma de decisiones",
                        "Sentirte vulnerable sin beneficio",
                        "Reprimir sentimientos"
                    ],
                    correct: 1,
                    explanation: "Aceptar emociones complejas permite aprender y crecer."
                },
                {
                    question: "Una práctica efectiva de autoconocimiento es:",
                    options: [
                        "Reflexionar y escribir sobre experiencias y emociones",
                        "Evitar pensar en uno mismo",
                        "Solo seguir consejos de otros sin análisis",
                        "Compararte con los demás constantemente"
                    ],
                    correct: 0,
                    explanation: "Reflexionar de forma sistemática desarrolla conciencia y claridad personal."
                }
            ]
        },
        {
            title: "Gestión efectiva del tiempo",
            content: "Organizar tu tiempo de manera consciente incrementa productividad y bienestar, evitando sentirte abrumado.",
            questions: [
                {
                    question: "Si planificas tus tareas pero sigues procrastinando, ¿qué podrías estar ignorando?",
                    options: [
                        "Tus hábitos y motivación",
                        "Tus metas a largo plazo",
                        "Las herramientas de planificación",
                        "No importa, planificar es suficiente"
                    ],
                    correct: 0,
                    explanation: "Un plan que no encaja contigo está condenado a fallar."
                },
                {
                    question: "Cuando priorizas tareas, ¿qué estrategia evita que pierdas energía en lo menos importante?",
                    options: [
                        "Hacer primero lo urgente aunque no sea relevante",
                        "Focalizarse en lo importante y planificar",
                        "Hacer todo a la vez",
                        "Esperar a que llegue inspiración"
                    ],
                    correct: 1,
                    explanation: "Estar ocupado no es lo mismo que avanzar."
                },
                {
                    question: "Si constantemente pospones tareas importantes, ¿qué hábito debes trabajar primero?",
                    options: [
                        "Autodisciplina y planificación realista",
                        "Depender de la suerte",
                        "Hacer solo tareas fáciles",
                        "Hacer todo a la vez"
                    ],
                    correct: 0,
                    explanation: "La motivación aparece después de empezar, no antes."
                },
                {
                    question: "El tiempo bien gestionado contribuye a:",
                    options: [
                        "Mayor productividad y menor estrés",
                        "Hacer más cosas sin orden",
                        "Evitar responsabilidades",
                        "Trabajar sin descanso"
                    ],
                    correct: 0,
                    explanation: "Planificar y priorizar aumenta eficiencia y bienestar."
                },
                {
                    question: "Una técnica efectiva para organizar tu tiempo es:",
                    options: [
                        "Bloquear periodos para tareas importantes y descansos",
                        "Hacer todo al mismo tiempo",
                        "Evitar cualquier planificación",
                        "Depender de la inspiración del momento"
                    ],
                    correct: 0,
                    explanation: "La estructura consciente permite avanzar sin saturarse."
                },
                {
                    question: "Reconocer tus patrones de procrastinación ayuda a:",
                    options: [
                        "Implementar estrategias para superarla",
                        "Evitar responsabilidades",
                        "Dejar todo para último momento",
                        "Trabajar sin control"
                    ],
                    correct: 0,
                    explanation: "Entender por qué pospones tareas te permite cambiar hábitos y mejorar resultados."
                }
            ]
        },
        {
            title: "Motivación y hábitos duraderos",
            content: "Comprender cómo motivarte y formar hábitos positivos transforma tu vida a largo plazo; pequeños cambios diarios generan grandes resultados.",
            questions: [
                {
                    question: "Si solo dependes de tu fuerza de voluntad para cambiar hábitos, ¿qué suele ocurrir?",
                    options: [
                        "Logras cambios sostenibles",
                        "Te frustras y abandonas fácilmente",
                        "No tiene impacto",
                        "Te vuelves más motivado automáticamente"
                    ],
                    correct: 1,
                    explanation: "La fuerza de voluntad se agota. Los sistemas no."
                },
                {
                    question: "Cuando intentas cambiar múltiples hábitos a la vez y fracasas, ¿qué aprendizaje profundo puedes aplicar?",
                    options: [
                        "Comenzar con pequeños pasos y priorizar",
                        "Depender solo de la motivación del momento",
                        "Abandonar todo intento",
                        "Compararte constantemente con otros"
                    ],
                    correct: 0,
                    explanation: "Querer cambiar todo suele acabar en no cambiar nada."
                },
                {
                    question: "Celebrar pequeños logros tiene un efecto clave en tu desarrollo personal porque…",
                    options: [
                        "Te hace sentir superior a otros",
                        "Refuerza la motivación y consolida hábitos",
                        "No tiene impacto real",
                        "Es solo para reconocimiento externo"
                    ],
                    correct: 1,
                    explanation: "El progreso que no se reconoce, se abandona."
                },
                {
                    question: "La motivación sostenible depende de:",
                    options: [
                        "Sistemas y hábitos, no solo fuerza de voluntad",
                        "Impulso momentáneo",
                        "Compararte con otros",
                        "Ignorar tus objetivos"
                    ],
                    correct: 0,
                    explanation: "Los hábitos construidos sobre sistemas sólidos perduran más que la motivación efímera."
                },
                {
                    question: "Para formar un hábito duradero conviene:",
                    options: [
                        "Comenzar con pequeños pasos y reforzar con recompensas",
                        "Intentar cambiar todo de golpe",
                        "Depender únicamente de inspiración",
                        "Evitar cualquier registro de progreso"
                    ],
                    correct: 0,
                    explanation: "Pequeños pasos consistentes generan resultados sostenibles."
                },
                {
                    question: "Revisar y ajustar tus hábitos regularmente permite:",
                    options: [
                        "Mantener eficacia y adaptarte a cambios en la vida",
                        "Dejar que se rompan sin razón",
                        "Seguir sin mejorar",
                        "Evitar esfuerzo adicional"
                    ],
                    correct: 0,
                    explanation: "La revisión continua asegura que los hábitos sigan alineados con tus metas."
                }
            ]
        }
    ]
},


"Comunicación efectiva": {
    lessons: [
        {
            title: "Escucha activa",
            content: "Escuchar atentamente y entender la perspectiva del otro permite comunicarse mejor y evitar malentendidos.",
            questions: [
                {
                    question: "Si alguien te explica un problema y tú ya conoces la solución, ¿qué deberías hacer primero?",
                    options: [
                        "Dar la solución inmediatamente",
                        "Escuchar y entender completamente su perspectiva",
                        "Decir que ya sabes cómo resolverlo",
                        "Cambiar el tema"
                    ],
                    correct: 1,
                    explanation: "Escuchar primero permite que la otra persona se sienta comprendida y puede revelar detalles que ignorabas. Saltar a la solución puede cerrar la comunicación y generar resistencia."
                },
                {
                    question: "Tu colega te cuenta algo complicado, pero tú estás distraído. ¿Qué impacto tiene responder automáticamente con ‘sí, claro’?",
                    options: [
                        "Evita perder tiempo",
                        "Genera confianza",
                        "Muestra desinterés y reduce la conexión",
                        "Es neutro"
                    ],
                    correct: 2,
                    explanation: "Responder sin atención da la sensación de que no valoras a la persona, incluso si las palabras son amables."
                },
                {
                    question: "Cuando alguien habla de un problema, ¿cuál es la actitud más poderosa para entender realmente lo que dice?",
                    options: [
                        "Asentir sin pensar",
                        "Formular preguntas abiertas para profundizar",
                        "Interrumpir para dar consejo",
                        "Evitar involucrarte emocionalmente"
                    ],
                    correct: 1,
                    explanation: "Hacer preguntas abiertas y explorar lo que la otra persona dice genera comprensión profunda y conexión real."
                },
                {
                    question: "Escuchar activamente significa también:",
                    options: [
                        "Ignorar el lenguaje corporal",
                        "Reflejar y resumir lo que escuchas",
                        "Responder con lo primero que piensas",
                        "Esperar tu turno para hablar"
                    ],
                    correct: 1,
                    explanation: "Reflejar lo que escuchas asegura que entendiste correctamente y muestra atención."
                },
                {
                    question: "Errores comunes al escuchar activamente son:",
                    options: [
                        "Interrumpir y juzgar prematuramente",
                        "Hacer preguntas abiertas",
                        "Asentir y mantener contacto visual",
                        "Tomar notas para clarificar"
                    ],
                    correct: 0,
                    explanation: "Juzgar o interrumpir bloquea la comunicación y genera resistencia."
                },
                {
                    question: "Escuchar bien ayuda a:",
                    options: [
                        "Comprender al otro y prevenir conflictos",
                        "Solo a aparentar interés",
                        "Evitar tomar decisiones",
                        "Ignorar emociones"
                    ],
                    correct: 0,
                    explanation: "La escucha activa permite conectar y responder de manera adecuada y eficaz."
                }
            ]
        },
        {
            title: "Claridad al expresarse",
            content: "Transmitir ideas de manera clara y organizada facilita la comprensión y evita malentendidos.",
            questions: [
                {
                    question: "Quieres dar instrucciones claras a alguien que se distrae fácilmente. ¿Qué estrategia es más efectiva?",
                    options: [
                        "Dar un discurso largo y detallado",
                        "Dividir la información en pasos simples",
                        "Repetir la misma instrucción varias veces",
                        "Dar solo lo esencial y esperar que lo deduzca"
                    ],
                    correct: 1,
                    explanation: "Organizar la información en pasos claros facilita la acción y reduce errores."
                },
                {
                    question: "Cuando alguien no entiende tu punto, ¿qué es más útil hacer?",
                    options: [
                        "Repetir lo mismo más fuerte",
                        "Cambiar el enfoque y usar ejemplos",
                        "Insistir en tu idea original",
                        "Ignorar que no entendió"
                    ],
                    correct: 1,
                    explanation: "Adaptar tu mensaje a cómo el otro procesa la información genera comprensión real y reduce frustración."
                },
                {
                    question: "Para que tu mensaje sea convincente, es mejor:",
                    options: [
                        "Hablar rápido y con seguridad",
                        "Organizar ideas y conectar con la perspectiva del receptor",
                        "Usar palabras rebuscadas",
                        "Evitar ejemplos concretos"
                    ],
                    correct: 1,
                    explanation: "Conectar tus ideas con la perspectiva del otro facilita que comprendan y acepten tu mensaje."
                },
                {
                    question: "Claridad en la comunicación también implica:",
                    options: [
                        "Ser conciso y estructurado",
                        "Hablar mucho para impresionar",
                        "Evitar retroalimentación",
                        "Usar tecnicismos complejos"
                    ],
                    correct: 0,
                    explanation: "Ser conciso y organizado ayuda a que el mensaje sea entendido rápidamente."
                },
                {
                    question: "Errores frecuentes al comunicar ideas son:",
                    options: [
                        "Dar información confusa o sin orden",
                        "Usar ejemplos claros",
                        "Revisar si el receptor entendió",
                        "Adaptar el mensaje según la audiencia"
                    ],
                    correct: 0,
                    explanation: "El desorden y la falta de claridad generan malentendidos y frustración."
                },
                {
                    question: "Para mejorar la claridad de tus mensajes conviene:",
                    options: [
                        "Planificar lo que quieres decir y usar ejemplos concretos",
                        "Improvisar sin estructura",
                        "Evitar interacción con el receptor",
                        "Hablar rápido para no perder tiempo"
                    ],
                    correct: 0,
                    explanation: "Preparar y ejemplificar ayuda a que la audiencia comprenda y retenga la información."
                }
            ]
        },
        {
            title: "Feedback efectivo",
            content: "Dar y recibir retroalimentación de manera estratégica potencia el aprendizaje y fortalece relaciones.",
            questions: [
                {
                    question: "Al dar feedback a alguien que falló, ¿qué frase genera más aprendizaje y motivación?",
                    options: [
                        "‘Hiciste mal esto, hazlo mejor’",
                        "‘Noté que X no salió como esperábamos, ¿cómo crees que podrías ajustarlo?’",
                        "‘Siempre haces lo mismo mal’",
                        "‘No importa, inténtalo otra vez’"
                    ],
                    correct: 1,
                    explanation: "Formular preguntas abiertas hace que la persona reflexione y encuentre soluciones, en lugar de sentirse juzgada."
                },
                {
                    question: "Recibes feedback que no te gusta. ¿Qué acción tiene más impacto positivo?",
                    options: [
                        "Defenderte inmediatamente",
                        "Reflexionar sobre lo que puede ser útil",
                        "Ignorar todo",
                        "Criticar al que lo dio"
                    ],
                    correct: 1,
                    explanation: "Separar emoción de información útil transforma la retroalimentación en crecimiento real."
                },
                {
                    question: "Cuando das feedback, lo más importante es:",
                    options: [
                        "Criticar duramente",
                        "Ser específico, centrado en acciones y constructivo",
                        "Comparar con otros",
                        "Evitar señalar errores"
                    ],
                    correct: 1,
                    explanation: "Un feedback concreto y constructivo permite aprender y mejorar sin generar resentimiento."
                },
                {
                    question: "Feedback efectivo también implica:",
                    options: [
                        "Escuchar la respuesta y ajustar tu comunicación",
                        "Dar siempre la misma retroalimentación",
                        "Evitar aclaraciones",
                        "Ignorar emociones del receptor"
                    ],
                    correct: 0,
                    explanation: "La retroalimentación bidireccional refuerza aprendizaje y comprensión."
                },
                {
                    question: "Errores comunes al dar feedback son:",
                    options: [
                        "Generalizar y criticar personalmente",
                        "Ser específico y constructivo",
                        "Escuchar y preguntar",
                        "Reforzar lo positivo"
                    ],
                    correct: 0,
                    explanation: "Criticar personalmente genera resistencia y daña la relación."
                },
                {
                    question: "El feedback positivo es importante porque:",
                    options: [
                        "Refuerza conductas adecuadas y motiva al aprendizaje",
                        "Es solo para agradar",
                        "No tiene impacto real",
                        "Evita confrontaciones"
                    ],
                    correct: 0,
                    explanation: "Reconocer lo correcto fortalece hábitos y relaciones, complementando la corrección de errores."
                }
            ]
        },
        {
            title: "Comunicación no verbal",
            content: "Tu postura, gestos y expresiones refuerzan tu mensaje y transmiten confianza y credibilidad.",
            questions: [
                {
                    question: "Qué transmite tu lenguaje corporal durante una conversación?",
                    options: [
                        "Nada importante",
                        "Confianza y atención",
                        "Confusión a otros",
                        "Solo entretenimiento"
                    ],
                    correct: 1,
                    explanation: "El lenguaje corporal coherente refuerza tu mensaje y genera confianza."
                },
                {
                    question: "Para comunicarte mejor, es recomendable:",
                    options: [
                        "Mantener contacto visual y gestos naturales",
                        "Mirar al suelo siempre",
                        "Evitar gestos",
                        "Cruzar los brazos y no sonreír"
                    ],
                    correct: 0,
                    explanation: "El contacto visual y gestos naturales mejoran la recepción de tu mensaje."
                },
                {
                    question: "Si alguien parece distraído mientras hablas, ¿qué deberías hacer?",
                    options: [
                        "Ignorarlo y continuar",
                        "Preguntar si necesita clarificación o pausa",
                        "Hablar más rápido para terminar",
                        "Cambiar de tema sin explicarlo"
                    ],
                    correct: 1,
                    explanation: "Preguntar o adaptar tu mensaje permite reconectar y asegurar comprensión."
                },
                {
                    question: "La congruencia entre palabras y gestos significa:",
                    options: [
                        "Que tu lenguaje corporal coincide con tu mensaje",
                        "Ignorar la postura",
                        "Decir lo opuesto de lo que sientes",
                        "Solo preocuparte por lo verbal"
                    ],
                    correct: 0,
                    explanation: "Si gestos y palabras no coinciden, el receptor percibe desconfianza o confusión."
                },
                {
                    question: "El tono de voz impacta en la comunicación porque:",
                    options: [
                        "Refuerza emociones y claridad del mensaje",
                        "No tiene relevancia",
                        "Solo importa el contenido",
                        "Solo sirve para dramatizar"
                    ],
                    correct: 0,
                    explanation: "Tono, ritmo y volumen modulan la interpretación y la recepción de tu mensaje."
                },
                {
                    question: "Un error común en comunicación no verbal es:",
                    options: [
                        "Enviar señales contradictorias al mensaje verbal",
                        "Usar gestos coherentes",
                        "Mantener contacto visual apropiado",
                        "Asentir para reforzar"
                    ],
                    correct: 0,
                    explanation: "Señales contradictorias generan confusión y reducen credibilidad."
                }
            ]
        }
    ]
}
};

////////////////////////////////////////////////////////////////////////



// ===== RESET COMPLETO (solo para uso tuyo) =====
localStorage.removeItem('progreso');
localStorage.removeItem('profile');

// Reiniciar variables en memoria
progreso = {};
currentLessonXP = 0;
profile = {
    name: null,
    xp: 0,
    level: 1
};

// Forzar que se pida perfil al recargar
askForProfile();
updateProfileCard();



// Reiniciar todo el progreso
progreso = {};
localStorage.setItem('progreso', JSON.stringify(progreso));




///////////////////////////////////////////////////////////////////////////

// ===== Cargar progreso desde localStorage =====
let progreso = {};
const savedProgress = localStorage.getItem('progreso');
if (savedProgress) progreso = JSON.parse(savedProgress);

// ===== Función genérica: Crear botón de volver =====
function createBackButton(onClick) {
    const btn = document.createElement('button');
    btn.textContent = "← Volver";
    btn.classList.add('back-button');
    btn.onclick = onClick;
    return btn;
}



// ===== Mostrar pantalla principal =====
function showHome() {
    activeLessonSession = null;
    mainContainer.innerHTML = "<h2>Habilidades</h2>";
    skills.forEach(skill => {
        const btn = document.createElement('button');
        btn.textContent = skill.name;
        btn.onclick = () => showSkill(skill.name);
        mainContainer.appendChild(btn);
    });
}

// ===== Mostrar habilidad y sus lecciones =====
// ===== Mostrar habilidad y sus lecciones con Bloqueo Progresivo =====
function showSkill(skill) {
    if (!skillData[skill]) return showHome();

    mainContainer.innerHTML = "";
    mainContainer.appendChild(createBackButton(showHome));

    const title = document.createElement('h2');
    title.textContent = skill;
    mainContainer.appendChild(title);

    const lessons = skillData[skill].lessons;

    lessons.forEach((lesson, index) => {
        const lessonRow = document.createElement('div');
        lessonRow.classList.add('lesson-row');

        const totalQuestions = lesson.questions?.length || 0;
        const currentSavedProgress = progreso[skill]?.[lesson.title] || 0;

        // --- LÓGICA DE DESBLOQUEO ---
        let isUnlocked = true;

        if (index > 0) {
            // Verificamos la lección anterior
            const prevLesson = lessons[index - 1];
            const prevTotal = prevLesson.questions?.length || 0;
            const prevProgress = progreso[skill]?.[prevLesson.title] || 0;

            // Si la anterior no está terminada, esta se bloquea
            isUnlocked = prevProgress >= prevTotal && prevTotal > 0;
        }

        const lessonBtn = document.createElement('button');
        lessonBtn.classList.add('lesson-btn');
        lessonBtn.style.flex = '1';

        // --- RENDERIZADO SEGÚN ESTADO ---
        if (!isUnlocked) {
            // ESTADO: BLOQUEADA 🔒
            lessonBtn.classList.add('locked');
            lessonBtn.textContent = `🔒 ${lesson.title}`;
            
            // Animación Shake al hacer clic
            lessonBtn.onclick = () => {
                lessonBtn.classList.remove('shake-animation');
                void lessonBtn.offsetWidth; // Truco para reiniciar animación
                lessonBtn.classList.add('shake-animation');
            };
        } else {
            // ESTADO: DESBLOQUEADA
            if (totalQuestions > 0) {
                if (currentSavedProgress >= totalQuestions) {
                    lessonBtn.classList.add('completed');
                    lessonBtn.textContent = `${lesson.title} ✓`;
                } else if (currentSavedProgress > 0) {
                    lessonBtn.classList.add('in-progress');
                    lessonBtn.textContent = `${lesson.title} (${currentSavedProgress}/${totalQuestions})`;
                } else {
                    lessonBtn.textContent = `${lesson.title} (0/${totalQuestions})`;
                }
            } else {
                lessonBtn.textContent = lesson.title;
            }

            lessonBtn.onclick = () => {
                let startIndex = currentSavedProgress;
                if (currentSavedProgress >= totalQuestions) startIndex = 0;
                
                if (totalQuestions > 0) showQuestion(skill, lesson, startIndex);
                else showLesson(skill, lesson);
            };
        }

        lessonRow.appendChild(lessonBtn);

        // Botón Estudiar (solo aparece si está desbloqueada)
        if (isUnlocked) {
            const studyBtn = document.createElement('button');
            studyBtn.textContent = "Estudiar";
            studyBtn.classList.add('study-button');
            studyBtn.onclick = () => showLessonStudy(skill, lesson);
            lessonRow.appendChild(studyBtn);
        }

        mainContainer.appendChild(lessonRow);
    });
}

// ===== Mostrar lección normal =====
function showLesson(skill, lesson) {
    mainContainer.innerHTML = "";
    mainContainer.appendChild(createBackButton(() => {
        cleanupQuestion();
        showSkill(skill);
    }));

    const title = document.createElement('h2');
    title.textContent = lesson.title || "Lección";
    mainContainer.appendChild(title);

    const div = document.createElement('div');
    div.textContent = lesson.content || "Aquí irá la lección (contenido por ahora)";
    mainContainer.appendChild(div);
}

// ===== Mostrar lección en modo estudio =====
function showLessonStudy(skill, lesson) {
    mainContainer.innerHTML = "";
    mainContainer.appendChild(createBackButton(() => showSkill(skill)));

    const title = document.createElement('h2');
    title.textContent = lesson.title || "Lección";
    mainContainer.appendChild(title);

    const div = document.createElement('div');
    div.style.textAlign = 'left';
    div.style.marginTop = '1rem';
    div.style.lineHeight = '1.5rem';

    if (lesson.questions?.length > 0) {
        let studyHTML = `<p><strong>${lesson.title}</strong> es un apartado fundamental. Repasa estos conceptos:</p>`;
        lesson.questions.forEach((q, i) => {
            let concept = q.question.split('?')[0];
            studyHTML += `<h3>Concepto ${i + 1}: ${concept}</h3>`;
            studyHTML += `<p>${q.explanation}</p>`;
        });
        div.innerHTML = studyHTML;
    } else {
        div.textContent = lesson.content || "Aquí irá la lección (contenido por ahora)";
    }

    mainContainer.appendChild(div);
}

function showQuestion(skill, lesson, questionIndex, isReview = false) {
    // 1. Si es el inicio de una lección normal, reseteamos contadores y errores
    if (questionIndex === 0 && !isReview) {
        currentLessonCorrect = 0;
        currentLessonErrors = [];
        originalLesson = lesson; 
    }

    const sessionId = Date.now();
    activeLessonSession = sessionId;
    const questionData = lesson.questions[questionIndex];

    mainContainer.innerHTML = "";
    
    // Botón volver
    mainContainer.appendChild(createBackButton(() => {
        cleanupQuestion();
        showSkill(skill);
    }));

    const qTitle = document.createElement('h2');
    qTitle.textContent = questionData.question;
    mainContainer.appendChild(qTitle);

    const optionsContainer = document.createElement('div');
    mainContainer.appendChild(optionsContainer);

    const explanationDiv = document.createElement('div');
    explanationDiv.style.marginTop = '1rem';
    explanationDiv.style.fontStyle = 'italic';
    mainContainer.appendChild(explanationDiv);

    const { progressContainer, startProgress, completeProgress } = createProgressBar(sessionId, () => goNext());
    mainContainer.appendChild(progressContainer);

    let questionCompleted = false;

    function cleanupQuestion() {
        questionCompleted = true;
        activeLessonSession = null;
        if (startProgress.stop) startProgress.stop();
        document.removeEventListener('click', clickHandler);
    }

    function goNext() {
        if (questionCompleted || activeLessonSession !== sessionId) return;
        cleanupQuestion();
        
        if (questionIndex + 1 < lesson.questions.length) {
            showQuestion(skill, lesson, questionIndex + 1, isReview);
        } else {
            // Al terminar la lista actual, vamos al final
            showLessonEnd(skill, lesson, isReview);
        }
    }

    questionData.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.textContent = opt;
        btn.classList.add('option-btn');
        optionsContainer.appendChild(btn);

        btn.onclick = (e) => {
            e.stopPropagation();
            if (questionCompleted) return;
            
            document.querySelectorAll('.option-btn').forEach(b => b.disabled = true);

            // Guardar progreso real (solo si no es un repaso)
            if (!isReview) {
                if (!progreso[skill]) progreso[skill] = {};
                progreso[skill][lesson.title] = questionIndex + 1;
                localStorage.setItem('progreso', JSON.stringify(progreso));
            }

            if (i === questionData.correct) {
                btn.classList.add('correct');
                
                if (!isReview) {
                    currentLessonCorrect++;
                    currentLessonXP += 10; // <--- XP por cada acierto
                } else {
                    // SI ES REPASO Y ACIERTA: La borramos de la lista de fallos
                    currentLessonErrors = currentLessonErrors.filter(q => q.question !== questionData.question);
                }
            } else {
                btn.classList.add('wrong');
                btn.style.animation = 'shake 0.5s';
                document.querySelectorAll('.option-btn')[questionData.correct].classList.add('correct');

                // SI ES LECCIÓN NORMAL Y FALLA: La añadimos a la lista
                if (!isReview) {
                    if (!currentLessonErrors.some(q => q.question === questionData.question)) {
                        currentLessonErrors.push(questionData);
                    }
                }
                // Si falla en repaso, NO hacemos nada (se queda en currentLessonErrors)
            }

            explanationDiv.textContent = questionData.explanation;
            startProgress();
        };
    });

    function clickHandler() { completeProgress(); }
    document.addEventListener('click', clickHandler);
    if (i === questionData.correct) {
    btn.classList.add('correct');
    if (!isReview) {
        currentLessonCorrect++;
        currentLessonXP += 10; // XP temporal por pregunta
    }
}

}

// ===== Crear barra de progreso =====
function createProgressBar(sessionId, onComplete) {
    const progressContainer = document.createElement('div');
    progressContainer.style.width = '100%';
    progressContainer.style.height = '12px';
    progressContainer.style.backgroundColor = '#ddd';
    progressContainer.style.borderRadius = '6px';
    progressContainer.style.marginTop = '0.5rem';
    progressContainer.style.display = 'none';

    const progressBar = document.createElement('div');
    progressBar.style.width = '0%';
    progressBar.style.height = '100%';
    progressBar.style.backgroundColor = 'green';
    progressBar.style.borderRadius = '6px';
    progressContainer.appendChild(progressBar);

    let animating = false;
    let animationFrameId = null;

    function startProgress() {
        if (animating) return;
        animating = true;
        progressContainer.style.display = 'block';
        let start = null;
        const duration = 4000;

        function animate(timestamp) {
            if (activeLessonSession !== sessionId) return;
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration * 100, 100);
            progressBar.style.width = progress + '%';
            if (progress < 100) animationFrameId = requestAnimationFrame(animate);
            else { animating = false; onComplete(); }
        }
        animationFrameId = requestAnimationFrame(animate);
    }

    function completeProgress() {
        if (!animating) return;
        cancelAnimationFrame(animationFrameId);
        progressBar.style.width = '100%';
        animating = false;
        onComplete();
    }

    return { progressContainer, progressBar, startProgress, completeProgress, stop: () => cancelAnimationFrame(animationFrameId) };
}

// ===== UN SOLO BLOQUE DEFINITIVO: Fin de lección =====
function showLessonEnd(skill, lesson, wasReview = false) {
    activeLessonSession = null; // Detenemos cualquier barra de progreso activa
    mainContainer.innerHTML = "";

    const title = document.createElement('h2');
    title.textContent = wasReview ? "Repaso de Fallos" : "Lección Completada";
    mainContainer.appendChild(title);

    // La clave es mirar SIEMPRE currentLessonErrors, que es nuestra lista maestra
    let fallosRestantes = currentLessonErrors.length;
    const summary = document.createElement('p');

    if (wasReview) {
        summary.innerHTML = fallosRestantes === 0 
            ? "¡Excelente! Has corregido todos los errores. 🎉" 
            : `Te quedan <strong>${fallosRestantes}</strong> fallos por resolver.`;
    } else {
        summary.innerHTML = `Has terminado <strong>${lesson.title}</strong>.<br>Aciertos: ${currentLessonCorrect} / ${lesson.questions.length}`;
    }
    mainContainer.appendChild(summary);

    // --- BOTÓN 1: REPASAR FALLOS (Solo si hay fallos) ---
    if (fallosRestantes > 0) {
        const reviewBtn = document.createElement('button');
        reviewBtn.textContent = `Repasar fallos (${fallosRestantes})`;
        reviewBtn.style.backgroundColor = "#ff9800"; // Color naranja para resaltar
        reviewBtn.onclick = () => {
            // Creamos una lección ficticia con lo que queda en la lista de errores
            const reviewLesson = {
                title: "Repaso de fallos",
                questions: [...currentLessonErrors] 
            };
            // Lanzamos el repaso (isReview = true)
            showQuestion(skill, reviewLesson, 0, true);
        };
        mainContainer.appendChild(reviewBtn);
    }

    // --- BOTÓN 2: REPETIR LECCIÓN COMPLETA ---
    const repeatBtn = document.createElement('button');
    repeatBtn.textContent = "Repetir lección completa";
    repeatBtn.onclick = () => {
        // Al repetir todo, reseteamos la lista de errores
        currentLessonErrors = []; 
        showQuestion(skill, originalLesson, 0, false);
    };
    mainContainer.appendChild(repeatBtn);

    // --- BOTÓN 3: VOLVER ---
    const backBtn = document.createElement('button');
    backBtn.textContent = "Volver a Habilidades";
    backBtn.classList.add('back-button');
    backBtn.onclick = () => showSkill(skill);
    mainContainer.appendChild(backBtn);
    if (!wasReview) {
    addXP(currentLessonXP);
    currentLessonXP = 0;
}

}


function createProfileCard() {
    let card = document.getElementById('profile-card');

    if (!card) {
        card = document.createElement('div');
        card.id = 'profile-card';
        card.style.cssText = `
            position: fixed;
            top: 10px;
            left: 10px;
            width: 160px;
            padding: 10px;
            background-color: #ffffffcc; /* ligeramente transparente */
            border-radius: 10px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.2);
            font-family: sans-serif;
            font-size: 0.85rem;
            z-index: 1000;
        `;
        document.body.appendChild(card);
    }

    card.innerHTML = `
        <div style="font-weight:bold;">${profile.name}</div>
        <div style="margin:4px 0;">Nivel ${profile.level}</div>
        <div style="width:100%; height:10px; background:#ddd; border-radius:5px; overflow:hidden;">
            <div id="xp-fill" style="width:${profile.xp % 100}%; height:100%; background:#4caf50; transition:width 0.5s;"></div>
        </div>
        <div style="text-align:right; font-size:0.7rem; margin-top:2px;">XP: ${profile.xp}</div>
    `;
}
// ===== Inicialización del perfil =====
let profile = {
    name: null,
    xp: 0,
    level: 1
};

const savedProfile = localStorage.getItem('profile');
if (savedProfile) {
    profile = JSON.parse(savedProfile);
} else {
    askForProfile();
}

function saveProfile() {
    localStorage.setItem('profile', JSON.stringify(profile));
}

// Preguntar por nombre si no hay perfil
function askForProfile() {
    let name = prompt("¡Bienvenido! Ingresa tu nombre:");
    if (!name || name.trim() === "") name = "Estudiante";
    profile.name = name;
    profile.xp = 0;
    profile.level = 1;
    saveProfile();
    createProfileCard();
}

// Renderizar tarjeta de perfil (actualizar XP y nivel)
function updateProfileCard() {
    const fill = document.getElementById('xp-fill');
    if (fill) fill.style.width = `${profile.xp % 100}%`;
    const card = document.getElementById('profile-card');
    if (card) {
        card.querySelector('div:nth-child(2)').textContent = `Nivel ${profile.level}`;
        card.querySelector('div:nth-child(4)').textContent = `XP: ${profile.xp}`;
    }
}

// Crear tarjeta al inicio
createProfileCard();
function addXP(amount) {
    profile.xp += amount;

    // Subida de nivel automática cada 100 XP
    const newLevel = Math.floor(profile.xp / 100) + 1;
    if (newLevel > profile.level) {
        profile.level = newLevel;
        alert(`¡Has subido al nivel ${newLevel}! `);
    }

    saveProfile();
    updateProfileCard();
}

// ===== Animación shake y responsive del perfil =====
const style = document.createElement('style');
style.textContent = `
@keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
    100% { transform: translateX(0); }
}

.shake-animation {
    animation: shake 0.4s ease;
}

/* ===== Ajustes responsive mini-card perfil ===== */
@media (max-width: 600px) {
    #profile-card {
        width: 120px !important;
        padding: 6px !important;
        font-size: 0.75rem !important;
        top: 8px !important;
        left: 8px !important;
    }
    #profile-card div:nth-child(2) { font-size: 0.7rem !important; } /* nivel */
    #profile-card div:nth-child(4) { font-size: 0.6rem !important; } /* XP */
}

@media (max-width: 400px) {
    #profile-card div:nth-child(3) { display: none !important; } /* ocultar barra XP */
}
`;

document.head.appendChild(style);

// ===== Inicialización =====
showHome();
