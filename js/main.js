'use strict';

const IMG = {
  jerome:   'assets/c63086c15719088561c8ec14b31455901e6aced2.jpg',
  marvin:   'assets/4dc0c01cdada93a61e7f51ac6388e22a998e52c3.jpg',
  leslie:   'assets/1c5469059ec3475582a6f6129b6ad3aed940c4d0.jpg',
  kristin:  'assets/e6c7967bad5827ead11861fa456bdb395058c281.jpg',
  dianne:   'assets/1959b06e7f5d4163ea9599946af07d3d52f61d21.jpg',
  brooklyn: 'assets/26b7504f2f3ca140714e87c67d19cee808f942e3.jpg',
  kathryn:  'assets/56e453da1f9df64680ce9ae8deb70c4fd6494a76.jpg',
  cody:     'assets/39a7972cf1e363e8eb007225e0b26ec15b87aa9b.jpg',
  guy:      'assets/guy_hawkins.png',
};

const COURSES = [
  {
    id: 1,
    title: 'The Ultimate Google Ads Training Course',
    price: 100,
    author: 'Jerome Bell',
    category: 'Marketing',
    image: IMG.jerome,
  },
  {
    id: 2,
    title: 'Product Management Fundamentals',
    price: 480,
    author: 'Marvin McKinney',
    category: 'Management',
    image: IMG.marvin,
  },
  {
    id: 3,
    title: 'HR Management and Analytics',
    price: 200,
    author: 'Leslie Alexander Li',
    category: 'HR & Recruting',
    image: IMG.leslie,
  },
  {
    id: 4,
    title: 'Brand Management & PR Communications',
    price: 530,
    author: 'Kristin Watson',
    category: 'Marketing',
    image: IMG.kristin,
  },
  {
    id: 5,
    title: 'Graphic Design Basic',
    price: 500,
    author: 'Guy Hawkins',
    category: 'Design',
    image: IMG.guy,
  },
  {
    id: 6,
    title: 'Business Development Management',
    price: 400,
    author: 'Dianne Russell',
    category: 'Management',
    image: IMG.dianne,
  },
  {
    id: 7,
    title: 'Highload Software Architecture',
    price: 600,
    author: 'Brooklyn Simmons',
    category: 'Development',
    image: IMG.brooklyn,
  },
  {
    id: 8,
    title: 'Human Resources – Selection and Recruitment',
    price: 150,
    author: 'Kathryn Murphy',
    category: 'HR & Recruting',
    image: IMG.kathryn,
  },
  {
    id: 9,
    title: 'User Experience. Human-centered Design',
    price: 240,
    author: 'Cody Fisher',
    category: 'Design',
    image: IMG.cody,
  },
  {
    id: 10,
    title: 'Social Media Marketing Mastery',
    price: 320,
    author: 'Albert Flores',
    category: 'Marketing',
    image: IMG.kristin,
  },
  {
    id: 11,
    title: 'Email Marketing Campaigns That Convert',
    price: 180,
    author: 'Savannah Nguyen',
    category: 'Marketing',
    image: IMG.dianne,
  },
  {
    id: 12,
    title: 'Strategic Management Basics',
    price: 450,
    author: 'Cameron Williamson',
    category: 'Management',
    image: IMG.jerome,
  },
  {
    id: 13,
    title: 'Talent Acquisition Strategies',
    price: 270,
    author: 'Annette Black',
    category: 'HR & Recruting',
    image: IMG.kathryn,
  },
  {
    id: 14,
    title: 'Employee Onboarding Best Practices',
    price: 190,
    author: 'Ralph Edwards',
    category: 'HR & Recruting',
    image: IMG.marvin,
  },
  {
    id: 15,
    title: 'Compensation & Benefits Planning',
    price: 310,
    author: 'Eleanor Pena',
    category: 'HR & Recruting',
    image: IMG.dianne,
  },
  {
    id: 16,
    title: 'React.js Advanced Patterns',
    price: 550,
    author: 'Darlene Robertson',
    category: 'Development',
    image: IMG.kristin,
  },
  {
    id: 17,
    title: 'Node.js Microservices Architecture',
    price: 490,
    author: 'Floyd Miles',
    category: 'Development',
    image: IMG.brooklyn,
  },
];

