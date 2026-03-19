/**
 * Galac6 — Système de traduction FR/EN
 * Fonctionne sur toutes les pages du site vitrine.
 */
(function () {
  'use strict';

  // ─── Traductions anglaises ───
  var translations = {
    en: {
      // Page title
      'page.title': 'Galac6 — Got a test to prepare? A lesson to understand? Galac6 is here.',

      // Navbar
      'nav.features': 'Features',
      'nav.school': 'Schools',
      'nav.faq': 'FAQ',
      'nav.pricing': 'Pricing',
      'nav.about': 'About',
      'nav.signup': 'Sign up or log in',

      // Hero
      'hero.title': 'Got a test to prepare?<br>A lesson to understand?<br><span class="gradient">Galac6 is here.</span>',
      'hero.subtitle': 'Galac6, the AI that teaches you how to learn — quizzes, dictations, revision sheets and corrections, designed for the French school curriculum, from 1st grade to 12th grade.',
      'hero.cta': 'Try 7 days free →',
      'hero.reassurance': '7 days of unlimited access. No credit card required. 🇫🇷 Designed and hosted in France.',

      // Positioning
      'positioning.title': 'The AI that would rather teach you than do it for you.',
      'positioning.text': 'You can ask <strong>any AI</strong> to do your homework. Or you can ask <strong>Galac6</strong> to teach you how to do it yourself.<br>Your call.',

      // Features
      'features.title': 'Everything you need to make progress.',
      'features.chat.title': 'Socratic chat',
      'features.chat.desc': '"Explain it to me, but don\'t do it for me"',
      'features.quiz.title': 'Photo quiz',
      'features.quiz.desc': '"Take a photo of your lesson. Get a quiz."',
      'features.dictation.title': 'Dictations',
      'features.dictation.desc': '"Dictations that adapt to your level"',
      'features.correction.title': 'Test corrections',
      'features.correction.desc': '"Got a bad grade. Understand why."',
      'features.revision.title': 'Revision sheets',
      'features.revision.desc': '"A revision sheet in 30 seconds"',

      // Parents
      'parents.title': 'Designed for learning. Not for cheating.',
      'parents.subtitle': 'What parents appreciate.',
      'parents.pedagogy.title': 'Pedagogy first',
      'parents.pedagogy.desc': 'The AI guides and asks questions. It never gives the answer directly. The student has to think.',
      'parents.curriculum.title': 'Official curriculum',
      'parents.curriculum.desc': 'Aligned with the French National Education curriculum standards, from 1st to 12th grade.',
      'parents.dashboard.title': 'Parent dashboard',
      'parents.dashboard.desc': 'Dedicated dashboard: subjects studied, screen time, weekly progress.',

      // Trust
      'trust.title': 'Your data stays <span style="background:linear-gradient(135deg,var(--gradient-start),var(--gradient-end));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">in France.</span>',
      'trust.subtitle': 'Parents\' trust is our priority.',
      'trust.hosting.title': 'Hosted in France',
      'trust.hosting.desc': 'Your child\'s data is stored in France, on European GDPR-compliant servers.',
      'trust.gdpr.title': 'GDPR by design',
      'trust.gdpr.desc': 'Galac6 is built from the ground up to comply with European personal data regulations.',
      'trust.nodata.title': 'No data resale',
      'trust.nodata.desc': 'School data is never shared with third parties or used to train AI models.',

      // FAQ
      'faq.title': 'Frequently asked <span style="background:linear-gradient(135deg,var(--gradient-start),var(--gradient-end));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">questions</span>',
      'faq.subtitle': 'Everything parents and students ask us, in full transparency.',

      'faq.q1': 'Who is Galac6 for?',
      'faq.a1': 'Galac6 is for <strong>students from 1st to 12th grade</strong> and their parents. Whether your child needs a helping hand with homework, or is preparing for an important test, Galac6 is here to support them — at their own pace, in their subject, at their level.',

      'faq.q2': 'Does Galac6 give students the answers?',
      'faq.a2': '<strong>No — and that\'s the whole point.</strong> Galac6 doesn\'t do homework for your child. It helps them <strong>ask the right questions</strong>, identify what they don\'t know yet, so they can find the answers themselves. The goal: build real confidence, not fake grades.',

      'faq.q3': 'Does Galac6 replace teachers or parents?',
      'faq.a3': 'Never. Galac6 steps in where neither the teacher nor the parents can always be: <strong>at 9 PM, alone with homework</strong>. It\'s the caring companion that takes over when no one is available. For younger students, it can even become a great tool for parent-child interaction.',

      'faq.q4': 'How does Galac6 use AI?',
      'faq.a4': 'Galac6 uses AI to <strong>guide the student, not to think for them</strong>. The AI analyzes the student\'s level, gaps and learning pace, then offers tailored explanations, targeted review questions and personalized encouragement — in French, following the French National Education curriculum.',

      'faq.q5': 'How is Galac6 different from ChatGPT?',
      'faq.a5': '<strong>ChatGPT gives answers. Galac6 gives skills.</strong> ChatGPT isn\'t designed for children, doesn\'t know the French curriculum and has no educational logic. Galac6 is specifically designed for the French school system 🇫🇷, with an approach that pushes students to truly learn — not to copy-paste.',

      'faq.q6': 'How much time per day should I use Galac6?',
      'faq.a6': '<strong>15 to 30 minutes is enough</strong> for effective revision. Galac6 isn\'t designed to replace leisure — it\'s designed to optimize study time. A few targeted sessions per week already make a real difference in results.',

      'faq.q7': 'Is my child\'s data protected?',
      'faq.a7': 'Yes, and it\'s non-negotiable. Galac6 is <strong>designed and hosted in France</strong>, in full compliance with GDPR. We never sell your children\'s data to third parties. The privacy and security of minors\' data are at the core of our design.',

      'faq.q8': 'What subjects and grade levels are covered?',
      'faq.a8': 'Galac6 covers the main subjects of the French curriculum: <strong>French, Mathematics, History-Geography, Sciences, English</strong> and more — <strong>from 1st to 12th grade</strong>. Content automatically adapts to the student\'s level and grade.',

      'faq.q9': 'Can parents track their child\'s progress?',
      'faq.a9': 'Yes. Parents have access to a tracking dashboard to see subjects studied, progress made and areas to improve. At Galac6, we believe in the <strong>active role of parents</strong> in education — the tool is designed to strengthen that bond, not replace it.',

      'faq.q10': 'Is there a free trial?',
      'faq.a10': 'Yes! <strong>Every new user gets 7 days of unlimited access</strong>, no credit card required. Quizzes, dictations, revision sheets, corrections — everything is unlocked for a week. After that, you can continue for free with limited access, or switch to an unlimited plan.',

      'faq.q11': 'Is Galac6 available in my country?',
      'faq.a11': 'Galac6 is currently available in <strong>France only</strong>, as it is designed around the French school curriculum (Éducation Nationale). If you\'d like Galac6 in your country, <a href="mailto:hello@galac6.io">contact us</a> — we\'re exploring international expansion and would love to hear from you!',

      'faq.cta.text': 'Can\'t find your question here?',
      'faq.cta.button': 'Contact us →',

      // Pricing
      'pricing.title': '7 free days to try.',
      'pricing.free.name': 'Free trial',
      'pricing.free.amount': '7 <span class="currency">days</span>',
      'pricing.free.detail': 'Unlimited access, no credit card',
      'pricing.free.cta': 'Try it →',
      'pricing.badge': '⭐ Best deal',
      'pricing.annual.name': 'Annual',
      'pricing.annual.detail': '€119.88/year — everything unlimited',
      'pricing.annual.cta': 'See details →',
      'pricing.note': 'Monthly plan available at €13.99/month. For schools: <a href="/ecole">contact us →</a>',

      // Final CTA
      'cta.title': 'Ready to make progress?',
      'cta.button': 'Try 7 days free →',
      'cta.note': 'Unlimited access for 7 days. No credit card.',

      // Footer
      'footer.hosted': '🇫🇷 Designed and hosted in France',
      'footer.copy': '© 2026 Galac6. All rights reserved.',
      'footer.legal.title': 'Legal',
      'footer.legal.mentions': 'Legal notices',
      'footer.legal.cgu': 'Terms of use',
      'footer.legal.privacy': 'Privacy policy',
      'footer.legal.cgv': 'Terms of sale',
      'footer.contact.title': 'Contact',
      'footer.contact.about': 'About',
      'footer.contact.school': 'Schools →',

      // Banner EN
      'banner.text': '🌍 Currently available in France only (French school system). Want Galac6 in your country? <a href="mailto:hello@galac6.io" style="color:#fff;text-decoration:underline;">Send a request →</a>',

      // ─── Shared across pages ───
      'about.nav.home': 'Home',

      // ─── Tarifs page ───
      'tarifs.back': '\u2190 Back to home',
      'tarifs.title': 'Pricing <span class="gradient">Galac6</span>',
      'tarifs.lead': '7 days of unlimited access, no credit card. Then continue for free or upgrade to the full plan.',
      'tarifs.promo.badge': 'Free trial',
      'tarifs.promo.title': '7 free days to try everything!',
      'tarifs.promo.text': 'Sign up and enjoy full, unlimited access for 7 days.<br>No credit card required — no commitment.',
      'tarifs.promo.cta': 'Start my free trial \u2192',
      'tarifs.basic.name': 'Basic',
      'tarifs.basic.amount': '0 <span class="currency">\u20AC</span>',
      'tarifs.basic.detail': 'After the free trial',
      'tarifs.basic.f1': '5 messages / day',
      'tarifs.basic.f2': '1 quiz / day',
      'tarifs.basic.f3': '1 dictation / day',
      'tarifs.basic.f4': 'Text-to-speech',
      'tarifs.basic.f5': 'Image upload',
      'tarifs.basic.f6': 'Voice input',
      'tarifs.basic.f7': 'Remediation',
      'tarifs.basic.cta': 'Get started \u2192',
      'tarifs.unlimited.badge': '\u2728 -29%',
      'tarifs.unlimited.name': 'Unlimited',
      'tarifs.unlimited.detail': 'Billed \u20AC119.88/year',
      'tarifs.unlimited.f1': 'Unlimited messages',
      'tarifs.unlimited.f2': 'Unlimited quizzes',
      'tarifs.unlimited.f3': 'Unlimited dictations',
      'tarifs.unlimited.f4': 'Text-to-speech',
      'tarifs.unlimited.f5': 'Image upload',
      'tarifs.unlimited.f6': 'Voice input',
      'tarifs.unlimited.f7': 'Remediation',
      'tarifs.unlimited.cta': 'Subscribe \u2192',
      'tarifs.unlimited.note': 'Or \u20AC13.99/month with no commitment',
      'tarifs.trust.hosting': 'Data hosted in Europe',
      'tarifs.trust.parental': 'Real-time parental monitoring',
      'tarifs.trust.support': 'Responsive support',
      'tarifs.faq.title': 'Frequently asked questions',
      'tarifs.faq.subtitle': 'Everything you need to know about our pricing.',
      'tarifs.faq.q1': 'Can I try for free?',
      'tarifs.faq.a1': 'Yes! Every new user gets <strong>7 days of unlimited access</strong>, no credit card required. After the trial, you keep free limited access (5 messages, 1 quiz, 1 dictation per day) or upgrade to an unlimited plan.',
      'tarifs.faq.q2': 'Can I switch plans?',
      'tarifs.faq.a2': 'Yes, at any time from the parent dashboard. You can switch from monthly to annual or vice versa.',
      'tarifs.faq.q3': 'How many children are covered?',
      'tarifs.faq.a3': 'The subscription covers 1 student license. You can add more children from the parent portal.',
      'tarifs.faq.q4': 'Can I cancel at any time?',
      'tarifs.faq.a4': 'Yes. No commitment on the monthly plan. For the annual plan, you can cancel anytime and your access remains active until the end of the billing period.',
      'tarifs.footer.desc': 'Galac6 \u2014 The AI tutoring and revision assistant.',
      'tarifs.footer.france': '\ud83c\uddeb\ud83c\uddf7 Made in France',

      // ─── About page ───
      'about.title': 'About Galac6',
      'about.p1': 'Engineer, entrepreneur, and above all father of 3 children, I created Galac6 from a simple observation: homework takes up a huge part of family life \u2014 and it is a source of stress, both for children and parents.',
      'about.p2': 'Like you, I saw the temptation of ChatGPT: fast, available at all hours, capable of explaining everything. But also ill-suited to school, and almost impossible to use without cheating.',
      'about.p3': 'So I developed Galac6 to offer an alternative designed for students: an AI that helps understand, revise and progress \u2014 without doing homework for them. Galac6 leverages the best AI models on the market (Mistral, Anthropic, OpenAI), used where each one excels, to guarantee relevant and educational responses.',
      'about.signature': 'Raphael Haik, Paris, France',
      'about.contact.title': 'Contact me',
      'about.contact.subtitle': 'A question, a suggestion, a partnership? Write to me directly.',
      'about.contact.name': 'Your name',
      'about.contact.email': 'Your email',
      'about.contact.message': 'Message',
      'about.contact.send': 'Send \u2192',
      'about.contact.success': 'Message sent, thank you! I will reply as soon as possible.',
      'about.footer.desc': 'Galac6 \u2014 The AI tutoring and revision assistant.',
      'about.footer.france': '\ud83c\uddeb\ud83c\uddf7 Made in France',

      // ─── Ecole page ───
      'ecole.back': '\u2190 Back to home',
      'ecole.badge': '\ud83c\udfeb Schools offer',
      'ecole.hero.title': 'Galac6 for <span class="gradient">your school</span>',
      'ecole.hero.subtitle': 'Deploy Galac6 in your school. Centralized console, invitation codes, class tracking and controlled screen time.',
      'ecole.pillars.title': 'A tool for every stakeholder',
      'ecole.pillars.subtitle': 'Students, teachers and administration each benefit from dedicated features.',
      'ecole.pillar.student.title': 'For students',
      'ecole.pillar.student.desc': 'The AI never gives the answer: it asks questions, encourages critical thinking and adapts to each student\'s level.',
      'ecole.pillar.admin.title': 'For administration',
      'ecole.pillar.admin.desc': 'Centralized deployment, transparent billing, GDPR compliance, data hosted in France.',
      'ecole.features.title': 'Detailed features',
      'ecole.features.subtitle': 'Everything needed to support students, teachers and administration.',
      'ecole.features.students.title': '\ud83c\udf93 Students',
      'ecole.features.students.f1': 'Socratic AI chat \u2014 step-by-step guidance',
      'ecole.features.students.f2': 'Interactive quizzes with corrections and XP',
      'ecole.features.students.f3': 'Voice dictations (AI voice, 3 speeds, paper mode)',
      'ecole.features.students.f4': 'Full revision sheets or quick cheat sheets',
      'ecole.features.students.f5': 'Voice input for questions and math formulas',
      'ecole.features.students.f6': 'OCR \u2014 photograph an exercise',
      'ecole.features.students.f7': 'Math formula editor',
      'ecole.features.students.f8': 'Guided Scratch and Python courses',
      'ecole.features.students.f9': 'Gamification: XP, badges, daily challenges',
      'ecole.features.students.f10': 'Accessibility modes (dyslexia, dyspraxia\u2026)',
      'ecole.features.students.f11': '11 school subjects (French curriculum)',
      'ecole.features.students.f12': 'From 1st to 12th grade',
      'ecole.features.students.f13': 'Mock exams (Brevet) \u2014 Full exams in Math, French, Science and History-Geography with AI grading',
      'ecole.features.school.title': '\ud83c\udfdb\ufe0f School',
      'ecole.features.school.f1': 'Centralized administration console',
      'ecole.features.school.f2': 'Invitation codes per school',
      'ecole.features.school.f3': 'Screen time control per student',
      'ecole.features.school.f4': 'Accessibility settings per class',
      'ecole.features.school.f5': 'Usage statistics per class',
      'ecole.features.school.f6': 'Administrator and teacher roles',
      'ecole.features.school.f7': 'AI filtering app coming soon',
      'ecole.features.school.f8': 'AI mock exams \u2014 Auto-generated subjects and auto-graded papers',
      'ecole.trust.title': 'Trust and security',
      'ecole.trust.subtitle': 'A rigorous framework to protect your students\' data.',
      'ecole.trust.ai.title': 'Responsible AI',
      'ecole.trust.ai.desc': 'Automatic moderation, inappropriate content filtering.',
      'ecole.trust.transparency.title': 'Transparency',
      'ecole.trust.transparency.desc': 'AI cost billed at actual usage, no hidden margin.',
      'ecole.trust.france.title': 'Made in France',
      'ecole.trust.france.desc': 'Designed and developed in France.',
      'ecole.cta.title': 'Deploy Galac6 in your school',
      'ecole.cta.subtitle': 'Request a free demo and a personalized quote.',
      'ecole.cta.button': 'Request a demo',
      'ecole.faq.title': 'Frequently asked questions',
      'ecole.faq.subtitle': 'Everything you need to know before deploying Galac6.',
      'ecole.faq.q1': 'Does Galac6 work on school tablets and Chromebooks?',
      'ecole.faq.a1': 'Yes. Galac6 is a web application that works on any modern browser (Chrome, Firefox, Safari, Edge) \u2014 tablets, Chromebooks, PCs and Macs.',
      'ecole.faq.q2': 'Does the AI give students the answers?',
      'ecole.faq.a2': 'No. Galac6 uses the Socratic method: the AI asks questions, gives hints and guides thinking step by step. The student builds their own understanding.',
      'ecole.faq.q3': 'Can you block access to other AIs (ChatGPT, etc.)?',
      'ecole.faq.a3': 'A dedicated filtering app is currently in development and will be available soon. It will allow blocking access to competing AIs on school devices, to prevent students from getting ready-made answers.',
      'ecole.faq.q4': 'How does deployment work?',
      'ecole.faq.a4': '<ol><li>School console setup</li><li>Student and class import (CSV or manual entry)</li><li>Teacher access assignment</li><li>Remote training (1 hour)</li><li>The school is operational in less than a day</li></ol>',
      'ecole.faq.q5': 'Is there a free trial?',
      'ecole.faq.a5': 'Yes. We offer a free 1-month pilot for one class, to test Galac6 in real conditions before committing.',
      'ecole.faq.q6': 'Does Galac6 use French technologies?',
      'ecole.faq.a6': 'Galac6 primarily uses Mistral, a French sovereign LLM, complemented by Anthropic and OpenAI. Data is hosted in Europe. 100% sovereign option available on request.',
      'ecole.footer.desc': 'Galac6 \u2014 The AI tutoring and revision assistant.',
      'ecole.footer.france': '\ud83c\uddeb\ud83c\uddf7 Made in France',

      // ─── Createur-contenu page ───
      'createur.badge': 'Freelance mission',
      'createur.title': 'Video content creator / UGC',
      'createur.subtitle': 'Freelance mission \u2014 YouTube, TikTok, Instagram \u2014 Galac6 | EdTech | Educational AI | galac6.io',
      'createur.project.title': 'The project',
      'createur.project.p1': 'Galac6 is a French educational AI app for students from 1st to 12th grade. Our approach: the AI never gives the answer, it teaches the student how to think (Socratic method). The app offers quizzes, voice dictations, revision sheets, test corrections, full mock exams, mental arithmetic \u2014 all with a gamification system (XP, badges, challenges).',
      'createur.project.p2': 'We are launching our video presence and looking for a content creator to design, produce and distribute all our content on YouTube, TikTok and Instagram.',
      'createur.mission.title': 'The mission',
      'createur.mission.m1': 'Write scripts for YouTube tutorials (10 videos, 3-7 min) and Reels/TikToks, using AI (Claude, ChatGPT) to speed up writing',
      'createur.mission.m2': 'Film tutorials (screencast) and edit them (CapCut, Premiere, DaVinci or equivalent)',
      'createur.mission.m3': 'Create thumbnails, titles and descriptions optimized for YouTube SEO',
      'createur.mission.m4': 'Adapt tutorials into YouTube Shorts, Instagram Reels and TikToks',
      'createur.mission.m5': 'Manage Galac6 social accounts: regular posts, comment replies, community engagement',
      'createur.mission.m6': 'Target two audiences: middle/high school students (fun content, catchy hooks) and their parents (reassurance, parental tracking demo)',
      'createur.mission.m7': 'Create UGC content (User Generated Content): student testimonials, authentic reactions, "POV" and "storytime" formats for TikTok and Reels',
      'createur.mission.m8': 'Propose viral content ideas and track performance (YouTube, Instagram, TikTok analytics)',
      'createur.skills.title': 'Required skills',
      'createur.skills.s1': 'Demonstrable experience in video content creation (YouTube, TikTok or Instagram)',
      'createur.skills.s2': 'Video editing proficiency: CapCut, Premiere Pro or DaVinci Resolve',
      'createur.skills.s3': 'YouTube SEO knowledge: titles, tags, thumbnails, retention strategy',
      'createur.skills.s4': 'Understanding of social media platform algorithms',
      'createur.skills.s5': 'Use of generative AI in the creative workflow (scripts, ideation, visuals)',
      'createur.skills.s6': 'Ability to speak to teens (14-18) with the right tone, without being cringe',
      'createur.skills.s7': 'UGC creation experience: authentic formats, testimonials, native storytelling for social media',
      'createur.skills.s8': 'Bonus: interest in education, EdTech or tutoring',
      'createur.details.title': 'Details',
      'createur.details.format.label': 'Format',
      'createur.details.format.value': 'Freelance (monthly fee) or apprenticeship',
      'createur.details.location.label': 'Location',
      'createur.details.location.value': 'Remote (France) \u2014 occasional meetings in Paris area',
      'createur.details.start.label': 'Start',
      'createur.details.start.value': 'As soon as possible',
      'createur.details.duration.label': 'Duration',
      'createur.details.duration.value': 'Recurring mission \u2014 minimum 3 months',
      'createur.details.volume.label': 'Volume',
      'createur.details.volume.value': '~10 YouTube tutorials + Reels/TikTok adaptations + daily management',
      'createur.details.budget.label': 'Budget',
      'createur.details.budget.value': 'To be defined',
      'createur.apply.title': 'How to apply',
      'createur.apply.intro': 'Send us an email at <a href="mailto:raphael@galac6.io">raphael@galac6.io</a>:',
      'createur.apply.step1': 'A link to a video content you created (even personal, even with few views \u2014 we want to see your style)',
      'createur.apply.step2': 'A short message explaining how you would launch the Galac6 YouTube channel',
      'createur.apply.step3': 'Your daily rate or desired monthly fee',
      'createur.apply.highlight': 'No corporate CV. We want to see what you can DO.',
      'createur.apply.discover': '<a href="https://galac6web.netlify.app/">Discover the product on galac6.io</a>',
      'createur.footer.desc': 'Galac6 \u2014 The AI tutoring and revision assistant.',
      'createur.footer.france': '\ud83c\uddeb\ud83c\uddf7 Made in France',

      // ─── Recherche page ───
      'recherche.back': '\u2190 Back to home',
      'recherche.title': 'Research on <span>AI in learning</span>',
      'recherche.lead': 'What recent scientific studies (2023\u20132025) say about AI tutoring \u2014 and why guided support makes all the difference.',
      'recherche.takeaway1': 'learning gains<br>with guided AI tutoring',
      'recherche.takeaway2': 'effect size with teacher<br>support (vs 0.08 without)',
      'recherche.takeaway3': 'K-12 studies converge:<br>feedback + adaptivity = results',
      'recherche.studies.title': '6 key studies',
      'recherche.study1.title': 'Support multiplies the effect by 18',
      'recherche.study1.result': 'With teacher or parental support, AI\'s effect on academic results is <strong>g = 1.43</strong>. Without support: <strong>g = 0.08</strong> (near zero). The human in the loop is the determining factor for success.',
      'recherche.study2.title': 'An AI tutor outperforms active in-person teaching',
      'recherche.study2.result': '<strong>\u00d72 learning gains</strong> and 27% less time compared to active teaching with peer instruction. Effect size: 0.73 to 1.3 sigma. Condition: the AI tutor was designed with strict pedagogical principles (Socratic questioning, never giving the answer directly).',
      'recherche.study3.title': 'Adaptive quizzes and spaced repetition: +15 percentiles',
      'recherche.study3.result': 'Students active on an adaptive quiz AI tutor gained <strong>+10 to +15 percentiles</strong> on final exams. Access alone is not enough: inactive students lost 5 percentiles. The effect increases with regular engagement.',
      'recherche.study4.title': 'Unrestricted AI reduces critical thinking',
      'recherche.study4.result': 'Without a framework, unrestricted access to generative AI <strong>reduces cognitive engagement</strong> and critical thinking. The higher the trust in AI, the less the user thinks for themselves.',
      'recherche.study5.title': '28 K-12 studies: the 3 pillars that work',
      'recherche.study5.result': 'Systematic review of <strong>28 studies from elementary to high school</strong>. Benefits are maximized when the system combines: immediate feedback, guided practice and adaptivity to student level.',
      'recherche.study6.title': 'Pedagogical AI: +5.5 pp on knowledge transfer',
      'recherche.study6.result': 'An AI tutor fine-tuned for pedagogy (LearnLM) <strong>outperformed human-only tutoring</strong> on knowledge transfer (+5.5 percentage points). Zero harmful content detected. Human tutors reported learning new pedagogical techniques from the AI.',
      'recherche.synthesis.title': 'What Galac6 applies',
      'recherche.synthesis.intro': 'Every feature of Galac6 is aligned with these findings:',
      'recherche.synthesis.s1': '<strong>Parental engagement</strong>: the human in the loop multiplies results (study 1)',
      'recherche.synthesis.s2': '<strong>Guided tutoring</strong>: the AI never gives the answer, it guides through questioning (studies 2, 4)',
      'recherche.synthesis.s3': '<strong>Adaptive quizzes and XP</strong>: regular practice rewarded, spaced repetition (study 3)',
      'recherche.synthesis.s4': '<strong>Immediate feedback</strong>: detailed corrections for every quiz and dictation (study 5)',
      'recherche.cta.back': '\u2190 Back to home',
      'recherche.footer.desc': 'Galac6 \u2014 The AI tutoring and revision assistant.',
      'recherche.footer.doi': 'All cited studies are accessible via their respective DOIs.',

      // ─── Shared nav (secondary pages) ───
      'nav.home': 'Home',

      // ─── Shared footer (secondary pages) ───
      'cgv.footer.tagline': 'Galac6 — The AI-powered tutoring and revision platform.',
      'cgv.footer.france': '🇫🇷 Made in France',

      // ─── CGV (Terms of Sale) ───
      'cgv.title': 'Terms of Sale',
      'cgv.subtitle': 'Last updated: February 25, 2026',
      'cgv.intro': 'These Terms of Sale govern all subscription sales for the Galac6 service, published by RHK Conseil. Any subscription implies unreserved acceptance of these Terms of Sale.',
      'cgv.art1.title': '1. Purpose',
      'cgv.art1.text': 'These Terms of Sale define the conditions under which RHK Conseil (hereinafter "the Publisher") offers the User (hereinafter "the Customer") access to the Galac6 service, an educational application using artificial intelligence to support students in their learning.',
      'cgv.art2.title': '2. Plans and pricing',
      'cgv.art2.intro': 'Galac6 offers three plans:',
      'cgv.art2.free': '<strong>Free Plan — \u20AC0</strong>: limited access including 5 messages per day, 1 quiz per day and 1 dictation per day. The following features are not included: text-to-speech, image upload, voice input and advanced remediation.',
      'cgv.art2.monthly': '<strong>Monthly Plan — \u20AC13.99/month</strong>: no commitment, cancellable at any time. Unlimited access to all features: unlimited messages, quizzes and dictations, text-to-speech, image upload, voice input and advanced remediation.',
      'cgv.art2.annual': '<strong>Annual Plan — \u20AC9.99/month</strong> (billed \u20AC119.88 per year, a 29% saving): unlimited access to all features, identical to the monthly plan.',
      'cgv.art2.note': 'Prices are shown in euros including all taxes. The Publisher reserves the right to modify prices at any time. Any price change will be notified to Customers before the next billing period.',
      'cgv.art3.title': '3. Subscription and payment',
      'cgv.art3.text': 'Subscribing to a paid plan is done online via the Galac6 pricing page. Payment is securely processed by Stripe (Stripe Inc.). Accepted payment methods are: credit/debit card (Visa, Mastercard, American Express). Payment is automatically charged on the subscription date, then at each billing cycle (monthly or annual depending on the chosen plan).',
      'cgv.art4.title': '4. Right of withdrawal',
      'cgv.art4.p1': 'In accordance with articles L.221-18 et seq. of the French Consumer Code, the Customer has <strong>14 days</strong> from the date of subscription to exercise their right of withdrawal, without having to provide reasons or pay penalties.',
      'cgv.art4.p2': 'To exercise this right, the Customer may contact the Publisher by email at <a href="mailto:hello@galac6.io">hello@galac6.io</a>, clearly stating their wish to withdraw. The refund will be processed within 14 days of receiving the request, using the same payment method as the original transaction.',
      'cgv.art4.p3': 'If the Customer has expressly requested the service to begin before the withdrawal period expires and has used the service, the amount due for the service consumed will be charged on a pro rata basis.',
      'cgv.art5.title': '5. Duration and renewal',
      'cgv.art5.p1': 'The monthly subscription is concluded for a period of one month and renews automatically at each billing cycle. The annual subscription is concluded for a period of twelve months and renews automatically on each subscription anniversary.',
      'cgv.art5.p2': 'The Customer may at any time check their next renewal date and manage their subscription from the Stripe management portal, accessible from the "My subscription" section of the application.',
      'cgv.art6.title': '6. Cancellation',
      'cgv.art6.p1': 'The Customer may cancel their subscription at any time from the Stripe management portal. Cancellation takes effect at the end of the current paid period: the Customer retains access to paid features until the expiry date of their current period.',
      'cgv.art6.p2': 'No pro rata refund will be issued for the remaining period, except under the right of withdrawal (article 4).',
      'cgv.art6.p3': 'The Publisher reserves the right to suspend or terminate a Customer\'s access in case of violation of the <a href="/terms">Terms of Use</a>.',
      'cgv.art7.title': '7. Liability',
      'cgv.art7.p1': 'Galac6 is an educational support tool using artificial intelligence. It does not replace a teacher, tutor or education professional in any way. AI-generated content is provided for informational purposes and may contain inaccuracies.',
      'cgv.art7.p2': 'The Publisher shall not be held liable for:',
      'cgv.art7.li1': 'academic results obtained by the student;',
      'cgv.art7.li2': 'temporary service interruptions related to maintenance or technical issues;',
      'cgv.art7.li3': 'the use made of the service by the Customer or the student.',
      'cgv.art8.title': '8. Personal data protection',
      'cgv.art8.text': 'The processing of personal data in connection with the use of Galac6 is described in our <a href="/privacy">Privacy Policy</a>. The Customer is invited to review it before subscribing.',
      'cgv.art9.title': '9. Applicable law and disputes',
      'cgv.art9.p1': 'These Terms of Sale are governed by French law.',
      'cgv.art9.p2': 'In case of dispute, the Customer may use a consumer mediator free of charge under the conditions provided for in articles L.611-1 et seq. of the French Consumer Code. The competent mediator will be communicated upon request at <a href="mailto:hello@galac6.io">hello@galac6.io</a>.',
      'cgv.art9.p3': 'Failing an amicable resolution, the dispute will be brought before the competent courts in accordance with common law rules.',
      'cgv.art10.title': '10. Contact',
      'cgv.art10.text': 'For any questions regarding these Terms of Sale, you may contact the Publisher:',
      'cgv.art10.email': '<strong>Email</strong>: <a href="mailto:hello@galac6.io">hello@galac6.io</a>',
      'cgv.art10.editor': '<strong>Publisher</strong>: RHK Conseil',
      'cgv.lastupdate': 'Last updated: February 25, 2026',

      // ─── Privacy Policy ───
      'privacy.title': 'Privacy Policy',
      'privacy.subtitle': 'Last updated: February 25, 2026',
      'privacy.intro': 'This privacy policy describes how Galac6 (hereinafter "we") collects, uses and protects the personal data of users of the Galac6 platform, in accordance with the General Data Protection Regulation (GDPR) and the French Data Protection Act.',
      'privacy.art1.title': '1. Data controller',
      'privacy.art1.text': 'The data controller is the company publishing Galac6. For any questions regarding your personal data, you may contact us at: <a href="mailto:hello@galac6.io">hello@galac6.io</a>.',
      'privacy.art2.title': '2. Data collected',
      'privacy.art2.intro': 'We collect the following categories of data:',
      'privacy.art2.identity': '<strong>Identity data</strong>: email address, student name, year of birth, grade level, language',
      'privacy.art2.activity': '<strong>Educational activity data</strong>: chat messages, quiz results, dictations, remediation plans, learning statistics',
      'privacy.art2.technical': '<strong>Technical data</strong>: display preferences (theme, font size), sidebar state',
      'privacy.art2.billing': '<strong>Billing data</strong>: email and Stripe identifier',
      'privacy.art2.sensitive': '<strong>Sensitive data</strong>: educational accommodations (where applicable), collected only with your explicit consent (Art. 9 GDPR)',
      'privacy.art3.title': '3. Purposes and legal bases',
      'privacy.art3.intro': 'Your data is processed for the following purposes:',
      'privacy.art3.li1': 'Provision of the educational service (performance of contract)',
      'privacy.art3.li2': 'Personalization of learning via AI (legitimate interest)',
      'privacy.art3.li3': 'Tracking of academic progress (performance of contract)',
      'privacy.art3.li4': 'Billing and subscription management (performance of contract)',
      'privacy.art3.li5': 'Service improvement (legitimate interest)',
      'privacy.art3.li6': 'Compliance with legal obligations (legal obligation)',
      'privacy.art4.title': '4. Protection of minors',
      'privacy.art4.text': 'Galac6 is intended for students from 1st to 12th grade. In accordance with Article 8 of the GDPR and Article 45 of the French Data Protection Act, parental or legal guardian consent is required for users under 15 years of age. This consent is collected during account creation.',
      'privacy.art5.title': '5. Sub-processors and data transfers',
      'privacy.art5.intro': 'We use the following sub-processors:',
      'privacy.art5.supabase': '<strong>Supabase</strong> (hosting, database) \u2014 France, European Union',
      'privacy.art5.netlify': '<strong>Netlify</strong> (web hosting) \u2014 Ireland, European Union',
      'privacy.art5.anthropic': '<strong>Anthropic / Claude</strong> (AI chat assistance) \u2014 United States, with Standard Contractual Clauses',
      'privacy.art5.mistral': '<strong>Mistral</strong> (AI chat assistance) \u2014 France, European Union',
      'privacy.art5.openai': '<strong>OpenAI / Whisper</strong> (speech transcription) \u2014 United States, with Standard Contractual Clauses',
      'privacy.art5.google': '<strong>Google</strong> (text-to-speech) \u2014 United States, with Standard Contractual Clauses',
      'privacy.art5.stripe': '<strong>Stripe</strong> (payment) \u2014 United States, certified and compliant',
      'privacy.art5.resend': '<strong>Resend</strong> (transactional emails) \u2014 United States, with Standard Contractual Clauses',
      'privacy.art5.note': 'Transfers outside the European Union are governed by Standard Contractual Clauses (SCCs) in accordance with Article 46 of the GDPR. No data is used to train AI models.',
      'privacy.art6.title': '6. Data retention periods',
      'privacy.art6.account': '<strong>Account data</strong>: account lifetime + 1 year after deletion',
      'privacy.art6.activity': '<strong>Educational activity data</strong>: 2 years or end of schooling + 1 year',
      'privacy.art6.billing': '<strong>Billing data</strong>: legal retention period (10 years)',
      'privacy.art6.inactive': '<strong>Inactive accounts</strong>: deletion after 2 years of inactivity',
      'privacy.art7.title': '7. Your rights',
      'privacy.art7.intro': 'In accordance with the GDPR, you have the following rights:',
      'privacy.art7.access': '<strong>Right of access</strong> (Art. 15): obtain a copy of your data',
      'privacy.art7.rectification': '<strong>Right to rectification</strong> (Art. 16): correct your data',
      'privacy.art7.erasure': '<strong>Right to erasure</strong> (Art. 17): request the deletion of your data',
      'privacy.art7.portability': '<strong>Right to data portability</strong> (Art. 20): receive your data in a structured format',
      'privacy.art7.objection': '<strong>Right to object</strong> (Art. 21): object to the processing of your data',
      'privacy.art7.withdraw': '<strong>Right to withdraw your consent</strong> at any time',
      'privacy.art7.contact': 'To exercise these rights, contact us at: <strong><a href="mailto:hello@galac6.io">hello@galac6.io</a></strong>.',
      'privacy.art7.cnil': 'You may also file a complaint with the <strong>CNIL</strong> (<a href="https://www.cnil.fr" target="_blank" rel="noopener">www.cnil.fr</a>), the French data protection authority.',
      'privacy.art8.title': '8. Cookies and local storage',
      'privacy.art8.text': 'Galac6 uses a functional cookie (sidebar state) and the browser\'s local storage for your display preferences (theme, font size). No tracking or advertising cookies are used. Consent for the functional cookie is collected via our cookie banner.',
      'privacy.lastupdate': 'Last updated: February 25, 2026',

      // ─── Terms of Use ───
      'terms.title': 'Terms of Use',
      'terms.subtitle': 'Last updated: February 25, 2026',
      'terms.intro': 'These Terms of Use (hereinafter "ToU") govern access to and use of the Galac6 platform.',
      'terms.art1.title': '1. Purpose',
      'terms.art1.text': 'Galac6 is an educational platform using artificial intelligence to support students from 1st to 12th grade in their learning, following the official French National Education curriculum.',
      'terms.art2.title': '2. Access to the service',
      'terms.art2.text': 'Access to Galac6 requires the creation of an account by a parent or legal guardian. The user agrees to provide accurate information and to maintain the confidentiality of their login credentials.',
      'terms.art3.title': '3. User obligations',
      'terms.art3.intro': 'The user agrees to:',
      'terms.art3.li1': 'Use the service in accordance with its educational purpose',
      'terms.art3.li2': 'Not attempt to circumvent security measures',
      'terms.art3.li3': 'Not share unlawful or inappropriate content via the chat',
      'terms.art3.li4': 'Supervise the use of the service by minors under their responsibility',
      'terms.art4.title': '4. Artificial intelligence',
      'terms.art4.text': 'Galac6 uses AI models to guide learning. AI does not replace human teaching. Generated responses may contain errors. Galac6 does not guarantee the absolute accuracy of AI-generated content.',
      'terms.art5.title': '5. Intellectual property',
      'terms.art5.text': 'The Galac6 platform, its design, source code and content are protected by intellectual property law. Content generated by the AI during use of the service remains the property of the user.',
      'terms.art6.title': '6. Pricing and payment',
      'terms.art6.text': 'Use of Galac6 requires a subscription. Current prices are available on the <a href="/tarifs">pricing page</a>. AI consumption is billed based on usage. Payment is handled by Stripe, a secure payment provider.',
      'terms.art7.title': '7. Limitation of liability',
      'terms.art7.intro': 'Galac6 shall not be held liable for:',
      'terms.art7.li1': 'Temporary service interruptions',
      'terms.art7.li2': 'Errors in AI-generated content',
      'terms.art7.li3': 'Non-compliant use of the service by the user',
      'terms.art7.li4': 'Academic results obtained by the student',
      'terms.art8.title': '8. Termination',
      'terms.art8.text': 'The user may terminate their account at any time. Galac6 reserves the right to suspend or delete an account in case of violation of these Terms of Use.',
      'terms.art9.title': '9. Applicable law',
      'terms.art9.text': 'These Terms of Use are governed by French law. Any dispute shall be submitted to the competent courts of Paris.',
      'terms.lastupdate': 'Last updated: February 25, 2026',

      // ─── Legal Notices (Mentions légales) ───
      'mentions.title': 'Legal Notices',
      'mentions.subtitle': 'In accordance with Law No. 2004-575 of June 21, 2004 (LCEN) and the GDPR \u2014 Last updated: February 25, 2026',
      'mentions.art1.title': '1. Website publisher',
      'mentions.art1.company_name': 'Company name',
      'mentions.art1.legal_form': 'Legal form',
      'mentions.art1.legal_form_val': 'Sole proprietorship',
      'mentions.art1.address': 'Registered address',
      'mentions.art1.email': 'Contact email',
      'mentions.art1.director': 'Publication director',
      'mentions.art1.trade_name': 'Service trade name',
      'mentions.art2.title': '2. Hosting',
      'mentions.art2.static_title': 'Static website',
      'mentions.art2.app_title': 'Application and database',
      'mentions.art2.host': 'Host',
      'mentions.art2.address_label': 'Address',
      'mentions.art2.data_location': 'Data location',
      'mentions.art2.website': 'Website',
      'mentions.art2.netlify_location': 'European Union (Ireland)',
      'mentions.art2.supabase_location': 'France (European Union)',
      'mentions.art3.title': '3. Intellectual property',
      'mentions.art3.p1': 'All content on the galac6.io website (text, images, graphics, logo, icons, software, general structure) is the exclusive property of RHK Conseil or is used under authorization.',
      'mentions.art3.p2': 'Any reproduction, representation, modification, publication or adaptation, in whole or in part, of the elements of the site, by any means or process, is prohibited without prior written authorization from RHK Conseil.',
      'mentions.art3.p3': 'The name "Galac6", the logo and associated graphic elements are trademarks of RHK Conseil. Any unauthorized use constitutes counterfeiting punishable under articles L.335-2 et seq. of the French Intellectual Property Code.',
      'mentions.art4.title': '4. Personal data protection (GDPR)',
      'mentions.art4.s1.title': '4.1 Data controller',
      'mentions.art4.s1.text': 'RHK Conseil, represented by Raphael Haik.<br>Contact: <a href="mailto:hello@galac6.io">hello@galac6.io</a>',
      'mentions.art4.s2.title': '4.2 Data collected on the marketing website',
      'mentions.art4.s2.intro': 'The public marketing website may collect the following data:',
      'mentions.art4.s2.th1': 'Data',
      'mentions.art4.s2.th2': 'Purpose',
      'mentions.art4.s2.th3': 'Legal basis',
      'mentions.art4.s2.email_data': 'Email address (contact form / newsletter)',
      'mentions.art4.s2.email_purpose': 'Responding to inquiries, sending commercial information',
      'mentions.art4.s2.email_basis': 'Consent (Art. 6.1.a GDPR)',
      'mentions.art4.s2.nav_data': 'Browsing data (technical cookies)',
      'mentions.art4.s2.nav_purpose': 'Website operation',
      'mentions.art4.s2.nav_basis': 'Legitimate interest (Art. 6.1.f GDPR)',
      'mentions.art4.s3.title': '4.3 Data collected on the Galac6 application',
      'mentions.art4.s3.intro': 'When creating an account on the application, the following data is collected:',
      'mentions.art4.s3.identity': '<strong>Identity data</strong>: email, student name, year of birth, grade level, language',
      'mentions.art4.s3.activity': '<strong>Educational activity data</strong>: conversations, quiz results, dictations, revision sheets, statistics',
      'mentions.art4.s3.billing': '<strong>Billing data</strong>: email, Stripe customer ID, subscription ID',
      'mentions.art4.s3.sensitive': '<strong>Sensitive data</strong> (with explicit consent, Art. 9 GDPR): educational accommodations (dyslexia, dyspraxia, etc.)',
      'mentions.art4.s4.title': '4.4 Recipients and sub-processors',
      'mentions.art4.s4.th1': 'Sub-processor',
      'mentions.art4.s4.th2': 'Role',
      'mentions.art4.s4.th3': 'Location',
      'mentions.art4.s4.th4': 'Safeguards',
      'mentions.art4.s4.supabase_role': 'Database, server functions',
      'mentions.art4.s4.supabase_loc': 'France (EU)',
      'mentions.art4.s4.supabase_guar': 'Data hosted in France',
      'mentions.art4.s4.netlify_role': 'Static website hosting',
      'mentions.art4.s4.netlify_loc': 'Ireland (EU)',
      'mentions.art4.s4.netlify_guar': 'Data hosted in the EU',
      'mentions.art4.s4.anthropic_role': 'Conversational AI',
      'mentions.art4.s4.anthropic_loc': 'USA',
      'mentions.art4.s4.anthropic_guar': 'Standard Contractual Clauses (Art. 46 GDPR)',
      'mentions.art4.s4.mistral_role': 'Conversational AI',
      'mentions.art4.s4.mistral_loc': 'France (EU)',
      'mentions.art4.s4.mistral_guar': 'Data in the EU',
      'mentions.art4.s4.openai_role': 'Speech transcription',
      'mentions.art4.s4.openai_loc': 'USA',
      'mentions.art4.s4.openai_guar': 'Standard Contractual Clauses (Art. 46 GDPR)',
      'mentions.art4.s4.google_role': 'Text-to-speech',
      'mentions.art4.s4.google_loc': 'USA',
      'mentions.art4.s4.google_guar': 'Standard Contractual Clauses (Art. 46 GDPR)',
      'mentions.art4.s4.stripe_role': 'Online payment',
      'mentions.art4.s4.stripe_loc': 'USA',
      'mentions.art4.s4.stripe_guar': 'PCI-DSS certified, GDPR compliant',
      'mentions.art4.s4.resend_role': 'Transactional emails',
      'mentions.art4.s4.resend_loc': 'USA',
      'mentions.art4.s4.resend_guar': 'Standard Contractual Clauses (Art. 46 GDPR)',
      'mentions.art4.s4.notice': 'No data is used to train AI models.',
      'mentions.art4.s5.title': '4.5 Data retention periods',
      'mentions.art4.s5.th1': 'Category',
      'mentions.art4.s5.th2': 'Duration',
      'mentions.art4.s5.account': 'Account data',
      'mentions.art4.s5.account_dur': 'Account lifetime + 1 year after deletion',
      'mentions.art4.s5.activity': 'Educational activity data',
      'mentions.art4.s5.activity_dur': '2 years or end of schooling + 1 year',
      'mentions.art4.s5.billing': 'Billing data',
      'mentions.art4.s5.billing_dur': 'Legal retention period (10 years, Art. L.123-22 French Commercial Code)',
      'mentions.art4.s5.inactive': 'Inactive accounts',
      'mentions.art4.s5.inactive_dur': 'Deletion after 2 years of inactivity',
      'mentions.art4.s6.title': '4.6 Protection of minors',
      'mentions.art4.s6.intro': 'Galac6 is intended for students from 1st to 12th grade. In accordance with Article 8 of the GDPR and Article 45 of the French Data Protection Act:',
      'mentions.art4.s6.li1': 'Parental consent is required for children under 15 years of age.',
      'mentions.art4.s6.li2': 'This consent is collected during account creation.',
      'mentions.art4.s6.li3': 'Parents have a comprehensive dashboard to supervise their children\'s activity.',
      'mentions.art4.s7.title': '4.7 User rights',
      'mentions.art4.s7.intro': 'In accordance with the GDPR, you have the following rights:',
      'mentions.art4.s7.th1': 'Right',
      'mentions.art4.s7.th2': 'GDPR Article',
      'mentions.art4.s7.access': 'Right of access',
      'mentions.art4.s7.rectification': 'Right to rectification',
      'mentions.art4.s7.erasure': 'Right to erasure ("right to be forgotten")',
      'mentions.art4.s7.restriction': 'Right to restriction of processing',
      'mentions.art4.s7.portability': 'Right to data portability',
      'mentions.art4.s7.objection': 'Right to object',
      'mentions.art4.s7.withdraw': 'Right to withdraw consent',
      'mentions.art4.s7.contact': 'To exercise your rights, contact us at: <strong><a href="mailto:hello@galac6.io">hello@galac6.io</a></strong>',
      'mentions.art4.s7.cnil': 'In case of dispute, you may file a complaint with the <strong>CNIL</strong> (Commission Nationale de l\'Informatique et des Libert\u00e9s):',
      'mentions.art4.s7.cnil_site': 'Website: <a href="https://www.cnil.fr" target="_blank" rel="noopener">www.cnil.fr</a>',
      'mentions.art4.s7.cnil_address': 'Address: 3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07',
      'mentions.art5.title': '5. Cookies',
      'mentions.art5.s1.title': '5.1 Cookies used',
      'mentions.art5.s1.th1': 'Cookie / Storage',
      'mentions.art5.s1.th2': 'Type',
      'mentions.art5.s1.th3': 'Purpose',
      'mentions.art5.s1.th4': 'Duration',
      'mentions.art5.s1.th5': 'Consent',
      'mentions.art5.s1.consent_purpose': 'Remember the user\'s cookie choice',
      'mentions.art5.s1.consent_duration': 'Permanent',
      'mentions.art5.s1.consent_consent': 'Exempt (consent cookie)',
      'mentions.art5.s1.sidebar_purpose': 'Remember sidebar panel state',
      'mentions.art5.s1.sidebar_duration': '7 days',
      'mentions.art5.s1.sidebar_consent': 'Required (only if accepted)',
      'mentions.art5.s1.theme_purpose': 'Light/dark theme preference',
      'mentions.art5.s1.theme_duration': 'Permanent',
      'mentions.art5.s1.theme_consent': 'Exempt (strictly functional)',
      'mentions.art5.s1.font_data': 'Font size preference',
      'mentions.art5.s1.font_purpose': 'Accessibility',
      'mentions.art5.s1.font_duration': 'Permanent',
      'mentions.art5.s1.font_consent': 'Exempt (strictly functional)',
      'mentions.art5.s2.title': '5.2 No advertising or tracking cookies',
      'mentions.art5.s2.text': 'Galac6 does not use <strong>any advertising cookies, tracking cookies or third-party analytics tools</strong> (no Google Analytics, Facebook Pixel, etc.).',
      'mentions.art5.s3.title': '5.3 Cookie management',
      'mentions.art5.s3.text': 'A consent banner is displayed on the first visit. The user may accept or refuse non-essential cookies. Strictly functional cookies (theme, accessibility) are exempt from consent in accordance with the ePrivacy Directive.',
      'mentions.art6.title': '6. Hyperlinks',
      'mentions.art6.text': 'The galac6.io website may contain links to third-party sites. RHK Conseil has no control over the content of these sites and disclaims all responsibility for their content or data protection practices.',
      'mentions.art7.title': '7. Limitation of liability',
      'mentions.art7.p1': 'RHK Conseil endeavors to ensure the accuracy and currency of the information published on the site. However, RHK Conseil cannot guarantee the accuracy, precision or completeness of the information available.',
      'mentions.art7.p2': 'Galac6 is a learning support tool and does not replace teaching provided by teachers and the French National Education system. Content generated by artificial intelligence is provided for informational and educational purposes.',
      'mentions.art7.p3': 'RHK Conseil shall not be held liable for:',
      'mentions.art7.li1': 'Temporary service interruptions for maintenance or updates.',
      'mentions.art7.li2': 'Temporary inability to access the site due to technical reasons beyond its control.',
      'mentions.art7.li3': 'Direct or indirect damages resulting from the use of the site or the application.',
      'mentions.art8.title': '8. Applicable law and jurisdiction',
      'mentions.art8.p1': 'These legal notices are governed by French law.',
      'mentions.art8.p2': 'In case of dispute, and after an attempt at amicable resolution, jurisdiction is granted to the competent courts of Paris.',
      'mentions.art8.mediation_title': 'Consumer mediation',
      'mentions.art8.mediation_text': 'In accordance with articles L.611-1 et seq. of the French Consumer Code, consumers may use a consumer mediator free of charge for amicable dispute resolution. The competent mediator will be communicated upon request at <a href="mailto:hello@galac6.io">hello@galac6.io</a>.',
      'mentions.art9.title': '9. Credits',
      'mentions.art9.th1': 'Element',
      'mentions.art9.th2': 'Source',
      'mentions.art9.dev': 'Development',
      'mentions.art9.icons': 'Icons',
      'mentions.art9.icons_val': 'Lucide Icons (MIT license)',
      'mentions.art9.fonts': 'Fonts',
      'mentions.art9.fonts_val': 'Inter, OpenDyslexic (open-source licenses)',
      'mentions.art9.images': 'Illustrations',
      'mentions.art9.images_val': 'AI-generated images or under free license',
      'mentions.docs.title': 'Supplementary legal documents',
      'mentions.lastupdate': 'Last updated: February 25, 2026',

      // ─── Installation Guide ───
      'guide.back': '\u2190 Galac6 Home',
      'guide.toc': 'Table of contents',
      'guide.toc.download': 'Download',
      'guide.toc.prereq': 'Prerequisites',
      'guide.toc.install': 'Install Galac6',
      'guide.toc.gatekeeper': 'Gatekeeper fix',
      'guide.toc.firstlaunch': 'First launch',
      'guide.toc.update': 'Update',
      'guide.toc.uninstall': 'Uninstall',
      'guide.toc.support': 'Support',
      'guide.title': 'Installation',
      'guide.intro': 'Everything you need to install Galac6 on your child\'s Mac. Installation takes less than 5 minutes.',
      'guide.prototype': '<strong>Prototype:</strong> Galac6 is currently available only on <strong>macOS</strong> (Apple Silicon and Intel). A Windows/Linux version may follow based on feedback.',
      'guide.download.title': 'Download',
      'guide.download.text': 'Galac6 is currently in <strong>private beta</strong>. To receive the download link, sign up with your email:',
      'guide.download.cta': '\ud83d\udce9 Request beta access',
      'guide.prereq.title': 'Prerequisites',
      'guide.prereq.macos': '<strong>macOS 10.15</strong> (Catalina) or later',
      'guide.prereq.admin': 'An <strong>administrator account</strong> on the Mac',
      'guide.prereq.disk': 'Approximately <strong>50 MB</strong> of disk space',
      'guide.install.title': 'Install Galac6',
      'guide.install.step1': 'Double-click the downloaded <strong>.dmg</strong> file',
      'guide.install.step2': 'A window opens showing the <strong>Galac6</strong> application',
      'guide.install.step3': 'Drag <strong>Galac6</strong> into the <strong>Applications</strong> folder',
      'guide.install.step4': 'Close the DMG window',
      'guide.install.done': '<strong>That\'s it!</strong> Installation is complete. The application is in the Applications folder.',
      'guide.gatekeeper.title': 'Gatekeeper fix',
      'guide.gatekeeper.p1': 'If macOS displays the message <strong>\u201cGalac6 is damaged and can\'t be opened\u201d</strong>, it\'s because the application is not signed with an Apple certificate (beta version).',
      'guide.gatekeeper.p2': 'To fix this, open <strong>Terminal</strong> (Applications \u2192 Utilities \u2192 Terminal) and run:',
      'guide.gatekeeper.p3': 'Then relaunch Galac6 normally. This command only needs to be run <strong>once</strong>.',
      'guide.gatekeeper.explain': '<strong>Explanation:</strong> <code>xattr -cr</code> removes the \u201cquarantine\u201d attribute that macOS adds to downloaded files. This is a standard procedure for development applications not distributed via the App Store.',
      'guide.firstlaunch.title': 'First launch',
      'guide.firstlaunch.p1': 'On first launch, macOS displays a <strong>Keychain Access</strong> window:',
      'guide.firstlaunch.prompt': '\u201cgalac6 wants to use your confidential information stored in \u201cgalac6\u201d in your keychain\u201d',
      'guide.firstlaunch.step1': 'Enter your <strong>macOS session password</strong> (the one used to unlock the Mac)',
      'guide.firstlaunch.step2': 'Click <strong>\u201cAlways Allow\u201d</strong>',
      'guide.firstlaunch.explain': '<strong>Keychain Access:</strong> Galac6 uses the macOS Keychain to securely store API keys. By clicking \u201cAlways Allow\u201d, you avoid this prompt appearing on every launch.',
      'guide.firstlaunch.opens': 'The application then opens to the built-in setup wizard in Galac6.',
      'guide.update.title': 'Update',
      'guide.update.intro': 'To update Galac6:',
      'guide.update.step1': 'Download the new .dmg file',
      'guide.update.step2': 'Open the DMG and drag <strong>Galac6</strong> into <strong>Applications</strong> (replace the old version)',
      'guide.update.preserved': '<strong>Data preserved:</strong> all your data is preserved during an update (student profiles, conversations, configuration, API keys).',
      'guide.uninstall.title': 'Uninstall',
      'guide.uninstall.intro': 'To remove Galac6:',
      'guide.uninstall.step1': 'Quit the application (Cmd+Q)',
      'guide.uninstall.step2': 'Drag <strong>Galac6.app</strong> from <code>/Applications</code> to the Trash',
      'guide.uninstall.cleanup_title': 'Full cleanup (optional)',
      'guide.uninstall.cleanup_intro': 'To also remove user data:',
      'guide.uninstall.hosts_intro': 'If the AI filter was active, clean the /etc/hosts file:',
      'guide.support.title': 'Support',
      'guide.support.text': 'For any questions: <a href="mailto:hello@galac6.io"><strong>hello@galac6.io</strong></a>'
    }
  };

  // ─── Stockage du texte français original ───
  var originalFR = new Map();
  var originalFRhtml = new Map();
  var initialized = false;

  /**
   * Sauvegarde le texte FR original de tous les éléments taggés
   */
  function storeOriginals() {
    if (initialized) return;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      originalFR.set(el, el.textContent);
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      originalFRhtml.set(el, el.innerHTML);
    });
    initialized = true;
  }

  /**
   * Applique la langue donnée ('fr' ou 'en')
   */
  function applyLanguage(lang) {
    storeOriginals();

    if (lang === 'en') {
      // Remplacer le texte des éléments data-i18n (textContent)
      document.querySelectorAll('[data-i18n]').forEach(function (el) {
        var key = el.getAttribute('data-i18n');
        if (translations.en[key]) {
          el.textContent = translations.en[key];
        }
      });
      // Remplacer le HTML des éléments data-i18n-html (innerHTML)
      document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
        var key = el.getAttribute('data-i18n-html');
        if (translations.en[key]) {
          el.innerHTML = translations.en[key];
        }
      });
      // Afficher les éléments EN uniquement
      document.querySelectorAll('.en-only').forEach(function (el) {
        el.style.display = '';
      });
      // Masquer les éléments FR uniquement
      document.querySelectorAll('.fr-only').forEach(function (el) {
        el.style.display = 'none';
      });
    } else {
      // Restaurer le texte FR original
      originalFR.forEach(function (text, el) {
        if (el.isConnected) el.textContent = text;
      });
      originalFRhtml.forEach(function (html, el) {
        if (el.isConnected) el.innerHTML = html;
      });
      // Masquer les éléments EN uniquement
      document.querySelectorAll('.en-only').forEach(function (el) {
        el.style.display = 'none';
      });
      // Afficher les éléments FR uniquement
      document.querySelectorAll('.fr-only').forEach(function (el) {
        el.style.display = '';
      });
    }

    // Mettre à jour la balise <html lang>
    document.documentElement.lang = lang;

    // Mettre à jour le titre de la page
    if (translations.en['page.title']) {
      if (lang === 'en') {
        document.title = translations.en['page.title'];
      } else {
        // Titre FR par défaut — on le garde tel qu'il était au chargement
        document.title = window._originalTitle || document.title;
      }
    }

    // Mettre à jour le bouton toggle
    var toggleBtn = document.getElementById('lang-toggle');
    if (toggleBtn) {
      toggleBtn.textContent = lang === 'fr' ? '🇬🇧' : '🇫🇷';
      toggleBtn.setAttribute('aria-label', lang === 'fr' ? 'Switch to English' : 'Passer en français');
    }

    // Sauvegarder le choix
    try {
      localStorage.setItem('galac6-lang', lang);
    } catch (e) {
      // localStorage indisponible (navigation privée, etc.)
    }
  }

  /**
   * Bascule entre FR et EN
   */
  function toggleLanguage() {
    var current = document.documentElement.lang || 'fr';
    var next = current === 'fr' ? 'en' : 'fr';
    applyLanguage(next);
  }

  /**
   * Ferme la bannière EN
   */
  function closeBanner() {
    var banner = document.getElementById('en-banner');
    if (banner) banner.style.display = 'none';
    try {
      sessionStorage.setItem('galac6-banner-closed', '1');
    } catch (e) {}
  }

  // ─── Initialisation au chargement de la page ───
  function init() {
    // Sauvegarder le titre FR original
    window._originalTitle = document.title;

    // Vérifier si un choix a déjà été fait
    var savedLang = null;
    try {
      savedLang = localStorage.getItem('galac6-lang');
    } catch (e) {}

    if (savedLang === 'en') {
      applyLanguage('en');
    } else {
      // Français par défaut — juste masquer les éléments en-only
      storeOriginals();
      document.querySelectorAll('.en-only').forEach(function (el) {
        el.style.display = 'none';
      });
    }

    // Si la bannière a été fermée dans cette session, la garder fermée
    try {
      if (sessionStorage.getItem('galac6-banner-closed') === '1') {
        var banner = document.getElementById('en-banner');
        if (banner) banner.style.display = 'none';
      }
    } catch (e) {}
  }

  // Exposer les fonctions globalement
  window.toggleLanguage = toggleLanguage;
  window.closeBanner = closeBanner;

  // Lancer l'initialisation
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
