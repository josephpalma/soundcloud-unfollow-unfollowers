//run in soundcloud.com/USER/following
var currentUsers = null;
var btns = null;
var name = '';
var isFollowing = '';
var unfollowed = 0;

var getPageOfUsers = () => {
    return document.querySelectorAll('a.sc-link-primary'); 
};

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

var autoScroll = (pause) => {
    return new Promise((resolve, reject) => {
        var interval = setInterval(function() {
            var scrolled = window.pageYOffset;
            var scroll_size = document.body.scrollHeight;
            var scroll_remaining = scroll_size-scrolled;
    
            if (document.body.scrollHeight >= 85000 || scroll_remaining <= window.innerHeight) {
                clearInterval(interval);
                resolve(interval);
            } else{
                window.scrollBy(0, window.innerHeight);
            };                
        }, pause);
    });
};

var unfollowPage = () => {
    currentUsers = getPageOfUsers();
    currentUsers.forEach((userNode) => {
        name = userNode.text; 
        splitName = name.split('\n');
        splitName = name.split(' ');
        splitName = splitNames(splitName);

        if (splitName.includes('isfollowing')) {
            return;
        }

        if (!map[splitName]) {
            console.log('unfollowing', splitName);
            var btn = userNode.parentNode.parentNode.querySelector('button.sc-button-follow');
            var following = btn.getAttribute('aria-label'); 
            if (following == 'Unfollow') { 
                btn.click(); 
                unfollowed++;
            }
        }
    });
}

var unfollowUnfollowers = async () => {
    await autoScroll(2000);
    return unfollowPage();
}

var main = async () => {
    console.log('STARTING... this may take a couple minutes');
    await unfollowUnfollowers();
    console.log('Successfully unfollowed ', unfollowed, ' users');
    console.log('To continue unfollowing, please refresh and start over on the followers page');
}

main();