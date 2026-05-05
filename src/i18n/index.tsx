import React, { ReactNode } from 'react';
import { ETL } from '../constants/tokens';

// Multi-language support: English (en), French (fr), Kinyarwanda (rw)
// Exposes: LangContext, LangProvider, useT(), LangSwitcher

export type Lang = 'en' | 'fr' | 'rw';

export const TRANSLATIONS: Record<Lang, Record<string, string>> = {
  en: {
    // Nav
    'nav.home': 'Today',
    'nav.move': 'Move',
    'nav.nourish': 'Nourish',
    'nav.community': 'Community',
    'nav.me': 'Me',

    // Locations
    'loc.gacuriro': 'Gacuriro Gym',
    'loc.remera': 'Remera Gym',
    'loc.kimihurura': 'Kimihurura Gym',
    'loc.home': 'Home session',

    // Shop
    'shop.title': 'ETL Shop',
    'shop.sub': 'Gear & Supplements',
    'shop.bottle.name': 'Branded Water Bottle',
    'shop.bottle.desc': '750ml · Matte finish',
    'shop.supps.name': 'Reset Protein',
    'shop.supps.desc': 'Plant-based · 30 servings',
    'shop.shirt.name': 'ETL Training Tee',
    'shop.shirt.desc': 'Breathable · Kigali made',

    // Appointments
    'apt.title': 'Appointments',
    'apt.sub': 'Book your sessions',
    'apt.coach': 'Fitness Coach',
    'apt.nutritionist': 'Nutritionist',
    'apt.physician': 'Physician',
    'apt.book': 'Book session',

    // Onboarding
    'onboard.welcome.overline': '🇷🇼 Murakaza neza · You are welcome',
    'onboard.welcome.title': 'Your reset, shaped by people who know you.',
    'onboard.welcome.proverb.rw': 'Ukuri ni umugabo',
    'onboard.welcome.proverb.en': 'Truth is strength — your honest effort is all we need',
    'onboard.welcome.pill1': 'Local coaches',
    'onboard.welcome.pill2': 'Real foods',
    'onboard.welcome.pill3': 'Your rhythm',
    'onboard.step.back': 'Back',
    'onboard.step.next': 'Next',
    'onboard.step.start': 'Start my reset',

    'onboard.goals.title': 'What brings you here?',
    'onboard.goals.sub': 'Pick everything that feels true right now.',
    'onboard.goals.activity': 'Daily activity level',
    'onboard.goal.lose': 'Feel lighter',
    'onboard.goal.strong': 'Build strength',
    'onboard.goal.energy': 'More daily energy',
    'onboard.goal.nutrition': 'Eat better',
    'onboard.goal.reset': 'Reset after a break',
    'onboard.goal.event': 'Train for an event',

    'onboard.body.title': 'Your body right now',
    'onboard.body.sub': 'No judgment — this helps us personalise Phase 1.',
    'onboard.body.height': 'Height',
    'onboard.body.weight': 'Current weight',
    'onboard.body.target': 'Target weight (optional)',
    'onboard.body.age': 'Age',

    'onboard.eating.title': 'How you eat',
    'onboard.eating.sub': 'We build meals around what you already enjoy.',
    'onboard.eating.diet': 'Dietary preference',
    'onboard.eating.foods': 'Foods you enjoy',
    'onboard.eating.rwandanFoods': '🇷🇼 Rwandan staples',
    'onboard.eating.otherFoods': 'Other foods',
    'onboard.eating.cooking': 'Cooking style',
    'onboard.eating.fasting': 'Intermittent fasting?',
    'onboard.eating.fasting.tip': 'Jeanne recommends a 16:8 window for your profile — easy to maintain with local meal rhythms.',

    'onboard.coach.title': 'Your coaching team',
    'onboard.coach.sub': 'One fitness coach, one nutritionist — both in Kigali.',
    'onboard.coach.speaks': '🗣 Kinyarwanda',

    'onboard.plan.overline': 'Murakoze · thank you',
    'onboard.plan.title': '{name}, your plan is being shaped',
    'onboard.plan.sub': '{coach} reviews your details and sends a personalised Phase 1 within 24 hours.',

    'onboard.step.indicator': 'Step {n} of {total} · {title}',
    'onboard.step.start.cta': 'Yego — let\'s begin',
    'onboard.coach.pair': 'Pair with coach',
    'onboard.coach.choose': 'Choose a coach above',

    'onboard.step.lang': 'Language',
    'onboard.step0': 'Muraho',
    'onboard.step1.identity': 'Pillar 1: BMI',
    'onboard.step1.body': 'Pillar 1: BMI',
    'onboard.step.health': 'Pillar 2: Health',
    'onboard.step3.lifestyle': 'Pillar 3: Nutrition',
    'onboard.step3.foods': 'Pillar 3: Nutrition',
    'onboard.step2.focus': 'Pillar 4: Exercises',
    'onboard.step2.activity': 'Pillar 4: Exercises',
    'onboard.step4': 'Your coaches',
    'onboard.step5': 'Your Plan',

    // Home
    'home.day': 'Day {n} / 84',
    'home.phase': 'Phase {n}',
    'home.context': 'Kigali, Kimironko market day',
    'home.day.label': 'DAY',
    'home.proverb.rw': '"Buhoro buhoro nirwo rugendo"',
    'home.proverb.en': 'Slowly slowly, that is the journey.',
    'home.into.reset': 'You are on day {n} of your journey',
    'home.phase.banner': 'Phase {n} of 4 · Foundation',
    'home.community.label': 'Community · ETL',
    'home.today': 'Today',
    'home.workout.cta': 'Start workout',
    'home.meal.cta': 'View meal plan',

    // Move
    'move.sub': 'Your workouts',
    'move.title': 'Move',
    'move.phase.in': 'Phase {n} of 4 — In progress',
    'move.phase.name': 'Ishingiro · Foundation',
    'move.today': 'Today\'s Move',
    'move.terrain': 'Kigali hill terrain · Nyamirambo · Gikondo',
    'move.section': 'Week {n} sessions',
    'move.section.rw': 'Imyitozo yo kuri uyu munsi',
    'move.day1': 'Mon · Day 1',
    'move.title1': 'Full Body Activation',
    'move.group1a': 'Full body',
    'move.group1b': 'Mobility',
    'move.loc1': 'Kigali · Gacuriro',
    'move.day3': 'Wed · Day 3',
    'move.title3': 'Lower Body Base',
    'move.group3a': 'Glutes',
    'move.group3b': 'Quads',
    'move.loc3': 'Kigali · Remera',
    'move.day5': 'Fri · Day 5',
    'move.title5': 'Upper Body Base',
    'move.group5a': 'Push',
    'move.group5b': 'Pull',
    'move.loc5': 'Kigali · Kimihurura',
    'move.day6': 'Sat · Day 6',
    'move.title6': 'Hill Run + Core',
    'move.group6a': 'Cardio',
    'move.group6b': 'Core',
    'move.loc6': 'Kimihurura hills',
    'move.complete.sub': 'Wabikoze neza!',
    'move.complete': 'Nice work!',
    'move.complete.body': 'You moved with intention today. That\'s the reset.',

    // Nourish
    'nourish.sub': '🇷🇼 Indyo yawe · Eating window 12:00–20:00',
    'nourish.title': 'Nourish',
    'nourish.cook.rw': 'Guteka na Jeanne 🇷🇼',
    'nourish.cook': 'Cook with Jeanne',
    'nourish.cook.sub': 'Step-by-step recipe demos · indiyo z\'u Rwanda, plant-forward.',
    'nourish.proverb.rw': 'Indyo nziza ni ubuzima bwiza',
    'nourish.proverb.en': 'Good food is good health',
    'nourish.insight': 'Protein 5/7 days this week',
    'nourish.insight.tip': 'Add a handful of lentils to tomorrow\'s first meal to close the gap.',
    'nourish.meal1.name': 'First Meal · Ibishyimbo n’avoka',
    'nourish.meal1.desc': 'Ibishyimbo (red beans) + birayi + isombe + avocado',
    'nourish.meal2.name': 'Optional snack',
    'nourish.meal2.desc': 'Skyr + ingata ya groundnut · skip if not hungry',
    'nourish.meal3.name': 'Second Meal · Inshyushyu n’ifeta',
    'nourish.meal3.desc': 'Lentilles + epinard + tomato + feta',

    // Progress
    'progress.sub': '🇷🇼 Urugendo rwawe · 12 of 84 days',
    'progress.title': 'Your Reset Journey',
    'progress.level': 'Inkindi · Spark level',
    'progress.proverb.rw': '"Inzira ndende itangira intambwe imwe"',
    'progress.proverb.en': 'A long journey begins with one step',
    'progress.phases': 'Your phases',
    'progress.phases.rw': 'Inzira y\'imihindagurikire',
    'progress.rewards': 'Reward shelf',
    'progress.rewards.sub': 'Earned this phase',

    // Community
    'community.sub': '🇷🇼 Umuryango · ETL Community',
    'community.title': 'Community',
    'community.proverb.rw': 'Umuntu ni umuntu kubw\'abantu',
    'community.proverb.en': 'A person is a person through other people',
    'community.compose': 'Sangira n\'umuryango · share your win, meal, or lesson with the community…',
    'community.tab.feed': 'Feed',
    'community.tab.coach': 'My Coach',

    // Phases
    'phase.1': 'Ishingiro · Foundation',
    'phase.2': 'Kubaka · Build',
    'phase.3': 'Gukomera · Strengthen',
    'phase.4': 'Kongera Gutangira · Reset',
    'phase.progress': 'In progress',
  },

  fr: {
    // Nav
    'nav.home': "Aujourd'hui",
    'nav.move': 'Entraînement',
    'nav.nourish': 'Nutrition',
    'nav.community': 'Communauté',
    'nav.me': 'Moi',

    // Onboarding
    'onboard.welcome.overline': '🇷🇼 Murakaza neza · Bienvenue',
    'onboard.welcome.title': 'Votre reset, conçu par des gens qui vous connaissent.',
    'onboard.welcome.proverb.rw': 'Ukuri ni umugabo',
    'onboard.welcome.proverb.en': 'La vérité est force — votre effort sincère est tout ce qu\'il faut',
    'onboard.welcome.pill1': 'Coachs locaux',
    'onboard.welcome.pill2': 'Vrais aliments',
    'onboard.welcome.pill3': 'Votre rythme',
    'onboard.step.back': 'Retour',
    'onboard.step.next': 'Suivant',
    'onboard.step.start': 'Commencer mon reset',

    'onboard.goals.title': 'Qu\'est-ce qui vous amène ici?',
    'onboard.goals.sub': 'Choisissez tout ce qui est vrai pour vous maintenant.',
    'onboard.goals.activity': 'Niveau d\'activité quotidienne',
    'onboard.goal.lose': 'Me sentir plus léger·e',
    'onboard.goal.strong': 'Développer ma force',
    'onboard.goal.energy': 'Plus d\'énergie au quotidien',
    'onboard.goal.nutrition': 'Mieux manger',
    'onboard.goal.reset': 'Reprendre après une pause',
    'onboard.goal.event': 'S\'entraîner pour un événement',

    'onboard.body.title': 'Votre corps en ce moment',
    'onboard.body.sub': 'Sans jugement — cela nous aide à personnaliser la Phase 1.',
    'onboard.body.height': 'Taille',
    'onboard.body.weight': 'Poids actuel',
    'onboard.body.target': 'Poids cible (optionnel)',
    'onboard.body.age': 'Âge',

    'onboard.eating.title': 'Comment vous mangez',
    'onboard.eating.sub': 'Nous construisons les repas autour de ce que vous aimez déjà.',
    'onboard.eating.diet': 'Préférence alimentaire',
    'onboard.eating.foods': 'Aliments que vous appréciez',
    'onboard.eating.rwandanFoods': '🇷🇼 Aliments rwandais',
    'onboard.eating.otherFoods': 'Autres aliments',
    'onboard.eating.cooking': 'Style de cuisine',
    'onboard.eating.fasting': 'Jeûne intermittent?',
    'onboard.eating.fasting.tip': 'Jeanne recommande une fenêtre 16:8 pour votre profil — facile à maintenir avec les rythmes alimentaires locaux.',

    'onboard.coach.title': 'Votre équipe de coaching',
    'onboard.coach.sub': 'Un coach fitness, une nutritionniste — tous deux à Kigali.',
    'onboard.coach.speaks': '🗣 Kinyarwanda',

    'onboard.plan.overline': 'Murakoze · merci',
    'onboard.plan.title': '{name}, votre plan est en cours de préparation',
    'onboard.plan.sub': '{coach} examine vos détails et enverra une Phase 1 personnalisée sous 24 heures.',

    'onboard.step.indicator': 'Étape {n} sur {total} · {title}',
    'onboard.step.start.cta': 'Oui — commençons',
    'onboard.coach.pair': 'S\'associer au coach',
    'onboard.coach.choose': 'Choisissez un coach ci-dessus',

    'onboard.step.lang': 'Langue',
    'onboard.step0': 'Muraho',
    'onboard.step1.identity': 'Pilier 1: IMC',
    'onboard.step1.body': 'Pilier 1: IMC',
    'onboard.step.health': 'Pilier 2: Santé',
    'onboard.step3.lifestyle': 'Pilier 3: Nutrition',
    'onboard.step3.foods': 'Pilier 3: Nutrition',
    'onboard.step2.focus': 'Pilier 4: Exercices',
    'onboard.step2.activity': 'Pilier 4: Exercices',
    'onboard.step4': 'Vos coachs',
    'onboard.step5': 'Votre Plan',

    // Home
    'home.day': '🇷🇼 Jour {n} / 84',
    'home.phase': 'Phase {n}',
    'home.context': 'Kigali, jour de marché — Kimironko',
    'home.day.label': 'JOUR',
    'home.proverb.rw': '"Buhoro buhoro nirwo rugendo"',
    'home.proverb.en': 'Doucement mais sûrement, c\'est le chemin.',
    'home.into.reset': 'Vous êtes {n} jours dans votre reset',
    'home.phase.banner': 'Phase {n} sur 4 · Inkindi · Niveau Étincelle',
    'home.community.label': '🇷🇼 Umuryango · Communauté ETL',
    'home.today': "Aujourd'hui",
    'home.workout.cta': 'Commencer l\'entraînement',
    'home.meal.cta': 'Voir le plan repas',

    // Move
    'move.sub': '🇷🇼 Imyitozo · Votre plan d\'entraînement',
    'move.title': 'Entraînement',
    'move.phase.in': 'Phase {n} sur 4 — En cours',
    'move.phase.name': 'Ishingiro · Fondation',
    'move.terrain': '🇷🇼 Collines de Kigali · Nyamirambo · Gikondo',
    'move.section': 'Séances de la semaine {n}',
    'move.section.rw': 'Imyitozo yo kuri uyu munsi',
    'move.day1': 'Lun · Jour 1',
    'move.title1': 'Activation Corps Complet',
    'move.group1a': 'Corps complet',
    'move.group1b': 'Mobilité',
    'move.loc1': 'Kigali · Gikondo',
    'move.day3': 'Mer · Jour 3',
    'move.title3': 'Base du Bas du Corps',
    'move.group3a': 'Fessiers',
    'move.group3b': 'Quadriceps',
    'move.loc3': 'Kigali · Kimironko',
    'move.day5': 'Ven · Jour 5',
    'move.title5': 'Base du Haut du Corps',
    'move.group5a': 'Poussée',
    'move.group5b': 'Traction',
    'move.loc5': 'Séance à la maison',
    'move.day6': 'Sam · Jour 6',
    'move.title6': 'Course en Colline + Core',
    'move.group6a': 'Cardio',
    'move.group6b': 'Core',
    'move.loc6': 'Collines de Nyamirambo',
    'move.complete.sub': 'Wabikoze neza!',
    'move.complete': 'Excellent travail!',
    'move.complete.body': 'Vous avez bougé with intention aujourd\'hui. C\'est ça le reset.',

    // Nourish
    'nourish.sub': '🇷🇼 Indyo yawe · Fenêtre repas 12:00–20:00',
    'nourish.title': 'Nutrition',
    'nourish.cook.rw': 'Guteka na Jeanne 🇷🇼',
    'nourish.cook': 'Cuisiner avec Jeanne',
    'nourish.cook.sub': 'Recettes pas à pas · cuisine rwandaise, végétale.',
    'nourish.proverb.rw': 'Indyo nziza ni ubuzima bwiza',
    'nourish.proverb.en': 'La bonne nourriture est bonne santé',
    'nourish.insight': 'Protéines 5/7 jours cette semaine',
    'nourish.insight.tip': 'Ajoutez une poignée de lentilles au premier repas de demain pour combler l\'écart.',
    'nourish.meal1.name': 'Premier Repas · Ibishyimbo n’avoka',
    'nourish.meal1.desc': 'Ibishyimbo (haricots rouges) + pommes de terre + isombe + avocat',
    'nourish.meal2.name': 'Collation optionnelle',
    'nourish.meal2.desc': 'Skyr + arachides · sauter si vous n\'avez pas faim',
    'nourish.meal3.name': 'Deuxième Repas · Inshyushyu n’ifeta',
    'nourish.meal3.desc': 'Lentilles + épinards + tomates + feta',

    // Progress
    'progress.sub': '🇷🇼 Urugendo rwawe · 12 jours sur 84',
    'progress.title': 'Votre parcours Reset',
    'progress.level': 'Inkindi · Niveau Étincelle',
    'progress.proverb.rw': '"Inzira ndende itangira intambwe imwe"',
    'progress.proverb.en': 'Un long voyage commence par un seul pas',
    'progress.phases': 'Vos phases',
    'progress.phases.rw': 'Inzira y\'imihindagurikire',
    'progress.rewards': 'Récompenses',
    'progress.rewards.sub': 'Gagnées cette phase',

    // Community
    'community.sub': '🇷🇼 Umuryango · Communauté ETL',
    'community.title': 'Communauté',
    'community.proverb.rw': 'Umuntu ni umuntu kubw\'abantu',
    'community.proverb.en': 'L\'être humain existe grâce aux autres',
    'community.compose': 'Partagez avec la communauté ETL — votre victoire, repas ou leçon du jour…',
    'community.tab.feed': 'Fil d\'actualité',
    'community.tab.coach': 'Mon Coach',

    // Phases
    'phase.1': 'Ishingiro · Fondation',
    'phase.2': 'Kubaka · Construction',
    'phase.3': 'Gukomera · Renforcement',
    'phase.4': 'Kongera Gutangira · Réinitialisation',
    'phase.progress': 'En cours',
  },

  rw: {
    // Nav
    'nav.home': 'Uyu munsi',
    'nav.move': 'Imyitozo',
    'nav.nourish': 'Indyo',
    'nav.community': 'Umuryango',
    'nav.me': 'Njyewe',

    // Onboarding
    'onboard.welcome.overline': '🇷🇼 Murakaza neza',
    'onboard.welcome.title': 'Urugendo rwawe, rwakozwe n\'abantu bakumenya.',
    'onboard.welcome.proverb.rw': 'Ukuri ni umugabo',
    'onboard.welcome.proverb.en': 'Ukuri ni imbaraga — umubyizi wawe ni we wose dukeneye',
    'onboard.welcome.pill1': 'Abahuzabikorwa b\'akarere',
    'onboard.welcome.pill2': 'Ibiribwa by\'ukuri',
    'onboard.welcome.pill3': 'Inzira yawe',
    'onboard.step.back': 'Subira inyuma',
    'onboard.step.next': 'Komeza',
    'onboard.step.start': 'Tangira reset yanjye',

    'onboard.goals.title': 'Ikizaba gituma uza?',
    'onboard.goals.sub': 'Hitamo ibyo ukora kuri ubu.',
    'onboard.goals.activity': 'Urwego rw\'ibikorwa bya buri munsi',
    'onboard.goal.lose': 'Kugabanya ibiro',
    'onboard.goal.strong': 'Gukomera',
    'onboard.goal.energy': 'Kongera imbaraga',
    'onboard.goal.nutrition': 'Kurya neza',
    'onboard.goal.reset': 'Tangira Kongera nyuma yo guhagarara',
    'onboard.goal.event': 'Kwimenyereza ku mukino',

    'onboard.body.title': 'Umubiri wawe ubu',
    'onboard.body.sub': 'Nta gucira urubanza — bidufasha guhuza Phase 1.',
    'onboard.body.height': 'Uburebure',
    'onboard.body.weight': 'Ibiro ubu',
    'onboard.body.target': 'Ibiro ugambiriye (si ngombwa)',
    'onboard.body.age': 'Imyaka',

    'onboard.eating.title': 'Urya gute',
    'onboard.eating.sub': 'Turubaka ifunguro rishingiye ku biribwa ukunda.',
    'onboard.eating.diet': 'Ubwoko bw\'indiyo',
    'onboard.eating.foods': 'Ibiribwa ukunda',
    'onboard.eating.rwandanFoods': '🇷🇼 Indiyo z\'u Rwanda',
    'onboard.eating.otherFoods': 'Ibindi biribwa',
    'onboard.eating.cooking': 'Uburyo bwo guteka',
    'onboard.eating.fasting': 'Gufunga igihe runaka?',
    'onboard.eating.fasting.tip': 'Jeanne aragusaba gufunga amasaha 16:8 — biroroshye n\'imigenzo y\'indiyo z\'akarere.',

    'onboard.coach.title': 'Itsinda ry\'abakurikiranira',
    'onboard.coach.sub': 'Umukurikiranira wa fitness n\'inzobere mu biribwa — bombi i Kigali.',
    'onboard.coach.speaks': '🗣 Ikinyarwanda',

    'onboard.plan.overline': 'Murakoze',
    'onboard.plan.title': '{name}, gahunda yawe iri gutegurwa',
    'onboard.plan.sub': '{coach} ari gusuzuma amakuru yawe kandi azakoherereza Phase 1 yihariye mu masaha 24.',

    'onboard.step.indicator': 'Intera {n} kuri {total} · {title}',
    'onboard.step.start.cta': 'Yego — reka dutangire',
    'onboard.coach.pair': 'Guhuzwa n\'umukurikiranira',
    'onboard.coach.choose': 'Hitamo umukurikiranira hejuru',

    'onboard.step.lang': 'Ururimi',
    'onboard.step0': 'Muraho',
    'onboard.step1.identity': 'Inkingi ya 1: BMI',
    'onboard.step1.body': 'Inkingi ya 1: BMI',
    'onboard.step.health': 'Inkingi ya 2: Ubuzima',
    'onboard.step3.lifestyle': 'Inkingi ya 3: Ibiribwa',
    'onboard.step3.foods': 'Inkingi ya 3: Ibiribwa',
    'onboard.step2.focus': 'Inkingi ya 4: Imyitozo',
    'onboard.step2.activity': 'Inkingi ya 4: Imyitozo',
    'onboard.step4': 'Abakurikiranira',
    'onboard.step5': 'Gahunda yawe',

    // Home
    'home.day': 'Umunsi wa {n} / 84',
    'home.phase': 'Igice {n}',
    'home.context': 'Kigali, isoko ya Kimironko',
    'home.day.label': 'UMUNSI',
    'home.proverb.rw': '"Buhoro buhoro nirwo rugendo"',
    'home.proverb.en': 'Buhoro buhoro nirwo rugendo.',
    'home.into.reset': 'Uri ku munsi wa {n} w\'urugendo rwawe',
    'home.phase.banner': 'Igice {n} cya 4 · Inkindi',
    'home.community.label': 'Umuryango · ETL',
    'home.today': 'Uyu munsi',
    'home.workout.cta': 'Tangira imyitozo',
    'home.meal.cta': 'Reba gahunda y\'indyo',

    // Move
    'move.sub': 'Imyitozo yawe',
    'move.title': 'Imyitozo',
    'move.phase.in': 'Igice {n} cya 4 — Biragenda',
    'move.phase.name': 'Ishingiro',
    'move.terrain': '🇷🇼 Imisozi ya Kigali · Nyamirambo · Gikondo',
    'move.section': 'Imyitozo y\'icyumweru {n}',
    'move.section.rw': 'Imyitozo yo kuri uyu munsi',
    'move.day1': 'Mbe · Umunsi 1',
    'move.title1': 'Gukangura Umubiri Wose',
    'move.group1a': 'Umubiri wose',
    'move.group1b': 'Kugororoka',
    'move.loc1': 'Kigali · Gikondo',
    'move.day3': 'Gat · Umunsi 3',
    'move.title3': 'Ishingiro ry\'Amaguru',
    'move.group3a': 'Ibinyita',
    'move.group3b': 'Amaguru',
    'move.loc3': 'Kigali · Kimironko',
    'move.day5': 'Gat · Umunsi 5',
    'move.title5': 'Ishingiro ry\'Igice cyo Hejuru',
    'move.group5a': 'Gusunika',
    'move.group5b': 'Gukurura',
    'move.loc5': 'Imyitozo yo mu rugo',
    'move.day6': 'Gat · Umunsi 6',
    'move.title6': 'Kwihuta ku Musozi + Core',
    'move.group6a': 'Cardio',
    'move.group6b': 'Core',
    'move.loc6': 'Imisozi ya Nyamirambo',
    'move.complete.sub': 'Wabikoze neza!',
    'move.complete': 'Wabikoze neza!',
    'move.complete.body': 'Wyimenyerejwe n\'umugambi. Ni byo reset bivuze.',

    // Nourish
    'nourish.sub': '🇷🇼 Indyo yawe · Igihe cy\'ifunguro 12:00–20:00',
    'nourish.title': 'Indyo',
    'nourish.cook.rw': 'Guteka na Jeanne 🇷🇼',
    'nourish.cook': 'Guteka na Jeanne',
    'nourish.cook.sub': 'Gahunda y\'ingufu intera inzira · indiyo z\'u Rwanda.',
    'nourish.proverb.rw': 'Indyo nziza ni ubuzima bwiza',
    'nourish.proverb.en': 'Indyo nziza ni ubuzima bwiza',
    'nourish.insight': 'Poroteyine iminsi 5/7 y\'icyumweru',
    'nourish.insight.tip': 'Ongeraho inshyushyu ku ifunguro rya mbere ejo.',
    'nourish.meal1.name': 'Ifunguro rya Mbere · Ibishyimbo n’avoka',
    'nourish.meal1.desc': 'Ibishyimbo + birayi + isombe + avoka',
    'nourish.meal2.name': 'Akafunguro k’inyongera',
    'nourish.meal2.desc': 'Skyr + ingata ya groundnut · ushobora kukureka niba udashonje',
    'nourish.meal3.name': 'Ifunguro rya Kabiri · Inshyushyu n’ifeta',
    'nourish.meal3.desc': 'Inshyushyu + epinari + inyanya + feta',

    // Progress
    'progress.sub': '🇷🇼 Urugendo rwawe · Iminsi 12 kuri 84',
    'progress.title': 'Urugendo rwa Reset',
    'progress.level': 'Inkindi · Igice cya mbere',
    'progress.proverb.rw': '"Inzira ndende itangira intambwe imwe"',
    'progress.proverb.en': 'Inzira ndende itangira intambwe imwe',
    'progress.phases': 'Inzira zawe',
    'progress.phases.rw': 'Inzira y\'imihindagurikire',
    'progress.rewards': 'Ibihembo',
    'progress.rewards.sub': 'Byaronkejwe muri iri gice',

    // Community
    'community.sub': '🇷🇼 Umuryango wawe wa ETL',
    'community.title': 'Community',
    'community.proverb.rw': 'Umuntu ni umuntu kubw\'abantu',
    'community.proverb.en': 'Umuntu ni umuntu kubw\'abantu',
    'community.compose': 'Sangira n\'umuryango wawe — intsinzi, ifunguro, cyangwa isomo ry\'uyu munsi…',
    'community.tab.feed': 'Amakuru',
    'community.tab.coach': 'Umukurikiranira wanjye',

    // Phases
    'phase.1': 'Ishingiro',
    'phase.2': 'Kubaka',
    'phase.3': 'Gukomera',
    'phase.4': 'Kongera Gutangira',
    'phase.progress': 'Biragenda',
  },
};

