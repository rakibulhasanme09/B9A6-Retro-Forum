const loadPosts = async (p) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/${p}`);

    const data = await res.json();
    const posts = data.posts;
    displayPosts(posts);
}

const displayPosts = posts => {
    const container = document.getElementById('container');
    container.textContent ='';
    console.log(posts.length);

    posts.forEach(post => {
    const card = document.createElement('div');
    card.classList = 'bg-[#F3F3F5] hover:bg-violet-50 border border-transparent hover:border-violet-300 transition-all duration-300 p-6 sm:p-8 rounded-2xl';

    // Note the change from id="active" to a class "active-indicator"
    card.innerHTML = `<div class="flex flex-col sm:flex-row gap-6">
                        <div class="w-full sm:w-20 h-20 bg-white rounded-lg flex-shrink-0">
                            <img class="rounded-lg" src="${post.image}" alt="${post.author?.name}">
                        </div>
                        <div class="w-full">
                            <div class="flex items-center gap-5 text-sm font-medium mb-3">
                                <span class="flex items-center gap-2">
                                    <div class="w-3 h-3 rounded-full active-indicator"></div># ${post.category}
                                </span>
                                <span>Author : ${post.author?.name || 'N/A'}</span>
                            </div>
                            <h3 class="text-xl font-extrabold text-gray-800 mb-3">${post?.title}</h3>
                            <p class="text-gray-600 border-b border-dashed border-gray-400 pb-5 mb-5">
                                ${post.description}
                            </p>
                            <div class="flex justify-between items-center">
                                <div class="flex items-center gap-6 text-gray-500">
                                    <span class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" /></svg> ${post.comment_count}</span>
                                    <span class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" /></svg> ${post.view_count}</span>
                                    <span class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.415L11 9.586V6z" clip-rule="evenodd" /></svg> ${post.posted_time} min</span>
                                </div>
                                <button onclick="markAsRead('${post.title}','${post.view_count}')" class="btn btn-circle bg-green-100 border-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>`;

    // **CORRECTED LOGIC STARTS HERE**

    // 1. Append the card to the DOM first
    container.appendChild(card);

    // 2. Find the indicator *inside the card you just added*
    const ac = card.querySelector('.active-indicator');

    // 3. Now, apply the correct class
    if (post?.isActive) {
        ac.classList.add('bg-green-500');
    } else {
        // Corrected the Tailwind class for red
        ac.classList.add('bg-red-500');
    }
});
};

const markAsRead = async(title,view) => {
    console.log(title);
    console.log(view);

    const mar_count = document.getElementById('mar_count');
    const mar_counted = parseInt(mar_count.innerHTML) + 1;
    console.log(mar_counted);
    mar_count.innerHTML = `${mar_counted}`;


    const mar = document.getElementById('mar');
    const card = document.createElement('div');
    card.classList = 'bg-white p-4 rounded-lg flex justify-between items-center';
    card.innerHTML = `
        <p class="font-semibold text-gray-800">${title}</p>
        <span class="flex items-center gap-2 text-gray-500"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" /></svg> ${view}</span> 
    `;

    mar.appendChild(card);


};


loadPosts('posts');