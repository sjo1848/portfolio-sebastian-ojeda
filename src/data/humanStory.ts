import type { Language } from './site';

type HumanStory = {
  title: string;
  paragraphs: string[];
};

export const humanStoryByLanguage: Record<Language, HumanStory> = {
  es: {
    title: 'Un poco sobre mí',
    paragraphs: [
      "Vivo en Uspallata, Mendoza, rodeado por la Cordillera de los Andes. Mi trayectoria pasó por el soporte técnico, la infraestructura, las integraciones SAP y el desarrollo de software. Haber trabajado en distintas áreas me enseñó a mirar más allá del código y entender cómo los sistemas forman parte de las operaciones reales.",
      "Soy curioso por naturaleza. Me gusta entender cómo funcionan las cosas, aprender sobre temas nuevos y resolver problemas complejos. Fuera del trabajo, disfruto correr, hacer trekking y pasar tiempo en la montaña. Vivir acá me permite mantener ese contacto con la naturaleza y encontrar otra perspectiva sobre lo que hago.",
    ],
  },
  en: {
    title: 'A little about me',
    paragraphs: [
      "I live in Uspallata, Mendoza, surrounded by the Andes. My background spans technical support, infrastructure, SAP integrations, and software development. Working across these areas taught me to look beyond the code and understand how systems fit into real operations.",
      "I'm naturally curious about how things work, especially when there's something new to learn or a complex problem to solve. Outside of work, I run, hike, and spend time in the mountains. Living here keeps me close to the outdoors and gives me a different perspective on the work I do.",
    ],
  },
};
