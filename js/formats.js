const FORMATS = [
  {
    id: 'workshop',
    name: '1-Day Workshop',
    duration: '1 day',
    structure: 'Morning theory, afternoon hands-on.',
    activityCount: 7,
    bestFor: 'Quick team enablement, off-sites.',
    mix: { beginner: 0.5, intermediate: 0.4, advanced: 0.1 },
    schedule: { weeks: 1, daysPerWeek: 1, slotsPerDay: 7 }
  },
  {
    id: 'weekly-sprint',
    name: 'Weekly Sprint',
    duration: '1–2 weeks',
    structure: '1 activity per day, Mon–Fri.',
    activityCount: 10,
    bestFor: 'Focused skill burst.',
    mix: { beginner: 0.3, intermediate: 0.5, advanced: 0.2 },
    schedule: { weeks: 2, daysPerWeek: 5, slotsPerDay: 1 }
  },
  {
    id: 'monthly-marathon',
    name: 'Monthly Marathon',
    duration: '4 weeks',
    structure: 'Daily challenges, mandatory Fridays.',
    activityCount: 20,
    bestFor: 'Deep skill building.',
    mix: { beginner: 0.25, intermediate: 0.5, advanced: 0.25 },
    schedule: { weeks: 4, daysPerWeek: 5, slotsPerDay: 1 }
  },
  {
    id: 'lunch-learn',
    name: 'Lunch & Learn Series',
    duration: '4–8 weeks',
    structure: '1 session per week, 1 hour.',
    activityCount: 6,
    bestFor: 'Low-commitment introduction.',
    mix: { beginner: 0.6, intermediate: 0.4, advanced: 0 },
    schedule: { weeks: 6, daysPerWeek: 1, slotsPerDay: 1 }
  },
  {
    id: 'self-paced',
    name: 'Self-Paced Course',
    duration: 'Open-ended',
    structure: 'Learner chooses pace.',
    activityCount: 15,
    bestFor: 'Async, global teams.',
    mix: { beginner: 0.35, intermediate: 0.4, advanced: 0.25 },
    schedule: { weeks: 4, daysPerWeek: 5, slotsPerDay: 1 }
  },
  {
    id: 'hackathon',
    name: 'Hackathon',
    duration: '1–2 days',
    structure: 'Intensive team-based building.',
    activityCount: 4,
    bestFor: 'Innovation, team bonding.',
    mix: { beginner: 0, intermediate: 0.3, advanced: 0.7 },
    schedule: { weeks: 1, daysPerWeek: 2, slotsPerDay: 2 }
  },
  {
    id: 'certification',
    name: 'Certification Prep',
    duration: '2–4 weeks',
    structure: 'Structured modules with assessments.',
    activityCount: 14,
    bestFor: 'Formal skill validation.',
    mix: { beginner: 0.2, intermediate: 0.5, advanced: 0.3 },
    schedule: { weeks: 3, daysPerWeek: 5, slotsPerDay: 1 }
  },
  {
    id: 'custom',
    name: 'Custom',
    duration: 'User-defined',
    structure: 'Fully configurable.',
    activityCount: 12,
    bestFor: 'Specific needs.',
    mix: { beginner: 0.33, intermediate: 0.34, advanced: 0.33 },
    schedule: { weeks: 4, daysPerWeek: 5, slotsPerDay: 1 }
  }
];

const DAY_NAMES = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

if (typeof module !== 'undefined') module.exports = { FORMATS, DAY_NAMES };
