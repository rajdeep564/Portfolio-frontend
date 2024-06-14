import {
    javascript,
    html,
    css,
    reactjs,
    redux,
    tailwind,
    nodejs,
    mongodb,
    figma,
    threejs,
    python,
    illustrator,
    photoshop,
    softwarrankers,
    vnnovate,
    ganpat,
    portfolio,
    cashsnap,
    FNS,
    snehal,
    yogesh,
    webl,
    pythonl,
    uil,
    contentl,
  } from "../assets";
  
  export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "work",
      title: "Work",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];
  
  const services = [
    {
      title: "Web Developer",
      icon: webl,
    },
    {
      title: "Python Programmer",
      icon: pythonl,
    },
    {
      title: "UI/UX Designer",
      icon: uil,
    },
    {
      title: "Content Creator",
      icon: contentl,
    },
  ];
  
  const technologies = [
    {
      name: "HTML 5",
      icon: html,
    },
    {
      name: "CSS 3",
      icon: css,
    },
    {
      name: "JavaScript",
      icon: javascript,
    },
    {
      name: "python",
      icon: python,
    },
    {
      name: "React JS",
      icon: reactjs,
    },
    {
      name: "Redux Toolkit",
      icon: redux,
    },
    {
      name: "Tailwind CSS",
      icon: tailwind,
    },
    {
      name: "Node JS",
      icon: nodejs,
    },
    {
      name: "MongoDB",
      icon: mongodb,
    },
    {
      name: "Three JS",
      icon: threejs,
    },
    {
      name: "photoshop",
      icon: photoshop,
    },
    {
      name: "figma",
      icon: figma,
    },
    {
      name: "illustrator",
      icon: illustrator,
    },
  ];
  
  const experiences = [
    {
      title: "Frontend jr developer(Intern)",
      company_name: "Software Rankers",
      icon: softwarrankers,
      iconBg: "#383E56",
      date: "March 2022 - May 2022",
      points: [
        "Crafted sleek frontend elements, including button designs, HTML structures, and eye-catching CSS animations for static websites.",
        "Gained invaluable insights into the inner workings of a startup environment.",
        "Designed captivating social media templates for Instagram and various other platforms.",
        "Collaborated with cross-functional teams to bring creative projects to life.",
      ],
    },
    {
      title: "Python Developer(Intern)",
      company_name: "Vnnovate Solutions",
      icon: vnnovate,
      iconBg: "#E6DEDD",
      date: "Dec 2023 - Jan 2023",
      points: [
        "Developed a fully functional Face Recognition Attendance System using Python, integrating computer vision and machine learning models.",
        "Enabled automatic tracking of student attendance by class, roll number, photo, batch, and total attendance.",
        "Implemented configurable settings for attendance marking intervals.",
        "Designed and managed a comprehensive backend using Firebase, handling attendance timing and data collection seamlessly.",
      ],
    },
    {
      title: "Machine Learning Engineer(Intern)",
      company_name: "Ganpat University",
      icon: ganpat,
      iconBg: "#383E56",
      date: "June 2024 - Ongoing",
      points: [
        "Utilizing the YOLO model for object detection, developing a weapon detection system that identifies weapons and sends alerts via email or mobile.",
        "Capturing frames at the moment of detection and continuously until the threat is no longer present.",
        "Actively working on this project to enhance real-time security and threat response mechanisms.",
      ],
    },
  ];
  
  const testimonials = [
    {
      testimonial:
        "Rajdeep excelled in his internship, mastering Python, machine learning, and backend integration for the Face Recognition Attendance System, showcasing sharp problem-solving skills.",
      name: "Snehal Chauhan",
      designation: "CEO",
      company: "Vnnovate Solutions",
      image: snehal,
    },
    {
      testimonial:
        "During his internship, Rajdeep really impressed everyone with his strong web development and programming skills. He showed such proactive problem-solving abilities!",
      name: "Yogesh Prajapati",
      designation: "Prof",
      company: "UVPCE",
      image: yogesh,
    },
  ];
  
  const projects = [
    {
      name: "Attendance System",
      description:
        "A Python-based Face Recognition Attendance System tracks student attendance by class, roll number, and photo, using Firebase for data management and re-marking intervals.",
      tags: [
        {
          name: "python",
          color: "blue-text-gradient",
        },
        {
          name: "machinelearning",
          color: "green-text-gradient",
        },
        {
          name: "ai",
          color: "pink-text-gradient",
        },
      ],
      image: FNS,
      source_code_link: "https://github.com/rajdeep564/FaceRecongnitionRTDB",
    },
    {
      name: "Cashsnap",
      description:
        "Web application that has inventory,sales,supplier,customer,employee management for small scale buisness problem solution and a built in cashIN cashOUT calculator ",
      tags: [
        {
          name: "html",
          color: "blue-text-gradient",
        },
        {
          name: "css",
          color: "green-text-gradient",
        },
        {
          name: "javascript",
          color: "pink-text-gradient",
        },
      ],
      image: cashsnap,
      source_code_link: "https://github.com/",
    },
    {
      name: "3D Portfolio",
      description:
        "A 3D portfolio website built with React.js, Three.js, and Framer Motion, featuring interactive animations on hover and integrated email services for user engagement.",
      tags: [
        {
          name: "reactjs",
          color: "blue-text-gradient",
        },
        {
          name: "threejs",
          color: "green-text-gradient",
        },
        {
          name: "tailwind",
          color: "pink-text-gradient",
        },
      ],
      image: portfolio,
      source_code_link: "https://github.com/",
    },
  ];
  
  export { services, technologies, experiences, testimonials, projects };