// Simple interpolation: t('home.day', {n: 12}) → "Day 12 / 84"
function interpolate(str: string, vars?: Record<string, any>) {
  if (!vars || !str) return str;
  return str.replace(/\{(\w+)\}/g, (_, k) => vars[k] !== undefined ? vars[k] : `{${k}}`);
}

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
}

export const LangContext = React.createContext<LangContextType>({ lang: 'en', setLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const saved = (() => {
    try { return (localStorage.getItem('etl_lang') as Lang) || 'en'; } catch { return 'en'; }
  })();
  const [lang, setLangState] = React.useState<Lang>(saved);
  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem('etl_lang', l); } catch {}
  };
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useT() {
  // We keep the lang context to avoid breaking components, but force English
  return (key: string, vars?: Record<string, any>) => {
    const dict = TRANSLATIONS.en;
    const str = dict[key] ?? key;
    return interpolate(str, vars);
  };
}

// Language switcher — compact pill trio
export function LangSwitcher({ style = {} }: { style?: React.CSSProperties }) {
  const { lang, setLang } = React.useContext(LangContext);
  const langs: { id: Lang; label: string }[] = [
    { id: 'en', label: 'EN' },
    { id: 'fr', label: 'FR' },
    { id: 'rw', label: 'RW' },
  ];
  return (
    <div style={{
      display: 'inline-flex',
      background: 'rgba(45,106,79,0.08)',
      borderRadius: 999,
      padding: 3,
      gap: 2,
      ...style,
    }}>
      {langs.map(l => (
        <button key={l.id} onClick={() => setLang(l.id)} style={{
          padding: '5px 12px',
          borderRadius: 999,
          border: 'none',
          background: lang === l.id ? ETL.color.primary : 'transparent',
          color: lang === l.id ? '#fff' : ETL.color.neutral60,
          fontFamily: ETL.font.family,
          fontSize: 12,
          fontWeight: lang === l.id ? 700 : 500,
          cursor: 'pointer',
          transition: 'all 0.18s',
          letterSpacing: 0.5,
        }}>
          {l.label}
        </button>
      ))}
    </div>
  );
}
