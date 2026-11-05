// Course content. Edit this file to change levels, modules, videos or exercises.
// n: the module's permanent id, used for saved progress and #m links. Never reuse or change one;
//    give a new module the next unused id. The number learners see comes from the module's position in this list.
// topic: the sidebar group a module sits under.
// videos: [title, YouTube id plus optional &t=start]. Thumbnails live in thumbs/<id>.jpg.
window.COURSE = {
  levels: [
    { key: 'beg', name: 'Beginner' },
    { key: 'int', name: 'Intermediate' },
    { key: 'pro', name: 'Pro' }
  ],

  modules: [
    { n: 1, level: 'beg', topic: 'Getting started', title: 'Introduction to Design Systems',
      desc: 'Understand what a Design System is, why it exists, and how it helps teams build consistent digital products.',
      topics: ['What is a Design System?', 'Design System vs UI Kit', 'Who uses a Design System'],
      videos: [['What is a Design System?', 'YLo6g58vUm0'], ['Design System 101', 'oz3Ubo5T-7Y']] },
    { n: 2, level: 'beg', topic: 'Foundations', title: 'Design System Foundations',
      desc: 'Learn the fundamental elements that establish the visual language of a product.',
      topics: ['Color theory and color systems', 'Typography', 'Spacing', 'Layout and grids', 'Border, radius and elevation', 'Iconography'],
      videos: [['Typography', 'B24oJclKGDk'], ['Spacing', 'rnlADjRvJlc'], ['Layout and Breakpoints', 'uvSHkNvKcLA']],
      exercise: 'Create a basic color and typography system.' },
    { n: 3, level: 'beg', topic: 'Foundations', title: 'Variables and Styles',
      desc: 'Learn how Figma stores reusable values as variables and styles, and when to use each.',
      topics: ['What are variables?', 'Variable types: color, number, string and boolean', 'Variables vs Styles', 'Collections and groups', 'Creating color and text styles'],
      videos: [['Tokens, Variables and Styles', 'JyCmacSyDY4&t=199s'], ['Intro to Variables', '1ONxxlJnvdM&t=397s'], ['Figma Variables in 7 Minutes', 'GUupJJC5Ac4']],
      exercise: 'Create color and spacing variables, and text styles for your type scale.' },
    { n: 19, level: 'beg', topic: 'Foundations', title: 'Design Tokens',
      desc: 'Understand how design decisions become tokens, and how primitive, semantic and component tokens build on each other.',
      topics: ['What are Design Tokens?', 'Primitive Tokens', 'Semantic Tokens', 'Component Tokens', 'Organising tokens in Figma'],
      videos: [['Primitive, Semantic and Component Tokens', '8RVLt1Y-6I8'], ['Primitive Tokens', 'QKQ-QnHAJcQ'], ['Semantic Tokens', 'zfFZ99MBEPk'], ['Semantic Tokens in Practice', 'hRoXRQiprqY']],
      exercise: 'Create primitive and semantic variables.' },
    { n: 4, level: 'beg', topic: 'Foundations', title: 'Naming Conventions',
      desc: 'Learn how to name tokens, components, variants and layers so your Design System is easy to find, read and scale.',
      topics: ['Why naming matters in a Design System', 'Naming primitive and semantic tokens', 'Naming components and variants', 'Naming layers and frames', 'Grouping with slash naming in Figma', 'Common naming patterns and mistakes'],
      videos: [['How to Name and Automate Design Tokens', 'irsPXBHjPXs']],
      exercise: 'Rename your variables and styles using one clear, consistent naming scheme.' },
    { n: 5, level: 'beg', topic: 'Components', title: 'Components',
      desc: 'Understand how to create reusable UI elements and organise them into a component library.',
      topics: ['What are Components?', 'Atomic structure: atoms, molecules and organisms', 'Component anatomy', 'Creating components', 'Component properties', 'Component organisation', 'Nested components'],
      videos: [['Components, Part 1', '7dJBDU8HBeQ&t=140s'], ['Components, Part 2', 'iIq8FLt1hUY&t=10s']],
      exercise: 'Build buttons, inputs and badges.' },
    { n: 6, level: 'beg', topic: 'Components', title: 'Component Variants and Properties',
      desc: 'Learn how to manage different component states, appearances and behaviours without creating unnecessary duplicate components.',
      topics: ['What are Variants?', 'Creating and organising variants', 'Variant properties', 'Boolean and instance swap properties', 'Component states', 'Best practices for component architecture'],
      videos: [['Variants, Part 1', 'y29Xwt9dET0&t=30s'], ['Variants, Part 2', 'AwnJyGV-3Zs&t=100s']],
      exercise: 'Create button variants and states.' },
    { n: 7, level: 'beg', topic: 'Components', title: 'Auto Layout and Responsive Design',
      desc: 'Learn how to build flexible, scalable layouts that adapt to different content sizes and screen dimensions.',
      topics: ['Introduction to Auto Layout', 'Direction, spacing and padding', 'Hug, Fill and Fixed sizing', 'Nested Auto Layout', 'Responsive components', 'Common Auto Layout patterns'],
      videos: [['Auto Layout, Part 1', 'PNJxeD29ZTg'], ['Auto Layout, Part 2', 'bh98SF7OjUk']],
      exercise: 'Build a responsive card.' },

    { n: 8, level: 'int', topic: 'Theming', title: 'Modes and Themes',
      desc: 'Use Figma variable modes to create light, dark and other themes from one set of components.',
      topics: ['What are Modes?', 'Light and Dark themes', 'Variable collections and modes', 'Applying modes to components', 'Theming semantic tokens', 'Language modes for localization', 'Best practices for theme management'],
      videos: [['Design Tokens and Modes', '5jkPGBgdRlY'], ['Language Localization with Modes', 'Y9k8DJPT2g8']],
      exercise: 'Create light and dark themes.' },
    { n: 9, level: 'int', topic: 'Advanced components', title: 'Atomic Structure',
      desc: 'Learn how Atomic Design breaks an interface into atoms, molecules and organisms, and how that structure shapes a component library.',
      topics: ['What is Atomic Design?', 'Atoms, molecules, organisms, templates and pages', 'Why structure matters in a Design System', 'Mapping your components to atomic levels', 'Naming and organising by level in Figma'],
      videos: [['What is Atomic Design?', 'Yi-A20x2dcA'], ['Atomic Design, Step by Step', 'uX2bc-irFLI']],
      exercise: 'Sort the components you have built so far into atoms, molecules and organisms.' },
    { n: 10, level: 'int', topic: 'Advanced components', title: 'Atomic Components',
      desc: 'Build the smallest building blocks of the system so they are consistent, flexible and easy to reuse.',
      topics: ['What makes a good atom', 'Buttons, inputs, icons, labels and badges', 'Using tokens inside atoms', 'Properties and variants for atoms', 'States: hover, focus, disabled, error'],
      videos: [],
      exercise: 'Build a complete set of atoms: button, input, icon, label and badge.' },
    { n: 11, level: 'int', topic: 'Advanced components', title: 'Molecule Components',
      desc: 'Combine atoms into small, useful groups that do one job well.',
      topics: ['What makes a molecule', 'Search fields, form fields and list items', 'Combining atoms with Auto Layout', 'Exposing nested properties', 'Keeping molecules flexible'],
      videos: [],
      exercise: 'Build a search field and a form field from your atoms.' },
    { n: 12, level: 'int', topic: 'Advanced components', title: 'Organism Components',
      desc: 'Build larger sections of an interface from molecules and atoms, using slots and composition.',
      topics: ['What makes an organism', 'Headers, cards, modals and tables', 'Slots and flexible content areas', 'Composition and nesting patterns', 'When to split an organism into smaller parts'],
      videos: [['Flexible Components with Slots', 'UjOVRUSdO14']],
      exercise: 'Build a header and a modal from your molecules and atoms.' },
    { n: 13, level: 'int', topic: 'Teamwork', title: 'Organisation and Documentation',
      desc: 'Learn how to structure, document and make a Design System easy to understand and use.',
      topics: ['Organising Figma libraries', 'Pages and file structure', 'Keeping names consistent across libraries', 'Component documentation', 'Usage guidelines', "Do's and Don'ts"],
      videos: [['Document, Improve and Update Your Design System', '_sTWtnNU1L0']],
      exercise: 'Document a component with usage guidelines.' },
    { n: 14, level: 'int', topic: 'Teamwork', title: 'Maintenance and Governance',
      desc: 'Understand how a Design System evolves and how teams maintain consistency as products grow.',
      topics: ['Design System ownership', 'Contribution process', 'Component updates and versioning', 'Managing deprecated components', 'Maintaining consistency', 'Design System adoption across teams'],
      videos: [],
      exercise: 'Write a contribution and versioning process for your system.' },

    { n: 15, level: 'pro', topic: 'Scaling', title: 'Multi-brand Design Systems',
      desc: 'Run several brands or products from one Design System, sharing components while each brand keeps its own look.',
      topics: ['Brand, product and core layers', 'Token architecture for multiple brands', 'Brand collections and modes in Figma', 'Shared components, brand-specific styling', 'Handling brand exceptions', 'Adding a new brand'],
      videos: [],
      exercise: 'Add a second brand to your system using variable modes.' },
    { n: 16, level: 'pro', topic: 'AI workflows', title: 'AI-ready Design Systems',
      desc: 'Prepare your Design System so AI tools and agents can read it, understand it and use it correctly.',
      topics: ['What makes a system AI-ready', 'Machine-readable tokens and naming', 'Component descriptions and metadata', 'Documentation for people and agents', 'Linking design to code', 'Rules and guardrails for generated UI'],
      videos: [],
      exercise: 'Add clear descriptions and usage rules to five components.' },
    { n: 17, level: 'pro', topic: 'AI workflows', title: 'Claude + MCP',
      desc: 'Connect Claude to Figma and your codebase with the Model Context Protocol (MCP), so it can work with your real Design System.',
      topics: ['What is MCP?', 'Setting up a Figma MCP server', 'Reading variables, components and design context', 'Generating code from Figma designs', 'Keeping design and code in sync', 'Prompting for Design System work'],
      videos: [],
      exercise: 'Use Claude and MCP to turn one of your components into code.' },
    { n: 18, level: 'pro', topic: 'AI workflows', title: 'Figma Agents',
      desc: 'Use AI agents inside Figma to build, audit and maintain your Design System faster.',
      topics: ['What are Figma agents?', 'Automating repetitive system tasks', 'Auditing files for detached instances and token misuse', 'Generating variants and documentation', 'Reviewing agent output', 'Limits and responsible use'],
      videos: [],
      exercise: 'Use an agent to audit a file and fix token misuse.' }
  ],

  concepts: [
    { title: 'Atomic Design', text: 'Atoms, molecules, organisms, templates and pages. UI built from small pieces combined into larger ones.', module: 9 },
    { title: 'Component Anatomy', text: 'How a component is structured, and which of its parts can change.', module: 5 },
    { title: 'Accessibility', text: 'Contrast, focus states, touch targets and accessible component states.', module: 6 },
    { title: 'Library Management', text: 'Publishing, enabling and using shared Figma libraries across a team.', module: 13 },
    { title: 'Design System vs UI Kit', text: 'A UI kit is a set of components. A Design System adds tokens, guidelines, documentation and the people who keep it consistent.', module: 1 }
  ],

  // Study material. Add links to each category's items.
  // Item format: { title: 'Atomic Design', by: 'Brad Frost', url: 'https://...', level: 'beg' }
  //   by    (optional) author, site or company
  //   level (optional) 'beg', 'int' or 'pro'. The course page shows a link only at its level;
  //         links without a level show at every level. materials.html lists everything.
  materials: [
    { name: 'Books', items: [] },
    { name: 'Blogs', items: [
      { title: 'Groundwork: a simple starting point for building better design systems', by: 'uiux.angel on Medium', url: 'https://medium.com/@uiux.angel/groundwork-a-simple-starting-point-for-building-better-design-systems-1490984c6cb8', img: 'thumbs/reading/groundwork-a-simple-starting-point-for-building.jpg', level: 'beg' },
      { title: '10 open-source design systems that help you build better interfaces', by: 'CodeToDeploy', url: 'https://medium.com/codetodeploy/10-open-source-design-systems-that-help-you-build-better-interfaces-23a8c0d84b07', img: 'thumbs/reading/10-open-source-design-systems-that-help-you-buil.jpg', level: 'beg' },
      { title: 'Everything you need to know about design systems', by: 'Nasir Ahmed on Medium', url: 'https://medium.com/@nasir-ahmed03/everything-you-need-to-know-about-design-systems-555be88d3929', img: 'thumbs/reading/everything-you-need-to-know-about-design-systems.jpg', level: 'beg' },
      { title: 'Auto Layout is not just a shortcut: the hidden architecture of modern design systems', by: 'Baran Ozdemir', url: 'https://medium.com/@Baran-Ozdemir/auto-layout-is-not-just-a-shortcut-the-hidden-architecture-of-modern-design-systems-f227fd1cf99f', img: 'thumbs/reading/auto-layout-is-not-just-a-shortcut-the-hidden-ar.jpg', level: 'beg' },
      { title: 'Systematic taxonomy in design tokens: a framework for scalable UI architecture', by: 'Design Systems Collective', url: 'https://www.designsystemscollective.com/systematic-taxonomy-in-design-tokens-a-framework-for-scalable-ui-architecture-45cc6f2c7686', img: 'thumbs/reading/systematic-taxonomy-in-design-tokens-a-framework.jpg', level: 'int' },
      { title: 'Design tokens need more than semantics', by: 'Nate Baldwin', url: 'https://medium.com/@NateBaldwin/design-tokens-need-more-than-semantics-0e5a85df0d33', img: 'thumbs/reading/design-tokens-need-more-than-semantics-0e5a85df0.jpg', level: 'int' },
      { title: 'What AI has changed in design systems, and what is still up to us', by: 'UX Collective', url: 'https://uxdesign.cc/what-ai-has-changed-in-design-systems-and-what-is-still-up-to-us-d4e8e8f4ceb2', img: 'thumbs/reading/what-ai-has-changed-in-design-systems-and-what-i.jpg', level: 'pro' },
      { title: 'Is your design system ready for AI? What engineering teams need to fix', by: 'PedalsUp on Medium', url: 'https://medium.com/@PedalsUp/is-your-design-system-ready-for-ai-what-engineering-teams-need-to-fix-124af5024bd2', img: 'thumbs/reading/is-your-design-system-ready-for-ai-what-engineer.jpg', level: 'pro' },
      { title: 'AI-ready design systems: 10 reflections', by: 'Design Systems Collective', url: 'https://www.designsystemscollective.com/ai-ready-design-systems-10-reflections-99b38ee2f397', img: 'thumbs/reading/ai-ready-design-systems-10-reflections-99b38ee2f.jpg', level: 'pro' },
      { title: 'How to make your Figma design system perfectly readable by AI', by: 'Design Systems Collective', url: 'https://www.designsystemscollective.com/how-to-make-your-figma-design-system-perfectly-readable-by-ai-7b614a9f2119', img: 'thumbs/reading/how-to-make-your-figma-design-system-perfectly-r.jpg', level: 'pro' },
      { title: 'Building an AI-ready design system library: code and Figma with MCP', by: 'UX Collective', url: 'https://uxdesign.cc/building-an-ai-ready-design-system-library-code-figma-with-mcp-ec5d9e8c90d2', img: 'thumbs/reading/building-an-ai-ready-design-system-library-code.jpg', level: 'pro' },
      { title: 'What changes when your design system can talk to an AI', by: 'QuantumBlack', url: 'https://medium.com/quantumblack/what-changes-when-your-design-system-can-talk-to-an-ai-0a856b3c40d9', img: 'thumbs/reading/what-changes-when-your-design-system-can-talk-to.jpg', level: 'pro' }
    ] },
    { name: 'Articles', items: [
      { title: 'Design systems 101: what is a design system?', by: 'Figma', url: 'https://www.figma.com/blog/design-systems-101-what-is-a-design-system/', img: 'thumbs/reading/design-systems-101-what-is-a-design-system.jpg', level: 'beg' },
      { title: 'Designing design systems: a framework for names, terms and definitions', by: 'Adobe Design', url: 'https://adobe.design/ideas/designing-design-systems-a-framework-for-names-terms-and-definitions', img: 'thumbs/reading/designing-design-systems-a-framework-for-names-t.jpg', level: 'beg' },
      { title: 'Design token system', by: 'Contentful', url: 'https://www.contentful.com/blog/design-token-system/', img: 'thumbs/reading/design-token-system.jpg', level: 'beg' }
    ] },
    { name: 'Source material', items: [
      { title: 'DesignSystems.com: guides, stories and resources on design systems', by: 'Figma', url: 'https://www.designsystems.com/', img: 'thumbs/reading/designsystems-com.jpg' }
    ] },
    { name: 'Case studies', items: [] }
  ]
};
