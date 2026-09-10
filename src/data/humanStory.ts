import type { Language } from './site';

type HumanStory = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  signals: string[];
  ariaLabel: string;
};

export const humanStoryByLanguage: Record<Language, HumanStory> = {
  es: {
    eyebrow: '',
    title: 'Un poco sobre mí',
    paragraphs: [
      'Vivo en Uspallata, Mendoza, Argentina. Antes de concentrarme en el desarrollo de software pasé por soporte, infraestructura, SAP e integraciones en distintos entornos operativos. Ese recorrido fue moldeando mi manera de pensar la tecnología: aprendí a verla como una herramienta para comprender, conectar y mejorar procesos reales, siempre teniendo en cuenta a las personas que los hacen funcionar.',
      'Disfruto especialmente la etapa de descubrimiento y comprensión del problema. Me resulta muy satisfactorio llegar a algo que todavía no está del todo claro, hacer las preguntas correctas y empezar a entender qué está pasando, por qué funciona de determinada manera, dónde aparecen las fricciones y qué necesita realmente quien lo usa. A partir de ahí, la tecnología empieza a tener sentido. Para mí, una buena solución nace de comprender bien el problema antes de escribir la primera línea de código.',
      'Aprender es una constante en mi vida. Siempre estoy profundizando algo, descubriendo una herramienta, entrando en un dominio nuevo o tratando de mirar un problema desde otra perspectiva. Puedo estar estudiando arquitectura de software, datos o SAP y después dedicar tiempo a aprender un idioma completamente nuevo. Lo que me mueve no es acumular tecnologías, sino esa satisfacción de comprender algo que antes no entendía y descubrir nuevas formas de pensar, construir y hacer mejor las cosas.',
      'Fuera de la pantalla, la montaña ocupa un lugar importante en mi vida. Disfruto correr, caminar, explorar y estar cerca de un entorno que contrasta bastante con pasar horas construyendo sistemas. Elegir vivir en Uspallata tiene mucho que ver con eso: poder desarrollar tecnología sin alejarme del mundo real, de la naturaleza y de las cosas que también despiertan mi curiosidad.',
    ],
    signals: ['Uspallata · Mendoza', 'Montaña', 'Aprendizaje continuo'],
    ariaLabel: 'Rasgos personales',
  },
  en: {
    eyebrow: '',
    title: 'A little about me',
    paragraphs: [
      'I live in Uspallata, Mendoza, Argentina. Before focusing on software development, I worked across technical support, infrastructure, SAP and integrations in different operational environments. That path gradually shaped how I think about technology: I learned to see it as a tool for understanding, connecting and improving real processes, while keeping the people who make them work in view.',
      'I especially enjoy the discovery stage and the work of understanding the problem. I find it deeply satisfying to arrive at something that is still unclear, ask the right questions and start making sense of what is actually happening: why a process works the way it does, where friction appears and what the person using it really needs. From there, technology starts to make sense. To me, a good solution begins with understanding the problem well before writing the first line of code.',
      'Learning is a constant in my life. I am always going deeper into something, discovering a tool, entering a new domain or trying to look at a problem from another angle. I might be studying software architecture, data or SAP and then spend time learning a completely new language. What drives me is not collecting technologies, but the satisfaction of understanding something I did not understand before and finding new ways to think, build and make things better.',
      'Away from the screen, the mountains are an important part of my life. I enjoy running, hiking, exploring and being close to an environment that contrasts with spending hours building systems. Choosing to live in Uspallata has a lot to do with that: being able to build technology without losing touch with the real world, nature and the things that keep my curiosity alive.',
    ],
    signals: ['Uspallata · Mendoza', 'Mountains', 'Continuous learning'],
    ariaLabel: 'Personal signals',
  },
};