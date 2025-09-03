export const scenarioData = [
  {
    scenarioId: 'traffic-stop',
    title: {
      en: 'Traffic Stop',
      es: 'Parada de Tráfico'
    },
    content: {
      en: {
        rights: [
          "You have the right to remain silent beyond providing license, registration, and insurance",
          "You have the right to refuse vehicle searches without a warrant",
          "You have the right to ask if you are free to leave",
          "You have the right to refuse field sobriety tests in many states",
          "You have the right to record the interaction"
        ],
        phrases: [
          "I am exercising my right to remain silent",
          "I do not consent to any searches of my vehicle",
          "Am I free to leave, officer?",
          "I want to speak to my attorney before answering questions"
        ],
        dos: [
          "Keep your hands on the steering wheel",
          "Follow lawful orders promptly",
          "Stay calm and respectful",
          "Provide required documents when asked"
        ],
        donts: [
          "Don't reach for anything without permission",
          "Don't argue about the stop",
          "Don't consent to vehicle searches",
          "Don't volunteer additional information"
        ]
      },
      es: {
        rights: [
          "Tienes derecho a permanecer en silencio más allá de proporcionar licencia, registro y seguro",
          "Tienes derecho a rechazar registros del vehículo sin una orden judicial",
          "Tienes derecho a preguntar si eres libre de irte",
          "Tienes derecho a rechazar pruebas de sobriedad en muchos estados",
          "Tienes derecho a grabar la interacción"
        ],
        phrases: [
          "Ejercito mi derecho a permanecer en silencio",
          "No consiento registros de mi vehículo",
          "¿Soy libre de irme, oficial?",
          "Quiero hablar con mi abogado antes de responder preguntas"
        ],
        dos: [
          "Mantén las manos en el volante",
          "Sigue las órdenes legales prontamente",
          "Mantén la calma y el respeto",
          "Proporciona los documentos requeridos cuando se soliciten"
        ],
        donts: [
          "No busques nada sin permiso",
          "No discutas sobre la parada",
          "No consientas registros del vehículo",
          "No ofrezcas información adicional"
        ]
      }
    },
    keywords: ['traffic', 'police', 'car', 'driving', 'stop'],
    stateSpecificLaws: true
  },
  {
    scenarioId: 'police-questioning',
    title: {
      en: 'Police Questioning',
      es: 'Interrogatorio Policial'
    },
    content: {
      en: {
        rights: [
          "You have the right to remain silent",
          "You have the right to an attorney",
          "You have the right to leave if not under arrest",
          "You have the right to refuse to consent to searches",
          "Anything you say can be used against you in court"
        ],
        phrases: [
          "I am exercising my right to remain silent",
          "I want to speak to a lawyer",
          "Am I under arrest or free to leave?",
          "I do not consent to any searches"
        ],
        dos: [
          "Ask clearly if you are free to leave",
          "Remain calm and polite",
          "Remember details about the interaction",
          "Invoke your rights clearly and firmly"
        ],
        donts: [
          "Don't answer questions without a lawyer present",
          "Don't consent to searches",
          "Don't lie or provide false information",
          "Don't resist or argue"
        ]
      },
      es: {
        rights: [
          "Tienes derecho a permanecer en silencio",
          "Tienes derecho a un abogado",
          "Tienes derecho a irte si no estás arrestado",
          "Tienes derecho a rechazar consentir registros",
          "Todo lo que digas puede ser usado en tu contra en la corte"
        ],
        phrases: [
          "Ejercito mi derecho a permanecer en silencio",
          "Quiero hablar con un abogado",
          "¿Estoy arrestado o libre de irme?",
          "No consiento ningún registro"
        ],
        dos: [
          "Pregunta claramente si eres libre de irte",
          "Mantén la calma y la cortesía",
          "Recuerda detalles sobre la interacción",
          "Invoca tus derechos clara y firmemente"
        ],
        donts: [
          "No respondas preguntas sin un abogado presente",
          "No consientas registros",
          "No mientas o proporciones información falsa",
          "No resistas o discutas"
        ]
      }
    },
    keywords: ['questioning', 'interrogation', 'police', 'rights'],
    stateSpecificLaws: false
  },
  {
    scenarioId: 'home-search',
    title: {
      en: 'Home Search',
      es: 'Registro Domiciliario'
    },
    content: {
      en: {
        rights: [
          "Police generally need a warrant to search your home",
          "You have the right to refuse entry without a warrant",
          "You have the right to see the warrant before allowing entry",
          "You have the right to have a lawyer present during questioning",
          "You can refuse to answer questions about the search"
        ],
        phrases: [
          "I do not consent to a search of my home",
          "Do you have a warrant?",
          "I want to see the warrant",
          "I am exercising my right to remain silent"
        ],
        dos: [
          "Ask to see the warrant if they claim to have one",
          "Step outside and close the door behind you",
          "Remain calm and don't interfere with lawful searches",
          "Remember what areas they search"
        ],
        donts: [
          "Don't consent to a search without a warrant",
          "Don't let them in without seeing a valid warrant",
          "Don't answer questions about items they find",
          "Don't physically resist even if the search is illegal"
        ]
      },
      es: {
        rights: [
          "La policía generalmente necesita una orden para registrar tu hogar",
          "Tienes derecho a rechazar la entrada sin una orden",
          "Tienes derecho a ver la orden antes de permitir la entrada",
          "Tienes derecho a tener un abogado presente durante el interrogatorio",
          "Puedes rechazar responder preguntas sobre el registro"
        ],
        phrases: [
          "No consiento un registro de mi hogar",
          "¿Tienen una orden?",
          "Quiero ver la orden",
          "Ejercito mi derecho a permanecer en silencio"
        ],
        dos: [
          "Pide ver la orden si dicen que la tienen",
          "Sal afuera y cierra la puerta detrás de ti",
          "Mantén la calma y no interfieras con registros legales",
          "Recuerda qué áreas registran"
        ],
        donts: [
          "No consientas un registro sin una orden",
          "No los dejes entrar sin ver una orden válida",
          "No respondas preguntas sobre artículos que encuentren",
          "No resistas físicamente aunque el registro sea ilegal"
        ]
      }
    },
    keywords: ['home', 'house', 'search', 'warrant', 'property'],
    stateSpecificLaws: true
  },
  {
    scenarioId: 'arrest',
    title: {
      en: 'During Arrest',
      es: 'Durante el Arresto'
    },
    content: {
      en: {
        rights: [
          "You have the right to remain silent",
          "You have the right to an attorney",
          "If you cannot afford an attorney, one will be appointed for you",
          "You have the right to know the charges against you",
          "You have the right to a phone call"
        ],
        phrases: [
          "I am exercising my right to remain silent",
          "I want to speak to my lawyer",
          "I need to make a phone call",
          "What are the charges against me?"
        ],
        dos: [
          "Stay calm and don't resist",
          "Invoke your rights immediately",
          "Remember the badge numbers and details",
          "Ask for medical attention if needed"
        ],
        donts: [
          "Don't resist arrest even if you believe it's unlawful",
          "Don't answer questions without an attorney",
          "Don't sign anything without legal representation",
          "Don't make any statements about your case"
        ]
      },
      es: {
        rights: [
          "Tienes derecho a permanecer en silencio",
          "Tienes derecho a un abogado",
          "Si no puedes costear un abogado, se te asignará uno",
          "Tienes derecho a conocer los cargos en tu contra",
          "Tienes derecho a una llamada telefónica"
        ],
        phrases: [
          "Ejercito mi derecho a permanecer en silencio",
          "Quiero hablar con mi abogado",
          "Necesito hacer una llamada telefónica",
          "¿Cuáles son los cargos en mi contra?"
        ],
        dos: [
          "Mantén la calma y no resistas",
          "Invoca tus derechos inmediatamente",
          "Recuerda los números de placa y detalles",
          "Pide atención médica si es necesario"
        ],
        donts: [
          "No resistas el arresto aunque creas que es ilegal",
          "No respondas preguntas sin un abogado",
          "No firmes nada sin representación legal",
          "No hagas declaraciones sobre tu caso"
        ]
      }
    },
    keywords: ['arrest', 'custody', 'jail', 'detention'],
    stateSpecificLaws: false
  },
  {
    scenarioId: 'stop-and-frisk',
    title: {
      en: 'Stop and Frisk',
      es: 'Parada y Cacheo'
    },
    content: {
      en: {
        rights: [
          "Police need reasonable suspicion to stop you",
          "Police need reasonable belief you're armed to frisk you",
          "You have the right to ask if you're free to leave",
          "You have the right to remain silent",
          "You don't have to consent to a search beyond the frisk"
        ],
        phrases: [
          "Am I free to leave?",
          "I don't consent to a search",
          "I am exercising my right to remain silent",
          "Why am I being stopped?"
        ],
        dos: [
          "Keep your hands visible",
          "Stay calm and don't run",
          "Remember details of the encounter",
          "Follow lawful orders"
        ],
        donts: [
          "Don't resist the stop or frisk",
          "Don't reach into pockets quickly",
          "Don't consent to further searches",
          "Don't answer questions beyond identifying yourself"
        ]
      },
      es: {
        rights: [
          "La policía necesita sospecha razonable para detenerte",
          "La policía necesita creencia razonable de que estás armado para cachearte",
          "Tienes derecho a preguntar si eres libre de irte",
          "Tienes derecho a permanecer en silencio",
          "No tienes que consentir un registro más allá del cacheo"
        ],
        phrases: [
          "¿Soy libre de irme?",
          "No consiento un registro",
          "Ejercito mi derecho a permanecer en silencio",
          "¿Por qué me están deteniendo?"
        ],
        dos: [
          "Mantén las manos visibles",
          "Mantén la calma y no corras",
          "Recuerda detalles del encuentro",
          "Sigue órdenes legales"
        ],
        donts: [
          "No resistas la parada o el cacheo",
          "No metas las manos en los bolsillos rápidamente",
          "No consientas registros adicionales",
          "No respondas preguntas más allá de identificarte"
        ]
      }
    },
    keywords: ['stop', 'frisk', 'pat-down', 'street', 'walking'],
    stateSpecificLaws: true
  }
]