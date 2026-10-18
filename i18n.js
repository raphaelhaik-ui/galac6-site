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
      'hero.cta': 'Create a free account →',
      'hero.school.tag': 'Schools',
      'hero.school.long': 'Are you a school? Transform your teaching capacity with Galac6',
      'hero.school.short': 'Are you a school? Discover Galac6',
      'hero.free.pill': '⭐ NEW',
      'hero.free.headline': 'Galac6 is <span class="gradient">100% free</span>',
      'hero.free.sub': 'Unlimited access to every feature. No credit card.',
      'hero.reassurance': '🇫🇷 Designed in France, data hosted in France.',

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

      // Confidentialité et sécurité (composant partagé)
      'pledge.title': 'Privacy & security',
      'pledge.subtitle': 'Our four commitments for students\' data.',
      'pledge.p1': 'Data hosted in France',
      'pledge.p2': 'AI processed in Europe',
      'pledge.p3': 'In line with the GDPR',
      'pledge.p4': 'Your data is never sold or used for advertising',
      'pledge.more': 'Learn more',
      'pledge.more2': 'Student data: the details',

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
      'faq.a7': 'Yes, and it\'s non-negotiable. Galac6 is <strong>designed in France</strong>, in line with the GDPR. Data is hosted in France and Galac6\'s artificial intelligence is processed in Europe; only a few technical services, such as hosting of the website, rely on providers located outside the European Union. We never sell your children\'s data to third parties. The privacy and security of minors\' data are at the core of our design.',

      'faq.q8': 'What subjects and grade levels are covered?',
      'faq.a8': 'Galac6 covers the main subjects of the French curriculum: <strong>French, Mathematics, History-Geography, Sciences, English</strong> and more — <strong>from 1st to 12th grade</strong>. Content automatically adapts to the student\'s level and grade.',

      'faq.q9': 'Can parents track their child\'s progress?',
      'faq.a9': 'Yes. Parents have access to a tracking dashboard to see subjects studied, progress made and areas to improve. At Galac6, we believe in the <strong>active role of parents</strong> in education — the tool is designed to strengthen that bond, not replace it.',

      'faq.q10': 'Is Galac6 free?',
      'faq.a10': 'Yes, completely. <strong>Every new user gets unlimited, free access to all features</strong> — quizzes, dictations, revision sheets, corrections. No credit card and no time limit.',

      'faq.q11': 'Is Galac6 available in my country?',
      'faq.a11': 'Galac6 is currently available in <strong>France only</strong>, as it is designed around the French school curriculum (Éducation Nationale). If you\'d like Galac6 in your country, <a href="mailto:hello@galac6.io">contact us</a> — we\'re exploring international expansion and would love to hear from you!',

      'faq.cta.text': 'Can\'t find your question here?',
      'faq.cta.button': 'Contact us →',

      // Pricing
      'pricing.title': 'Galac6 is 100% free.',
      'pricing.free.name': 'Free',
      'pricing.free.amount': '0 <span class="currency">€</span>',
      'pricing.free.detail': 'Every feature, unlimited. No credit card.',
      'pricing.free.cta': 'Create a free account →',
      'pricing.badge': '⭐ Full access',
      'pricing.note': 'No payment, no credit card. For schools: <a href="/ecole">contact us →</a>',

      // Final CTA
      'cta.title': 'Ready to make progress?',
      'cta.button': 'Create a free account →',
      'cta.note': 'Unlimited access, 100% free. No credit card.',

      // Footer
      'footer.hosted': '🇫🇷 Designed in France · Data hosted in France',
      'footer.copy': '© 2026 Galac6. All rights reserved.',
      'footer.legal.title': 'Legal',
      'footer.legal.mentions': 'Legal notices',
      'footer.legal.cgu': 'Terms of use',
      'footer.legal.privacy': 'Privacy policy',
      'footer.legal.cgv': 'Terms of sale',
      'footer.cookies': 'Manage cookies',
      'footer.contact.title': 'Contact',
      'footer.contact.about': 'About',
      'footer.contact.school': 'Schools →',

      // Banner EN
      'banner.text': '🌍 Currently available in France only (French school system). Want Galac6 in your country? <a href="mailto:hello@galac6.io" style="color:#fff;text-decoration:underline;">Send a request →</a>',

      // ─── Shared across pages ───
      'about.nav.home': 'Home',

      // ─── Tarifs page ───
      'tarifs.badge': '12-month subscription from the date of payment',
      'tarifs.title': 'Simple, <span class="grad">clear pricing</span>',
      'tarifs.sub': 'A free plan with every feature in limited amounts, and an unlimited subscription for one child or for the whole family. For schools, a quote based on the number of pupils.',
      'tarifs.jump.fam': 'Families',
      'tarifs.jump.etab': 'Schools',
      'tarifs.fam.eyebrow': 'Families · prices include VAT',
      'tarifs.fam.title': 'Choose your plan',
      'tarifs.bill.year': 'Yearly <span class="seg-save">up to −31%</span>',
      'tarifs.bill.month': 'Monthly',
      'tarifs.flag': 'Recommended',
      'tarifs.free.name': 'Discovery',
      'tarifs.free.for': 'Every feature, in limited amounts',
      'tarifs.free.price': '€0',
      'tarifs.free.alt': 'No credit card and no time limit. Allowances reset every month.',
      'tarifs.free.month': 'Every month',
      'tarifs.free.q1': '<b>5</b> messages to the tutor',
      'tarifs.free.q2': '<b>1</b> dictation',
      'tarifs.free.q3': '<b>1</b> quiz',
      'tarifs.free.q4': '<b>1</b> homework help with a photo',
      'tarifs.free.q5': '<b>1</b> brevet or bac-style paper',
      'tarifs.free.t1': 'Mental maths, daily challenge and games',
      'tarifs.free.t2': 'Simplified performance report',
      'tarifs.free.example': 'Example',
      'tarifs.free.limit': 'You have used your questions for this month. Come back next month or switch to the Student plan.',
      'tarifs.free.cta': 'Start for free',
      'tarifs.free.note': 'No credit card',
      'tarifs.eleve.name': 'Student',
      'tarifs.eleve.for': 'One child',
      'tarifs.eleve.t1': 'All of Galac6, unlimited',
      'tarifs.eleve.t2': 'Personal report on their performance',
      'tarifs.eleve.t3': 'Brevet and bac-style papers for practice',
      'tarifs.eleve.cta': 'Choose Student',
      'tarifs.fam.name': 'Family',
      'tarifs.fam.for': 'Up to 4 children',
      'tarifs.fam.t1': '<b>Progress reports for parents, for each child</b>',
      'tarifs.fam.t2': 'All of Galac6, unlimited, for each child',
      'tarifs.fam.t3': 'From CP to Terminale (ages 6 to 18)',
      'tarifs.fam.t4': 'Screen time settings for each child',
      'tarifs.fam.cta': 'Choose Family',
      'tarifs.pack.eyebrow': 'Add-on · one-off purchase, valid for 12 months',
      'tarifs.pack.title': 'Exam Pack: brevet, bac and Concours général',
      'tarifs.pack.sub': 'To practise in real exam conditions, in 3e, 1re or Terminale.',
      'tarifs.pack.t1': 'Full, timed mock exams on real papers',
      'tarifs.pack.t2': 'Each paper marked twice, with a mark out of 20',
      'tarifs.pack.t3': 'Spoken mock orals: brevet oral, French bac oral',
      'tarifs.pack.t4': 'Detailed review of the points to work on',
      'tarifs.pack.t5': 'Concours général in maths (Terminale): official papers, help question by question',
      'tarifs.pack.price': '€19',
      'tarifs.pack.per': 'per student',
      'tarifs.pack.year': '<b style="font-size:1rem;color:var(--text)">€14</b> with a yearly subscription',
      'tarifs.pack.cta': 'Choose the Exam Pack',
      'tarifs.ref.title': 'Referral',
      'tarifs.ref.big': '−€10',
      'tarifs.ref.desc': 'For yearly subscriptions only. You introduce Galac6 to another family who takes out a yearly subscription: €10 off for each of you. Up to 3 referrals per year, deducted from your next renewal.',
      'tarifs.ref.ex': 'Up to −€30: Student €39 instead of €69',
      'tarifs.etab.eyebrow': 'Primary, middle and high schools',
      'tarifs.etab.title': 'For schools, pricing on quote',
      'tarifs.etab.lead': 'The price depends on the number of pupils and the modules chosen. Teacher, management and parent accounts are free and unlimited.',
      'tarifs.sp1.name': 'To get started',
      'tarifs.sp1.title': 'Pupil module<small>Price based on the number of pupils</small>',
      'tarifs.sp1.t1': 'The full Galac6 tutor for every pupil',
      'tarifs.sp1.t2': 'Tools switched on or off by the school',
      'tarifs.sp1.t3': 'Screen time in class',
      'tarifs.sp1.t4': 'Report to parents',
      'tarifs.sp1.t5': 'Usage dashboard for the management',
      'tarifs.sp2.name': 'The most complete',
      'tarifs.sp2.title': 'Pupil + School<small>Price based on the number of pupils</small>',
      'tarifs.sp2.t1': 'Everything in the Pupil module',
      'tarifs.sp2.t2': 'Teacher space: classes, homework, quizzes, dictations',
      'tarifs.sp2.t3': 'Creation of homework, quizzes and tests, marked by the AI and approved by the teacher',
      'tarifs.sp2.t4': 'Pupil profile, analytics, individual report',
      'tarifs.sp2.t5': 'Management view and class council reports',
      'tarifs.sp3.name': 'Add-on',
      'tarifs.sp3.title': 'Exams and Oral<small>For 3e, 1re and Terminale classes</small>',
      'tarifs.sp3.t1': 'Mock brevet and bac exams, each marked twice',
      'tarifs.sp3.t2': 'Spoken quizzes and mock orals',
      'tarifs.sp3.t3': 'Adds to the Pupil module or to Pupil + School',
      'tarifs.quote': 'Request a quote',
      'tarifs.cmp.h0': 'What is included',
      'tarifs.cmp.h1': 'Pupil module',
      'tarifs.cmp.h2': 'Pupil + School',
      'tarifs.cmp.h3': '+ Exams and Oral',
      'tarifs.cmp.r1': 'Tutor, exercises, homework help',
      'tarifs.cmp.r2': 'Dictations, mental maths, quizzes, revision sheets, games',
      'tarifs.cmp.r3': 'Classes, homework with due dates',
      'tarifs.cmp.r4': 'Homework and tests created and marked by the AI',
      'tarifs.cmp.r5': 'Pupil profile, analytics, individual report',
      'tarifs.cmp.r6': 'Mock brevet and bac exams, mock orals',
      'tarifs.pilot.text': '<b>Free 3-month pilot.</b> You try Galac6 on 3 classes for 3 months, with no commitment. At the end of the pilot, we give you a quote for what comes next.',
      'tarifs.pilot.cta': 'Become a pilot school',
      'tarifs.faq.eyebrow': 'Frequently asked questions',
      'tarifs.faq.title': 'Before you subscribe',
      'tarifs.faq.q1': 'What does the free Discovery plan include?',
      'tarifs.faq.a1': 'Every Galac6 feature, in limited amounts. Each month: 5 messages to the tutor, one dictation, one quiz, one homework help with a photo and one brevet or bac-style paper. Allowances reset every month, with no time limit and no credit card.',
      'tarifs.faq.q2': 'What happens when the monthly limit is reached?',
      'tarifs.faq.a2': 'Galac6 tells the student that they have used their questions for the month. They can come back the following month, when the allowance resets, or switch to a paid plan. The Student and Family plans are unlimited.',
      'tarifs.faq.q3': 'Can I cancel my subscription?',
      'tarifs.faq.a3': 'Yes. The monthly subscription has no commitment and can be cancelled in one click. The yearly subscription renews automatically on its anniversary date. You can turn off renewal at any time in your account, and we send you a reminder beforehand.',
      'tarifs.faq.q4': 'Is payment secure?',
      'tarifs.faq.a4': 'Yes. Card payments go through a secure payment provider: Galac6 never sees your card number. In the mobile app, purchases go through the App Store or Google Play.',
      'tarifs.faq.q5': 'Where is my child\'s data?',
      'tarifs.faq.a5': 'Data is hosted in France, in a database in Paris. No ads, no resale of data.',
      'tarifs.faq.a5b': 'Galac6\'s artificial intelligence is processed in Europe; only a few technical services, such as hosting of the website, rely on providers located outside the European Union. The list is in our privacy policy.',
      'tarifs.faq.q6': 'I already have a free account. What will happen?',
      'tarifs.faq.a6': 'Current users will be informed before any change.',
      'tarifs.faq.q7': 'My child uses Galac6 with their school. Do I have to pay?',
      'tarifs.faq.a7': 'What the school provides is paid for by the school. For free practice at home, you can choose the Student or Family plan.',
      'tarifs.faq.q8': 'How much does Galac6 cost for a school?',
      'tarifs.faq.a8': 'The price is set on quote, based on the number of pupils and the modules chosen. To discover Galac6, we offer a free 3-month pilot on 3 classes.',
      'tarifs.footer.desc': 'Galac6 — The AI tutoring and revision assistant.',
      'tarifs.footer.france': '🇫🇷 Made in France',

      // ─── About page ───
      'about.title': 'About Galac6',
      'about.p1': 'Engineer, entrepreneur, and above all father of 3 children, I created Galac6 from a simple observation: homework takes up a huge part of family life \u2014 and it is a source of stress, both for children and parents.',
      'about.p2': 'Like you, I saw the temptation of ChatGPT: fast, available at all hours, capable of explaining everything. But also ill-suited to school, and almost impossible to use without cheating.',
      'about.p3': 'So I developed Galac6 to offer an alternative designed for students: an AI that helps understand, revise and progress \u2014 without doing homework for them. Galac6 leverages the best AI models on the market (Anthropic, Google, Mistral), used where each one excels, to guarantee relevant and educational responses.',
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
      'ecole.badge': 'Free 3-month pilot on 3 classes',
      'ecole.hero.title': 'The AI that saves time <span class="grad">for your whole school</span>',
      'ecole.hero.sub': 'Galac6 takes care of the repetitive work, so your teachers can focus on what matters.',
      'ecole.cta.quote': 'Request a quote',
      'ecole.quick.title': 'Ask us to get back to you',
      'ecole.quick.title2': 'Or leave us your details and we will get back to you',
      'ecole.quick.send': 'Send',
      'ecole.ctrl.eyebrow': 'An augmented school',
      'ecole.ctrl.title': 'Your school\'s teaching capacity, boosted',
      'ecole.ctrl.p1.title': 'Unique teaching innovations',
      'ecole.ctrl.p1.desc': 'Tools designed to make every pupil think, at their own pace.',
      'ecole.ctrl.p2.title': 'The teacher stays in charge',
      'ecole.ctrl.p2.desc': 'They decide what Galac6 offers their pupils.',
      'ecole.ctrl.p3.title': 'More time to teach',
      'ecole.ctrl.p3.desc': 'Time given back for teaching and for supporting each pupil.',
      'ecole.prom.eyebrow': 'What Galac6 changes',
      'ecole.prom.title': 'For your teachers, your pupils and their families',
      'ecole.prom.p1.title': 'Homework ready in minutes',
      'ecole.prom.p1.desc': 'Galac6 prepares homework and its marking from your instructions.',
      'ecole.prom.p2.title': 'Every class at a glance',
      'ecole.prom.p2.desc': 'Your classes\' averages and progress are always up to date.',
      'ecole.prom.p3.title': 'Every pupil better understood',
      'ecole.prom.p3.desc': 'Their strengths and the topics to review show up at a glance.',
      'ecole.prom.p4.title': 'The opposite of ordinary AI',
      'ecole.prom.p4.desc': 'Socratic: it questions the pupil and never gives them the answers.',
      'ecole.prom.p5.title': 'Parents involved',
      'ecole.prom.p5.desc': 'Families follow their child\'s work and homework.',
      'ecole.prom.p6.title': 'Data you can trust',
      'ecole.prom.p6.desc': 'Your data is protected and processed in line with the GDPR.',
      'ecole.trust.t1': 'Data hosted in France',
      'ecole.trust.t2': 'In line with the GDPR',
      'ecole.trust.t3': 'Innovation in the service of teaching',
      'ecole.steps.eyebrow': 'How it starts',
      'ecole.steps.title': 'Three steps, three classes to begin with',
      'ecole.steps.s1.title': 'A first conversation',
      'ecole.steps.s1.desc': 'We present Galac6 to you by video call.',
      'ecole.steps.s2.title': 'Your school\'s space',
      'ecole.steps.s2.desc': 'We open it, and the management invites the teachers.',
      'ecole.steps.s3.title': 'Your classes at work',
      'ecole.steps.s3.desc': 'Pupils join their class with a code.',
      'ecole.final.title': 'What if your school tried Galac6?',
      'ecole.final.sub': 'Get a quote tailored to the number of your pupils.',
      'ecole.devis.eyebrow': 'Schools',
      'ecole.devis.lead': 'Tell us in a few lines who you are. We will reply with a quote tailored to the number of your pupils, or a proposal to become a pilot school.',
      'ecole.devis.type': 'Your request',
      'ecole.devis.type.devis': 'A quote',
      'ecole.devis.type.pilote': 'Become a pilot school',
      'ecole.devis.type.demo': 'A demo',
      'ecole.f.nom': 'First and last name',
      'ecole.f.fonction': 'Role',
      'ecole.f.fonction.o1': 'Head of school',
      'ecole.f.fonction.o2': 'Primary school head',
      'ecole.f.fonction.o3': 'Teacher',
      'ecole.f.fonction.o4': 'School board or network',
      'ecole.f.fonction.o5': 'Other',
      'ecole.f.etab': 'School',
      'ecole.f.ville': 'City and country',
      'ecole.f.eleves': 'Number of pupils',
      'ecole.f.eleves.o1': 'Fewer than 200',
      'ecole.f.eleves.o2': '200 to 500',
      'ecole.f.eleves.o3': '501 to 1,000',
      'ecole.f.eleves.o4': 'More than 1,000',
      'ecole.f.eleves.o5': 'Several schools',
      'ecole.f.email': 'Work email',
      'ecole.f.email.err': 'Enter a full email address, for example firstname.lastname@school.com.',
      'ecole.f.niveaux': 'Levels concerned',
      'ecole.f.niveaux.prim': 'Primary school',
      'ecole.f.niveaux.coll': 'Middle school',
      'ecole.f.niveaux.lyc': 'High school',
      'ecole.f.modules': 'Modules you are interested in',
      'ecole.f.modules.eleve': 'Pupil module',
      'ecole.f.modules.ecole': 'Pupil + School',
      'ecole.f.modules.examens': 'Exams and Oral',
      'ecole.f.msg': 'Your message',
      'ecole.f.msg.hint': '(optional)',
      'ecole.f.consent': 'I agree that Galac6 may use this information to reply to my request.',
      'ecole.f.err': 'Fill in your name, your school and your email, and tick the consent box.',
      'ecole.f.submit': 'Send my request',
      'ecole.side.next.title': 'What happens next',
      'ecole.side.next.l1': 'We get back to you to understand your needs.',
      'ecole.side.next.l2': 'We offer you a twenty-minute demo by video call.',
      'ecole.side.next.l3': 'You receive a quote based on the number of pupils and the modules chosen.',
      'ecole.side.incl.title': 'Always included',
      'ecole.side.incl.l1': 'Free, unlimited accounts for teachers, management and parents',
      'ecole.side.incl.l2': 'Data hosted in France',
      'ecole.side.incl.l3': 'Onboarding and teacher training by video call in the first year',
      'ecole.side.pilot.title': 'Pilot schools',
      'ecole.side.pilot.desc': '3 free months on 3 classes, with no commitment.',
      'ecole.footer.desc': 'Galac6 — The AI tutoring and revision assistant.',
      'ecole.footer.france': '🇫🇷 Made in France',

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

      // (CGV, politique de confidentialité et CGU : textes FR/EN directement dans
      //  cgv.html, privacy.html et terms.html, blocs .fr-only / .en-only)

      // ─── Legal Notices (Mentions légales) ───
      'mentions.title': 'Legal Notices',
      'mentions.subtitle': 'In accordance with Law No. 2004-575 of June 21, 2004 (LCEN) and the GDPR \u2014 Last updated: October 18, 2026',
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
      'mentions.lastupdate': 'Last updated: October 18, 2026',

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
