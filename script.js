const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');
menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  navigation.classList.toggle('is-open', !isOpen);
});
document.querySelectorAll('.main-nav a').forEach(link => link.addEventListener('click', () => {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
  navigation.classList.remove('is-open');
}));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
    navigation.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    menuToggle.focus();
  }
});

let selectedFuel = 'Petrol';
document.querySelectorAll('.fuel-type').forEach(button => button.addEventListener('click', () => {
  selectedFuel = button.dataset.fuel;
  document.querySelectorAll('.fuel-type').forEach(item => {
    item.classList.toggle('selected', item === button);
    item.setAttribute('aria-pressed', String(item === button));
  });
  document.getElementById('booking-feedback').textContent = 'An interactive concept. No real booking is made.';
}));
document.getElementById('time-slot').addEventListener('change', () => {
  document.getElementById('booking-feedback').textContent = 'An interactive concept. No real booking is made.';
});
document.getElementById('preview-booking').addEventListener('click', () => {
  const slot = document.getElementById('time-slot').value;
  document.getElementById('booking-feedback').textContent = `Concept preview: ${selectedFuel} · ${slot}. No real booking is made.`;
});

const tasks = [...document.querySelectorAll('.demo-task input')];
function updateTasks() {
  const completed = tasks.filter(task => task.checked).length;
  document.getElementById('task-count').textContent = `${completed}/${tasks.length}`;
  document.getElementById('task-progress').style.width = `${completed / tasks.length * 100}%`;
}
tasks.forEach(task => task.addEventListener('change', updateTasks));
updateTasks();

const projects = {
  fuelflux: {
    category: 'FINAL-YEAR PROJECT / WEB APPLICATION', title: 'FuelFlux.', subtitle: 'An everyday problem, a practical web idea.',
    overview: 'FuelFlux is my final-year petrol-pump booking platform project. It explores how a digital booking experience can help people plan a fuel stop more conveniently.',
    sections: [
      ['The idea', 'Bring the fuel-booking journey into one web experience, with a clear path from choosing fuel to planning a visit.'],
      ['The focus', 'Thinking through the booking journey, presenting choices clearly, and connecting the interface to a practical everyday use case.'],
      ['What you see here', 'The interactive booking panel on this portfolio is a newly designed interface concept with illustrative data. It demonstrates the idea; it is not a screenshot, live service, or real booking system.']
    ], tags: ['Fuel booking', 'Web application', 'Final-year project']
  },
  securetask: {
    category: 'FULL-STACK PROJECT / TASK MANAGEMENT', title: 'SecureTask.', subtitle: 'A clear workspace, with access built in.',
    overview: 'A full-stack task management application built with React.js, Node.js, MongoDB, and JWT. It combines task and user management with authentication and role-based access control.',
    sections: [
      ['The build', 'Developed RESTful APIs for task and user management, with JWT authentication and authorization to support role-based access.'],
      ['The development process', 'Tested API behavior with Postman and prepared technical documentation, API specifications, and deployment reports. The project was deployed on Vercel.'],
      ['What you see here', 'The checklist is an interactive interface concept using sample tasks. It illustrates task state on this page; no account or project data is connected.']
    ], tags: ['React', 'Node.js', 'MongoDB', 'JWT', 'Postman']
  },
  travel: {
    category: 'DATABASE PROJECT / RELATIONAL DESIGN', title: 'Travel, well structured.', subtitle: 'Making the relationships do the work.',
    overview: 'A relational database project for a travelling company, designed to manage customers, tour packages, and bookings using SQL and PostgreSQL.',
    sections: [
      ['The structure', 'Created entity-relationship diagrams and normalized the database up to third normal form (3NF), with a focus on consistent data and clear relationships.'],
      ['The implementation', 'Wrote SQL queries and validated database functionality through query testing. DIA Diagram Editor was used for the data modeling work.'],
      ['What you see here', 'The diagram is a simplified schema concept showing the relationship between customers, bookings, and packages. It is a visual summary rather than the complete project schema.']
    ], tags: ['SQL', 'PostgreSQL', 'Database design', '3NF']
  }
};
const dialog = document.getElementById('project-dialog');
let lastProjectButton;
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  const project = projects[button.dataset.project];
  lastProjectButton = button;
  document.getElementById('dialog-content').innerHTML = `<p class="dialog-category">${project.category}</p><h2 id="dialog-title">${project.title}</h2><p class="dialog-subtitle">${project.subtitle}</p><p class="dialog-overview">${project.overview}</p>${project.sections.map(([heading, content]) => `<section class="dialog-section"><h3>${heading}</h3><p>${content}</p></section>`).join('')}<div class="tags">${project.tags.map(tag => `<span>${tag}</span>`).join('')}</div>`;
  dialog.showModal();
  document.body.classList.add('dialog-open');
}));
function closeDialog() { dialog.close(); }
document.querySelector('.dialog-close').addEventListener('click', closeDialog);
document.querySelector('.dialog-done').addEventListener('click', closeDialog);
dialog.addEventListener('click', event => {
  if (event.target === dialog) {
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeDialog();
  }
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  lastProjectButton?.focus({preventScroll:true});
});

document.getElementById('copy-email').addEventListener('click', async event => {
  const button = event.currentTarget;
  const feedback = document.getElementById('copy-feedback');
  try {
    await navigator.clipboard.writeText('paylotparimal@gmail.com');
    button.innerHTML = 'Email copied <span aria-hidden="true">✓</span>';
    feedback.textContent = 'Email address copied to clipboard.';
    setTimeout(() => { button.innerHTML = 'Copy email address <span aria-hidden="true">▣</span>'; }, 3000);
  } catch {
    button.textContent = 'paylotparimal@gmail.com';
    feedback.textContent = 'Copy is unavailable. The email address is paylotparimal@gmail.com.';
  }
});
document.getElementById('year').textContent = new Date().getFullYear();
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.main-nav a').forEach(link => {
        const active = link.getAttribute('href') === `#${entry.target.id}`;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current');
      });
    }
  });
}, {rootMargin:'-15% 0px -65% 0px', threshold:0});
document.querySelectorAll('section[id]').forEach(section => sectionObserver.observe(section));
