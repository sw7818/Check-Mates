async function profilePic(username) {

    var str1 = username

    var url1 = 'https://api.chess.com/pub/player/'.concat(str1)

    const response = await fetch(url1);
    
    const data = await response.json(); 

    var avatar1 = data.avatar

    return avatar1

}



async function getChess(username) {

    const str = username

    const url = 'https://api.chess.com/pub/player/'.concat(str, '/stats')

    const response = await fetch(url);
    
    const data = await response.json(); 

    var rapid = ['chess_rapid', 'chess_blitz', 'chess_bullet']

    var ratings = []

    function getSum(total, num) {
        return total + Math.round(num);
      }

    for (i=0; i< 1; i++){
        if ('chess_rapid' in data) {
            var c_r = data.chess_rapid.last.rating
            ratings.push(c_r)
        }

        if ('chess_bullet' in data){
            var c_s = data.chess_bullet.last.rating
            ratings.push(c_s)


        }

        if ('chess_blitz' in data){
            var c_t = data.chess_blitz.last.rating
            ratings.push(c_t)


        }

    }   


    var avg_rat = Math.ceil((ratings.reduce(getSum, 0))/ratings.length)
    

    return avg_rat

}

async function dave(username) {
    var str1 = username

    var url1 = 'https://api.chess.com/pub/player/'.concat(str1)
    var response1 = await fetch(url1);
    
    var data1 = await response1.json(); 

    var country = data1.country

    var nation = country.split('y/')[1];

    

    var locat = data1.location
    
    if (typeof locat == 'undefined') {
        
        return nation

    }

    var obj = {country_1: nation,
    add: locat}

    return obj


}


async function gameMode(username) {

    var str1 = username;

    var url1 = 'https://api.chess.com/pub/player/'.concat(str1, '/games/archives');

    var response1 = await fetch(url1);

    var data1 = await response1.json(); 

    var data2 = data1.archives[data1.archives.length-1]

    var response2 = await fetch(data2)

    var data3 = await response2.json();
    
    var len=data3.games.length; 
    

    var c_blitz = 0
    var c_rapid = 0
    var c_bullet = 0

    for (i=0; i < len; i++) {
        if (data3.games[i].time_class==('blitz')) {
            c_blitz = c_blitz + 1;

        } else if (data3.games[i].time_class==('rapid')) {
            c_rapid = c_rapid + 1;
        }

        else if (data3.games[i].time_class==('bullet')) {
            c_bullet = c_bullet + 1;

        }
        
    }

    if (c_blitz > c_bullet) {
        if (c_blitz > c_rapid) {
            return 'Favourite game type: blitz'
        }
    }

    else if (c_rapid > c_bullet) {
        if (c_rapid > c_blitz) {
            return 'Favourite game type: rapid'
        }
    }

    else if (c_bullet > c_rapid) {
        if (c_bullet > c_blitz) {
            return 'Favourite game type: bullet'
        }
    }

    else if (c_rapid==c_bullet){
        if (c_rapid > c_blitz) {
            return 'favourite game types are rapid and bullet'
        }


    }

    else if (c_rapid==c_blitz){
        if (c_rapid > c_bullet) {
            return 'Favourite game types are rapid and blitz'
        }
    }

    
    else if (c_bullet==c_blitz){
        if (c_blitz> c_rapid) {
            return 'Favourite game types are blitz and bullet'
        }
    }

}

function modeString(array) {
    if (array.length == 0) return null;
  
    var modeMap = {},
      maxEl = array[0],
      maxCount = 1;
  
    for (var i = 0; i < array.length; i++) {
      var el = array[i];
  
      if (modeMap[el] == null) modeMap[el] = 1;
      else modeMap[el]++;
  
      if (modeMap[el] > maxCount) {
        maxEl = el;
        maxCount = modeMap[el];
      } 
    }
    return maxEl;
  }

async function opening(username) {

    var str1 = username;

    var url1 = 'https://api.chess.com/pub/player/'.concat(str1, '/games/archives');

    var response1 = await fetch(url1);

    var data1 = await response1.json(); 

    var data2 = data1.archives[data1.archives.length-1]

    var response2 = await fetch(data2)

    var data3 = await response2.json();

    var arr_openings = [];
    

    for (x=0; x < data3.games.length; x++) {
        for (i=0; i < data3.games[x].pgn.split('').length; i++) {
            var arr = [];
            if (data3.games[x].pgn.split('')[i]=='s') {
                if (data3.games[x].pgn.split('')[i+1]=='/'){
                    var n=2;
                    
                    while (data3.games[x].pgn.split('')[i+n]!='"'){
                        
                        arr.push(data3.games[x].pgn.split('')[i+n]);
                        
                        n++;
                    }
                
                var joined = arr.join('');

                arr_openings.push(joined)

                }
    
            }
    
        }
    }
    
    return modeString(arr_openings)

}

function data(username){


    var temp = []; 

    //profilePic(username).then((value)=> {temp.push(value)})
    //console.log(Object.keys(temp).length)

    opening(username).then((value)=> {
        temp['high']=value 

        if ('high' in temp){
            console.log()
        }

        console.log(temp.length)
    })

    console.log(temp)


    /*dave(username).then((value)=> {temp["location"]=value})
    console.log(Object.keys(temp).length)


    getChess(username).then((value)=> {temp["rating"]=value})
    console.log(Object.keys(temp).length)


    gameMode(username).then((value)=> { temp["mode"]=value})
    console.log(Object.keys(temp).length)*/ 


      
}

/*var obj = {

    lie: 43445,
    string: 'asdfadf',
    fnglsnfg: 4353,
    gnfn: 345345,
    

}
*/
data('samward69')

