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
      'page.title': 'Galac6 — AI in the service of teaching · Tutoring from 1st to 12th grade',

      // Navbar
      'nav.families': 'For families',
      'nav.school': 'For teachers and schools',
      // nav.features et nav.faq : encore utilisées par international.html (ancien menu anglais)
      'nav.features': 'For pupils',
      // 'nav.intl' : volontairement absent, le lien « Galac6 in your country » s'écrit en anglais dans toutes les langues
      'nav.faq': 'FAQ',
      'nav.pricing': 'Pricing',
      'nav.about': 'About',
      'nav.signup': 'Sign up or log in',

      // Fonctionnalités détaillées (ancien accueil, reprises sur la page Familles)
      'features.title': 'Everything you need to make progress.',
      'features.chat.title': 'Didactic chat',
      'features.chat.desc': '"Explain it to me, but don\'t do it for me."',
      'features.revision.title': 'Revision sheets and quizzing',
      'features.revision.desc': '"Your sheet in seconds, then Galac6 quizzes you until you are ready."',
      'features.quiz.title': 'Quizzes, exercises and multiple choice',
      'features.quiz.desc': '"In every subject, on your weak points. Take a photo of your lesson, get a quiz."',
      'features.dictation.title': 'Read-aloud dictations and mental maths',
      'features.dictation.desc': '"Dictations read aloud and marked, and mental maths every day."',
      'features.correction.title': 'Test corrections',
      'features.correction.desc': '"Got a bad grade. Understand why."',
      'features.exams.title': 'Past brevet, bac and competition papers',
      'features.exams.desc': '"Over 400 official papers and marked mock exams."',

      'intl.banner.title': 'Is your school outside France?',
      'intl.banner.sub': 'Vote for Galac6 to be adapted to your country\'s curriculum and language.',
      'intl.banner.cta': 'Vote for my country',

      // Parents
      'parents.title': 'Designed for learning. Not for cheating.',
      'parents.subtitle': 'What parents appreciate.',
      'parents.pedagogy.title': 'Pedagogy first',
      'parents.pedagogy.desc': 'The AI guides and asks questions. It never gives the answer directly. The student has to think.',
      'parents.curriculum.title': 'Official curriculum',
      'parents.curriculum.desc': 'Aligned with the French National Education curriculum standards, from 1st to 12th grade.',
      'parents.dashboard.title': 'Parent dashboard',
      'parents.dashboard.desc': 'Dedicated dashboard: subjects studied, screen time, weekly progress.',

      // ─── Accueil (refonte novembre 2026) ───
      'home.hero.title': 'AI in the service of <span class="grad">teaching.</span>',
      'home.hero.subtitle': 'Galac6 is an AI tutor that does not do the homework for the student: it guides them step by step, with questions, at their level.',
      'home.door.fam': 'I am a parent or a student',
      'home.door.fam.sub': 'From 1st to 12th grade',
      'home.door.school': 'I am a teacher or a school',
      'home.door.school.sub': 'Homework, marking, class follow-up',
      'home.hero.signup': 'Sign up or log in',
      'home.hero.pricing': 'See pricing →',
      'home.hero.madefr': 'Designed in France, data hosted in France.',
      'home.why.tag': 'The problem',
      'home.why.title': 'General-purpose AIs do the work. Galac6 makes students work.',
      'home.why.lead': 'The AI that would rather teach the student than do it for them: any AI can do the homework, Galac6 teaches how to do it yourself.',
      'home.why.them': 'A general-purpose AI',
      'home.why.them1': 'Gives the answer in a second',
      'home.why.them2': 'Writes the homework for the student',
      'home.why.them3': 'Does not know what the student has understood',
      'home.why.them.label': 'Typical answer',
      'home.why.them.quote': '“Here is the full solution to exercise 3.”',
      'home.why.us1': 'Asks questions to make them think',
      'home.why.us2': 'Starts from what the student already knows',
      'home.why.us3': 'Spots what is mastered and what still needs work',
      'home.why.us.quote': '“What are you trying to calculate? Start by telling me what the problem gives you.”',
      'home.loop.tag': 'How it works',
      'home.loop.title': 'Every answer helps the student progress, and informs those who support them.',
      'home.loop.aria': 'Six-step loop: the student works, every answer is analysed, a mastery map is built, Galac6 offers tailored work, parents and teacher see where the student stands, the teacher sets personalised homework, then back to the student.',
      'home.loop.gret': 'back to the student',
      'home.loop.gsub': 'a continuous loop',
      'home.loop.g1': 'The student works',
      'home.loop.g1d': 'exercises, dictations, quizzes',
      'home.loop.g2': 'Every answer',
      'home.loop.g2d': 'is analysed, mistakes included',
      'home.loop.g3': 'Mastery map',
      'home.loop.g3d': 'topic by topic',
      'home.loop.g4': 'Tailored work',
      'home.loop.g4d': 'until it is mastered',
      'home.loop.g5': 'Parents and teacher see',
      'home.loop.g5d': 'where the student stands',
      'home.loop.g6': 'The teacher decides',
      'home.loop.g6d': 'personalised homework',
      'home.loop.s1': 'The student works',
      'home.loop.s1d': 'They do their exercises, dictations and quizzes, and learn their lessons.',
      'home.loop.s2': 'Every answer is analysed',
      'home.loop.s2d': 'Galac6 looks at the reasoning, not just the result.',
      'home.loop.s3': 'A mastery map is built',
      'home.loop.s3d': 'Topic by topic: mastered, in progress, to review.',
      'home.loop.s4': 'Galac6 offers tailored work',
      'home.loop.s4d': 'Topics not yet mastered are worked on again until they are.',
      'home.loop.s5': 'Parents and teacher see where the student stands',
      'home.loop.s5d': 'A clear report, without waiting for the next test.',
      'home.loop.s6': 'The teacher decides',
      'home.loop.s6d': 'They set personalised homework based on what they see.',
      'home.loop.s7': 'Back to the student',
      'home.loop.s7d': 'And the loop starts again, more accurate with every round.',
      'home.who.tag': 'Who it is for',
      'home.who.title': 'The same work, three benefits.',
      'home.who.s.badge': 'Student',
      'home.who.s.title': 'A tutor that teaches you how to work',
      'home.who.s.text': 'Like a good tutor, Galac6 teaches the student how to work: getting organised, learning lessons, practising. It asks questions instead of giving the answer, and builds on what the student already knows. It corrects, explains mistakes and has each topic worked on again until it is mastered. It encourages at every step: struggling or ahead, every child gets the right challenge and gains confidence.',
      'home.who.s.link': 'See for families →',
      'home.who.p.badge': 'Parents',
      'home.who.p.title': 'You know where your child stands',
      'home.who.p.text': 'You know where your child stands: what they have mastered, what they still need to work on, and how they are progressing.',
      'home.who.p.link': 'See parent follow-up →',
      'home.who.t.badge': 'Teacher',
      'home.who.t.title': 'Save hours every week',
      'home.who.t.text': 'Create homework in a few minutes, Galac6 marks it, you approve. Know what each student has really understood, topic by topic. Decide with data you never had before.',
      'home.who.t.link': 'See for teachers →',
      'home.data.tag': 'Data',
      'home.data.title': 'Data in the service of learning.',
      'home.data.lead': 'Every exercise leaves a useful trace. Galac6 turns it into a mastery map, topic by topic, that guides what comes next.',
      'home.data.p1': '<strong>By topic,</strong> not just an overall average.',
      'home.data.p2': '<strong>Updated with every exercise,</strong> without waiting for the test.',
      'home.data.p3': '<strong>The same map</strong> serves the student, the parents and the teacher.',
      'home.data.fr': 'Data hosted in France',
      'home.m.title': 'Mastery map · Léa, 8th grade',
      'home.m.sub': 'Maths and French',
      'home.m.example': 'Example · fictional data',
      'home.m.maths': 'Maths',
      'home.m.fr': 'French',
      'home.m.r1': 'Calculating with negative numbers',
      'home.m.r2': 'Operations on fractions',
      'home.m.r3': 'Pythagorean theorem',
      'home.m.r4': 'Algebra: expanding',
      'home.m.r5': 'Proportionality',
      'home.m.r6': 'Past participle agreement',
      'home.m.r7': 'Grammatical homophones',
      'home.m.r8': 'Simple past tense (passé simple)',
      'home.m.a': 'Mastered',
      'home.m.c': 'In progress',
      'home.m.r': 'To review',
      'home.m.legend.r': 'To review, offered first',
      'home.feat.tag': 'Features',
      'home.feat.title': 'Everything to learn, practise and revise.',
      'home.feat.chat': 'Tutor chat',
      'home.feat.chat.d': 'It explains without doing the work for the student.',
      'home.feat.help': 'Homework help',
      'home.feat.help.d': 'Step by step, from a photo.',
      'home.feat.quiz': 'Quizzes',
      'home.feat.quiz.d': 'On the student\'s weak points.',
      'home.feat.dictee': 'Dictation',
      'home.feat.dictee.d': 'Read aloud, then marked.',
      'home.feat.fiches': 'Revision sheets',
      'home.feat.fiches.d': 'Then Galac6 quizzes the student.',
      'home.feat.calc': 'Mental maths',
      'home.feat.calc.d': 'A little every day.',
      'home.feat.exam': 'Mock brevet and bac',
      'home.feat.exam.d': 'Marked, on official papers.',
      'home.feat.ready': 'Ready for my test',
      'home.feat.ready.d': 'A plan up to the big day.',
      'home.feat.defi': 'Daily challenge',
      'home.feat.defi.d': 'A daily appointment.',
      'home.feat.read': 'Reading',
      'home.feat.read.d': 'Books for every level.',
      'home.feat.byneed': 'By need:',
      'home.link.bacmaths': 'Revise for the maths bac',
      'home.link.maths': 'Revise maths',
      'home.feat.all': 'See everything →',
      'home.feat.allprof': 'See everything for teachers →',
      'home.video.title': 'Discover Galac6 on video',
      'home.video.play': 'Play the video',
      'home.video.aria': 'Play the presentation video',
      'home.video.note': 'The video is hosted by YouTube: it only loads if you click.',
      'home.trust.tag': 'Trust',
      'home.trust.title': 'Serious pedagogy, a French tool.',
      'home.trust.r': 'Grounded in research',
      'home.trust.r.d': 'Questioning, retrieval practice, learning from mistakes. <a href="/recherche">See our sources</a>',
      'home.trust.fr': 'Designed in France',
      'home.trust.fr.d': 'Aligned with the official curriculum, from 1st to 12th grade.',
      'home.trust.data': 'Data hosted in France',
      'home.trust.data.d': 'Full details on the <a href="/donnees-eleves">Student data</a> page.',
      'home.final.title': 'Where to start?',
      'home.final.lead': 'Choose your door: each page explains what Galac6 does for you.',
      'home.final.fam.sub': 'Discover and sign up',
      'home.final.school.sub': 'Pilot or quote',
      'home.final.note': 'Already registered?',

      // Confidentialité et sécurité (composant partagé)
      'pledge.title': 'Privacy & security',
      'pledge.subtitle': 'Our commitments for students\' data.',
      'pledge.p1': 'Data hosted in France',
      'pledge.p2': 'AI processed in Europe',
      'pledge.p3': 'In line with the GDPR',
      'pledge.p3admin': 'Two-factor authentication for administration accounts',
      'pledge.p4': 'Your data is never sold or used for advertising',
      'pledge.p5': 'Parental consent required under 15',
      'pledge.p5hors': 'Parental consent required under 15, outside the school setting',
      'pledge.p6': 'Only the student\'s teachers and school leadership see their work',
      'pledge.p7': 'Data deleted automatically after 2 years of inactivity',
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
      'faq.a5': '<strong>ChatGPT gives answers. Galac6 gives skills.</strong> ChatGPT isn\'t designed for children, doesn\'t know the French curriculum and has no educational logic. Galac6 is specifically designed for the French school system, with an approach that pushes students to truly learn — not to copy-paste.',

      'faq.q6': 'How much time per day should I use Galac6?',
      'faq.a6': '<strong>15 to 30 minutes is enough</strong> for effective revision. Galac6 isn\'t designed to replace leisure — it\'s designed to optimize study time. A few targeted sessions per week already make a real difference in results.',

      'faq.q7': 'Is my child\'s data protected?',
      'faq.a7': 'Yes, and it\'s non-negotiable. Galac6 is <strong>designed in France</strong> and <strong>data is hosted in France</strong>. Only a few technical services, such as hosting of the website, rely on providers located outside the European Union. We never sell your children\'s data to third parties. The privacy and security of minors\' data are at the core of our design.',

      'faq.qsecu': 'Is students\' data secure?',
      'faq.asecu': 'Yes, it is a priority. <strong>Data is hosted in France</strong>, in Paris. Each account only sees what it is allowed to see: at school, only the student\'s teachers and school leadership can access their work. Galac6 platform administration accounts are protected by two-factor authentication, and passwords known to have leaked are refused. Data is never sold or used to train AIs, and a deleted account is erased within 30 days. A few services remain outside the European Union, such as hosting of the website: everything is detailed on the <a href="/donnees-eleves">Student data</a> page.',

      'faq.q8': 'What subjects and grade levels are covered?',
      'faq.a8': 'Galac6 covers the main subjects of the French curriculum: <strong>French, Mathematics, History-Geography, Sciences, English</strong> and more — <strong>from 1st to 12th grade</strong>. Content automatically adapts to the student\'s level and grade.',

      'faq.q9': 'Can parents track their child\'s progress?',
      'faq.a9': 'Yes. Parents have access to a tracking dashboard to see subjects studied, progress made and areas to improve. At Galac6, we believe in the <strong>active role of parents</strong> in education — the tool is designed to strengthen that bond, not replace it.',

      'faq.q10': 'How much does Galac6 cost?',
      'faq.a10': "Galac6 is a paid service. To try it, the Discovery plan, with no bank card, gives access to every feature in limited amounts, reset every month: 5 messages to the tutor, one dictation, one quiz, one homework help with a photo and one brevet or bac-style paper. <strong>For all of Galac6, unlimited</strong>: the Student plan at €69 a year or €7.99 a month, and the Family plan, up to 4 children, at €99 a year or €11.99 a month. Both plans include all official brevet and bac past papers, in full and in exam conditions. The Exam Pack, at €19 (€14 with a yearly subscription), adds second marking of papers, spoken mock orals and the Concours général. For schools, pricing is on quote, with a <a href=\"/ecole\">free 3-month pilot on 3 classes</a>, with no commitment. Full details on the <a href=\"/tarifs\">Pricing</a> page.",

      'faq.q11': 'Is Galac6 available in my country?',
      'faq.a11': 'Galac6 is built on the French national curriculum, so it already works for pupils and schools that follow it, wherever they are. The app is in French, and its interface is also available in English. If your school follows another curriculum, <a href="/international">vote for your country</a>: we will adapt Galac6 to the countries that ask for it most.',

      'faq.cta.text': 'Can\'t find your question here?',
      'faq.cta.button': 'Contact us →',

      // Pricing
      'pricing.title': 'Our plans',
      'pricing.disc.name': 'Discovery',
      'pricing.disc.detail': 'To try it out: every feature, in limited amounts each month.',
      'pricing.disc.cta': 'Start with Discovery',
      'pricing.badge': 'All of Galac6, unlimited',
      'pricing.eleve.name': 'Student',
      'pricing.eleve.detail': 'Or €7.99 a month, no commitment.',
      'pricing.fam.name': 'Family',
      'pricing.fam.detail': 'Up to 4 children. Or €11.99 a month, no commitment.',
      'pricing.per.year': '/year',
      'pricing.per.year2': '/year',
      'pricing.see': 'See details →',
      'pricing.see2': 'See details →',
      'pricing.note': 'Exam Pack at €19 and all plans: <a href="/tarifs">see pricing →</a><br>For schools: free 3-month pilot on 3 classes, with no commitment. <a href="/ecole">Learn more →</a>',

      // Final CTA
      'cta.note': 'To try it out: the Discovery plan, in limited amounts each month.',

      // Footer
      'footer.tagline': 'Galac6. AI in the service of teaching.',
      'footer.hosted': 'Designed in France · Data hosted in France',
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
      'footer.families': 'Families',
      'footer.research': 'Our teaching approach and its sources',
      'footer.data': 'Student data',

      // Banner EN
      // 'banner.text' : volontairement absent, le bandeau du haut reste en anglais sur toutes les pages

      // ─── Shared across pages ───
      'about.nav.home': 'Home',

      // ─── Tarifs page ───
      'tarifs.badge': '12-month subscription from the date of payment',
      'tarifs.title': 'Simple, <span class="grad">clear pricing</span>',
      'tarifs.sub': 'A Discovery plan to try every feature in limited amounts, and an unlimited subscription for one child or for the whole family. For schools, a quote based on the number of pupils.',
      'tarifs.jump.fam': 'Families',
      'tarifs.jump.etab': 'Schools',
      'tarifs.fam.eyebrow': 'Families · prices include VAT',
      'tarifs.fam.title': 'Choose your plan',
      'tarifs.bill.year': 'Yearly <span class="seg-save">up to −31%</span>',
      'tarifs.bill.month': 'Monthly',
      'tarifs.flag': 'Recommended',
      'tarifs.decouverte.name': 'Discovery',
      'tarifs.decouverte.for': 'Every feature, in limited amounts',
      'tarifs.decouverte.price': '€0',
      'tarifs.decouverte.alt': 'No credit card and no time limit. Allowances reset every month.',
      'tarifs.decouverte.month': 'Every month',
      'tarifs.decouverte.q1': '<b>5</b> messages to the tutor',
      'tarifs.decouverte.q2': '<b>1</b> dictation',
      'tarifs.decouverte.q3': '<b>1</b> quiz',
      'tarifs.decouverte.q4': '<b>1</b> homework help with a photo',
      'tarifs.decouverte.q5': '<b>1</b> brevet or bac-style paper',
      'tarifs.decouverte.t1': 'Mental maths, daily challenge and games',
      'tarifs.decouverte.t2': 'Simplified performance report',
      'tarifs.decouverte.example': 'Example',
      'tarifs.decouverte.limit': 'You have used your questions for this month. Come back next month or switch to the Student plan.',
      'tarifs.decouverte.cta': 'Start with Discovery',
      'tarifs.decouverte.note': 'No credit card',
      'tarifs.eleve.name': 'Student',
      'tarifs.eleve.for': 'One child',
      'tarifs.eleve.t1': 'All of Galac6, unlimited',
      'tarifs.eleve.t2': 'Personal report on their performance',
      'tarifs.eleve.t3': "All official brevet and bac past papers, in full and in exam conditions",
      'tarifs.eleve.cta': 'Choose Student',
      'tarifs.fam.name': 'Family',
      'tarifs.fam.for': 'Up to 4 children',
      'tarifs.fam.t1': '<b>Progress reports for parents, for each child</b>',
      'tarifs.fam.t2': 'All of Galac6, unlimited, for each child',
      'tarifs.fam.t3': 'From CP to Terminale (ages 6 to 18)',
      'tarifs.fam.t4': 'Screen time settings for each child',
      'tarifs.fam.t5': "All official brevet and bac past papers, in full and in exam conditions",
      'tarifs.fam.cta': 'Choose Family',
      'tarifs.pack.eyebrow': 'Add-on · one-off purchase, valid for 12 months',
      'tarifs.pack.title': "Exam Pack: second marking, mock orals and Concours général",
      'tarifs.pack.sub': "To go further in 3e, 1re or Terminale. Full, timed official past papers are already included in the Student and Family plans.",
      'tarifs.pack.t1': "Second marking: each paper is marked a second time, for a more reliable mark out of 20",
      'tarifs.pack.t2': "Spoken mock orals: brevet oral, French bac oral",
      'tarifs.pack.t3': "A review of each mock oral, with the points to work on",
      'tarifs.pack.t4': "Concours général in maths (Terminale): official papers, help question by question",
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
      'tarifs.etab.lead': 'The price depends on the number of pupils and the modules chosen. Teacher, management and parent accounts are included, with no limit.',
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
      'tarifs.faq.q1': 'What does the Discovery plan include?',
      'tarifs.faq.a1': 'Every Galac6 feature, in limited amounts. Each month: 5 messages to the tutor, one dictation, one quiz, one homework help with a photo and one brevet or bac-style paper. Allowances reset every month, with no time limit and no credit card.',
      'tarifs.faq.q2': 'What happens when the monthly limit is reached?',
      'tarifs.faq.a2': 'Galac6 tells the student that they have used their questions for the month. They can come back the following month, when the allowance resets, or switch to a paid plan. The Student and Family plans are unlimited.',
      'tarifs.faq.q3': 'Can I cancel my subscription?',
      'tarifs.faq.a3': 'Yes. The monthly subscription has no commitment and can be cancelled in one click. The yearly subscription renews automatically on its anniversary date. You can turn off renewal at any time in your account, and we send you a reminder beforehand.',
      'tarifs.faq.q4': 'Is payment secure?',
      'tarifs.faq.a4': 'Yes. Card payments go through a secure payment provider: Galac6 never sees your card number.',
      'tarifs.faq.q5': 'Where is my child\'s data?',
      'tarifs.faq.a5': 'Data is hosted in France, in a database in Paris. No ads, no resale of data.',
      'tarifs.faq.a5b': 'Galac6\'s artificial intelligence is processed in Europe; only a few technical services, such as hosting of the website, rely on providers located outside the European Union. The list is in our privacy policy.',
      'tarifs.faq.q6': 'I already have an account. What will happen?',
      'tarifs.faq.a6': 'Current users will be informed before any change.',
      'tarifs.faq.q7': 'My child uses Galac6 with their school. Do I have to pay?',
      'tarifs.faq.a7': 'What the school provides is paid for by the school. For independent practice at home, you can choose the Student or Family plan.',
      'tarifs.faq.q8': 'How much does Galac6 cost for a school?',
      'tarifs.faq.a8': 'The price is set on quote, based on the number of pupils and the modules chosen. To discover Galac6, we offer a free 3-month pilot on 3 classes.',
      'tarifs.faq.q9': "Are brevet and bac past papers included in the subscription?",
      'tarifs.faq.a9': "Yes. The Student and Family plans include all official brevet and bac past papers, in full and in exam conditions: the whole paper, with the timer. The Exam Pack adds second marking of papers, spoken mock orals with their review, and the Concours général.",
      'tarifs.footer.desc': 'Galac6. AI in the service of teaching',
      'tarifs.footer.france': 'Made in France',

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
      'about.footer.desc': 'Galac6. AI in the service of teaching',
      'about.footer.france': '\ud83c\uddeb\ud83c\uddf7 Made in France',

      // ─── Ecole page ───
      'ecole.badge': 'Free 3-month pilot on 3 classes',
      'ecole.hero.title': 'Huge time savings <span class="grad">for your teachers</span>',
      'ecole.hero.sub': 'Assessments prepared in minutes, papers marked with almost no effort, and teaching tailored to each pupil thanks to a clear view of their strengths and weaknesses.',
      'ecole.gains.chip1': '<strong>Time saved</strong> preparing and marking assessments',
      'ecole.gains.chip2': '<strong>Better teaching</strong> through a tailored approach for every pupil',
      'ecole.gains.eyebrow': 'What Galac6 brings your teachers',
      'ecole.gains.title': 'Less time preparing and marking, more time for each pupil',
      'ecole.gains.time.eyebrow': 'Time saved',
      'ecole.gains.time.title': 'Huge time savings',
      'ecole.gains.prep.title': 'Prepare an assessment in minutes',
      'ecole.gains.prep.l1': '<span><strong>Over 2,000 dictations read aloud and marked by Galac6</strong>: each pupil does the dictation alone on their screen, in class or at home, without you having to dictate it. Checked texts, including extracts from great authors</span>',
      'ecole.gains.prep.l2': '<span><strong>Over 250 official maths papers</strong>: brevet, baccalauréat, course aux nombres, Concours général</span>',
      'ecole.gains.prep.l3': '<span><strong>Quizzes and tests</strong> created with the help of AI: you review and approve every question</span>',
      'ecole.gains.corr.title': 'Mark with almost no effort',
      'ecole.gains.corr.l1': '<span><strong>Papers handed in online</strong>: marked instantly</span>',
      'ecole.gains.corr.l2': '<span><strong>Paper copies</strong>: scanned, then marked by Galac6</span>',
      'ecole.gains.corr.l3': '<span>Galac6 suggests <strong>the correction and the mark</strong>, you have the final say</span>',
      'ecole.gains.time.note': 'The time saved goes back into teaching and your pupils.',
      'ecole.gains.peda.eyebrow': 'Better teaching',
      'ecole.gains.peda.title': 'Teaching tailored to each pupil',
      'ecole.gains.sm.title': 'A tailored approach for every pupil',
      'ecole.gains.sm.l1': '<span><strong>Tailored dictations</strong> for each pupil, built on their own mistakes</span>',
      'ecole.gains.sm.l2': '<span>Each pupil works again on <strong>what really gives them trouble</strong>, at their own pace</span>',
      'ecole.gains.know.title': 'Each pupil\'s strengths and weaknesses, made clear',
      'ecole.gains.know.l1': '<span>The <strong>topics mastered</strong> and those <strong>to work on again</strong></span>',
      'ecole.gains.know.l2': '<span><strong>Every mark compared with the class</strong>, to place the pupil at a glance</span>',
      'ecole.gains.know.l3': '<span>The <strong>averages</strong> of each pupil and each class, always up to date</span>',
      'ecole.gains.peda.note': 'You know exactly who to help, and with what.',
      'ecole.gains.cta.demo': 'Request a demo',
      'ecole.gains.lead': 'Significant time savings, so you can finally focus on teaching and on following each class and each pupil.',
      'ecole.intl.link': 'School outside France? Vote to bring Galac6 to your country',
      'footer.international': 'School outside France?',
      'ecole.gains.prep.l4': '<span><strong>Over 400 official past exam papers</strong> in total: brevet, French and maths baccalauréat, Concours général</span>',
      'ecole.trio.line': 'Time to innovate. Time for your pupils. Time for teaching.',
      'ecole.trio.t1': 'Time to innovate.',
      'ecole.trio.t2': 'Time for your pupils.',
      'ecole.trio.t3': 'Time for teaching.',
      'ecole.cta.quote': 'Request a quote',
      'ecole.cta.pilot': 'Become a pilot school',
      'ecole.pilot.offer': '<strong>Free pilot: 3 months on 3 classes, no commitment.</strong> After that, pricing on quote.',
      'ecole.quick.title': 'Ask us to get back to you',
      'ecole.quick.send': 'Send',
      'ecole.video.eyebrow': 'Demo',
      'ecole.video.title': 'See Galac6 in action',
      'ecole.video.play': 'Play the demo (2 min)',
      'ecole.video.note': 'The video is hosted by YouTube: it only loads when you click.',
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
      'ecole.prom.p4.desc': 'Didactic: it questions the pupil and never gives them the answers.',
      'ecole.prom.p5.title': 'Parents involved',
      'ecole.prom.p5.desc': 'Families follow their child\'s work and homework.',
      'ecole.prom.p6.title': 'Data you can trust',
      'ecole.prom.p6.desc': 'Your data is protected and processed in line with the GDPR.',
      'ecole.trust.t1': 'Data hosted in France',
      'ecole.trust.t2': 'In line with the GDPR',
      'ecole.trust.t3': 'Innovation in the service of teaching',
      'ecole.steps.eyebrow': 'Free pilot, no commitment',
      'ecole.steps.title': 'How the pilot works',
      'ecole.steps.s1.title': 'A 20-minute conversation',
      'ecole.steps.s1.desc': 'We present Galac6 to you by video call.',
      'ecole.steps.s2.title': 'Your school and 3 classes',
      'ecole.steps.s2.desc': 'We open your school\'s space and 3 classes, and the management invites the teachers.',
      'ecole.steps.s3.title': '3 months of use',
      'ecole.steps.s3.desc': 'Your teachers use Galac6 with their classes; pupils join them with a code.',
      'ecole.steps.s4.title': 'Review, then a quote',
      'ecole.steps.s4.desc': 'We review the pilot together. If you continue, we send you a quote.',
      'ecole.faq.eyebrow': 'Frequently asked questions',
      'ecole.faq.title': 'Data security',
      'ecole.faq.q1': 'Is students\' data secure?',
      'ecole.faq.a1': 'Yes, it is a priority. <strong>Data is hosted in France</strong>, in Paris, and Galac6\'s main artificial intelligence is processed in Europe. Each account only sees what it is allowed to see: at school, only the student\'s teachers and school leadership can access their work. Galac6 platform administration accounts are protected by two-factor authentication, and passwords known to have leaked are refused. Data is never sold or used to train AIs, and a deleted account is erased within 30 days. A few services remain outside the European Union, such as hosting of the website: everything is detailed on the <a href="/donnees-eleves">Student data</a> page.',
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
      'ecole.side.incl.l1': 'Teacher, management and parent accounts included, with no limit',
      'ecole.side.incl.l2': 'Data hosted in France',
      'ecole.side.incl.l3': 'Onboarding and teacher training by video call in the first year',
      'ecole.side.pilot.title': 'Pilot schools',
      'ecole.side.pilot.desc': '3 free months on 3 classes, with no commitment.',
      'ecole.footer.desc': 'Galac6. AI in the service of teaching',
      'ecole.footer.france': 'Made in France',

      // ─── Createur-contenu page ───
      'createur.badge': 'Freelance mission',
      'createur.title': 'Video content creator / UGC',
      'createur.subtitle': 'Freelance mission \u2014 YouTube, TikTok, Instagram \u2014 Galac6 | EdTech | Educational AI | galac6.io',
      'createur.project.title': 'The project',
      'createur.project.p1': 'Galac6 is a French educational AI app for students from 1st to 12th grade. Our approach: the AI never gives the answer, it teaches the student how to think (Didactic method). The app offers quizzes, voice dictations, revision sheets, test corrections, full mock exams, mental arithmetic \u2014 all with a gamification system (XP, badges, challenges).',
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
      'createur.footer.desc': 'Galac6. AI in the service of teaching',
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
      'recherche.study2.result': '<strong>\u00d72 learning gains</strong> and 27% less time compared to active teaching with peer instruction. Effect size: 0.73 to 1.3 sigma. Condition: the AI tutor was designed with strict pedagogical principles (Didactic questioning, never giving the answer directly).',
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
      'recherche.footer.desc': 'Galac6. AI in the service of teaching',
      'recherche.footer.doi': 'All cited studies are accessible via their respective DOIs.',

      // ─── Shared nav (secondary pages) ───
      'nav.home': 'Home',

      // ─── Shared footer (secondary pages) ───
      'cgv.footer.tagline': 'Galac6. AI in the service of teaching.',
      'cgv.footer.france': 'Made in France',

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
      'mentions.art8.mediation_text': 'In accordance with articles L.611-1 et seq. of the French Consumer Code, consumers may use a consumer mediator free of charge for amicable dispute resolution. After a written complaint sent to <a href="mailto:hello@galac6.io">hello@galac6.io</a> has not been satisfactorily resolved, consumers may refer the matter to the mediator: CM2C, 49 rue de Ponthieu, 75008 Paris, France – <a href="https://www.cm2c.net" rel="noopener">www.cm2c.net</a>.',
      'mentions.art9.title': '9. Credits',
      'mentions.art9.th1': 'Element',
      'mentions.art9.th2': 'Source',
      'mentions.art9.dev': 'Development',
      'mentions.art9.icons': 'Icons',
      'mentions.art9.icons_val': 'Lucide Icons (MIT license)',
      'mentions.art9.fonts': 'Fonts',
      'mentions.art9.fonts_val': 'Inter (open-source license)',
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
      'guide.gatekeeper.explain': '<strong>Explanation:</strong> <code>xattr -cr</code> removes the \u201cquarantine\u201d attribute that macOS adds to downloaded files. This is a standard procedure for applications in development.', // clé ancienne, plus utilisée par les pages
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
      'guide.support.text': 'For any questions: <a href="mailto:hello@galac6.io"><strong>hello@galac6.io</strong></a>',

      // Pages Familles et Professeurs et écoles (refonte du 02/11/2026)
      'fam.hero.tag': "Parents and pupils · from 1st to 12th grade",
      'fam.hero.title': "A tutor that teaches your child <span class=\"gradient\">how to work.</span>",
      'fam.hero.subtitle': "Galac6 does not do the homework for them: it guides your child with questions, at their level, and shows you where they stand.",
      'fam.hero.cta': "Create an account →",
      'fam.hero.cta2': "See the plans",
      'fam.hero.reassurance': "Designed in France, data hosted in France.",
      'fam.steps.tag': "How Galac6 helps",
      'fam.steps.title': "Like a good tutor, Galac6 teaches pupils how to work.",
      'fam.steps.s1.t': "Getting organised",
      'fam.steps.s1.d': "A work plan up to the next test.",
      'fam.steps.s2.t': "Learning lessons",
      'fam.steps.s2.d': "A revision sheet, then Galac6 quizzes them until they are ready.",
      'fam.steps.s3.t': "Practising",
      'fam.steps.s3.d': "Exercises at their level, guided by questions rather than by the answer.",
      'fam.steps.s4.t': "Correcting and going over it again",
      'fam.steps.s4.d': "Every mistake is explained, and the topic comes back until it is mastered.",
      'fam.steps.s5.t': "Encouraging",
      'fam.steps.s5.d': "The right challenge for everyone, struggling or ahead, to build confidence.",
      'fam.steps.text': "Like a good tutor, Galac6 teaches pupils how to work: getting organised, learning their lessons, practising. It asks questions instead of giving the answer, and builds on what the pupil already knows. It corrects, explains mistakes and has the pupil go over each topic again until it is mastered. It encourages at every step: whether struggling or ahead, every child gets the right challenge and gains confidence.",
      'fam.report.tag': "What parents see",
      'fam.report.title': "You know where your child stands.",
      'fam.report.lead': "What they have mastered, what they still need to work on, and how they are progressing.",
      'fam.report.l1': "Topics mastered, in progress and to work on again.",
      'fam.report.l2': "Subjects studied and progress week after week.",
      'fam.report.l3': "With the Family plan, tracking for each child.",
      'fam.report.card.title': "Weekly report · Hugo, Year 8",
      'fam.report.card.sub': "What you see in your parent area",
      'fam.report.card.example': "Example · fictional data",
      'fam.report.card.ok': "Mastered",
      'fam.report.card.ok.d': "Equivalent fractions, subject-verb agreement",
      'fam.report.card.mid': "In progress",
      'fam.report.card.mid.d': "Order of operations",
      'fam.report.card.low': "To work on again",
      'fam.report.card.low.d': "Imperfect or simple past",
      'fam.features.tag': "All features",
      'fam.features.title': "Everything your child needs to make progress, at every level.",
      'fam.tab.prim': "Primary",
      'fam.tab.col': "Middle school",
      'fam.tab.lyc': "High school",
      'fam.more': "Learn more →",
      'fam.f.dict.t': "Read-aloud dictations",
      'fam.f.dict.d': "Dictations read aloud and marked.",
      'fam.f.calc.t': "Mental maths",
      'fam.f.calc.d': "A little mental maths every day.",
      'fam.f.chat.t': "Didactic chat",
      'fam.f.chat.d': "\"Explain it to me, but don't do it for me.\"",
      'fam.f.read.t': "Reading",
      'fam.f.read.d': "Books chosen for each grade.",
      'fam.f.daily.t': "Daily challenge",
      'fam.f.daily.d': "A multiple-choice quiz, a dictation and some maths every day.",
      'fam.f.support.t': "Homework support",
      'fam.f.support.d': "Support at home, at their own pace.",
      'fam.f.rev.t': "Revision sheets and quizzing",
      'fam.f.rev.d': "\"Your sheet in seconds, then Galac6 quizzes you until you are ready.\"",
      'fam.f.rev.d2': "\"Your sheet, then Galac6 quizzes you until you are ready.\"",
      'fam.f.quiz.t': "Quizzes, exercises and multiple choice",
      'fam.f.quiz.d': "\"In every subject, on your weak points. Take a photo of your lesson, get a quiz.\"",
      'fam.f.dictcalc.t': "Read-aloud dictations and mental maths",
      'fam.f.dictcalc.d': "\"Dictations read aloud and marked, and mental maths every day.\"",
      'fam.f.corr.t': "Test corrections",
      'fam.f.corr.d': "\"Got a bad grade. Understand why.\"",
      'fam.f.brevet.t': "Brevet and past papers",
      'fam.f.brevet.d': "\"Over 400 official papers and marked mock exams.\"",
      'fam.f.bacfr.t': "French bac",
      'fam.f.bacfr.d': "Mock bac exams on official papers, written and oral, marked out of 20.",
      'fam.f.bacmaths.t': "Maths bac",
      'fam.f.bacmaths.d': "Mock exams on official papers, marked out of 20.",
      'fam.f.annales.t': "Past bac papers",
      'fam.f.annales.d': "Real bac papers, never mixed with practice papers.",
      'fam.f.expat.t': "Families abroad",
      'fam.f.expat.d': "Follow the French curriculum wherever you are.",
      'fam.links.label': "By need:",
      'fam.links.primary': "Primary (1st to 5th grade)",
      'fam.links.ai': "AI homework support",
      'fam.links.private': "Online private lessons with AI",
      'fam.links.sheets': "AI revision sheets",
      'fam.links.maths': "Revise maths online",
      'fam.links.mental': "Mental maths online",
      'fam.links.dictation': "Online dictation",
      'fam.links.brevet': "Revise for the brevet",
      'fam.links.bacfr': "Revise for the French bac",
      'fam.links.bacmaths': "Revise for the maths bac with AI",
      'fam.links.annales': "Past brevet and bac papers",
      'fam.links.expat': "Families abroad",
      'fam.learn.tag': "What parents appreciate",
      'fam.learn.title': "Designed for learning, not for cheating.",
      'fam.learn.quote': "You can ask <strong>any AI</strong> to do your homework. Or you can ask <strong>Galac6</strong> to teach you how to do it yourself. Your call.",
      'fam.learn.c1.t': "Pedagogy first",
      'fam.learn.c1.d': "The AI guides and asks questions. It never gives the answer directly. The student has to think.",
      'fam.learn.c2.t': "Official curriculum",
      'fam.learn.c2.d': "Aligned with the French National Education curriculum standards, from 1st to 12th grade.",
      'fam.learn.c3.t': "Parent dashboard",
      'fam.learn.c3.d': "Dedicated dashboard: subjects studied, screen time, weekly progress.",
      'fam.pricing.tag': "Pricing",
      'fam.pricing.title': "Our plans",
      'fam.pricing.lead': "To try it out: the Discovery plan, in limited amounts each month. For all of Galac6, unlimited: the Student and Family plans.",
      'fam.pricing.disc.name': "Discovery",
      'fam.pricing.disc.detail': "To try it out: every feature, in limited amounts each month. No bank card.",
      'fam.pricing.disc.cta': "Start with Discovery",
      'fam.pricing.badge': "All of Galac6, unlimited",
      'fam.pricing.eleve.name': "Student",
      'fam.pricing.eleve.detail': "For one child. Or €7.99 a month, no commitment.",
      'fam.pricing.fam.name': "Family",
      'fam.pricing.fam.detail': "Up to 4 children. Or €11.99 a month, no commitment.",
      'fam.pricing.per.year': "/year",
      'fam.pricing.see': "See details →",
      'fam.pricing.note': "Official brevet and bac past papers are included in the Student and Family plans. Exam Pack (second marking, mock orals, Concours général): €19, or €14 with a yearly subscription. All plans: <a href=\"/tarifs\">see pricing →</a>",
      'fam.tester.title': "Your child can become a pupil tester",
      'fam.tester.text': "An offer of 3 months included for pupils from 1st to 12th grade, with no bank card.",
      'fam.tester.cta': "See the offer →",
      'fam.faq.tag': "Frequently asked questions",
      'fam.faq.title': "Before you start",
      'fam.faq.subtitle': "Everything parents and students ask us, in full transparency.",
      'fam.faq.q1': "Who is Galac6 for?",
      'fam.faq.a1': "Galac6 is for <strong>students from 1st to 12th grade</strong> and their parents. Whether your child needs a helping hand with homework, or is preparing for an important test, Galac6 is here to support them — at their own pace, in their subject, at their level.",
      'fam.faq.q2': "Does Galac6 give students the answers?",
      'fam.faq.a2': "<strong>No — and that's the whole point.</strong> Galac6 doesn't do homework for your child. It helps them <strong>ask the right questions</strong>, identify what they don't know yet, so they can find the answers themselves. The goal: build real confidence, not fake grades.",
      'fam.faq.q3': "Does Galac6 replace teachers or parents?",
      'fam.faq.a3': "Never. Galac6 steps in where neither the teacher nor the parents can always be: <strong>at 9 PM, alone with homework</strong>. It's the caring companion that takes over when no one is available. For younger students, it can even become a great tool for parent-child interaction.",
      'fam.faq.q4': "How does Galac6 use AI?",
      'fam.faq.a4': "Galac6 uses AI to <strong>guide the student, not to think for them</strong>. The AI analyzes the student's level, gaps and learning pace, then offers tailored explanations, targeted review questions and personalized encouragement — in French, following the French National Education curriculum.",
      'fam.faq.q5': "How is Galac6 different from ChatGPT?",
      'fam.faq.a5': "<strong>ChatGPT gives answers. Galac6 gives skills.</strong> ChatGPT isn't designed for children, doesn't know the French curriculum and has no educational logic. Galac6 is specifically designed for the French school system, with an approach that pushes students to truly learn — not to copy-paste.",
      'fam.faq.q6': "How much time per day should I use Galac6?",
      'fam.faq.a6': "<strong>15 to 30 minutes is enough</strong> for effective revision. Galac6 isn't designed to replace leisure — it's designed to optimize study time. A few targeted sessions per week already make a real difference in results.",
      'fam.faq.q7': "Is my child's data protected?",
      'fam.faq.a7': "Yes, and it's non-negotiable. Galac6 is <strong>designed in France</strong>, in line with the GDPR. Data is hosted in France and Galac6's artificial intelligence is processed in Europe; only a few technical services, such as hosting of the website, rely on providers located outside the European Union. We never sell your children's data to third parties. The privacy and security of minors' data are at the core of our design. Full details on the <a href=\"/donnees-eleves\">Student data</a> page.",
      'fam.faq.q8': "What subjects and grade levels are covered?",
      'fam.faq.a8': "Galac6 covers the main subjects of the French curriculum: <strong>French, Mathematics, History-Geography, Sciences, English</strong> and more — <strong>from 1st to 12th grade</strong>. Content automatically adapts to the student's level and grade.",
      'fam.faq.q9': "Can parents track their child's progress?",
      'fam.faq.a9': "Yes. Parents have access to a tracking dashboard to see subjects studied, progress made and areas to improve. At Galac6, we believe in the <strong>active role of parents</strong> in education — the tool is designed to strengthen that bond, not replace it.",
      'fam.faq.q10': "How much does Galac6 cost?",
      'fam.faq.a10': "Galac6 is a paid service. To try it, the Discovery plan, with no bank card, gives access to every feature in limited amounts, reset every month: 5 messages to the tutor, one dictation, one quiz, one homework help with a photo and one brevet or bac-style paper. <strong>For all of Galac6, unlimited</strong>: the Student plan at €69 a year or €7.99 a month, and the Family plan, up to 4 children, at €99 a year or €11.99 a month. Both plans include all official brevet and bac past papers, in full and in exam conditions. The Exam Pack, at €19 (€14 with a yearly subscription), adds second marking of papers, spoken mock orals and the Concours général. Full details on the <a href=\"/tarifs\">Pricing</a> page.",
      'fam.faq.cta.text': "Can't find your question here?",
      'fam.faq.cta.button': "Contact us →",
      'fam.cta.title': "Ready to help your child make progress?",
      'fam.cta.text': "Create their account in a few minutes, from 1st to 12th grade.",
      'fam.cta.button': "Create an account →",
      'fam.cta.pricing': "See pricing",
      'fam.cta.note': "To try it out: the Discovery plan, in limited amounts each month.",
      'fam.footer.hosted': "Designed in France · Data hosted in France",
      'sch.hero.eyebrow': "Teachers, school leaders, schools",
      'sch.hero.title': "Huge time savings <span class=\"grad\">for teachers</span>",
      'sch.hero.sub': "You create the assignment, Galac6 marks it, you approve. And at last you see what each pupil has really understood, topic by topic. You stay in control of every decision.",
      'sch.cta.try': "Try it as a teacher",
      'sch.pilot.offer': "<strong>Schools: free 3-month pilot, up to 3 classes, no commitment.</strong> Then, pricing on quote. <a href=\"#pilote-etapes\">How the pilot works</a>",
      'sch.prom.eyebrow': "Three promises",
      'sch.prom.title': "What Galac6 changes for you",
      'sch.prom.p1.title': "Save hours every week.",
      'sch.prom.p1.desc': "Create an assignment in a few minutes: Galac6 marks it, and all you have to do is approve. Every pupil gets personalised exercises, matched to what they have mastered and what they still need to work on.",
      'sch.prom.p2.title': "Finally know what each pupil has really understood.",
      'sch.prom.p2.desc': "Every answer shows the topics mastered and the reasoning errors, pupil by pupil, subject by subject, class by class.",
      'sch.prom.p3.title': "Decide with data you never had before.",
      'sch.prom.p3.desc': "Dashboards and decision support that no teacher or school has had until now: which topic to go over again in class, which pupils to support, where to step in first.",
      'sch.heat.eyebrow': "The class dashboard",
      'sch.heat.h2': "The whole class, topic by topic",
      'sch.heat.title': "Dashboard · Year 9 B · Maths",
      'sch.heat.sub': "Mastery by topic and by pupil",
      'sch.heat.example': "Example · fictitious data",
      'sch.aria.heat': "Example dashboard, scrollable",
      'sch.heat.caption': "Fictitious example: mastery level of eight pupils across six maths topics",
      'sch.heat.pupil': "Pupil",
      'sch.heat.n1': "Negative numbers",
      'sch.heat.n2': "Fractions",
      'sch.heat.n3': "Pythagoras",
      'sch.heat.n4': "Algebra",
      'sch.heat.n5': "Proportionality",
      'sch.heat.n6': "Equations",
      'sch.heat.total': "Mastered",
      'sch.heat.a': "Mastered",
      'sch.heat.c': "In progress",
      'sch.heat.r': "To review",
      'sch.heat.hint': "Swipe the table to see all the topics.",
      'sch.heat.i1.t': "Topic to go over again in class",
      'sch.heat.i1.d': "Algebra: six pupils out of eight are still \"to review\".",
      'sch.heat.i2.t': "Pupils to support",
      'sch.heat.i2.d': "Two pupils have three or more topics to review.",
      'sch.heat.i3.t': "Where to step in first",
      'sch.heat.i3.d': "Algebra, before the test on the next chapter.",
      'sch.feat.eyebrow': "Features for teachers",
      'sch.feat.title': "What you can do with Galac6",
      'sch.feat.f1.t': "Teacher quizzes and assignments",
      'sch.feat.f1.d': "Ready in a few minutes from your instructions or your pasted worksheet. You review and approve every question.",
      'sch.feat.f2.t': "Dictations, including on paper",
      'sch.feat.f2.d': "Over 2,000 dictations read aloud and marked by Galac6, including extracts from great authors, online or on photographed paper copies. And tailored dictations, built on each pupil's own mistakes.",
      'sch.feat.f3.t': "AI marking for you to approve",
      'sch.feat.f3.d': "Work handed in online is marked instantly, paper copies are scanned: Galac6 suggests the correction and the mark, you have the final say.",
      'sch.feat.f4.t': "Mental maths led by the teacher",
      'sch.feat.f4.d': "With MuscuMath, you choose the series, the class practises.",
      'sch.feat.f5.t': "Official past papers",
      'sch.feat.f5.d': "Over 400 official past papers: brevet, French bac, maths bac, Concours général, including over 250 maths papers.",
      'sch.feat.f6.t': "Every mark compared with the class",
      'sch.feat.f6.d': "The averages of every pupil and every class, always up to date, to place a pupil at a glance.",
      'sch.feat.f7.t': "Daily summary",
      'sch.feat.f7.d': "An email every day: late work, pupils dropping off, progress.",
      'sch.feat.f8.t': "Pupils making progress",
      'sch.feat.f8.d': "Those moving forward, so you can encourage them at the right moment.",
      'sch.feat.f9.t': "School leadership view",
      'sch.feat.f9.d': "All the classes in the school at a glance.",
      'sch.feat.guide': "Read the teacher guide",
      'sch.fam.eyebrow': "For your pupils and their families",
      'sch.fam.title': "Pupils think things through, parents follow along",
      'sch.fam.cta': "Galac6 for families",
      'sch.steps.title': "A free 3-month pilot, up to 3 classes",
      'sch.steps.lead': "To try Galac6 in your school before you decide. Here is how it works.",
      'sch.steps.s2.title': "Your school and up to 3 classes",
      'sch.steps.s2.desc': "We open your school's space and up to 3 classes; school leaders invite the teachers.",
      'sch.res.eyebrow': "Going further",
      'sch.res.title': "Resources for teachers and schools",
      'sch.res.guide.t': "Teacher guide",
      'sch.res.guide.d': "Your first Galac6 quiz in ten minutes.",
      'sch.res.abroad.t': "French schools abroad",
      'sch.res.abroad.d': "Our page dedicated to French schools outside France.",
      'sch.res.uk.t': "French schools in the United Kingdom",
      'sch.res.uk.d': "Galac6 for French schools in the United Kingdom.",
      'sch.muscu.link': "MuscuMath: mental maths led by the teacher",
      'sch.side.pilot.desc': "Free 3-month pilot, up to 3 classes, no commitment.",
      'sch.footer.france': "Made in France"
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
      toggleBtn.textContent = lang === 'fr' ? 'EN' : 'FR'; // texte, pas d'emoji drapeau
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

    // Pages à langue fixe (attribut data-static-lang : pages avec le sélecteur de langue, versions /en/, /es/…) :
    // on ne traduit jamais sur place, la langue se choisit en changeant d'adresse.
    var staticLang = document.documentElement.hasAttribute('data-static-lang');

    if (savedLang === 'en' && !staticLang) {
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
