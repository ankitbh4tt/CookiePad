const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Writers Community API",
      version: "1.0.0",
      description: "API documentation for Writers Community project",
    },
    servers: [
      {
        url: "http://localhost:8000/api", // Base URL for your API
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Path to your route files for documentation
};

const swaggerSpec = swaggerJsDoc(options);

const setupSwaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`Swagger docs available at http://localhost:8000/api-docs`);
};

module.exports = setupSwaggerDocs;
