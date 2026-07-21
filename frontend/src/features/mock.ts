import { FormSchema, Project } from "@/types/form";

export const mockSchemas: FormSchema[] = [
   {
      "title":"Employee Leave Request",
      "sections":[
         {
            "id":"employee_information",
            "label":"Employee Information",
            "items":[
               {
                  "id":"employee_name",
                  "label":"Employee Name",
                  "type":"text",
                  "description":"Full employee name",
                  "required":true,
                  "disabled":false,
                  "validation":{
                     "minLength":3,
                     "maxLength":100
                  },
                  "ui":{
                     "placeholder":"John Doe",
                     "helpText":""
                  }
               },
               {
                  "id":"department",
                  "label":"Department",
                  "type":"text",
                  "description":"Employee department",
                  "required":true,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"Engineering",
                     "helpText":""
                  }
               },
               {
                  "id":"manager",
                  "label":"Manager",
                  "type":"text",
                  "description":"Manager name",
                  "required":true,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"Jane Smith",
                     "helpText":""
                  }
               }
            ]
         }
      ]
   },
   {
      "title":"Event Registration",
      "sections":[
         {
            "id":"registration",
            "label":"Registration",
            "items":[
               {
                  "id":"full_name",
                  "label":"Full Name",
                  "type":"text",
                  "description":"Participant full name",
                  "required":true,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"Your name",
                     "helpText":""
                  }
               },
               {
                  "id":"company",
                  "label":"Company",
                  "type":"text",
                  "description":"Company name",
                  "required":false,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"Company",
                     "helpText":""
                  }
               },
               {
                  "id":"job_title",
                  "label":"Job Title",
                  "type":"text",
                  "description":"Current position",
                  "required":false,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"Software Engineer",
                     "helpText":""
                  }
               }
            ]
         }
      ]
   },
   {
      "title":"Product Registration",
      "sections":[
         {
            "id":"product",
            "label":"Product",
            "items":[
               {
                  "id":"product_name",
                  "label":"Product Name",
                  "type":"text",
                  "description":"Product name",
                  "required":true,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"Product",
                     "helpText":""
                  }
               },
               {
                  "id":"sku",
                  "label":"SKU",
                  "type":"text",
                  "description":"Stock keeping unit",
                  "required":true,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"SKU-001",
                     "helpText":""
                  }
               },
               {
                  "id":"brand",
                  "label":"Brand",
                  "type":"text",
                  "description":"Product brand",
                  "required":false,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"Brand",
                     "helpText":""
                  }
               }
            ]
         }
      ]
   },
   {
      "title":"Job Application",
      "sections":[
         {
            "id":"candidate",
            "label":"Candidate",
            "items":[
               {
                  "id":"candidate_name",
                  "label":"Candidate Name",
                  "type":"text",
                  "description":"Full name",
                  "required":true,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"John Doe",
                     "helpText":""
                  }
               },
               {
                  "id":"desired_position",
                  "label":"Desired Position",
                  "type":"text",
                  "description":"Position applying for",
                  "required":true,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"Backend Developer",
                     "helpText":""
                  }
               },
               {
                  "id":"city",
                  "label":"City",
                  "type":"text",
                  "description":"Current city",
                  "required":false,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"New York",
                     "helpText":""
                  }
               }
            ]
         }
      ]
   },
   {
      "title":"Medical Appointment",
      "sections":[
         {
            "id":"patient",
            "label":"Patient",
            "items":[
               {
                  "id":"patient_name",
                  "label":"Patient Name",
                  "type":"text",
                  "description":"Patient full name",
                  "required":true,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"Patient",
                     "helpText":""
                  }
               },
               {
                  "id":"symptoms",
                  "label":"Symptoms",
                  "type":"text",
                  "description":"Main symptoms",
                  "required":true,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"Describe symptoms",
                     "helpText":""
                  }
               },
               {
                  "id":"doctor",
                  "label":"Doctor",
                  "type":"text",
                  "description":"Doctor name",
                  "required":false,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"Dr. Smith",
                     "helpText":""
                  }
               }
            ]
         }
      ]
   },
   {
      "title":"Hotel Reservation",
      "sections":[
         {
            "id":"reservation",
            "label":"Reservation",
            "items":[
               {
                  "id":"guest_name",
                  "label":"Guest Name",
                  "type":"text",
                  "description":"Guest full name",
                  "required":true,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"Guest",
                     "helpText":""
                  }
               },
               {
                  "id":"room_type",
                  "label":"Room Type",
                  "type":"text",
                  "description":"Preferred room",
                  "required":true,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"Suite",
                     "helpText":""
                  }
               },
               {
                  "id":"special_requests",
                  "label":"Special Requests",
                  "type":"text",
                  "description":"Additional requests",
                  "required":false,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"Optional",
                     "helpText":""
                  }
               }
            ]
         }
      ]
   },
   {
      "title":"Customer Feedback",
      "sections":[
         {
            "id":"feedback",
            "label":"Feedback",
            "items":[
               {
                  "id":"customer_name",
                  "label":"Customer Name",
                  "type":"text",
                  "description":"Customer name",
                  "required":false,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"Optional",
                     "helpText":""
                  }
               },
               {
                  "id":"subject",
                  "label":"Subject",
                  "type":"text",
                  "description":"Feedback subject",
                  "required":true,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"Subject",
                     "helpText":""
                  }
               },
               {
                  "id":"comment",
                  "label":"Comment",
                  "type":"text",
                  "description":"Feedback comment",
                  "required":true,
                  "disabled":false,
                  "validation":{
                     "maxLength":300
                  },
                  "ui":{
                     "placeholder":"Write your feedback",
                     "helpText":""
                  }
               }
            ]
         }
      ]
   },
   {
      "title":"Support Ticket",
      "sections":[
         {
            "id":"ticket",
            "label":"Ticket",
            "items":[
               {
                  "id":"requester",
                  "label":"Requester",
                  "type":"text",
                  "description":"Requester name",
                  "required":true,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"Your name",
                     "helpText":""
                  }
               },
               {
                  "id":"system",
                  "label":"System",
                  "type":"text",
                  "description":"Affected system",
                  "required":true,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"CRM",
                     "helpText":""
                  }
               },
               {
                  "id":"issue",
                  "label":"Issue",
                  "type":"text",
                  "description":"Issue description",
                  "required":true,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"Describe the issue",
                     "helpText":""
                  }
               }
            ]
         }
      ]
   },
   {
      "title":"Contact Form",
      "sections":[
         {
            "id":"contact",
            "label":"Contact",
            "items":[
               {
                  "id":"name",
                  "label":"Name",
                  "type":"text",
                  "description":"Your name",
                  "required":true,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"John Doe",
                     "helpText":""
                  }
               },
               {
                  "id":"subject",
                  "label":"Subject",
                  "type":"text",
                  "description":"Message subject",
                  "required":true,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"Subject",
                     "helpText":""
                  }
               },
               {
                  "id":"message",
                  "label":"Message",
                  "type":"text",
                  "description":"Message content",
                  "required":true,
                  "disabled":false,
                  "validation":{
                     "maxLength":500
                  },
                  "ui":{
                     "placeholder":"Write your message",
                     "helpText":""
                  }
               }
            ]
         }
      ]
   },
   {
      "title":"Employee Onboarding",
      "sections":[
         {
            "id":"employee",
            "label":"Employee",
            "items":[
               {
                  "id":"full_name",
                  "label":"Full Name",
                  "type":"text",
                  "description":"Employee full name",
                  "required":true,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"John Doe",
                     "helpText":""
                  }
               },
               {
                  "id":"position",
                  "label":"Position",
                  "type":"text",
                  "description":"Job position",
                  "required":true,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"Frontend Developer",
                     "helpText":""
                  }
               },
               {
                  "id":"team",
                  "label":"Team",
                  "type":"text",
                  "description":"Assigned team",
                  "required":false,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"Platform",
                     "helpText":""
                  }
               }
            ]
         }
      ]
   },
   {
      "title":"Course Enrollment",
      "sections":[
         {
            "id":"student",
            "label":"Student",
            "items":[
               {
                  "id":"student_name",
                  "label":"Student Name",
                  "type":"text",
                  "description":"Student full name",
                  "required":true,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"Jane Doe",
                     "helpText":""
                  }
               },
               {
                  "id":"course",
                  "label":"Course",
                  "type":"text",
                  "description":"Desired course",
                  "required":true,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"Computer Science",
                     "helpText":""
                  }
               },
               {
                  "id":"campus",
                  "label":"Campus",
                  "type":"text",
                  "description":"Campus location",
                  "required":false,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"Downtown",
                     "helpText":""
                  }
               }
            ]
         }
      ]
   },
   {
      "title":"Vehicle Registration",
      "sections":[
         {
            "id":"vehicle",
            "label":"Vehicle",
            "items":[
               {
                  "id":"owner",
                  "label":"Owner",
                  "type":"text",
                  "description":"Vehicle owner",
                  "required":true,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"Owner name",
                     "helpText":""
                  }
               },
               {
                  "id":"model",
                  "label":"Model",
                  "type":"text",
                  "description":"Vehicle model",
                  "required":true,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"Corolla",
                     "helpText":""
                  }
               },
               {
                  "id":"plate",
                  "label":"License Plate",
                  "type":"text",
                  "description":"Vehicle plate",
                  "required":true,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"ABC-1234",
                     "helpText":""
                  }
               }
            ]
         }
      ]
   },
   {
      "title":"Library Membership",
      "sections":[
         {
            "id":"member",
            "label":"Member",
            "items":[
               {
                  "id":"member_name",
                  "label":"Member Name",
                  "type":"text",
                  "description":"Library member",
                  "required":true,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"Full name",
                     "helpText":""
                  }
               },
               {
                  "id":"favorite_genre",
                  "label":"Favorite Genre",
                  "type":"text",
                  "description":"Preferred genre",
                  "required":false,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"Fantasy",
                     "helpText":""
                  }
               },
               {
                  "id":"membership_id",
                  "label":"Membership ID",
                  "type":"text",
                  "description":"Library ID",
                  "required":true,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"LIB001",
                     "helpText":""
                  }
               }
            ]
         }
      ]
   },
   {
      "title":"Restaurant Reservation",
      "sections":[
         {
            "id":"reservation",
            "label":"Reservation",
            "items":[
               {
                  "id":"guest",
                  "label":"Guest",
                  "type":"text",
                  "description":"Guest name",
                  "required":true,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"Guest",
                     "helpText":""
                  }
               },
               {
                  "id":"table_size",
                  "label":"Table Size",
                  "type":"text",
                  "description":"Number of guests",
                  "required":true,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"4",
                     "helpText":""
                  }
               },
               {
                  "id":"notes",
                  "label":"Notes",
                  "type":"text",
                  "description":"Special notes",
                  "required":false,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"Window seat",
                     "helpText":""
                  }
               }
            ]
         }
      ]
   },
   {
      "title":"Project Proposal",
      "sections":[
         {
            "id":"proposal",
            "label":"Proposal",
            "items":[
               {
                  "id":"project_name",
                  "label":"Project Name",
                  "type":"text",
                  "description":"Project title",
                  "required":true,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"Project X",
                     "helpText":""
                  }
               },
               {
                  "id":"client",
                  "label":"Client",
                  "type":"text",
                  "description":"Client name",
                  "required":true,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"Acme Inc.",
                     "helpText":""
                  }
               },
               {
                  "id":"summary",
                  "label":"Summary",
                  "type":"text",
                  "description":"Proposal summary",
                  "required":false,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"Short summary",
                     "helpText":""
                  }
               }
            ]
         }
      ]
   },
   {
      "title":"Pet Registration",
      "sections":[
         {
            "id":"pet",
            "label":"Pet",
            "items":[
               {
                  "id":"pet_name",
                  "label":"Pet Name",
                  "type":"text",
                  "description":"Pet name",
                  "required":true,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"Buddy",
                     "helpText":""
                  }
               },
               {
                  "id":"species",
                  "label":"Species",
                  "type":"text",
                  "description":"Pet species",
                  "required":true,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"Dog",
                     "helpText":""
                  }
               },
               {
                  "id":"breed",
                  "label":"Breed",
                  "type":"text",
                  "description":"Pet breed",
                  "required":false,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"Golden Retriever",
                     "helpText":""
                  }
               }
            ]
         }
      ]
   },
   {
      "title":"Insurance Quote",
      "sections":[
         {
            "id":"quote",
            "label":"Quote",
            "items":[
               {
                  "id":"applicant",
                  "label":"Applicant",
                  "type":"text",
                  "description":"Applicant name",
                  "required":true,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"Applicant",
                     "helpText":""
                  }
               },
               {
                  "id":"policy_type",
                  "label":"Policy Type",
                  "type":"text",
                  "description":"Insurance type",
                  "required":true,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"Home",
                     "helpText":""
                  }
               },
               {
                  "id":"city",
                  "label":"City",
                  "type":"text",
                  "description":"Residence city",
                  "required":false,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"Chicago",
                     "helpText":""
                  }
               }
            ]
         }
      ]
   },
   {
      "title":"Newsletter Signup",
      "sections":[
         {
            "id":"signup",
            "label":"Signup",
            "items":[
               {
                  "id":"subscriber_name",
                  "label":"Subscriber Name",
                  "type":"text",
                  "description":"Subscriber full name",
                  "required":true,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"Your name",
                     "helpText":""
                  }
               },
               {
                  "id":"interest",
                  "label":"Interest",
                  "type":"text",
                  "description":"Main interest",
                  "required":false,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"Technology",
                     "helpText":""
                  }
               },
               {
                  "id":"referral",
                  "label":"Referral",
                  "type":"text",
                  "description":"How did you hear about us?",
                  "required":false,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"Friend",
                     "helpText":""
                  }
               }
            ]
         }
      ]
   },
   {
      "title":"Workspace Booking",
      "sections":[
         {
            "id":"booking",
            "label":"Booking",
            "items":[
               {
                  "id":"employee",
                  "label":"Employee",
                  "type":"text",
                  "description":"Employee name",
                  "required":true,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"Employee",
                     "helpText":""
                  }
               },
               {
                  "id":"workspace",
                  "label":"Workspace",
                  "type":"text",
                  "description":"Workspace identifier",
                  "required":true,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"Desk A-12",
                     "helpText":""
                  }
               },
               {
                  "id":"building",
                  "label":"Building",
                  "type":"text",
                  "description":"Office building",
                  "required":false,
                  "disabled":false,
                  "validation":{
                     
                  },
                  "ui":{
                     "placeholder":"Headquarters",
                     "helpText":""
                  }
               }
            ]
         }
      ]
   }
]

