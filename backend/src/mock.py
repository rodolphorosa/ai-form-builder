__all__ = ["schema"]

schema = {
  "title": "Employee Registration Form",
  "sections": [
    {
      "id": "personal_information",
      "label": "Personal Information",
      "items": [
        {
          "id": "full_name",
          "label": "Full Name",
          "type": "text",
          "description": "Enter your full name.",
          "required": True,
          "disabled": False,
          "validation": {
            "minLength": 3,
            "maxLength": 100
          },
          "ui": {
            "placeholder": "John Doe",
            "helpText": "Your legal name."
          }
        },
        {
          "id": "email",
          "label": "Email",
          "type": "email",
          "description": "Corporate email address.",
          "required": True,
          "disabled": False,
          "ui": {
            "placeholder": "john@company.com"
          }
        },
        {
          "id": "password",
          "label": "Password",
          "type": "password",
          "description": "Create a secure password.",
          "required": True,
          "disabled": False,
          "validation": {
            "minLength": 8,
            "maxLength": 32
          },
          "ui": {
            "placeholder": "********"
          }
        },
        {
          "id": "phone",
          "label": "Phone",
          "type": "phone",
          "description": "Primary phone number.",
          "required": False,
          "disabled": False,
          "ui": {
            "placeholder": "+55 (21) 99999-9999"
          }
        },
        {
          "id": "portfolio",
          "label": "Portfolio",
          "type": "url",
          "description": "Personal website or portfolio.",
          "required": False,
          "disabled": False,
          "ui": {
            "placeholder": "https://example.com"
          }
        },
        {
          "id": "biography",
          "label": "Biography",
          "type": "textarea",
          "description": "Tell us about yourself.",
          "required": False,
          "disabled": False,
          "validation": {
            "maxLength": 500
          },
          "ui": {
            "placeholder": "Write a short biography...",
            "helpText": "Maximum of 500 characters."
          }
        }
      ]
    },
    {
      "id": "employment_information",
      "label": "Employment Information",
      "items": [
        {
          "id": "age",
          "label": "Age",
          "type": "number",
          "description": "Employee age.",
          "required": True,
          "disabled": False,
          "validation": {
            "minValue": 18,
            "maxValue": 80
          }
        },
        {
          "id": "birth_date",
          "label": "Birth Date",
          "type": "date",
          "description": "Employee birth date.",
          "required": True,
          "disabled": False
        },
        {
          "id": "interview_datetime",
          "label": "Interview Date & Time",
          "type": "datetime",
          "description": "Choose an interview slot.",
          "required": True,
          "disabled": False
        },
        {
          "id": "department",
          "label": "Department",
          "type": "select",
          "description": "Select the employee department.",
          "required": True,
          "disabled": False,
          "options": [
            {
              "value": "",
              "label": "Select an option"
            },
            {
              "value": "engineering",
              "label": "Engineering"
            },
            {
              "value": "design",
              "label": "Design"
            },
            {
              "value": "marketing",
              "label": "Marketing"
            },
            {
              "value": "hr",
              "label": "Human Resources"
            }
          ]
        },
        {
          "id": "employment_type",
          "label": "Employment Type",
          "type": "radio",
          "description": "Choose the employment type.",
          "required": True,
          "disabled": False,
          "options": [
            {
              "value": "full_time",
              "label": "Full Time"
            },
            {
              "value": "part_time",
              "label": "Part Time"
            },
            {
              "value": "contractor",
              "label": "Contractor"
            }
          ]
        },
        {
          "id": "accept_terms",
          "label": "I have read and accept the Terms and Conditions",
          "type": "checkbox",
          "description": "Required before submitting the form.",
          "required": True,
          "disabled": False,
          "ui": {
            "helpText": "You must accept the terms before continuing."
          }
        }
      ]
    },
    {
      "id": "payment_information",
      "label": "Payment Information",
      "items": [
        {
          "id": "credit_card",
          "label": "Credit Card",
          "description": "Card information.",
          "items": [
            {
              "id": "card_number",
              "label": "Card Number",
              "type": "text",
              "required": True,
              "disabled": False,
              "validation": {
                "minLength": 13,
                "maxLength": 19
              },
              "ui": {
                "placeholder": "1234 5678 9012 3456"
              }
            },
            {
              "id": "expiration_date",
              "label": "Expiration Date",
              "type": "text",
              "required": True,
              "disabled": False,
              "validation": {
                "minLength": 5,
                "maxLength": 5
              },
              "ui": {
                "placeholder": "MM/YY"
              }
            },
            {
              "id": "cvv",
              "label": "CVV",
              "type": "password",
              "required": True,
              "disabled": False,
              "validation": {
                "minLength": 3,
                "maxLength": 4
              },
              "ui": {
                "placeholder": "123"
              }
            }
          ]
        }
      ]
    }
  ]
}