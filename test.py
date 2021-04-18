
from chessdotcom import get_player_profile
from chessdotcom.caller import get_player_game_archives
from chessdotcom.caller import get_player_stats
from urllib.request import urlopen
from collections import Counter
import re


openings = []

username_1 = "tomnott"
username_2 = "Y0uLoV3Tos3e1T"
data = get_player_profile(username_2)
data_arch = get_player_game_archives(username_1) 



def opening(username):

    data_arch = get_player_game_archives(username) 


    archive_url = (data_arch.json["archives"][-1])

    f = urlopen(archive_url)

    myfile = f.read()
    
    string = myfile.decode("utf-8")
    
    counter = 0
    openings_1 = []
    
    
    for element in range(0, len(string)):
        if string[element] == 'g':
            if string[element+1] == 's':
                if string[element+2] == '/':
                    n=0
                    test = []
                    while string[element+3+n] != '\\':
                        
                        test.append(string[element+3+n])
                        n+=1
                    s= ''.join(test)
                    openings_1.append(s)


    count = Counter(openings_1)            
    high = count.most_common(3) 

    return(high)

def fav_time(username):

    data_arch = get_player_game_archives(username) 


    archive_url = (data_arch.json["archives"][-1])

    f = urlopen(archive_url)

    myfile = f.read()
    
    string = myfile.decode("utf-8")


    timings =[]

    for x in range(0, len(string)):
        if string[x] == 'o':
            if string[x+1] == 'l':
                if string[x+2] == ' ':
                    
                    if string[x+3] == '\\':
                        

                        
                        m=0
                        time = []

                        while string[x+5+m] != '\\':
                            time.append(string[x+5+m])
                            m+=1
                        t= ''.join(time)
                        timings.append(t)

    time_c = Counter(timings)
    high_c = time_c.most_common(3)
    
    return(high_c)
    
    
def rating(username):
    stats = get_player_stats(username).json
    Blitz = "Blitz Rating:  " + str(stats['chess_blitz']['last']['rating'])
    Rapid = "Rapid rating:  " + str(stats['chess_rapid']['last']['rating'])
    return(Blitz, Rapid)

def compatability(user1, user2):
#here we nee to come up with a way of working out how to match people 
    compatability_index = 0 
#first we will check whether they of the same nationality of country 
    
    data_1 = get_player_profile(user1).json
    data_2 = get_player_profile(user2).json
    country_1 =data_1["country"]
    country_2 =data_2["country"]
    country_init_1 = country_1.partition('y/')[2]
    country_init_2 = country_2.partition('y/')[2]

    if country_init_2 == country_init_1:
        compatability_index+=4


# here we are going to match people based off their elo rating for there respective game modes
    stats1 = get_player_stats(user1).json
    stats2 = get_player_stats(user2).json

    rapid_rat_1 = stats1["chess_rapid"]['last']['rating']
    blitz_rat_1 = stats1["chess_blitz"]['last']['rating']
    bullet_rat_1 = stats1["chess_bullet"]['last']['rating']

    rapid_rat_2 = stats2["chess_rapid"]['last']['rating']
    blitz_rat_2 = stats2["chess_blitz"]['last']['rating']
    bullet_rat_2 = stats2["chess_bullet"]['last']['rating']

    diff_rap = abs(rapid_rat_1-rapid_rat_2)
    diff_blit = abs(blitz_rat_1-blitz_rat_2)
    diff_bul = abs(bullet_rat_1-bullet_rat_2)

    avg = (diff_blit+diff_bul+diff_rap)/3

    if avg < 200: 
        compatability_index += 2
    elif avg < 400:
        compatability_index += 1


#here we are matching based off peoples favourite opening
    
    for x in range(len(opening(user1))):
        for t in range(len(opening(user2))):
            if opening(user1)[x][0] == opening(user2)[t][0]:
                compatability_index+=2
        


#here we are gunna match people based off there time favourite

    for s in range(len(fav_time(user1))):
        for d in range(len(fav_time(user2))):
            if opening(user1)[s][0] == opening(user2)[d][0]:
                compatability_index+=0.5
                

    compat = (compatability_index/12.5)*100

    return(compat)

     


    

print(compatability(username_1,username_2))

















#compatability(username_1, username_2)
    


