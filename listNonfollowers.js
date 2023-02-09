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

var listPage = () => {
    currentUsers = getPageOfUsers();
    currentUsers.forEach((userNode) => {
        name = userNode.text.split('\n')[1].split(' ').filter((word) => word != '').join().replaceAll(',', ' ');

        if (name.includes('is following')) {
            return;
        }

        if (!map[name]) {
            nonMutuals[name] = j;
            j++;
        }
    });

    return nonMutuals;
}

var listUnfollowers = async () => {
    await autoScroll(2000);
    return listPage();
}

var main = async () => {
    console.log('STARTING... this may take a couple minutes');
    var list = await listUnfollowers();
    console.log('Succesfully found ', j, ' non-followers');
    console.log('\nYour non-followers: \n');
    Object.keys(list).forEach((user) => console.log(user));
}

main();