const CATEGORY_KEY_MAP = {
  'All':            'all',
  'Marketing':      'marketing',
  'Management':     'management',
  'HR & Recruting': 'hr-recruiting',
  'Design':         'design',
  'Development':    'development',
};

const CATEGORY_COLOR = {
  'all':          '#ff4242',
  'marketing':    '#03cea4',
  'management':   '#5a87fc',
  'hr-recruiting':'#f89829',
  'design':       '#f52f6e',
  'development':  '#7772f1',
};

const PAGE_SIZE = 9;

class CourseCatalog {
  constructor() {
    this._grid        = document.getElementById('catalog-grid');
    this._filterTabs  = document.getElementById('filter-tabs');
    this._searchInput = document.getElementById('search-input');
    this._loadMoreBtn = document.getElementById('load-more-btn');

    this._activeCategory = 'All';
    this._searchQuery    = '';
    this._shownCount     = PAGE_SIZE;

    this._buildFilters();
    this._bindEvents();
    this._render();
  }

  _buildFilters() {
    const categories = ['All', ...new Set(COURSES.map(c => c.category))];

    categories.forEach(cat => {
      const count = cat === 'All'
        ? COURSES.length
        : COURSES.filter(c => c.category === cat).length;

      const li = document.createElement('li');
      li.className = 'filter__tab';
      li.dataset.category = cat;
      li.innerHTML = `${cat} <sup class="filter__tab-count">${count}</sup>`;
      this._filterTabs.appendChild(li);
    });

    this._updateTabStates();
  }

  _bindEvents() {
    this._filterTabs.addEventListener('click', e => {
      const tab = e.target.closest('.filter__tab');
      if (!tab) return;
      this._activeCategory = tab.dataset.category;
      this._shownCount     = PAGE_SIZE;
      this._updateTabStates();
      this._render();
    });

    this._searchInput.addEventListener('input', () => {
      this._searchQuery = this._searchInput.value.trim().toLowerCase();
      this._shownCount  = PAGE_SIZE;
      this._render();
    });

    this._loadMoreBtn.addEventListener('click', () => {
      this._shownCount += PAGE_SIZE;
      this._render();
    });
  }

  _getFiltered() {
    return COURSES.filter(course => {
      const matchCat = this._activeCategory === 'All'
        || course.category === this._activeCategory;
      const matchSearch = !this._searchQuery
        || course.title.toLowerCase().includes(this._searchQuery);
      return matchCat && matchSearch;
    });
  }

  _render() {
    const filtered = this._getFiltered();
    const visible  = filtered.slice(0, this._shownCount);

    this._grid.innerHTML = visible.length
      ? visible.map(course => this._cardTemplate(course)).join('')
      : '<p class="catalog__empty">Nothing found. Try a different search query.</p>';

    const hasMore = filtered.length > this._shownCount;
    this._loadMoreBtn.classList.toggle('load-more--hidden', !hasMore);
  }

  _updateTabStates() {
    this._filterTabs.querySelectorAll('.filter__tab').forEach(tab => {
      const isActive = tab.dataset.category === this._activeCategory;
      const key = CATEGORY_KEY_MAP[tab.dataset.category] || 'all';
      tab.className = 'filter__tab';
      tab.style.color = '';
      if (isActive) {
        tab.classList.add(`filter__tab--${key}-active`);
        tab.style.color = CATEGORY_COLOR[key];
      }
    });
  }

  _cardTemplate(course) {
    const key   = CATEGORY_KEY_MAP[course.category] || 'all';
    const label = course.category;

    return `
      <article class="card card--${key}">
        <div class="card__image">
          <img
            class="card__photo"
            src="${course.image}"
            alt="${course.author}"
            loading="eager"
          >
        </div>
        <div class="card__body">
          <span class="card__badge card__badge--${key}">${label}</span>
          <h2 class="card__title">${course.title}</h2>
          <div class="card__meta">
            <span class="card__price">$${course.price}</span>
            <span class="card__separator">|</span>
            <span class="card__author">by ${course.author}</span>
          </div>
        </div>
      </article>`;
  }
}

document.addEventListener('DOMContentLoaded', () => new CourseCatalog());
