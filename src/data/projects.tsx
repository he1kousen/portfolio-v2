import React from 'react'


export interface Project {
  id: number
  title: string
  description: string
  stack: string[]
  image: string
  link: string
  companyLogo?: React.ReactNode | string
  content?: string[]
  gallery?: string[]
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'InteraERP',
    description: 'A comprehensive ERP solution designed for seamless resource management and real-time operational tracking.',
    stack: ['Laravel', 'Filament', 'TailwindCSS'],
    image: '../assets/intera-erp/finance.png',
    link: 'https://erp.arihub.my.id',
    companyLogo: '../assets/intera-erp/logo-light.png', // Contoh logo brand asli
    content: [
      'This Enterprise Resource Planning (ERP) platform was engineered to enhance operational efficiency and maintain data integrity across large-scale business environments. The system leverages the power of Laravel for its backend, ensuring a secure, scalable, and high-performance foundation capable of handling intensive business logic and heavy data processing.',
      'The user interface is powered by Filament, integrated with Alpine.js and TailwindCSS, delivering a modern and highly intuitive dashboard. This stack allows for a seamless administrative experience, enabling teams to monitor resources and generate reports with optimal speed and responsiveness.The user interface is powered by Filament, integrated with Alpine.js and TailwindCSS, delivering a modern and highly intuitive dashboard. This stack allows for a seamless administrative experience, enabling teams to monitor resources and generate reports with optimal speed and responsiveness.'
    ],
    gallery: [
      '../assets/intera-erp/dashboard.png',
      '../assets/intera-erp/hr.png',
      '../assets/intera-erp/inventory.png'

    ]
  },
  {
    id: 2,
    title: 'Zenitech',
    description: 'A full-featured Apple Authorized Reseller e-commerce platform with a clean, photography-first UI inspired by Apple design language.',
    stack: ['React', 'Tailwind CSS', 'shadcn', 'Zustand', 'Framer Motion', 'Lenis', 'Supabase', 'Midtrans'],
    image: '../assets/zenitech/home.png',
    link: 'https://zen1tech.vercel.app',
    content: [
      'Zenitech is a full-featured Apple Authorized Reseller e-commerce platform built with a strong emphasis on UI/UX — replicating Apple signature clean aesthetic through a photography-first layout, minimal borders, and intentional whitespace.',
      'Functionally, the platform supports end-to-end shopping flows including user authentication, cart state management via Zustand, and a fully integrated Midtrans payment gateway for simulated checkouts. A separate Admin Dashboard handles product catalog management and order tracking.',
      'The frontend is built with React 18 and Vite, styled with Tailwind CSS v4 and shadcn/ui, with smooth animations powered by Framer Motion, GSAP, and Lenis. Supabase serves as the backend — handling PostgreSQL, authentication, file storage, and edge functions — with the frontend deployed on Vercel.'
    ],
    gallery: [
      '../assets/zenitech/home.png',
      '../assets/zenitech/bestsellers.png',
      '../assets/zenitech/featured.png',
      '../assets/zenitech/products.png',
      '../assets/zenitech/detail.png',
      '../assets/zenitech/cart.png',
      '../assets/zenitech/checkou.png',
      '../assets/zenitech/orders.png'

    ]
  },
  {
    id: 3,
    title: 'Web Inventory',
    description: 'A web-based inventory management system built to streamline stock tracking and product data management.',
    stack: ['Laravel', 'MySQL', 'Bootstrap'],
    image: '../assets/intera-erp/finance.png',
    link: '#',
    companyLogo: '../assets/dhanisa/dmj.png',
    content: [
      'A web-based inventory management system developed using Laravel for server-side logic and database operations. The platform supports core warehouse workflows including inbound/outbound stock tracking, product data management, and automated reporting — reducing manual effort and improving operational accuracy.',
      'The user interface is built with Bootstrap and jQuery, delivering a responsive and dynamic experience with asynchronous requests for smooth interaction. The system was designed with careful attention to database schema architecture and underwent functional testing throughout the development lifecycle to ensure reliability in real-world use.'
    ],
    gallery: [
      '../assets/dhanisa/home.png',
      '../assets/dhanisa/1.png',
      '../assets/dhanisa/2.png',
      '../assets/dhanisa/3.png'


    ]
  },
  // {
  //   id: 2,
  //   title: 'Creative Agency Site',
  //   description: 'Interactive portfolio for a design agency featuring smooth scroll animations and 3D elements.',
  //   stack: ['React', 'Firebase', 'Framer Motion'],
  //   image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800&h=450',
  //   link: '#',
  //   content: [
  //     'Designed to win awards, this portfolio pushes the boundaries of web experiences. We heavily utilized Framer Motion and GSAP to create scroll-triggered animations that feel deeply connected to the user\'s input.',
  //     'The site includes dynamic 3D elements that react to mouse movements, establishing a highly immersive aesthetic that perfectly represents the agency\'s creative ethos.'
  //   ],
  //   gallery: [
  //     'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800&h=450',
  //     'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800&h=450'
  //   ]
  // },
  // {
  //   id: 3,
  //   title: 'Financial Dashboard',
  //   description: 'Data visualization tool for personal finance management with secure bank integrations.',
  //   stack: ['Python', 'FastAPI', 'PostgreSQL'],
  //   image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=450',
  //   link: '#',
  //   content: [
  //     'A powerful analytical tool designed for high-net-worth individuals to track multiple portfolios in real-time. Security and data integrity were paramount during the development process.',
  //     'We implemented complex data visualization charts using D3.js, allowing users to drill down into their spending habits, investment growth, and tax liabilities with millisecond latency.'
  //   ],
  //   gallery: [
  //     'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=450',
  //     'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800&h=450'
  //   ]
  // },
  // {
  //   id: 4,
  //   title: 'Task Management App',
  //   description: 'A collaborative productivity tool built for remote teams to organize workflows.',
  //   stack: ['Vue.js', 'Pinia', 'Vite'],
  //   image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&q=80&w=800&h=450',
  //   link: '#',
  //   content: [
  //     'Born out of the need for a simpler alternative to JIRA, this tool focuses on speed and keyboard accessibility. Users can navigate the entire interface and manage tasks without ever touching the mouse.',
  //     'Real-time collaboration is powered by WebSockets, ensuring that when a team member updates a task status, everyone else sees the change instantly.'
  //   ],
  //   gallery: [
  //     'https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&q=80&w=800&h=450',
  //     'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800&h=450'
  //   ]
  // },
  // {
  //   id: 5,
  //   title: 'Fitness Tracker',
  //   description: 'Mobile application to log workouts, track progress, and share achievements with friends.',
  //   stack: ['React Native', 'Expo', 'Supabase'],
  //   image: 'https://images.unsplash.com/photo-1526502760166-f0db5b3e2329?auto=format&fit=crop&q=80&w=800&h=450',
  //   link: '#',
  //   content: [
  //     'This React Native application allows users to build custom workout routines, track their sets and reps, and visualize their strength progression over time.',
  //     'We integrated Supabase to handle user authentication and social features, allowing users to share their daily workouts to a community feed.'
  //   ],
  //   gallery: [
  //     'https://images.unsplash.com/photo-1526502760166-f0db5b3e2329?auto=format&fit=crop&q=80&w=800&h=450',
  //     'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=800&h=450'
  //   ]
  // },
  // {
  //   id: 6,
  //   title: 'Real Estate Portal',
  //   description: 'Property search platform with interactive maps and virtual tour capabilities.',
  //   stack: ['Node.js', 'Express', 'MongoDB'],
  //   image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800&h=450',
  //   link: '#',
  //   content: [
  //     'A comprehensive portal that connects buyers with real estate agents. The standout feature is a deeply integrated Mapbox experience, allowing users to draw custom search boundaries.',
  //     'Each property listing features high-resolution image galleries and embedded 3D virtual tours, processed automatically by our custom backend pipeline.'
  //   ],
  //   gallery: [
  //     'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800&h=450',
  //     'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800&h=450'
  //   ]
  // }
]
