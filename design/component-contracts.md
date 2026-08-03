# Contratos de componentes

## Objetivo

Definir responsabilidades y requisitos antes de implementar componentes en Astro.

## `SiteHeader`

### Responsabilidad

Navegación principal y acceso al CV.

### Requisitos

- Logo textual o nombre.
- Navegación semántica.
- Menú móvil accesible.
- Focus visible.
- Sin dependencia de scroll para mostrar acciones esenciales.

## `Hero`

### Responsabilidad

Comunicar identidad, propuesta y acciones principales.

### Datos

- Nombre.
- Título profesional.
- Descripción.
- CTA principal.
- CTA secundario.
- Enlaces profesionales.
- Evidencia visual opcional.

### Requisitos

- No aceptar texto HTML arbitrario.
- Mantener un solo `h1` por página.
- Soportar variante sin imagen.

## `ProjectCard`

### Responsabilidad

Resumir una evidencia de trabajo y dirigir al caso de estudio.

### Datos

- Nombre.
- Tipo de solución.
- Resumen.
- Estado textual.
- Stack breve.
- Captura opcional.
- URL del caso.
- URL del repositorio.

### Requisitos

- La ausencia de captura no rompe el layout.
- Estado comprensible sin color.
- Máximo de cinco tecnologías visibles.
- Acciones independientes y etiquetadas.

## `ProcessSteps`

### Responsabilidad

Mostrar el método de trabajo en cinco pasos.

### Requisitos

- Lista ordenada semántica.
- No requiere carrusel.
- Debe leerse correctamente con CSS deshabilitado.

## `CapabilityGroup`

### Responsabilidad

Agrupar tecnologías y prácticas por capacidad.

### Requisitos

- Título y descripción.
- Lista limitada.
- Expandible opcional en móvil, con fallback visible.
- No usar porcentajes de dominio.

## `ExperienceContext`

### Responsabilidad

Explicar cómo SAP, integraciones y operaciones fortalecen el trabajo de software.

### Requisitos

- No convertir dominios secundarios en títulos paralelos.
- Separar experiencia comprobable de formación en curso.

## `ContactPanel`

### Responsabilidad

Permitir contacto y acceso a perfiles profesionales.

### Requisitos

- Ocultar acciones sin datos confirmados.
- No renderizar placeholders en producción.
- No exigir un formulario.
- El email debe protegerse razonablemente contra copia accidental en metadatos innecesarios.

## `CaseStudyHero`

### Responsabilidad

Presentar proyecto, estado, rol, stack y acciones.

### Requisitos

- Demo opcional.
- Estado textual.
- Captura opcional.
- Jerarquía consistente con la home.

## `ArchitectureDiagram`

### Responsabilidad

Mostrar y explicar relaciones técnicas.

### Requisitos

- Texto alternativo o explicación equivalente.
- No depender de zoom imposible en móvil.
- Contenedor con overflow controlado cuando corresponda.

## `ProjectStatusTable`

### Responsabilidad

Separar implementado, parcial y pendiente.

### Requisitos

- Tabla desktop.
- Representación apilada móvil.
- Estado textual e iconografía redundante.

## `Footer`

### Responsabilidad

Cerrar la navegación y repetir contacto esencial.

### Requisitos

- Año generado automáticamente solo si no requiere JavaScript cliente.
- Enlaces profesionales.
- Ubicación general, no domicilio exacto.
- Sin sitemap excesivo.
