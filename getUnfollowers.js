//run in soundcloud.com/USER/followers
var followersNum = document.getElementsByTagName("title")[0].innerHTML.split('|')[1].split(' ')[1];
var users = null;
var i = 0;
var splitName = '';
var finalName = '';
var name = '';
var map = {};

var splitNames = (names) => {
    finalName = '';
    names.forEach((letter) => {
        if(letter === '\n' || letter.length === 0) {
            return;
        }
        if (letter.includes('\n')) {
            finalName = finalName.concat(letter.split('\n')[0]);
        } else {
            finalName = finalName.concat(letter);
        }
        i++;
    });
    return finalName;
};

var getPageOfUsers = () => {
    return document.querySelectorAll('a.sc-link-primary'); 
};

var autoScroll = (pause) => {
    return new Promise((resolve, reject) => {
        var interval = setInterval(function() {
            var scrolled = window.pageYOffset;
            var scroll_size = document.body.scrollHeight;
            var scroll_remaining = scroll_size-scrolled;
    
            if (scroll_remaining <= window.innerHeight) {
                clearInterval(interval);
                resolve(interval);
            } else{
                window.scrollBy(0, window.innerHeight);
            };                
        }, pause);
    });
};

var getUnfollowers = async () => {
    console.log('\nGETTING UNFOLLOWERS.... \n');
    console.log('This may take a couple minutes \n');

    await autoScroll(2000);

    return new Promise((resolve, reject) => {
        users = getPageOfUsers();
        users.forEach((user) => { 
            name = user.text; 
            splitName = name.split('\n');
            splitName = name.split(' ');
            map[splitNames(splitName)] = i;
            i++;
        });
        resolve(map);
    });
}

await getUnfollowers();

console.log('\nDONE\n');
console.log('\nTO UNFOLLOW, NAVIAGTE TO THE "FOLLOWING" TAB AND RUN UNFOLLOWUNFOLLOWERS()\n');



