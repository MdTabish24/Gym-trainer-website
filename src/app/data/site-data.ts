export interface NavItem {
  label: string;
  path: string;
}

export interface FeatureCard {
  eyebrow: string;
  title: string;
  description: string;
}

export interface StatItem {
  label: string;
  value: string;
}

export interface Certification {
  title: string;
  issuer: string;
  year: string;
  image: string;
  accent: string;
  description: string;
}

export interface ServiceItem {
  name: string;
  description: string;
  price: string;
  features: string[];
}

export interface TimelineItem {
  title: string;
  note: string;
  label: string;
  image: string;
  side: 'left' | 'right';
}

export interface GalleryItem {
  id: number;
  src: string;
  title: string;
  category: string;
  caption: string;
}

export const siteName = 'Maaz Momin';

export const navItems: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Diet Plan', path: '/diet-plan' },
  { label: 'Workout Plan', path: '/workout-plan' },
  { label: 'Transformations', path: '/transformations' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact', path: '/contact' },
];

export const homeFeatures: FeatureCard[] = [
  {
    eyebrow: '01',
    title: 'Personalized Plans',
    description: 'Custom workout and nutrition systems mapped to your current level, schedule, and goal.',
  },
  {
    eyebrow: '02',
    title: 'Visible Progress',
    description: 'Structure, accountability, and consistent feedback so every week has a measurable target.',
  },
  {
    eyebrow: '03',
    title: 'Expert Guidance',
    description: 'Science-backed coaching built for body recomposition, fat loss, and long-term strength.',
  },
  {
    eyebrow: '04',
    title: 'Ongoing Support',
    description: 'Daily momentum, plan adjustments, and clear next steps when life or training gets messy.',
  },
];

export const transformationStats: StatItem[] = [
  { label: 'Client Success Rate', value: '95%' },
  { label: 'Years of Coaching', value: '4+' },
  { label: 'Programs Delivered', value: '150+' },
];

export const certifications: Certification[] = [
  {
    title: 'IFSA Certified Fitness Coach',
    issuer: 'Intellectual Fitness & Sports Academy',
    year: '2023',
    image: '/media/m5.jpg',
    accent: 'from-sky-400 to-indigo-500',
    description:
      'Validated coaching knowledge across exercise science, training methodology, and safe client programming.',
  },
  {
    title: 'Precision Nutrition Coaching',
    issuer: 'Behavior Change and Nutrition Systems',
    year: '2021',
    image: '/media/g4.jpg',
    accent: 'from-rose-400 to-orange-500',
    description:
      'Built around sustainable habit change, practical meal design, and nutrition coaching that clients can maintain.',
  },
  {
    title: 'Sports Science Foundation',
    issuer: 'Exercise Physiology and Biomechanics',
    year: '2019',
    image: '/media/g2.jpg',
    accent: 'from-amber-400 to-yellow-500',
    description:
      'Applied understanding of human movement, performance systems, recovery, and evidence-based training design.',
  },
  {
    title: 'Corrective Exercise Specialist',
    issuer: 'Movement Quality and Injury Prevention',
    year: '2022',
    image: '/media/m6.jpg',
    accent: 'from-emerald-400 to-teal-500',
    description:
      'Focused on movement pattern correction, posture, and training modifications for safer long-term progress.',
  },
];

export const services: ServiceItem[] = [
  {
    name: 'Personal Training',
    description: 'One-to-one coaching with form correction, intensity management, and a plan that evolves weekly.',
    price: 'Starts from Rs. 400 / session',
    features: ['Custom workout split', 'Nutrition guidance', 'Progress tracking', 'Technique coaching', 'Visible results'],
  },
  {
    name: 'Online Coaching',
    description: 'Remote coaching for busy schedules with structured check-ins and a clear digital training roadmap.',
    price: 'Starts from Rs. 1000 / month',
    features: ['Weekly reviews', 'Video feedback', 'Custom meal strategy', 'Goal resets', 'Anywhere access'],
  },
  {
    name: 'Nutrition Coaching',
    description: 'Practical meal systems for fat loss, muscle gain, and a diet you can actually continue.',
    price: 'Starts from Rs. 700 / month',
    features: ['Macro guidance', 'Meal timing support', 'Food swaps', 'Habit coaching', 'Lifestyle fit'],
  },
  {
    name: 'Group Training',
    description: 'Small-group sessions that keep energy high while still giving enough individual attention.',
    price: 'Starts from Rs. 200 / session per person',
    features: ['2-4 person groups', 'Shared motivation', 'Lower cost', 'Fun environment', 'Fast pace'],
  },
];

export const timelineItems: TimelineItem[] = [
  {
    title: 'Day 01',
    note: 'Baseline physique and movement screening before the first structured cycle.',
    label: 'Before',
    image: '/media/m6.jpg',
    side: 'left',
  },
  {
    title: 'Week 04',
    note: 'Daily nutrition discipline starts showing better posture, control, and energy.',
    label: 'Before',
    image: '/media/beforeimg.jpg',
    side: 'right',
  },
  {
    title: 'Week 08',
    note: 'Body composition shifts after consistent resistance work and recovery management.',
    label: 'After',
    image: '/media/g3.jpg',
    side: 'left',
  },
  {
    title: 'Week 12',
    note: 'Strength increases are matched by visible muscle definition and conditioning.',
    label: 'After',
    image: '/media/g5.jpg',
    side: 'right',
  },
  {
    title: 'Week 16',
    note: 'Lifestyle habits lock in, with better adherence under real-world schedule pressure.',
    label: 'After',
    image: '/media/afterimg.jpg',
    side: 'left',
  },
  {
    title: 'Final Reveal',
    note: 'Complete body transformation built on coaching, consistency, and repeatable systems.',
    label: 'After',
    image: '/media/m3.jpg',
    side: 'right',
  },
];

export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    src: '/media/afterimg.jpg',
    title: 'Beast Mode Training',
    category: 'Training',
    caption: 'Explosive sessions with heavy focus on intent, technique, and pace.',
  },
  {
    id: 2,
    src: '/media/m3.jpg',
    title: 'Shredded Physique',
    category: 'Physique',
    caption: 'Lean conditioning work paired with controlled recovery windows.',
  },
  {
    id: 3,
    src: '/media/g2.jpg',
    title: 'Power Lifting',
    category: 'Strength',
    caption: 'Compound movement emphasis for stable, repeatable strength gain.',
  },
  {
    id: 4,
    src: '/media/g4.jpg',
    title: 'Muscle Definition',
    category: 'Physique',
    caption: 'Progress built from volume management and better nutritional compliance.',
  },
  {
    id: 5,
    src: '/media/g3.jpg',
    title: 'Cardio Session',
    category: 'Conditioning',
    caption: 'Conditioning blocks that improve work capacity without wrecking recovery.',
  },
  {
    id: 6,
    src: '/media/g5.jpg',
    title: 'Peak Condition',
    category: 'Results',
    caption: 'Final look after layered training cycles and targeted meal planning.',
  },
];
