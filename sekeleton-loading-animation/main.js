const container = document.querySelector('.container');
const template = document.createElement('template');
template.innerHTML = `
  <style>
    .skeleton {
      opacity: .7;
      animation: skeleton-loading 1s linear infinite alternate;
    }
    
    .skeleton-text {
      width: 100%;
      height: .5rem;
      margin-bottom: .25rem;
      border-radius: .125rem;
    }
    
    .skeleton-text:last-child {
      margin-bottom: 0;
      width: 80%;
    }
    
    @keyframes skeleton-loading {
      0% {
        background-color: hsl(200, 20%, 70%);
      }
    
      100% {
        background-color: hsl(200, 20%, 95%);
      }
    }

    .card {
      background-color: white;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
      padding: 16px;
      border-radius: 4px;
    }
    
    .header {
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
    }
    
    .header-img {
      width: 50px;
      height: 50px;
      object-fit: cover;
      border-radius: 100%;
      margin-right: 1rem;
      flex-shrink: 0;
    }
    
    .title {
      font-weight: bold;
      font-size: 1.25rem;
      text-transform: capitalize;
      word-wrap: none;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      flex-grow: 1;
    }
  </style>
  <div class="card">
    <div class="header">
      <div class="header-img skeleton"></div>
      <div class="title" data-title>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text"></div>
      </div>
    </div>
    <div data-body>
      <div class="skeleton skeleton-text"></div>
      <div class="skeleton skeleton-text"></div>
      <div class="skeleton skeleton-text"></div>
      <div class="skeleton skeleton-text"></div>
    </div>
  </div>
`;

class CardSkeleton extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
};

customElements.define('card-skeleton', CardSkeleton);

for (let i = 0; i < 10; i++) {
  container.append(document.createElement('card-skeleton'))
}

// fetch("https://jsonplaceholder.typicode.com/posts")
//   .then(res => res.json())
//   .then(posts => {
//     container.innerHTML = ''
//     posts.forEach(post => {
//       const div = cardTemplate.content.cloneNode(true)
//       div.querySelector('[data-title]').textContent = post.title
//       div.querySelector('[data-body]').textContent = post.body
//       grid.append(div)
//     })
// })
