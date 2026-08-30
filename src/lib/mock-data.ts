export interface NewsPost {
  id: string;
  title: string;
  slug: string;
  body: string;
  cover_image_url: string;
  is_published: boolean;
  category: 'Notice' | 'Event' | 'Academic' | 'Achievement';
  published_at: string;
  created_by?: string;
  created_at?: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  department: string;
  qualification: string;
  bio: string;
  photo_url: string;
  phone?: string;
}

export const SCHOOL_INFO = {
  name: "Shree Bhawani Secondary School",
  nepaliName: "श्री भवानी माध्यमिक विद्यालय",
  tagline: "Empowering Minds, Shaping Futures with Excellence & Integrity",
  established: "2040 B.S.",
  affiliation: "Government of Nepal / National Examination Board (NEB)",
  address: "Badhaiyatal 3 Semara, Bardiya, Nepal",
  addressNepali: "बधैयाताल ३ सेमरा, बर्दिया",
  headTeacherPhone: "9858037940",
  accountantPhone: "9848060643",
  email: "bhawanisecondaryschool2040@gmail.com",
  officeHours: "Sunday - Friday: 9:00 AM - 4:30 PM",
  logoUrl: "/images/logo.jpg",
  principalPhotoUrl: "/images/principal.jpg",
  stats: [
    { label: "Years of Educational Service", value: "40+" },
    { label: "Grade Levels", value: "ECD – 12" },
    { label: "Dedicated Educators & Staff", value: "30+" },
    { label: "Enrolled Students", value: "800+" },
  ],
};

export const ACADEMIC_PROGRAMS = [
  {
    title: "Early Childhood Development (ECD) & Pre-Primary",
    level: "ECD & Pre-Primary",
    nepaliTitle: "प्रारम्भिक बालविकास (ECD) तथा पूर्व-प्राथमिक",
    description: "Play-based, joyful learning environment nurturing cognitive, social, and emotional foundations for young learners.",
    features: [
      "Activity-based child friendly teaching methodology",
      "Language development in Nepali and English",
      "Nutritious snack support and hygienic care",
      "Creative arts, motor skill building & interactive toys",
    ],
  },
  {
    title: "Basic Level Education (Grade 1 to 8)",
    level: "Grades 1 – 8 (CDC Nepal)",
    nepaliTitle: "आधारभूत तह शिक्षा (कक्षा १ देखि ८)",
    description: "Holistic National Curriculum designed to build strong foundations in mathematics, sciences, languages, social studies, and creative arts.",
    features: [
      "Core subjects: Nepali, English, Mathematics, Science & Social Studies",
      "Continuous Assessment System (CAS) & regular parent meetings",
      "Basic computer literacy and library reading sessions",
      "Extracurricular activities, sports, and cultural programs",
    ],
  },
  {
    title: "Secondary Level Education (Grade 9 & 10 - SEE)",
    level: "Grade 9 & 10 (SEE Board)",
    nepaliTitle: "माध्यमिक तह शिक्षा (कक्षा ९ र १० - SEE)",
    description: "Rigorous secondary education preparing students for the Secondary Education Examination (SEE) with focused academic mentorship.",
    features: [
      "Compulsory and optional subjects per CDC Nepal framework",
      "Science laboratory practicals and technology exposure",
      "Weekly test series, revision camps and exam orientation",
      "Career orientation and personal development guidance",
    ],
  },
  {
    title: "Higher Secondary Education (+2 Streams: Grade 11 & 12)",
    level: "Grade 11 & 12 (NEB Affiliated)",
    nepaliTitle: "उच्च माध्यमिक शिक्षा (+२: कक्षा ११ र १२)",
    description: "NEB-affiliated higher secondary streams equipping students with academic depth and professional pathways for higher university studies.",
    features: [
      "Streams: Education, Humanities, Management & General Subjects",
      "Specialized faculty with practical curriculum delivery",
      "Internal evaluations and terminal board exam preparation",
      "Scholarships for deserving and marginalized students",
    ],
  },
];

export const MOCK_STAFF: StaffMember[] = [
  {
    id: "1",
    name: "Head Teacher",
    role: "Head Teacher / Principal",
    department: "Administration & Leadership",
    qualification: "M.Ed. Educational Leadership",
    bio: "Leading academic quality, institutional discipline, and community partnership at Shree Bhawani Secondary School.",
    photo_url: "/images/principal.jpg",
    phone: "9858037940",
  },
  {
    id: "2",
    name: "Accountant",
    role: "School Accountant / Administration",
    department: "Administration & Finance",
    qualification: "B.B.S. / Business Studies",
    bio: "Managing school accounting, fee records, educational documentation, and administrative desks.",
    photo_url: "/images/logo.jpg",
    phone: "9848060643",
  },
];
