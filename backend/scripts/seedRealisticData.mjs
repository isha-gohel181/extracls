import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://ishagohel181_db_user:Lu8Vdrx74fsEHL7n@cluster0.szci1qr.mongodb.net/extra_cls';

async function seed() {
  console.log('Connecting to MongoDB at:', MONGO_URI.replace(/:[^:@]+@/, ':***@'));
  await mongoose.connect(MONGO_URI, {
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,
  });
  console.log('Connected to MongoDB successfully!');

  const User = mongoose.model('User', new mongoose.Schema({}, { strict: false }));
  const Course = mongoose.model('Course', new mongoose.Schema({}, { strict: false }));
  const CourseCategory = mongoose.model('CourseCategory', new mongoose.Schema({}, { strict: false }));
  const Module = mongoose.model('Module', new mongoose.Schema({}, { strict: false }));
  const Lesson = mongoose.model('Lesson', new mongoose.Schema({}, { strict: false }));
  const News = mongoose.model('News', new mongoose.Schema({}, { strict: false }));
  const ForumThread = mongoose.model('ForumThread', new mongoose.Schema({}, { strict: false }));
  const ForumReply = mongoose.model('ForumReply', new mongoose.Schema({}, { strict: false }));

  // Find admin user for instructor / author reference
  let adminUser = await User.findOne({ role: 'admin' });
  if (!adminUser) {
    adminUser = await User.findOne({});
  }
  const adminId = adminUser ? adminUser._id : new mongoose.Types.ObjectId();

  let studentUser = await User.findOne({ role: 'student' });
  const studentId = studentUser ? studentUser._id : adminId;

  console.log('Using Admin ID:', adminId, 'and Student ID:', studentId);

  // 1. DELETE DUMMY COURSE AND DUMMY CATEGORIES
  console.log('Cleaning up old test course and dummy categories...');
  await Course.deleteMany({});
  await CourseCategory.deleteMany({});
  await Module.deleteMany({});
  await Lesson.deleteMany({});
  await News.deleteMany({});
  await ForumThread.deleteMany({});
  await ForumReply.deleteMany({});
  console.log('Old dummy records removed cleanly.');

  // 2. CREATE CATEGORIES
  console.log('Creating official categories...');
  const categoriesData = [
    {
      name: 'Early Reading & Phonics',
      slug: 'phonics-reading',
      status: 'active',
      isDeleted: false,
    },
    {
      name: 'Foundational Mathematics',
      slug: 'math-logic',
      status: 'active',
      isDeleted: false,
    },
    {
      name: 'Science & Nature Exploration',
      slug: 'science-nature',
      status: 'active',
      isDeleted: false,
    },
    {
      name: 'Creative Writing & Expression',
      slug: 'creative-writing',
      status: 'active',
      isDeleted: false,
    },
    {
      name: 'Coding & Digital Thinking',
      slug: 'coding-technology',
      status: 'active',
      isDeleted: false,
    },
  ];

  const createdCategories = await CourseCategory.insertMany(categoriesData);
  const catMap = {};
  for (const c of createdCategories) {
    catMap[c.slug] = c._id;
  }
  console.log('Categories ready:', Object.keys(catMap));

  // 3. SEED 5 REALISTIC COURSES
  console.log('Seeding 5 realistic courses with full landing sections and curriculum...');

  const coursesSeedData = [
    {
      title: 'Foundations of Early Phonics & Reading Mastery',
      subtitle: 'Joyful letter sounds, blending, sight words, and confident first readers.',
      slug: 'phonics-reading-mastery',
      description: 'Designed specifically for preschool and kindergarten learners (ages 4–7), this course transforms learning to read into a playful adventure. Children discover 42 core phonics sounds through catchy rhymes, multi-sensory activities, and guided decodable storybooks. Our certified early childhood specialists guide children from recognizing individual letter sounds to confidently sounding out full words and reading their very first storybooks with pride.',
      shortDescription: 'Master 42 core phonemic sounds, 3-letter word blending, and first 100 sight words with certified educators.',
      seoMetaDescription: 'Learn phonics and early reading for preschool and kindergarten with EXTRACLS. 42 letter sounds, blending, and storybooks.',
      thumbnail: 'uploads/course/phonics-reading.jpg',
      coverImage: 'uploads/course/phonics-reading.jpg',
      featuredImageBanner: 'uploads/course/phonics-reading.jpg',
      categoryId: catMap['phonics-reading'],
      level: ['beginner'],
      price: 1999,
      salePrice: 1499,
      currency: 'INR',
      duration: 1440,
      totalLessons: 16,
      instructorId: adminId,
      isPublished: true,
      popular: true,
      isFeatured: true,
      tags: ['Phonics', 'Early Reading', 'Preschool', 'Kindergarten', 'Literacy', 'Vocabulary'],
      prerequisites: 'No prior reading knowledge required. Suitable for children aged 4 to 7 years.',
      learningOutcomes: [
        'Identify and pronounce all 42 primary phonics letter sounds',
        'Blend consonant-vowel-consonant (CVC) words with speed and confidence',
        'Read and recognize the top 100 high-frequency sight words',
        'Read beginner decodable storybooks independently',
        'Develop positive reading habits and genuine love for books',
      ],
      requirements: ['Enthusiasm to explore stories', 'Parent or guardian guidance during practice activities'],
      targetAudience: ['Preschoolers & Kindergarteners (Ages 4-7)', 'Parents seeking strong early literacy foundations', 'Early readers needing phonetic confidence'],
      deliveryMode: 'Live Interactive',
      courseType: 'Live Interactive',
      certificateTitle: 'Certificate of Phonics Excellence',
      certificateSubtitle: 'Awarded for Early Reading Mastery',
      certificateOrganization: 'EXTRACLS',
      mentorName: 'Sunita Sharma, M.Ed.',
      mentorTitle: 'Senior Early Literacy Specialist & Montessori Educator',
      mentorDescription: 'Over 14 years of experience pioneering phonics and joyful reading frameworks across top primary academies.',
      mentorImage: 'uploads/course/phonics-reading.jpg',
      mentorAchievements: ['Trained 10,000+ early readers', 'Certified Jolly Phonics Trainer', 'Author of 12 Decodable Readers'],
      averageRating: 4.9,
      totalReviews: 128,
      enrolledStudentsCount: 420,
      landingPageSections: [
        {
          type: 'overview',
          order: 0,
          data: {
            show: true,
            title: 'Give Your Child the Gift of Confident Reading',
            subtitle: 'Multi-sensory phonics engineered for young minds',
            description: 'Reading is the master skill that unlocks every other subject. Our course moves step-by-step from individual letter sounds to word families, sight words, and independent story reading.',
            images: ['uploads/course/phonics-reading.jpg'],
          },
        },
        {
          type: 'comparison',
          order: 1,
          data: {
            show: true,
            title: 'Why EXTRACLS Phonics Beats Rote Flashcards',
            leftTitle: 'Traditional Flashcard Drills',
            rightTitle: 'EXTRACLS Multi-Sensory Phonics',
            leftPoints: [
              'Memorizing whole words leads to reading roadblocks later',
              'Repetitive drills cause child boredom and fatigue',
              'No systematic strategy to sound out unfamiliar words',
              'Reading feels like a chore or test',
            ],
            rightPoints: [
              'Systematic synthetic phonics that unlocks ANY English word',
              'Interactive songs, tactile sliders, and joyful games',
              'Teaches lifelong decoding and phonetic problem-solving',
              '98% of students read their first book independently in 8 weeks',
            ],
          },
        },
        {
          type: 'benefits',
          order: 2,
          data: {
            show: true,
            title: 'Key Developmental Milestones',
            points: [
              'Sharp auditory discrimination and correct English pronunciation',
              'Accelerated vocabulary and comprehension skills',
              'School-readiness and classroom speaking confidence',
              'Lifelong love for literature and self-expression',
            ],
          },
        },
        {
          type: 'framework',
          order: 3,
          data: {
            show: true,
            title: 'The 4-Stage Phonics Ascent',
            subtitle: 'Structured, playful, and measurable progression',
            description: 'Stage 1: Sound Discovery -> Stage 2: Blending Magic -> Stage 3: Sight Word Fluency -> Stage 4: Storybook Reading.',
          },
        },
        {
          type: 'solution',
          order: 4,
          data: {
            show: true,
            title: 'Everything Included in Your Enrollment',
            points: [
              '24 Live interactive small-group sessions with certified specialists',
              'Physical Phonics Activity Kit & flashcards shipped to your door',
              'Weekly parent progress reports & personalized feedback',
              'Lifetime access to our decodable digital reader library',
            ],
          },
        },
      ],
      faq: [
        {
          question: 'What if my child does not know the English alphabet yet?',
          answer: 'That is completely fine! We introduce sounds from scratch using multi-sensory songs, gestures, and visual cues. No prior reading knowledge is required.',
        },
        {
          question: 'What is the batch size for live classes?',
          answer: 'We maintain small, intimate batches of 6–8 children to ensure every young learner receives personalized educator attention and verbal reading time.',
        },
        {
          question: 'Do parents need to sit with the child?',
          answer: 'For 4 and 5 year olds, we suggest a parent be nearby for the first two sessions. After that, children become eager and engaged to participate independently!',
        },
        {
          question: 'Can we access recordings if we miss a class?',
          answer: 'Yes! All live sessions are recorded and uploaded to your student dashboard within 2 hours, along with printable practice sheets.',
        },
      ],
      modulesData: [
        {
          title: 'Module 1: Sound Explorers - Single Letter Phonemes',
          description: 'Introducing core vowel and consonant sounds through stories and songs.',
          order: 0,
          lessons: [
            { title: 'The S, A, T, P, I, N Sound Family', description: 'Auditory identification and hand gestures for the first 6 sounds.', type: 'video-lesson' },
            { title: 'C, K, E, H, R, M Sound Adventures', description: 'Recognizing sounds in everyday objects and words.', type: 'video-lesson' },
            { title: 'D, G, O, U, L, F, B Discoveries', description: 'Blending introductory sounds into first short words.', type: 'video-lesson' },
            { title: 'J, Z, W, V, Y, X Sound Safari', description: 'Completing the 26 alphabet letter sounds with precision.', type: 'video-lesson' },
          ],
        },
        {
          title: 'Module 2: The Blending Magic - CVC Word Families',
          description: 'Techniques for smoothly sliding sounds together into complete words.',
          order: 1,
          lessons: [
            { title: 'The -at, -an, -am Word Families', description: 'Reading cat, bat, mat, pan, fan with confidence.', type: 'video-lesson' },
            { title: 'The -et, -en, -ed Word Families', description: 'Exploring short "e" sounds through interactive sliders.', type: 'video-lesson' },
            { title: 'The -it, -in, -ip Word Families', description: 'Building sound pyramids and reading 3-letter words.', type: 'video-lesson' },
            { title: 'The -ot, -op, -ug, -un Word Families', description: 'Mastering short "o" and "u" sound transitions.', type: 'video-lesson' },
          ],
        },
        {
          title: 'Module 3: Sight Word Safari - First 50 High Frequency Words',
          description: 'Recognizing essential non-phonetic words on sight for reading flow.',
          order: 2,
          lessons: [
            { title: 'Top 10 Starter Sight Words (the, is, a, and, see)', description: 'Fun memory games and sentence strips.', type: 'video-lesson' },
            { title: 'Action Words & Pronouns (I, you, he, she, we, go)', description: 'Building short expressive sentences.', type: 'video-lesson' },
            { title: 'Direction & Place Words (in, on, at, up, down)', description: 'Interactive preposition games and reading maps.', type: 'video-lesson' },
            { title: 'Connecting Words (to, for, with, but, like)', description: 'Reading compound sentences in storybooks.', type: 'video-lesson' },
          ],
        },
        {
          title: 'Module 4: Storybook Pioneers - Guided Reading & Comprehension',
          description: 'Putting it all together to read first decodable storybooks independently.',
          order: 3,
          lessons: [
            { title: 'Storybook 1: The Cat on the Mat', description: 'Reading full sentences with expression and pacing.', type: 'video-lesson' },
            { title: 'Storybook 2: Sam and the Big Dog', description: 'Punctuation awareness (periods, question marks).', type: 'video-lesson' },
            { title: 'Storybook 3: The Sun and the Mud', description: 'Answering comprehension questions about story characters.', type: 'video-lesson' },
            { title: 'Final Reading Showcase & Graduation Ceremony', description: 'Each student reads their favorite story page aloud to the class.', type: 'video-lesson' },
          ],
        },
      ],
    },

    {
      title: 'Little Mathematicians: Visual Math & Logic Lab',
      subtitle: 'Number sense, mental math tricks, geometry patterns, and playful problem solving.',
      slug: 'visual-math-logic-lab',
      description: 'Built for children in Grades 1 to 3 (ages 5–8), Little Mathematicians turns math into a visual, tactile superpower. Rather than memorizing tables by rote, learners use visual bar models, spatial blocks, and mental number bonds to genuinely understand how numbers connect. Through playful real-world puzzles, kids develop lightning-fast mental addition, subtraction strategies, and a lifelong confidence in mathematics.',
      shortDescription: 'Build intuitive number sense, mental math speed, and spatial geometry with interactive visual models.',
      seoMetaDescription: 'Visual math and logic lab for primary school children. Mental math, geometry, and problem solving with EXTRACLS.',
      thumbnail: 'uploads/course/visual-math.jpg',
      coverImage: 'uploads/course/visual-math.jpg',
      featuredImageBanner: 'uploads/course/visual-math.jpg',
      categoryId: catMap['math-logic'],
      level: ['beginner', 'intermediate'],
      price: 2499,
      salePrice: 1899,
      currency: 'INR',
      duration: 1800,
      totalLessons: 12,
      instructorId: adminId,
      isPublished: true,
      popular: true,
      isFeatured: true,
      tags: ['Mathematics', 'Mental Math', 'Logic', 'Primary School', 'Geometry', 'Problem Solving'],
      prerequisites: 'Basic counting up to 20. Ideal for children aged 5 to 8.',
      learningOutcomes: [
        'Master mental addition and subtraction strategies without counting on fingers',
        'Visualize 2D and 3D geometric shapes and spatial transformations',
        'Understand multiplication through arrays, equal grouping, and patterns',
        'Solve real-world word problems using intuitive Singapore-style bar models',
        'Build speed, analytical reasoning, and love for mathematical puzzles',
      ],
      requirements: ['Enthusiasm for number puzzles', 'Ruler and pencil for worksheet activities'],
      targetAudience: ['Primary students in Grades 1-3 (Ages 5-8)', 'Children who find traditional math abstract or intimidating', 'Young learners aiming for Math Olympiad confidence'],
      deliveryMode: 'Live & Recorded',
      courseType: 'Live & Recorded',
      certificateTitle: 'Certificate of Mathematical Logic',
      certificateSubtitle: 'Awarded for Visual Mathematics Mastery',
      certificateOrganization: 'EXTRACLS',
      mentorName: 'Rohan Verma, B.Tech & Math Educator',
      mentorTitle: 'Lead STEM Curriculum Architect & Olympiad Mentor',
      mentorDescription: 'Passionate math educator who has mentored over 8,000 primary students using Singapore and Vedic visual math frameworks.',
      mentorImage: 'uploads/course/visual-math.jpg',
      mentorAchievements: ['State Math Olympiad Gold Medalist', 'Developed Visual Number Bond Pedagogy', 'Former Primary Head of Mathematics'],
      averageRating: 4.9,
      totalReviews: 94,
      enrolledStudentsCount: 310,
      landingPageSections: [
        {
          type: 'overview',
          order: 0,
          data: {
            show: true,
            title: 'Help Your Child Think Like a Mathematician',
            subtitle: 'Say goodbye to finger counting and rote memorization',
            description: 'Math is a language of patterns and relationships. Our visual curriculum empowers children to see numbers in their minds and solve complex puzzles with effortless speed.',
            images: ['uploads/course/visual-math.jpg'],
          },
        },
        {
          type: 'comparison',
          order: 1,
          data: {
            show: true,
            title: 'Visual Conceptual Math vs Rote Drills',
            leftTitle: 'Traditional Rote Schooling',
            rightTitle: 'EXTRACLS Visual Math Lab',
            leftPoints: [
              'Blind formula memorization without understanding why',
              'Reliance on slow finger counting and tally marks',
              'Word problems feel confusing and overwhelming',
              'Math anxiety and loss of interest by Grade 3',
            ],
            rightPoints: [
              'Concrete -> Pictorial -> Abstract methodology',
              'Lightning mental math using ten-frames and number bonds',
              'Bar-model diagrams turn any word problem into clear pictures',
              'Math feels like a rewarding game, building unshakable confidence',
            ],
          },
        },
        {
          type: 'benefits',
          order: 2,
          data: {
            show: true,
            title: 'Lifelong Thinking Advantages',
            points: [
              'Lightning calculation speed and mental agility',
              'Strong spatial reasoning for science and future coding',
              'Critical problem-solving applied to real life situations',
              'Top performance in school tests and competitive math exams',
            ],
          },
        },
        {
          type: 'framework',
          order: 3,
          data: {
            show: true,
            title: 'Our 4-Pillar Math Framework',
            subtitle: 'Visualize -> Reason -> Strategize -> Solve',
            description: 'We train children to decompose numbers, spot visual symmetry, and select the fastest mental strategy.',
          },
        },
        {
          type: 'solution',
          order: 4,
          data: {
            show: true,
            title: 'What Parents and Students Receive',
            points: [
              '30 Live interactive sessions with top math mentors',
              'Printable visual math workbooks & physical tangram puzzle kit',
              'Weekly gamified math quests & digital speed challenges',
              'Quarterly cognitive assessment report for parents',
            ],
          },
        },
      ],
      faq: [
        {
          question: 'How does this help my child stop counting on fingers?',
          answer: 'We introduce the "Make Ten" and "Number Bond" visual models. By visualizing how numbers pair up to make 10, children calculate instantly without needing their hands.',
        },
        {
          question: 'Is this course suitable for CBSE, ICSE, and Cambridge curricula?',
          answer: 'Yes! Our visual foundations align directly with international early numeracy standards and strengthen classroom performance across all boards.',
        },
      ],
      modulesData: [
        {
          title: 'Module 1: Number Sense & Spatial Fluency',
          description: 'Understanding place value, ten-frames, and number relationships.',
          order: 0,
          lessons: [
            { title: 'The Secret Life of Numbers 1 to 100', description: 'Skip counting by 2s, 5s, 10s and spotting number grid patterns.', type: 'video-lesson' },
            { title: 'Mastering the Ten-Frame Matrix', description: 'Visualizing pairs that make 10 instantly.', type: 'video-lesson' },
            { title: 'Greater, Lesser, and the Hungry Crocodile', description: 'Comparing quantities and understanding inequality symbols.', type: 'video-lesson' },
          ],
        },
        {
          title: 'Module 2: Mental Math Superpowers (Addition & Subtraction)',
          description: 'Techniques for solving double-digit addition and subtraction in the head.',
          order: 1,
          lessons: [
            { title: 'The Jump Strategy on the Number Line', description: 'Adding tens and ones smoothly in sequence.', type: 'video-lesson' },
            { title: 'Compensation Method & Friendly Numbers', description: 'Turning 29 + 15 into 30 + 14 in a flash.', type: 'video-lesson' },
            { title: 'Borrowing Made Easy: Visual Regrouping', description: 'Using base-ten blocks to make two-digit subtraction intuitive.', type: 'video-lesson' },
          ],
        },
        {
          title: 'Module 3: Shape Detectives: 2D/3D Geometry & Measurement',
          description: 'Exploring geometry, perimeter, symmetry, and clock reading.',
          order: 2,
          lessons: [
            { title: '2D Shapes and Tangram Puzzles', description: 'Sides, vertices, and creative composite shapes.', type: 'video-lesson' },
            { title: '3D Solids in Everyday Life', description: 'Cubes, spheres, cylinders, and their nets.', type: 'video-lesson' },
            { title: 'Telling Time on the Analog Clock', description: 'Hours, half-hours, quarter-hours, and elapsed time.', type: 'video-lesson' },
          ],
        },
        {
          title: 'Module 4: Logic Puzzles & Story Problem Solving',
          description: 'Transforming word problems into clear visual bar models.',
          order: 3,
          lessons: [
            { title: 'Decoding Word Problems into Drawings', description: 'Extracting key numbers and drawing the question.', type: 'video-lesson' },
            { title: 'Singapore Bar Models in Action', description: 'Part-whole and comparison bar diagrams.', type: 'video-lesson' },
            { title: 'Junior Math Olympiad Challenge Day', description: 'Collaborative fun problem solving in virtual teams.', type: 'video-lesson' },
          ],
        },
      ],
    },

    {
      title: 'Young Explorers: Junior Science & Nature Lab',
      subtitle: 'Everyday experiments, solar system marvels, plant biology, and the wonder of nature.',
      slug: 'junior-science-nature-lab',
      description: 'Ignite your child’s innate scientific curiosity! Young Explorers (ages 6–10) transforms everyday kitchen ingredients and natural wonders into thrilling hands-on experiments. From understanding gravity and magnetism to exploring volcanic chemical reactions, microscope biology, and the planets of the solar system, children learn the scientific method by touching, observing, and discovering firsthand.',
      shortDescription: '15+ safe home experiments, solar system astronomy, and living nature explorations for young scientists.',
      seoMetaDescription: 'Junior science and nature experiments course for primary students. Hands-on STEM discovery with EXTRACLS.',
      thumbnail: 'uploads/course/junior-science.jpg',
      coverImage: 'uploads/course/junior-science.jpg',
      featuredImageBanner: 'uploads/course/junior-science.jpg',
      categoryId: catMap['science-nature'],
      level: ['beginner'],
      price: 2199,
      salePrice: 1699,
      currency: 'INR',
      duration: 1200,
      totalLessons: 12,
      instructorId: adminId,
      isPublished: true,
      popular: true,
      isFeatured: true,
      tags: ['Science', 'STEM', 'Experiments', 'Nature', 'Astronomy', 'Biology', 'Curiosity'],
      prerequisites: 'Natural curiosity about how the world works. Suitable for ages 6 to 10.',
      learningOutcomes: [
        'Execute 15+ safe, thrilling hands-on experiments using common household materials',
        'Understand the fundamentals of forces, magnetism, buoyancy, and state changes',
        'Map the planets of the solar system, moon phases, and constellation patterns',
        'Learn plant biology through seed germination and leaf vein analysis',
        'Formulate scientific hypotheses and maintain an organized Junior Science Lab Notebook',
      ],
      requirements: ['Simple household materials (baking soda, vinegar, food coloring, paper towels, magnets)'],
      targetAudience: ['Curious children aged 6 to 10', 'Primary school students who love asking "Why?"', 'Parents seeking productive, screen-positive STEM activities'],
      deliveryMode: 'Live Interactive',
      courseType: 'Live Interactive',
      certificateTitle: 'Certificate of Junior Science Discovery',
      certificateSubtitle: 'Awarded for Scientific Inquiry and Experimentation',
      certificateOrganization: 'EXTRACLS',
      mentorName: 'Dr. Ananya Iyer, Ph.D.',
      mentorTitle: 'Science Communicator & Experiential Learning Specialist',
      mentorDescription: 'Former scientist and passionate educator with 12+ years designing experimental science kits for elementary schools.',
      mentorImage: 'uploads/course/junior-science.jpg',
      mentorAchievements: ['National Science Educator Award', 'Creator of 100+ Safe Kitchen Science Modules', 'Author of "Curious Minds" Science Series'],
      averageRating: 4.9,
      totalReviews: 87,
      enrolledStudentsCount: 260,
      landingPageSections: [
        {
          type: 'overview',
          order: 0,
          data: {
            show: true,
            title: 'Turn Your Kitchen into a Wonder Lab',
            subtitle: 'Children learn science by doing, questioning, and experimenting',
            description: 'Forget dry textbooks with static diagrams. In Young Explorers, children observe bubbling reactions, build water vortices, and map the stars with their own hands.',
            images: ['uploads/course/junior-science.jpg'],
          },
        },
        {
          type: 'comparison',
          order: 1,
          data: {
            show: true,
            title: 'Experiential STEM vs Textbook Rote',
            leftTitle: 'Traditional Textbook Reading',
            rightTitle: 'EXTRACLS Hands-On Discovery',
            leftPoints: [
              'Passive reading of definitions without witnessing real phenomena',
              'Little opportunity to touch, measure, or experiment',
              'Science feels like memorizing facts for an exam',
              'Curiosity fades as lessons become abstract',
            ],
            rightPoints: [
              'Every lesson begins with an exciting live experiment',
              'Children use their own hands to test hypotheses and observe outcomes',
              'Fosters deep scientific intuition and critical questioning',
              'Ignites lifelong passion for engineering and discovery',
            ],
          },
        },
        {
          type: 'benefits',
          order: 2,
          data: {
            show: true,
            title: 'What Young Scientists Develop',
            points: [
              'Hypothesis formulation and keen observational accuracy',
              'Cause-and-effect reasoning and scientific deduction',
              'Hands-on laboratory safety and methodology awareness',
              'Deep appreciation for environmental conservation and nature',
            ],
          },
        },
        {
          type: 'framework',
          order: 3,
          data: {
            show: true,
            title: 'The 4-Step Discovery Loop',
            subtitle: 'Question -> Predict -> Experiment -> Conclude',
            description: 'Children learn to ask testable questions, make predictions, conduct controlled experiments, and share their conclusions with peers.',
          },
        },
        {
          type: 'solution',
          order: 4,
          data: {
            show: true,
            title: 'Full Program Inclusions',
            points: [
              '20 Live guided experiment sessions with Dr. Ananya',
              'Printable Junior Scientist Lab Manual & Observation Logs',
              'Complete grocery checklist of safe household items needed',
              'Official Certificate of Junior Science Discovery upon completion',
            ],
          },
        },
      ],
      faq: [
        {
          question: 'Are the experiments safe for children to perform at home?',
          answer: '100% safe! All experiments utilize everyday food-grade kitchen ingredients like water, oil, vinegar, baking soda, and salt. No harsh chemicals or open flames are ever used.',
        },
        {
          question: 'Will we know what materials are needed in advance?',
          answer: 'Yes! A complete, simple weekly material list is provided at the start of each week, with common items available in any grocery store.',
        },
      ],
      modulesData: [
        {
          title: 'Module 1: The Magic of Physics & Forces',
          description: 'Exploring gravity, surface tension, density, and air pressure.',
          order: 0,
          lessons: [
            { title: 'The Density Tower: Layering Liquid Marvels', description: 'Why does honey sink while oil floats? Building a 5-layer liquid rainbow.', type: 'video-lesson' },
            { title: 'Surface Tension & the Walking Water Rainbow', description: 'Capillary action in paper towels and walking water colors.', type: 'video-lesson' },
            { title: 'Magnets & Invisible Force Fields', description: 'Poles, attraction, repulsion, and building a mini magnetic compass.', type: 'video-lesson' },
          ],
        },
        {
          title: 'Module 2: Chemistry Explorations in the Kitchen',
          description: 'Acids, bases, bubbles, and physical vs. chemical changes.',
          order: 1,
          lessons: [
            { title: 'The Fizzy Lemon Volcano', description: 'Acid-base reactions and carbon dioxide gas production.', type: 'video-lesson' },
            { title: 'Dancing Raisins & Gas Pressure', description: 'Buoyancy and how gas bubbles lift objects in soda.', type: 'video-lesson' },
            { title: 'Non-Newtonian Fluid: The Mystery of Oobleck', description: 'Is it a solid or liquid? Exploring shear-thickening fluids.', type: 'video-lesson' },
          ],
        },
        {
          title: 'Module 3: Cosmic Wonders - The Solar System',
          description: 'Planets, orbital mechanics, the moon, and daylight science.',
          order: 2,
          lessons: [
            { title: 'Tour of the 8 Planets in Our Solar System', description: 'Rocky inner planets vs gas giants and their amazing scales.', type: 'video-lesson' },
            { title: 'The Phases of the Moon (with Oreo Cookies!)', description: 'New moon to full moon: understanding shadows and orbits.', type: 'video-lesson' },
            { title: 'Day and Night: Earth’s Grand Rotation', description: 'Building a sundial and tracking shadow angles.', type: 'video-lesson' },
          ],
        },
        {
          title: 'Module 4: The Living World & Ecology',
          description: 'Plants, germination, ecosystems, and animal adaptations.',
          order: 3,
          lessons: [
            { title: 'Seed Germination in a Transparent Glove', description: 'Watching roots sprout down and shoots grow toward sunlight.', type: 'video-lesson' },
            { title: 'How Plants Drink: The Celery Capillary Test', description: 'Tracing dyed water through xylem tubes in real time.', type: 'video-lesson' },
            { title: 'Junior Science Fair Showcase', description: 'Students demonstrate their favorite experiment live to friends and family.', type: 'video-lesson' },
          ],
        },
      ],
    },

    {
      title: 'Creative Thinking, Storycraft & Public Speaking',
      subtitle: 'Character building, descriptive writing, vocabulary power, and public speaking confidence.',
      slug: 'storycraft-public-speaking',
      description: 'Crafted for primary school learners (ages 7–11), Storycraft transforms young writers into confident authors and expressive speakers. Through interactive worldbuilding, character design, and structured plot mountain frameworks, children learn to unleash their imagination onto paper. Students also practice vocal expression, posture, and speech delivery in safe, encouraging small groups.',
      shortDescription: 'Master narrative structure, vivid sensory vocabulary, and public speaking confidence for ages 7–11.',
      seoMetaDescription: 'Creative writing and public speaking course for children. Storycraft, vocabulary, and debate with EXTRACLS.',
      thumbnail: 'uploads/course/creative-writing.jpg',
      coverImage: 'uploads/course/creative-writing.jpg',
      featuredImageBanner: 'uploads/course/creative-writing.jpg',
      categoryId: catMap['creative-writing'],
      level: ['intermediate'],
      price: 2799,
      salePrice: 2199,
      currency: 'INR',
      duration: 1680,
      totalLessons: 12,
      instructorId: adminId,
      isPublished: true,
      popular: true,
      isFeatured: true,
      tags: ['Creative Writing', 'Storytelling', 'Public Speaking', 'Vocabulary', 'Expression', 'English'],
      prerequisites: 'Basic sentence writing ability. Ideal for children aged 7 to 11.',
      learningOutcomes: [
        'Structure complete narratives with clear exposition, rising action, climax, and resolution',
        'Create three-dimensional characters with motivations, flaws, and distinct voices',
        'Use sensory language, metaphors, and show-don’t-tell descriptions',
        'Speak in front of peers with clear projection, eye contact, and relaxed posture',
        'Write and publish a polished short story anthology booklet',
      ],
      requirements: ['Lined notebook, colorful pens, and an active imagination'],
      targetAudience: ['Children in Grades 3-5 (Ages 7-11)', 'Young thinkers who love daydreaming or telling stories', 'Students looking to overcome shyness and develop public speaking poise'],
      deliveryMode: 'Live Interactive',
      courseType: 'Live Interactive',
      certificateTitle: 'Certificate of Storycraft & Oratory',
      certificateSubtitle: 'Awarded for Creative Writing and Expressive Oratory',
      certificateOrganization: 'EXTRACLS',
      mentorName: 'Meera Nambiar',
      mentorTitle: "Children's Author & Youth Debate Coach",
      mentorDescription: 'Published author of 3 award-winning children’s chapter books and head mentor for national junior debate leagues.',
      mentorImage: 'uploads/course/creative-writing.jpg',
      mentorAchievements: ['Published Author with Penguin Young Readers', 'Trained 4,000+ Junior Writers', 'Featured Speaker on Creative Pedagogy'],
      averageRating: 4.9,
      totalReviews: 76,
      enrolledStudentsCount: 220,
      landingPageSections: [
        {
          type: 'overview',
          order: 0,
          data: {
            show: true,
            title: 'Help Your Child Find Their Unique Voice',
            subtitle: 'From hesitant writers to passionate, confident storytellers',
            description: 'Every child has brilliant stories locked inside their imagination. We provide the structured narrative tools, vocabulary banks, and supportive stage they need to shine.',
            images: ['uploads/course/creative-writing.jpg'],
          },
        },
        {
          type: 'comparison',
          order: 1,
          data: {
            show: true,
            title: 'Creative Authorship vs Formulaic School Essays',
            leftTitle: 'Traditional Grammar Drills',
            rightTitle: 'EXTRACLS Storycraft Lab',
            leftPoints: [
              'Rigid 5-paragraph templates that stifle original thinking',
              'Heavy focus on spelling errors over storytelling creativity',
              'Zero practice in vocal delivery or public presentation',
              'Children view writing as an exhausting school chore',
            ],
            rightPoints: [
              'Engaging plot mountain and worldbuilding frameworks used by real authors',
              'Focus on "Show, Don\'t Tell" and sensory imagery',
              'Weekly speech practice builds effortless stage confidence',
              'Children proudly write and illustrate their own storybooks',
            ],
          },
        },
        {
          type: 'benefits',
          order: 2,
          data: {
            show: true,
            title: 'Lifelong Expressive Skills',
            points: [
              'Rich vocabulary and sophisticated sentence variety',
              'Deep empathy through inhabiting different character perspectives',
              'Poised public speaking and articulate opinion delivery',
              'Confidence to express personal thoughts clearly and persuasively',
            ],
          },
        },
        {
          type: 'framework',
          order: 3,
          data: {
            show: true,
            title: 'The 4-Step Narrative Framework',
            subtitle: 'Character -> Setting -> Conflict -> Resolution',
            description: 'Students master the exact structural blueprint employed by top children’s novelists and screenwriters.',
          },
        },
        {
          type: 'solution',
          order: 4,
          data: {
            show: true,
            title: 'Comprehensive Course Inclusions',
            points: [
              '28 Live small-group creative workshops with Author Meera',
              'Personalized line-by-line editorial feedback on every student draft',
              'Printable Storycraft Workbook with character design sheets',
              'Digital publication of student stories in the EXTRACLS Anthology',
            ],
          },
        },
      ],
      faq: [
        {
          question: 'What if my child feels shy speaking in front of others?',
          answer: 'Our groups are deliberately small (6–8 students) and our mentors create an exceptionally warm, celebratory environment. We start with 30-second low-stakes shares, gradually building comfort and poise.',
        },
        {
          question: 'Does this course help with school English exams?',
          answer: 'Significantly! Children who master narrative structure, descriptive vocabulary, and clear paragraph transitions consistently score in the top tier of school composition tests.',
        },
      ],
      modulesData: [
        {
          title: 'Module 1: Character Crafting & Worldbuilding',
          description: 'Inventing unforgettable protagonists, villains, and magical realms.',
          order: 0,
          lessons: [
            { title: 'The Character Questionnaire: Wants, Fears & Quirks', description: 'Giving characters authentic depth and motivation.', type: 'video-lesson' },
            { title: 'Painting Settings with the 5 Senses', description: 'Describing sight, sound, smell, taste, and touch in fantasy worlds.', type: 'video-lesson' },
            { title: 'Sidekicks, Mentors, and Rivals', description: 'Creating dynamic relationships between story characters.', type: 'video-lesson' },
          ],
        },
        {
          title: 'Module 2: Plot Mountain & Suspense Engineering',
          description: 'Building tension, cliffhangers, and satisfying climaxes.',
          order: 1,
          lessons: [
            { title: 'The Inciting Incident: When the World Changes', description: 'Starting stories with an irresistible hook.', type: 'video-lesson' },
            { title: 'Rising Action & Escalating Obstacles', description: 'Throwing creative challenges at your hero.', type: 'video-lesson' },
            { title: 'The High-Stakes Climax & Resolution', description: 'Resolving character arcs and delivering poetic justice.', type: 'video-lesson' },
          ],
        },
        {
          title: 'Module 3: Powerful Vocabulary & Literary Devices',
          description: 'Metaphors, similes, onomatopoeia, and show-don’t-tell.',
          order: 2,
          lessons: [
            { title: 'Banish the Boring Words: Synonyms with Punch', description: 'Replacing "nice", "big", and "bad" with vivid adjectives.', type: 'video-lesson' },
            { title: 'Show, Don’t Tell in Action', description: 'Showing fear through trembling hands rather than saying "he was scared".', type: 'video-lesson' },
            { title: 'Metaphors and Sparkling Similes', description: 'Connecting unexpected ideas to create memorable imagery.', type: 'video-lesson' },
          ],
        },
        {
          title: 'Module 4: Oratory Poise & The Authors Showcase',
          description: 'Voice modulation, eye contact, and live story reading.',
          order: 3,
          lessons: [
            { title: 'Vocal Modulation: Pitch, Pace, and Dramatic Pauses', description: 'Using your voice like an instrument to grip an audience.', type: 'video-lesson' },
            { title: 'Body Language & Overcoming Stage Jitters', description: 'Confident posture, smiling eye contact, and calm breathing.', type: 'video-lesson' },
            { title: 'The Grand EXTRACLS Authors Showcase', description: 'Students present their published stories live to parents and peers.', type: 'video-lesson' },
          ],
        },
      ],
    },

    {
      title: 'Curious Coders: Scratch & Visual Logic for Kids',
      subtitle: 'Build animations, interactive games, and logic flowcharts using MIT Scratch.',
      slug: 'scratch-coding-visual-logic',
      description: 'Prepare your child for the future by turning screen time into creative engineering time! Designed for kids aged 7 to 11, Curious Coders introduces computational thinking through MIT Scratch 3.0. Young creators learn fundamental programming concepts—loops, events, variables, and boolean conditions—while building 5 exciting, playable video games, interactive animated stories, and musical synthesizers.',
      shortDescription: 'Build 5 original playable games, animations, and interactive stories with block-based MIT Scratch.',
      seoMetaDescription: 'Scratch coding and visual logic course for kids ages 7-11. Learn game design and algorithms with EXTRACLS.',
      thumbnail: 'uploads/course/kids-coding.jpg',
      coverImage: 'uploads/course/kids-coding.jpg',
      featuredImageBanner: 'uploads/course/kids-coding.jpg',
      categoryId: catMap['coding-technology'],
      level: ['beginner'],
      price: 2999,
      salePrice: 2399,
      currency: 'INR',
      duration: 1440,
      totalLessons: 12,
      instructorId: adminId,
      isPublished: true,
      popular: true,
      isFeatured: true,
      tags: ['Coding', 'Scratch', 'Logic', 'STEM', 'Game Design', 'Creativity', 'Technology'],
      prerequisites: 'Comfortable with basic keyboard and mouse navigation on a computer.',
      learningOutcomes: [
        'Understand foundational programming concepts: events, loops, variables, and logic branching',
        'Design, code, and publish 5 original interactive video games in Scratch',
        'Program custom sound effects, keyboard controls, and collision detection physics',
        'Deconstruct complex logic problems into step-by-step sequential algorithms',
        'Transition from being a passive consumer of games to an empowered digital creator',
      ],
      requirements: ['Laptop or desktop computer (Windows, Mac, or Chromebook) with internet connection'],
      targetAudience: ['Primary students aged 7 to 11', 'Kids who love playing video games and want to learn how to make them', 'Parents seeking productive, highly cognitive computer activities'],
      deliveryMode: 'Live Interactive',
      courseType: 'Live Interactive',
      certificateTitle: 'Certificate of Junior Coding Excellence',
      certificateSubtitle: 'Awarded for Computational Thinking and Game Design',
      certificateOrganization: 'EXTRACLS',
      mentorName: 'Vikramaditya Sen',
      mentorTitle: 'Ex-Robotics Engineer & K-12 Computer Science Mentor',
      mentorDescription: 'Former software engineer turned passionate STEM mentor who has guided over 5,000 young coders across India and abroad.',
      mentorImage: 'uploads/course/kids-coding.jpg',
      mentorAchievements: ['MIT Scratch Certified Educator', 'Coached Winning Team at National Robotics Olympiad', '10+ Years K-12 Tech Education'],
      averageRating: 4.9,
      totalReviews: 112,
      enrolledStudentsCount: 380,
      landingPageSections: [
        {
          type: 'overview',
          order: 0,
          data: {
            show: true,
            title: 'Turn Screen Time into Creative Superpowers',
            subtitle: 'Empower your child to build games instead of just playing them',
            description: 'Coding is the new literacy of the 21st century. Through colorful, snap-together visual logic blocks, children build genuine problem-solving grit and digital confidence.',
            images: ['uploads/course/kids-coding.jpg'],
          },
        },
        {
          type: 'comparison',
          order: 1,
          data: {
            show: true,
            title: 'Creative Computational Thinking vs Passive Screen Time',
            leftTitle: 'Passive Gaming & Video Watching',
            rightTitle: 'EXTRACLS Game Design Lab',
            leftPoints: [
              'Hours spent consuming content without active cognitive engagement',
              'Zero understanding of how software works under the hood',
              'Frustration when apps glitch or behave unpredictably',
              'Missed opportunity during peak cognitive growth years',
            ],
            rightPoints: [
              'Active architectural design: planning sprites, rules, and scoring',
              'Deep mastery of sequential logic, algorithms, and debugging',
              'Pride in sharing playable games with family and friends',
              'Foundational preparation for future Python, AI, and robotics learning',
            ],
          },
        },
        {
          type: 'benefits',
          order: 2,
          data: {
            show: true,
            title: 'Critical Cognitive Benefits',
            points: [
              'Systematic problem decomposition and algorithmic thinking',
              'Debugging resilience: learning that errors are puzzles to solve, not failures',
              'Spatial coordinate mathematics (X-axis, Y-axis, angles, velocities)',
              'Unbounded creative confidence in digital medium',
            ],
          },
        },
        {
          type: 'framework',
          order: 3,
          data: {
            show: true,
            title: 'Our 4-Stage Coding Path',
            subtitle: 'Concept -> Pseudocode -> Block Assembly -> Playtest',
            description: 'Children learn to break down a game mechanic into simple logical steps, assemble the blocks, and test and debug their creation.',
          },
        },
        {
          type: 'solution',
          order: 4,
          data: {
            show: true,
            title: 'Complete Course Inclusions',
            points: [
              '24 Live hands-on coding sessions with Engineer Vikramaditya',
              'Step-by-step game design sheets and starter asset packs',
              'Private student gallery to share and play classmates’ games',
              'Official Certificate of Junior Coding Excellence',
            ],
          },
        },
      ],
      faq: [
        {
          question: 'Does my child need to know typing or text coding?',
          answer: 'Not at all! MIT Scratch uses intuitive visual block code that snaps together like digital LEGO bricks. It eliminates syntax typos so children focus entirely on logic and creativity.',
        },
        {
          question: 'What device is required for the class?',
          answer: 'A laptop, desktop computer, or Chromebook with a keyboard and mouse. Scratch runs smoothly in any modern web browser like Google Chrome or Firefox.',
        },
      ],
      modulesData: [
        {
          title: 'Module 1: The Scratch Studio & Sprite Animation',
          description: 'Getting familiar with the Scratch interface, coordinates, and events.',
          order: 0,
          lessons: [
            { title: 'Meeting the Scratch Cat: X & Y Coordinate Stage', description: 'Moving sprites across the screen with arrow keys.', type: 'video-lesson' },
            { title: 'Costume Swapping & Walking Animations', description: 'Creating smooth walking and jumping cycles using loops.', type: 'video-lesson' },
            { title: 'Interactive Musical Instrument Simulator', description: 'Triggering piano notes and drum beats on key presses.', type: 'video-lesson' },
          ],
        },
        {
          title: 'Module 2: Game Mechanics - Collision & Variables',
          description: 'Building our first full arcade game: Catch the Falling Apples.',
          order: 1,
          lessons: [
            { title: 'Creating Gravity and Random Item Spawns', description: 'Using pick-random blocks to drop items from the sky.', type: 'video-lesson' },
            { title: 'Sensing Collisions and Adding a Scoreboard', description: 'Programming hitboxes and integer variables.', type: 'video-lesson' },
            { title: 'Game Over Conditions and Victory Fanfares', description: 'Adding countdown timers and win/loss broadcast screens.', type: 'video-lesson' },
          ],
        },
        {
          title: 'Module 3: Maze Runners & Platformer Physics',
          description: 'Wall collision detection, scrolling backgrounds, and collectibles.',
          order: 2,
          lessons: [
            { title: 'Designing the Labyrinth: Color Sensing Walls', description: 'Preventing the player from walking through maze boundaries.', type: 'video-lesson' },
            { title: 'Coding Patrolling Enemies and Danger Zones', description: 'Automating enemy glide paths with repeat loops.', type: 'video-lesson' },
            { title: 'Jumping Mechanics and Simple Platformer Gravity', description: 'Simulating realistic velocity and floor landings.', type: 'video-lesson' },
          ],
        },
        {
          title: 'Module 4: Space Invaders Arcade & Final Showcase',
          description: 'Building a classic space arcade blaster and presenting final projects.',
          order: 3,
          lessons: [
            { title: 'Cloning Mechanics: Multiplying Laser Blasts', description: 'Using sprite cloning to fire multiple projectiles.', type: 'video-lesson' },
            { title: 'Wave Boss Battle & Health Bars', description: 'Multi-hit boss logic and visual health indicators.', type: 'video-lesson' },
            { title: 'Game Release Party & Class Arcade Day', description: 'Every student publishes their game to the class studio and plays each other’s creations.', type: 'video-lesson' },
          ],
        },
      ],
    },
  ];

  for (const cData of coursesSeedData) {
    const { modulesData, ...courseFields } = cData;

    // Generate course ID in advance so modules and lessons can reference it
    const courseId = new mongoose.Types.ObjectId();
    const moduleIds = [];
    let lessonTotalCount = 0;

    for (const mData of modulesData) {
      const { lessons, ...moduleFields } = mData;
      const moduleId = new mongoose.Types.ObjectId();
      const lessonIds = [];

      const lessonDocs = lessons.map(l => {
        const lid = new mongoose.Types.ObjectId();
        lessonIds.push(lid);
        lessonTotalCount++;
        return {
          _id: lid,
          ...l,
          section: courseId,
          language: 'English',
          accessibility: 'paid',
        };
      });

      await Lesson.insertMany(lessonDocs);

      await Module.create({
        _id: moduleId,
        ...moduleFields,
        courseId,
        lessons: lessonIds,
        isPublished: true,
      });

      moduleIds.push(moduleId);
    }

    await Course.create({
      _id: courseId,
      ...courseFields,
      modules: moduleIds,
      totalLessons: lessonTotalCount,
    });

    console.log(`Created course: ${courseFields.title} with ${moduleIds.length} modules & ${lessonTotalCount} lessons.`);
  }

  // 4. SEED 6 REALISTIC NEWS ARTICLES
  console.log('Seeding 6 realistic educational news articles with insertMany...');
  const newsSeedData = [
    {
      title: 'How Play-Based Learning Builds Stronger Neural Pathways in Early Childhood',
      slug: 'play-based-learning-neural-pathways',
      summary: 'New developmental research confirms that playful exploration in early years fosters robust executive function, emotional regulation, and spatial memory far more effectively than rote repetition.',
      content: '<p>Early childhood development specialists emphasize that children discover foundational scientific and mathematical concepts most rapidly when play is structured around curiosity and hands-on discovery. In interactive learning environments, young brains release dopamine during problem solving, cementing neural pathways associated with long-term retention.</p>',
      categories: ['EARLY LEARNING'],
      category: 'EARLY LEARNING',
      imageUrl: 'uploads/news/play-based-learning.jpg',
      coverImage: 'uploads/news/play-based-learning.jpg',
      publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      author: 'Dr. Neha Kapoor (Pediatric Cognitive Specialist)',
      status: 'active',
      url: 'https://extracls.in/news/play-based-learning-neural-pathways',
      stats: { views: 14200, likes: 920 },
      isFeatured: true,
      topNews: true,
    },
    {
      title: 'The Power of Daily Phonics: How 15 Minutes a Day Unlocks Lifelong Reading Confidence',
      slug: 'daily-phonics-reading-confidence',
      summary: 'Educators reveal why synthetic phonics—decoding letter sounds rather than memorizing entire word shapes—gives primary school children the key to read any unfamiliar word independently.',
      content: '<p>Consistent, low-stress daily reading routines make a dramatic difference in a child\'s literacy journey. Just 15 minutes of guided phonics activities can build lasting reading fluency, eliminating the anxiety of facing unfamiliar text in school exams.</p>',
      categories: ['LITERACY & READING'],
      category: 'LITERACY & READING',
      imageUrl: 'uploads/news/phonics-confidence.jpg',
      coverImage: 'uploads/news/phonics-confidence.jpg',
      publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      author: 'Sunita Sharma, M.Ed.',
      status: 'active',
      url: 'https://extracls.in/news/daily-phonics-reading-confidence',
      stats: { views: 18600, likes: 1240 },
      topNews: true,
    },
    {
      title: 'Making Math Visual: Why Manipulatives and Geometry Puzzles Beat Rote Tables',
      slug: 'visual-math-manipulatives-versus-rote',
      summary: 'Why counting on fingers can hold children back, and how visual number bonds, ten-frames, and tangram puzzles develop deep mathematical intuition in Grades 1 to 3.',
      content: '<p>Mathematics is fundamentally spatial and relational. When children interact with physical or visual representations of numbers, they grasp addition and place values intuitively, transitioning smoothly to mental calculations without anxiety.</p>',
      categories: ['STEM & MATH'],
      category: 'STEM & MATH',
      imageUrl: 'uploads/news/visual-math-puzzles.jpg',
      coverImage: 'uploads/news/visual-math-puzzles.jpg',
      publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      author: 'Rohan Verma (Math Curriculum Specialist)',
      status: 'active',
      url: 'https://extracls.in/news/visual-math-manipulatives-versus-rote',
      stats: { views: 11500, likes: 780 },
    },
    {
      title: 'From Screen Consumers to Creative Thinkers: Inspiring Young Minds to Code',
      slug: 'from-consumers-to-creators-kids-coding',
      summary: 'Transforming passive screen time into creative digital craftsmanship. How visual block platforms like MIT Scratch teach algorithmic logic, resilience, and debugging habits.',
      content: '<p>Rather than simply consuming apps and videos, young learners who build their own interactive games develop critical problem-solving habits that transfer directly into math and science, fostering resilience when overcoming coding bugs.</p>',
      categories: ['TECHNOLOGY'],
      category: 'TECHNOLOGY',
      imageUrl: 'uploads/news/creative-coders.jpg',
      coverImage: 'uploads/news/creative-coders.jpg',
      publishedAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
      author: 'Vikramaditya Sen',
      status: 'active',
      url: 'https://extracls.in/news/from-consumers-to-creators-kids-coding',
      stats: { views: 9800, likes: 640 },
    },
    {
      title: 'Nurturing Everyday Curiosity: How Parents Can Turn Kitchen Tasks into Science Labs',
      slug: 'nurturing-everyday-kitchen-science',
      summary: 'Baking soda, oil, and vinegar are not just cooking supplies—they are the perfect tools to demonstrate chemical reactions, liquid density, and gas pressure safely at the breakfast table.',
      content: '<p>Science is everywhere around us. Parents do not need complex laboratory equipment to demonstrate fundamental physical principles to curious 6-to-9 year olds. Simple kitchen experiments spark lifelong inquiry.</p>',
      categories: ['PARENTING & GUIDANCE'],
      category: 'PARENTING & GUIDANCE',
      imageUrl: 'uploads/news/kitchen-science.jpg',
      coverImage: 'uploads/news/kitchen-science.jpg',
      publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      author: 'Dr. Ananya Iyer',
      status: 'active',
      url: 'https://extracls.in/news/nurturing-everyday-kitchen-science',
      stats: { views: 16100, likes: 1120 },
    },
    {
      title: 'EXTRACLS Announces Annual Young Innovators & Storytellers Challenge 2026',
      slug: 'annual-young-innovators-challenge-2026',
      summary: 'Students aged 4 to 11 are invited to submit original short stories, junior science models, and Scratch games. Scholarships and national certificates awarded to top young creators.',
      content: '<p>EXTRACLS is thrilled to launch our flagship national challenge celebrating creativity, scientific inquiry, and imaginative writing across primary school learners nationwide. Submissions open next month across all participating schools.</p>',
      categories: ['ANNOUNCEMENTS'],
      category: 'ANNOUNCEMENTS',
      imageUrl: 'uploads/news/innovators-challenge.jpg',
      coverImage: 'uploads/news/innovators-challenge.jpg',
      publishedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000),
      author: 'EXTRACLS Editorial Team',
      status: 'active',
      url: 'https://extracls.in/news/annual-young-innovators-challenge-2026',
      stats: { views: 22400, likes: 1850 },
    },
  ];

  await News.insertMany(newsSeedData);
  console.log(`Seeded ${newsSeedData.length} educational news articles successfully.`);

  // 5. SEED 6 ACTIVE FORUM THREADS & REPLIES
  console.log('Seeding 6 realistic educational forum discussions...');

  const forumSeedData = [
    {
      title: 'Tips for helping a 5-year-old transition from single letter sounds to blending CVC words?',
      content: 'My daughter recognizes all 26 alphabet sounds clearly when prompted, but when we sit down to read "cat" or "pig", she pronounces "c-a-t" separately and then guesses a random word like "cup". What exercises or tactile games worked best for your child to make the blending jump smoothly?',
      tags: ['#phonics', '#earlyreading', '#kindergarten'],
      likes: [adminId],
      isApproved: true,
      replies: [
        {
          authorUser: adminId,
          content: 'This is a very common developmental stage called "segmenting without blending". Try the Continuous Blending method! Instead of stopping after each sound (c... a... t), stretch the sounds together smoothly: "sssaaat" without pausing in between. Also, a physical "word slider" where you slide a toy car across the sounds helps children visually understand connection!',
        },
        {
          authorUser: studentId,
          content: 'We used alphabet cards on the fridge! I would hold the first two sounds together ("ca-") and have my son only add the final sound ("-t"). Breaking it into two chunks made it much less intimidating for him.',
        },
      ],
    },
    {
      title: 'Visual Math vs Abacus: What worked best for building mental math in Grade 2?',
      content: 'Our school is offering an optional abacus club, but we are also looking at visual Singapore-style number bonds and ten-frames. For parents whose kids have tried either, which method built better real problem-solving and word problem confidence rather than just mechanical bead moving?',
      tags: ['#mathfoundations', '#mentalmath', '#grade2'],
      likes: [adminId, studentId],
      isApproved: true,
      replies: [
        {
          authorUser: adminId,
          content: 'Both have merit, but research strongly favors Visual Number Bonds for conceptual understanding. Abacus develops fast procedural calculation, but visual bar models enable children to deconstruct complex multi-step word problems and algebra later on in Grades 4–6.',
        },
        {
          authorUser: studentId,
          content: 'My daughter did abacus for 6 months and became fast at addition, but struggled when word problems asked "who has 5 more?". We switched to visual block models and she actually understands the "why" now!',
        },
      ],
    },
    {
      title: 'How do you keep younger children focused during 45-minute live online classes?',
      content: 'We enrolled our 6-year-old in the Young Explorers science lab. He loves the experiments, but around the 30-minute mark he starts wiggling or looking around the room. How do other parents set up the home learning space to maintain healthy focus without nagging?',
      tags: ['#parenting', '#onlinelearning', '#focus'],
      likes: [studentId],
      isApproved: true,
      replies: [
        {
          authorUser: adminId,
          content: 'A few quick educator tips: 1) Keep a physical wobble cushion or balance pad on the chair so slight movement does not break attention. 2) Remove clutter and toys within peripheral eyesight. 3) Have a small water bottle and stress ball handy. Most importantly, acknowledge their effort after every session!',
        },
        {
          authorUser: studentId,
          content: 'We instituted a "special scientist desk" ritual. When class starts, he puts on a mini lab coat and safety goggles. Getting into character completely changed his focus!',
        },
      ],
    },
    {
      title: 'Recommended bedtime reading books for newly independent readers (Ages 6–7)?',
      content: 'My son has just graduated from phonics readers and can read 3 to 4 sentences per page independently! We are looking for joyful beginner chapter books or illustrated story series that aren’t intimidating. What are your family favorites?',
      tags: ['#bookrecommendations', '#readinghabits', '#stories'],
      likes: [adminId, studentId],
      isApproved: true,
      replies: [
        {
          authorUser: adminId,
          content: 'Congratulations to your young reader! Excellent transitional titles include: 1) "Frog and Toad" series by Arnold Lobel (timeless gentle humor), 2) "Mercy Watson" by Kate DiCamillo (vibrant illustrations and larger text), and 3) "Elephant & Piggie" by Mo Willems for high-frequency vocabulary reading.',
        },
        {
          authorUser: studentId,
          content: 'We also loved the Indian folk story series by Karadi Tales and Amar Chitra Katha Junior! Great moral values and captivating colorful art.',
        },
      ],
    },
    {
      title: 'Simple hands-on science experiments you can do at home with safe kitchen ingredients?',
      content: 'Looking for fun Saturday afternoon STEM activities for my 7 and 9 year olds that do not require special chemistry kits or leave a massive mess. Any parent-tested favorites?',
      tags: ['#homescience', '#experiments', '#stem'],
      likes: [adminId],
      isApproved: true,
      replies: [
        {
          authorUser: adminId,
          content: 'Three foolproof favorites: 1) "Dancing Raisins": Drop raisins into fresh sparkling soda and watch gas bubbles lift them to the top like miniature elevators! 2) "Walking Water": Place colored water in glasses connected by folded paper towels to watch capillary action in 30 minutes. 3) "Magic Milk": Milk + food coloring + a drop of dish soap on a Q-tip causes swirling kaleidoscope bursts!',
        },
        {
          authorUser: studentId,
          content: 'The baking soda lemon volcano is always a huge hit at our house! Squeeze lemon juice onto half a lemon with baking soda and dish soap—it fizzes in brilliant foam without making a sticky mess if you do it on a baking tray.',
        },
      ],
    },
    {
      title: 'How early should children start learning block-based coding like Scratch?',
      content: 'My 8-year-old son spends a lot of time playing Roblox and Minecraft. I want to channel that interest productively. Is 8 the right age to start Scratch, or should we wait until secondary school?',
      tags: ['#codingforkids', '#scratch', '#computationalthinking'],
      likes: [adminId, studentId],
      isApproved: true,
      replies: [
        {
          authorUser: adminId,
          content: 'Age 7 to 8 is the absolute golden window for Scratch 3.0! Because it uses snap-together visual blocks, children do not need to memorize programming syntax or worry about missing commas. They immediately start designing game logic, sprite physics, and scoring variables.',
        },
        {
          authorUser: studentId,
          content: 'Starting at 8 transformed my son\'s attitude completely. Instead of just playing games, he now thinks "I wonder what block logic made that jump occur?". It built so much problem-solving patience!',
        },
      ],
    },
  ];

  for (const tData of forumSeedData) {
    const { replies, ...threadFields } = tData;
    const threadId = new mongoose.Types.ObjectId();

    await ForumThread.create({
      _id: threadId,
      ...threadFields,
      createdBy: studentId,
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 10 + 1) * 24 * 60 * 60 * 1000),
    });

    const replyDocs = replies.map(r => ({
      threadId,
      content: r.content,
      repliedBy: r.authorUser,
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 5 + 1) * 24 * 60 * 60 * 1000),
    }));

    await ForumReply.insertMany(replyDocs);
    console.log(`Created thread: "${threadFields.title.substring(0, 40)}..." with ${replyDocs.length} replies.`);
  }

  console.log('ALL SEEDING COMPLETED SUCCESSFULLY!');
  await mongoose.disconnect();
  console.log('Disconnected from MongoDB.');
}

seed().catch(err => {
  console.error('Seed error:', err);
  process.exit(1);
});