export const mockProjects: Project[] = [
    {
        id: "project-001",
        name: "Cadastro de Clientes",
        createdAt: 1752153600000,
        updatedAt: 1752240000000,
        fixed: true,
        archived: false
    },
    {
        id: "project-002",
        name: "Pesquisa de Satisfação",
        createdAt: 1751808000000,
        updatedAt: 1752067200000,
        fixed: false,
        archived: false
    },
    {
        id: "project-003",
        name: "Formulário de Contato",
        createdAt: 1751462400000,
        updatedAt: 1751721600000,
        fixed: false,
        archived: false
    },
    {
        id: "project-004",
        name: "Solicitação de Férias",
        createdAt: 1751116800000,
        updatedAt: 1751558400000,
        fixed: false,
        archived: false
    },
    {
        id: "project-005",
        name: "Cadastro de Produtos",
        createdAt: 1750771200000,
        updatedAt: 1751203200000,
        fixed: true,
        archived: false
    },
    {
        id: "project-006",
        name: "Checklist de Inspeção",
        createdAt: 1750425600000,
        updatedAt: 1750684800000,
        fixed: false,
        archived: false
    },
    {
        id: "project-007",
        name: "Inscrição em Evento",
        createdAt: 1750080000000,
        updatedAt: 1750339200000,
        fixed: false,
        archived: true
    },
    {
        id: "project-008",
        name: "Avaliação de Desempenho",
        createdAt: 1749734400000,
        updatedAt: 1750166400000,
        fixed: false,
        archived: false
    },
    {
        id: "project-009",
        name: "Onboarding de Funcionários",
        createdAt: 1749388800000,
        updatedAt: 1749820800000,
        fixed: false,
        archived: false
    },
    {
        id: "project-010",
        name: "Requisição de Equipamentos",
        createdAt: 1749043200000,
        updatedAt: 1749561600000,
        fixed: false,
        archived: true
    }
]