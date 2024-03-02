const postContainer = document.getElementById("post-container");

const latestPostContainer = document.getElementById('latest-post-container') ; 

const loadAllPosts = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/posts"
  );
  const data = await response.json();
//   console.log(data.posts);

  
  data.posts.forEach((item) => {
    // console.log(item);
    
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="flex mb-10 gap-10 bg-[#F3F3F5] p-5 rounded-lg">
                        <div class="flex">
                            <img src="${item.image}" class="w-[72px] h-[72px] rounded-2xl" alt="">
                            <div id="status-bar">${item.isActive}</div>
                        </div>
                        <div class="space-y-10">
                           <p class="font-medium space-x-10">
                            <span>#${item.category}</span>
                            <span>Author : ${item.author.name}</span>
                           </p>

                            <h4 class="text-xl font-bold">${item.title}</h4>

                            <p class="text-[#12132D99] border-b-2 border-dashed pb-1">${item.description}</p>

                            <div class="flex justify-between">
                                <div class="flex gap-10">
                                    <span class="flex gap-2"><img src="./images/tabler-icon-message-2.png" alt=""> ${item.comment_count}</span>
                                <span class="flex gap-2"><img src="./images/tabler-icon-eye.png" alt="">${item.view_count}</span>
                                <span class="flex gap-2"><img src="./images/tabler-icon-clock-hour-9.png" alt="">${item.posted_time}min</span>
                                </div>

                                <div class="">
                                    <img src="./images/email.png" alt="">
                                </div>
                            </div>
                            
                        </div>
                    </div>
        `;

    postContainer.appendChild(div);

    
  
  });
};


const latestPosts = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts') ;
    const data = await response.json() ;
    
    data.forEach((item) => {
        // console.log(item);
        const div = document.createElement('div') ;
        div.innerHTML = `
        <div class="border-2 border-gray-400 rounded-3xl p-5 space-y-5">
        <img src="${item.cover_image}" alt="">
        <div class="flex gap-4">
            <img src="./images/post-frame.png" alt="">
            <p>${item.author.posted_date}</p>
        </div>
        <h4 class="font-extrabold">${item.title}</h4>
        <p class="text-[#12132D99]">${item.description}</p>
        <div class="flex gap-8">
            <img class="w-[44px] h-[44px] rounded-full" src="${item.profile_image}" alt="">
            <div>
                <p class="font-bold">${item.author.name}</p>
                <p id= "desig" class="text-[#12132D]">${item.author.designation}</p>
            </div>
        </div>
    </div>
        ` ;
       
    latestPostContainer.appendChild(div) ;

        // if(!item.author.designation) {
        //     document.getElementById('desig').innerText = "unknown" ;
        // } ; 
        
    })
}

loadAllPosts();

latestPosts() ;