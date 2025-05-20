const { createDefaultPreset } = require('ts-jest');

// Extraemos únicamente la sección de transform de ts-jest
const tsJestTransform = createDefaultPreset().transform;

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // 1️⃣ Usamos el preset completo para beneficiarnos de todas las opciones por defecto
  preset: 'ts-jest',

  // 2️⃣ Definimos el entorno de test
  testEnvironment: 'node',

  // 3️⃣ Detectamos handles abiertos y ajustamos sus timeouts
  detectOpenHandles: true,
  openHandlesTimeout: 70 * 1000,

  // 4️⃣ Ajustamos el timeout global para tests individuales
  testTimeout: 70 * 1000,

  // 5️⃣ Para proyectos con múltiples transformadores, podemos inyectar manualmente
  //    la sección `transform` de ts-jest y combinarla con otros
  transform: {
    ...tsJestTransform,
    // '\\.m?js$': 'babel-jest',      // ejemplo de otro transformador
  },

  // 6️⃣ Opcional: globals de ts-jest para ajustes finos
  globals: {
    'ts-jest': {
      // diagnostics: false,           // deshabilitar advertencias de tipo
      // isolatedModules: true,        // compilar cada archivo por separado
    },
  },
};


// const { createDefaultPreset } = require("ts-jest");

// const tsJestTransformCfg = createDefaultPreset().transform;

// /** @type {import("jest").Config} **/
// module.exports = {
//   testEnvironment: "node",
//   transform: {
//     ...tsJestTransformCfg,
//   },
// };