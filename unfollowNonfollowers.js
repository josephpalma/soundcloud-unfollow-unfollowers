//run in soundcloud.com/USER/following
var currentUsers = null;
var nonMutuals = {};
var name = '';
var unfollowed = 0;
var j = 0;

var autoScroll = (pause) => {
    return new Promise((resolve) => {
        var interval = setInterval(function() {
            if (document.body.scrollHeight >= 85000 || document.body.scrollHeight-window.pageYOffset <= window.innerHeight) {
                clearInterval(interval);
                resolve(interval);
            } else {
                window.scrollBy(0, window.innerHeight);
            };                
        }, pause);
    });
};

var unfollowPage = () => {
    currentUsers = getPageOfUsers();
    currentUsers.forEach((userNode) => {
        name = userNode.text.split('\n')[1].split(' ').filter((word) => word != '').join().replaceAll(',', ' ');

        if (name.includes('is following')) {
            return;
        }

        if (!map[name]) {
            console.log('unfollowing', name);
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
    console.log('To continue unfollowing, run main(); in this console');
}

main();
