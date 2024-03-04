const postContainer = document.getElementById("post-container");

const latestPostContainer = document.getElementById("latest-post-container");

let markCount = parseInt(document.getElementById('mark-count').innerText) ;

const loadAllPosts = async (catName) => {
 setTimeout(async() => {
  
  let api = ``;
  if (!catName) {
    api = `https://openapi.programming-hero.com/api/retro-forum/posts`;
  } else {
    api = `https://openapi.programming-hero.com/api/retro-forum/posts?category=${catName}`;
  }
  const response = await fetch(api);
  const data = await response.json();
  console.log(data.posts);

  postContainer.innerHTML = "";
  data.posts.forEach((item) => {
    document.getElementById('spinner').style.display = 'none' ;
    document.getElementById('search-box').value = '' ;
    // console.log(item);
    let active = "";
    if (item.isActive) {
      active = `<img src="./images/Status.png">`;
    } else {
      active = `<img src="./images/status2.png">`;
    }

    const div = document.createElement("div");
    div.innerHTML = `
        <div class="flex mb-10 gap-10 bg-[#F3F3F5] p-5 rounded-lg">
                        <div class="grid grid-cols-2">
                            <img src="${item.image}" class="w-[72px] h-[50px] lg:h-[72px] rounded-2xl" alt="">
                           <div> ${active} </div>
                        </div>
                        <div class="space-y-10 w-full">
                           <p class="font-medium space-x-10">
                            <span>#${item.category}</span>
                            <span>Author : ${item.author.name}</span>
                           </p>

                            <h4 class="text-xl font-bold">${item.title}</h4>

                            <p class="text-[#12132D99] border-b-2 border-dashed pb-5">${item.description}</p>

                            <div class="flex justify-between">
                                <div class="lg:flex gap-10">
                                    <span class="flex gap-2"><img src="./images/tabler-icon-message-2.png" alt=""> ${item.comment_count}</span>
                                <span class="flex gap-2"><span id="eye"><img src="./images/tabler-icon-eye.png" alt=""></span>${item.view_count}</span>
                                <span class="flex gap-2"><img src="./images/tabler-icon-clock-hour-9.png" alt="">${item.posted_time}min</span>
                                </div>

                                <div class="">
                                    <img onclick="clicked(this)" class="cursor-pointer" src="./images/email.png" alt="">
                                </div>
                            </div>
                            
                        </div>
                    </div>
        `;

    postContainer.appendChild(div);

  });
 }, 2000);
};






const clicked = (current) => {
    markCount+= 1 ;
    document.getElementById('mark-count').innerText = markCount ;

  const listContainer1 = document.getElementById("list-container1");
  let p1 = document.createElement('p') ;
  p1.innerText = current.parentNode.parentNode.parentNode.childNodes[3].innerText ;
  listContainer1.appendChild(p1) ;

  const listContainer2 = document.getElementById("list-container2");
  let p2 = document.createElement('p') ;
  p2.innerHTML =`<img class="inline" src="./images/tabler-icon-eye.png" alt=""> ${current.parentNode.parentNode.childNodes[1].childNodes[3].innerText}` ;
  listContainer2.appendChild(p2) ; 
 
};





const latestPosts = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
  );
  const data = await response.json();

  data.forEach((item) => {
    let desig = "";
    if (item.author.designation) {
      desig = `${item.author.designation}`;
    } else {
      desig = `Unknown`;
    }

    let postedDate = "";
    if (item.author.posted_date) {
      postedDate = `${item.author.posted_date}`;
    } else {
      postedDate = `No publish Date`;
    }

    // console.log(item);
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="border-2 border-[#12132D26] rounded-3xl p-5 space-y-5">
        <img src="${item.cover_image}" alt="">
        <div class="flex gap-4">
            <img src="./images/post-frame.png" alt="">
            <p class="text-[#12132D99]">${postedDate}</p>
        </div>
        <h4 class="font-extrabold">${item.title}</h4>
        <p class="text-[#12132D99]">${item.description}</p>
        <div class="flex gap-8">
            <img class="w-[44px] h-[44px] rounded-full" src="${item.profile_image}" alt="">
            <div>
                <p class="font-bold">${item.author.name}</p>
                <p id= "desig" class="text-[#12132D99]">${desig}</p>
            </div>
        </div>
    </div>
        `;

    latestPostContainer.appendChild(div);
  });
};



const submitForm = document.getElementById("form");
submitForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputValue = document.getElementById("search-box").value;
    loadAllPosts(inputValue);
    document.getElementById('spinner').style.display = 'block' ;
  });




loadAllPosts("");

latestPosts();
