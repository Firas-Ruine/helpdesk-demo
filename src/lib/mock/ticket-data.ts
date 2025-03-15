// Sample ticket data with conversations
export const ticketsData = [
    {
      id: "T-1001",
      subject: "Website login issue",
      status: "In Progress",
      country: "USA",
      service: "Information Technology",
      date: "2023-03-15",
      partner: "Acme Corp",
      login: "john.doe",
      createdBy: "Sarah Johnson",
      createdOn: "2023-03-10",
      type: "Request",
      assignedTo: "Michael Scott",
      cruciality: "High",
      customer: {
        name: "John Doe",
        email: "john.doe@acmecorp.com",
        company: "Acme Corp",
      },
      conversation: [
        {
          id: "msg-1001-1",
          content:
            "I'm having trouble logging into the website. It keeps saying my password is incorrect, but I'm sure I'm using the right one.",
          sender: {
            name: "John Doe",
            email: "john.doe@acmecorp.com",
            avatar: "/placeholder.svg",
          },
          timestamp: new Date("2023-03-10T09:30:00"),
          type: "email",
        },
        {
          id: "msg-1001-2",
          content:
            "I've checked the account and there seems to be an issue with the authentication service. Let me reset your password manually.",
          sender: {
            name: "Michael Scott",
            email: "michael.scott@helpdesk.com",
            avatar: "/placeholder.svg",
          },
          timestamp: new Date("2023-03-10T10:15:00"),
          type: "email",
        },
        {
          id: "msg-1001-3",
          content:
            "Checked the logs - there was a temporary issue with the authentication service. It's been resolved now.",
          sender: {
            name: "Michael Scott",
            email: "michael.scott@helpdesk.com",
            avatar: "/placeholder.svg",
          },
          timestamp: new Date("2023-03-10T10:20:00"),
          type: "comment",
        },
        {
          id: "msg-1001-4",
          content:
            "I've sent a password reset link to your email. Please check and let me know if you're able to log in now.",
          sender: {
            name: "Michael Scott",
            email: "michael.scott@helpdesk.com",
            avatar: "/placeholder.svg",
          },
          timestamp: new Date("2023-03-10T10:25:00"),
          type: "email",
        },
        {
          id: "msg-1001-5",
          content: "Thank you! I received the reset link and was able to log in successfully.",
          sender: {
            name: "John Doe",
            email: "john.doe@acmecorp.com",
            avatar: "/placeholder.svg",
          },
          timestamp: new Date("2023-03-10T11:05:00"),
          type: "email",
        },
      ],
    },
    {
      id: "T-1002",
      subject: "Payment processing error",
      status: "In Progress",
      country: "Germany",
      service: "Financial",
      date: "2023-03-18",
      partner: "Global Finance",
      login: "emma.schmidt",
      createdBy: "Robert Chen",
      createdOn: "2023-03-12",
      type: "Complaint",
      assignedTo: "Lisa Wong",
      cruciality: "Critical",
      customer: {
        name: "Emma Schmidt",
        email: "emma.schmidt@globalfinance.de",
        company: "Global Finance",
      },
      conversation: [
        {
          id: "msg-1002-1",
          content:
            "We're experiencing issues with payment processing. Customers are reporting that their payments are being declined even though their cards are valid.",
          sender: {
            name: "Emma Schmidt",
            email: "emma.schmidt@globalfinance.de",
            avatar: "/placeholder.svg",
          },
          timestamp: new Date("2023-03-12T14:20:00"),
          type: "email",
        },
        {
          id: "msg-1002-2",
          content: "This is affecting our business operations significantly. We need this resolved as soon as possible.",
          sender: {
            name: "Emma Schmidt",
            email: "emma.schmidt@globalfinance.de",
            avatar: "/placeholder.svg",
          },
          timestamp: new Date("2023-03-12T14:22:00"),
          type: "email",
        },
        {
          id: "msg-1002-3",
          content:
            "I understand the urgency. I'm escalating this to our payment processing team right away. We'll investigate the issue immediately.",
          sender: {
            name: "Lisa Wong",
            email: "lisa.wong@helpdesk.com",
            avatar: "/placeholder.svg",
          },
          timestamp: new Date("2023-03-12T14:35:00"),
          type: "email",
        },
        {
          id: "msg-1002-4",
          content: "Escalated to payment team with priority flag. They're checking the payment gateway logs now.",
          sender: {
            name: "Lisa Wong",
            email: "lisa.wong@helpdesk.com",
            avatar: "/placeholder.svg",
          },
          timestamp: new Date("2023-03-12T14:40:00"),
          type: "comment",
        },
        {
          id: "msg-1002-5",
          content:
            "Our team has identified the issue. There was a configuration problem with our payment gateway after a recent update. We're implementing a fix now and will keep you updated on the progress.",
          sender: {
            name: "Lisa Wong",
            email: "lisa.wong@helpdesk.com",
            avatar: "/placeholder.svg",
          },
          timestamp: new Date("2023-03-12T15:30:00"),
          type: "email",
        },
      ],
    },
    {
      id: "T-1003",
      subject: "Product delivery delay",
      status: "In Progress",
      country: "France",
      service: "Shipment",
      date: "2023-03-20",
      partner: "Fast Logistics",
      login: "pierre.dubois",
      createdBy: "Maria Garcia",
      createdOn: "2023-03-15",
      type: "Complaint",
      assignedTo: "David Kim",
      cruciality: "Medium",
      customer: {
        name: "Pierre Dubois",
        email: "pierre.dubois@fastlogistics.fr",
        company: "Fast Logistics",
      },
      conversation: [
        {
          id: "msg-1003-1",
          content:
            "We have a shipment (Order #FL-7890) that was supposed to be delivered yesterday, but it's still showing as 'in transit'. Our customer is asking for an update.",
          sender: {
            name: "Pierre Dubois",
            email: "pierre.dubois@fastlogistics.fr",
            avatar: "/placeholder.svg",
          },
          timestamp: new Date("2023-03-15T11:45:00"),
          type: "email",
        },
        {
          id: "msg-1003-2",
          content:
            "I'll check the status of this shipment right away. Can you provide any additional details about the delivery address or recipient?",
          sender: {
            name: "David Kim",
            email: "david.kim@helpdesk.com",
            avatar: "/placeholder.svg",
          },
          timestamp: new Date("2023-03-15T12:10:00"),
          type: "email",
        },
        {
          id: "msg-1003-3",
          content:
            "The delivery is going to Marseille, to a company called TechSolutions. The recipient is Antoine Martin.",
          sender: {
            name: "Pierre Dubois",
            email: "pierre.dubois@fastlogistics.fr",
            avatar: "/placeholder.svg",
          },
          timestamp: new Date("2023-03-15T12:25:00"),
          type: "email",
        },
        {
          id: "msg-1003-4",
          content:
            "Checking with the logistics team about this delay. Will update the tracking system once I have more info.",
          sender: {
            name: "David Kim",
            email: "david.kim@helpdesk.com",
            avatar: "/placeholder.svg",
          },
          timestamp: new Date("2023-03-15T12:30:00"),
          type: "comment",
        },
      ],
    },
    {
      id: "T-1004",
      subject: "Account upgrade request",
      status: "In Progress",
      country: "UK",
      service: "Customer Relations",
      date: "2023-03-22",
      partner: "TechSolutions",
      login: "james.wilson",
      createdBy: "Alex Thompson",
      createdOn: "2023-03-18",
      type: "Request",
      assignedTo: "Jennifer Lee",
      cruciality: "Low",
      customer: {
        name: "James Wilson",
        email: "james.wilson@techsolutions.co.uk",
        company: "TechSolutions",
      },
      conversation: [
        {
          id: "msg-1004-1",
          content:
            "We'd like to upgrade our account from the Basic plan to the Premium plan. Can you help us with the process and let us know what additional features we'll get?",
          sender: {
            name: "James Wilson",
            email: "james.wilson@techsolutions.co.uk",
            avatar: "/placeholder.svg",
          },
          timestamp: new Date("2023-03-18T15:30:00"),
          type: "email",
        },
        {
          id: "msg-1004-2",
          content:
            "I'd be happy to help you upgrade your account. The Premium plan includes advanced analytics, priority support, and unlimited users. Would you like me to send you a detailed comparison of the plans?",
          sender: {
            name: "Jennifer Lee",
            email: "jennifer.lee@helpdesk.com",
            avatar: "/placeholder.svg",
          },
          timestamp: new Date("2023-03-18T16:05:00"),
          type: "email",
        },
        {
          id: "msg-1004-3",
          content:
            "Yes, please send the comparison. Also, how soon can the upgrade be processed once we decide to move forward?",
          sender: {
            name: "James Wilson",
            email: "james.wilson@techsolutions.co.uk",
            avatar: "/placeholder.svg",
          },
          timestamp: new Date("2023-03-18T16:20:00"),
          type: "email",
        },
      ],
    },
    {
      id: "T-1005",
      subject: "Mobile app crash report",
      status: "In Progress",
      country: "Canada",
      service: "Information Technology",
      date: "2023-03-25",
      partner: "MobileTech",
      login: "ryan.taylor",
      createdBy: "Olivia Brown",
      createdOn: "2023-03-20",
      type: "Request",
      assignedTo: "Michael Scott",
      cruciality: "High",
      customer: {
        name: "Ryan Taylor",
        email: "ryan.taylor@mobiletech.ca",
        company: "MobileTech",
      },
      conversation: [
        {
          id: "msg-1005-1",
          content:
            "Our users are reporting that the mobile app is crashing when they try to access the reports section. This started happening after the latest update.",
          sender: {
            name: "Ryan Taylor",
            email: "ryan.taylor@mobiletech.ca",
            avatar: "/placeholder.svg",
          },
          timestamp: new Date("2023-03-20T09:15:00"),
          type: "email",
        },
        {
          id: "msg-1005-2",
          content:
            "I'll look into this right away. Can you provide any specific device models or OS versions where this is occurring most frequently?",
          sender: {
            name: "Michael Scott",
            email: "michael.scott@helpdesk.com",
            avatar: "/placeholder.svg",
          },
          timestamp: new Date("2023-03-20T09:45:00"),
          type: "email",
        },
        {
          id: "msg-1005-3",
          content:
            "It seems to be happening mostly on iOS devices, particularly iPhone 12 and newer models running iOS 16.",
          sender: {
            name: "Ryan Taylor",
            email: "ryan.taylor@mobiletech.ca",
            avatar: "/placeholder.svg",
          },
          timestamp: new Date("2023-03-20T10:10:00"),
          type: "email",
        },
        {
          id: "msg-1005-4",
          content:
            "Checking with the dev team about iOS 16 compatibility issues. This might be related to the new permissions model.",
          sender: {
            name: "Michael Scott",
            email: "michael.scott@helpdesk.com",
            avatar: "/placeholder.svg",
          },
          timestamp: new Date("2023-03-20T10:15:00"),
          type: "comment",
        },
      ],
    },
  ]
  
  // Function to get a ticket by ID
  export function getTicketById(id: string) {
    return ticketsData.find((ticket) => ticket.id === id) || null
  }
  
  // Function to get all tickets
  export function getAllTickets() {
    return ticketsData
  }
  
  // Function to get tickets by status
  export function getTicketsByStatus(status: string) {
    return ticketsData.filter((ticket) => ticket.status === status)
  }
  
  