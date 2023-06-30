const posts = [
    { title: "Post one", body: "This is post one" },
    { title: "Post two", body: "This is post two" },
];

function getPosts() {
    setTimeout(() => {
        let output = "";
        posts.forEach((post, index) => {
            output += `<li>${post.title}</li>`;
        });
        document.body.innerHTML = output;
    }, 1000);
}

// function createPost(post, callback) {
//     setTimeout(() => {
//         posts.push(post);
//         callback();
//     }, 2000);
// }

// using promise
function createPost(post) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            posts.push(post);
            const error = false; // change to true to get error
            if (!error) {
                resolve();
            } else {
                reject("Error: Something went wrong");
            }
        }, 2000);
    });
}

// getPosts(); // after using callback no need
// createPost({ title: "Post three", body: "This is post three" }, getPosts);

// for promise
// createPost({ title: "Post three", body: "This is post three" })
//     .then(getPosts)
//     .catch((err) => {
//         console.log(err);
//     });

// promise.all
const promise1 = Promise.resolve("Hello");
const promise2 = 10;
const promise3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 2000, "Goodbye");
});

// Promise.all([promise1, promise2, promise3]).then((values) => {
//     console.log(values);
// });

// let lastActivity = new Date();
// function updateLastUserActivityTime() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             lastActivity = new Date();
//             resolve(lastActivity);
//         }, 1000);
//     });
// }

// function createNewPost(post) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             posts.push(post);
//             const error = false; // change to true to get error
//             if (!error) {
//                 resolve();
//             } else {
//                 reject("Error: Something went wrong");
//             }
//         }, 1000);
//     });
// }

// function deletion() {
//     return new Promise((resolve, reject) => {
//         posts.pop();
//         resolve();
//     });
// }

// createNewPost({ title: "New post", body: "This is a new post" })
//     .then(updateLastUserActivityTime)
//     .then((act) => {
//         posts.forEach((post) => {
//             console.log(post.title);
//         });
//         console.log("Last user activity: ", act);
//     })
//     .then(deletion)
//     .then(updateLastUserActivityTime)
//     .then((act) => {
//         posts.forEach((post) => {
//             console.log(post.title);
//         });
//         console.log("Last user activity: ", act);
//     });

// using async
let lastActivity = new Date();
const postCreator = async (post) => {
    const createNewPost = new Promise((resolve, reject) => {
        setTimeout(() => {
            posts.push(post);
            lastActivity = new Date();
            resolve(lastActivity);
        }, 3000);
    });
    const deleted = new Promise((resolve, reject) => {
        setTimeout(() => {
            posts.pop();
            resolve("popped");
        }, 5000);
    });

    let posted = await createNewPost;

    posts.forEach((post) => {
        console.log(post.title);
    });

    let popped = await deleted;
    console.log("New post is: ", popped);

    posts.forEach((post) => {
        console.log(post.title);
    });

    return posted;
};
let post = { title: "New Post" };
postCreator(post).then((m) => console.log(`New post was pushed at: ${m}`));
// posts.forEach((post) => {
//     console.log(post.title);
// });
