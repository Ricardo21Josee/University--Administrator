# Universidad App

Este proyecto es una aplicación web para gestionar información relacionada con una universidad. Utiliza React para el frontend y se comunica con un backend desarrollado en C++ que interactúa con una base de datos PostgreSQL.

## Estructura del Proyecto

El proyecto tiene la siguiente estructura de archivos:

```
universidad-app
├── public
│   └── index.html          # Plantilla HTML principal
├── src
│   ├── components
│   │   └── App.tsx        # Componente raíz de la aplicación
│   ├── pages
│   │   └── Home.tsx       # Página de inicio de la aplicación
│   ├── services
│   │   └── api.ts         # Funciones para interactuar con el backend
│   ├── types
│   │   └── index.ts       # Tipos e interfaces utilizados en la aplicación
│   └── index.tsx          # Punto de entrada de la aplicación
├── package.json            # Configuración de npm y dependencias
├── tsconfig.json           # Configuración de TypeScript
└── README.md               # Documentación del proyecto
```

## Instalación

Para instalar las dependencias del proyecto, ejecuta el siguiente comando en la raíz del proyecto:

```
npm install
```

## Ejecución

Para iniciar la aplicación en modo de desarrollo, utiliza el siguiente comando:

```
npm start
```

Esto abrirá la aplicación en tu navegador predeterminado.

## Construcción

Para construir la aplicación para producción, ejecuta:

```
npm run build
```

Los archivos de construcción se generarán en la carpeta `build`.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o envía un pull request.

## Licencia

Este proyecto está bajo la licencia MIT.