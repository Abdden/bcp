import swaggerAutogen from "swagger-autogen"
swaggerAutogen()

const outputDoc = '../swagger_output.json'
const allEndpointsFiles = ['./routes/*.js']

const doc = {
    info: {
        version: "1.0.0",
        title: "MY REST API",
        description: "The Documentation For My Rest API"
    },
    host: process.env.HOST,
    basePath: "/",
    schemes: ['https','http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "User",
            "description": "All User Endpoints"
        },
        {
            "name": "Blogs",
            "description": "All Blog Endpoints"
        },
        {
            "name": "Query",
            "description": "All Contact Endpoints"
        },
    ],

    security: [
      {
        bearerAuth: [],
      },
    ],


    securityDefinitions: {
        apiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: 'The Authorization Token Needed To Get Access To The Protected Endpoints'
        }
    },


    definitions: {
        Blog: {
            $title: "The Extremes Within",
            $image: "data:image/jpeg;base64...",
            $content: "Here's what you need to know about the most extensive API on the Planet",
            comment: "This by far the most straight forward example."
        },
        Comment: {
            $comment: "Keep up the good work :D"
        },
        Contact: {
            $names: "Jhon D. Durrant",
            $email: "hoorah@gmail.com",
            subject: "The CI/CD Projects",
            $message: "We'd like to schedule a meeting with the creator due to PIS present."
        },
        Signup: {
            $name: "Jhon Doe",
            $email: "hoorah@gmail.com",
            $password: "********"
        },
        Login: {
            $email: "hoorah@gmail.com",
            $password: "********"
        }
    },

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
}


swaggerAutogen()(outputDoc, allEndpointsFiles, doc).then(async () => {
  await import('./index.js')
});
