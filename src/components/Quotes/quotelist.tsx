export interface Quote {
    readonly quote: string,
    readonly author: string,
    readonly tags: Set<string>
}

export const quotes: Quote[] = [
    {
        quote: 'Sometimes, we screw things up for the better.',
        author: 'Nate Heywood',
        tags: new Set(["humorous", "fiction", "legends of tomorrow", "tv series", "hero"])
    }, {
        quote: "I have come here to chew bubble gum and kick ass, and I'm all outta bubble gum.",
        author: 'They Live',
        tags: new Set(["humorous", "fiction", "badass"])
    }, {
        quote: "That's a W! Let's eat one.",
        author: 'Jameis Winston',
        tags: new Set(["humorous", "non-fiction"])
    }, {
        quote: "I don't need luck, I have ammo.",
        author: 'Grunt',
        tags: new Set(["humorous", "fiction", "badass", "mass effect", "video game",])
    }, {
        quote: 'One of the wettest hurricanes from the standpoint of water.',
        author: 'Donald J. Trump',
        tags: new Set(["humorous", "non-fiction", "political"])
    }, {
        quote: 'All we need is a defense, an offense and a couple of rule changes.',
        author: 'Jason Mendoza',
        tags: new Set(["humorous", "fiction", "jason mendoza", "the good place", "tv series",])
    }, {
        quote: 'How many cells do single-celled organisms have?',
        author: 'Harry Block',
        tags: new Set(["humorous", "fiction", "nerdy", "movie"])
    }, {
        quote: 'You could film a rubbish bin all day long, hoping a cat will fall in. Or you could just push a cat in and get it over with.',
        author: 'Jeremy Clarkson',
        tags: new Set(["humorous", "non-fiction", "dark", "tv series", "top gear"])
    }, {
        quote: 'We got a bad ass over here',
        author: 'Neil DeGrasse Tyson',
        tags: new Set(["humorous", "non-fiction"])
    }, {
        quote: "Light Travels Faster Than Sound. That's Why Some Folks Appear Bright Until They Speak.",
        author: 'Unknown',
        tags: new Set(["humorous", "non-fiction", "nerdy"])
    }, {
        quote: "They don't think it be like it is but it do.",
        author: 'Oscar Gamble',
        tags: new Set(["humorous", "non-fiction"])
    }, {
        quote: 'Classic, Sinatra. Bad, Phantom of the Opera. Shuffle the deck, I be the queen in the pack. Gotha, Lady Patra.',
        author: 'Iggy Azalea',
        tags: new Set(["humorous", "non-fiction", "???", "song lyrics"])
    }, {
        quote: "Another dangerous alien onboard. Commander, why don't you just collect stamps like normal people?",
        author: "Jeff 'Joker' Moreau",
        tags: new Set(["humorous", "fiction", "mass effect", "video game", "jeff 'joker' moreau"])
    }, {
        quote: 'Turns out, far too much has been written about great men and not nearly enough about morons.',
        author: 'Tyrion Lannister',
        tags: new Set(["humorous", "fiction", "game of thrones", "tv series"])
    }, {
        quote: "We'll cross that bridge when we burn it.",
        author: 'Billy Butcher',
        tags: new Set(["humorous", "fiction", "anti-hero", "the boys", "tv series"])
    }, {
        quote: 'Sometimes I tune people out, but mostly because they rarely have anything useful or interesting to say.',
        author: "Miriam 'Midge' Maisel",
        tags: new Set(["humorous", "fiction", "tv series", "mrs maisel"])
    }, {
        quote: 'I could have been home on my computer, but noooo someone suggested I grow as a person.',
        author: 'Kinzie Kensington',
        tags: new Set(["humorous", "fiction", "nerdy", "saints row", "video game"])
    }, {
        quote: 'People wrote books and movies that had stories so you cared whose ass it was and why it was farting.',
        author: 'Pvt. Joe Bauers',
        tags: new Set(["humorous", "fiction"])
    }, {
        quote: "But I was a good person for six months. That's like five years.",
        author: 'Eleanor Shellstrop',
        tags: new Set(["humorous", "fiction", "the good place", "tv series",])
    }, {
        quote: "Your poker face gives away more than Oprah's favorite things.",
        author: 'Andre Johnson',
        tags: new Set(["humorous", "fiction"])
    }, {
        quote: "I'm not crazy. My mother had me tested.",
        author: 'Sheldon Cooper',
        tags: new Set(["humorous", "fiction", "sheldon cooper", "the big bang theory", "tv series"])
    }, {
        quote: "If this comedy thing doesn't work out, I've always got poverty to fall back on.",
        author: 'Trevor Noah',
        tags: new Set(["humorous", "non-fiction", "existential humor"])
    }, {
        quote: 'We hold these truths to be self-evident. All men and women are created, by the you know, you know the thing.',
        author: 'Joe Biden',
        tags: new Set(["humorous", "non-fiction", "political"])
    }, {
        quote: 'I reject your reality and substitute my own.',
        author: 'Adam Savage',
        tags: new Set(["humorous", "non-fiction", "nerdy"])
    }, {
        quote: 'Gucci gang, Gucci gang, Gucci gang, Gucci gang, Gucci gang, Gucci gang, Gucci gang, Gucci gang, Gucci gang.',
        author: "Lil' Pump",
        tags: new Set(["humorous", "non-fiction", "???", "song lyrics"])
    }, {
        quote: 'The rumors of my death have been greatly exaggerated.',
        author: 'Mark Twain',
        tags: new Set(["humorous", "non-fiction"])
    }, {
        quote: "If you're referring to the incident with the dragon, I was barely involved.",
        author: 'Gandalf',
        tags: new Set(["humorous", "fiction", "nerdy"])
    }, {
        quote: 'Shutting up, sir.',
        author: 'C-3PO',
        tags: new Set(["humorous", "nerdy", "fiction", "star wars", "movie"])
    }, {
        quote: "You all need more therapy than I do, and I'm the crazy one.",
        author: 'Crazy Jane',
        tags: new Set(["humorous", "fiction", 'tv series', 'doom patrol'])
    }, {
        quote: `"Normal" ain't nothing but a state of mind.`,
        author: 'Maura Lee Karupt',
        tags: new Set(["humorous", "fiction", 'tv series', 'doom patrol'])
    }, {
        quote: "We're going to save the world, or whatever, and then I will have a stiff Manhattan and go to bed.",
        author: 'Rita Farr',
        tags: new Set(["humorous", "fiction", "nerdy", 'tv series', 'doom patrol'])
    }, {
        quote: "You've always been a man comfortable with compromise. I mean, after all, you fell in love with a Canadian.",
        author: 'Mr. Nobody',
        tags: new Set(["humorous", "fiction", "villain", 'tv series', 'doom patrol'])
    }, {
        quote: 'I was happy with people forgetting I exist, but mofos always gotta bring up the past.',
        author: 'Dex',
        tags: new Set(["humorous", "fiction"])
    }, {
        quote: "At least we ain't doing commercials anymore.",
        author: 'Johnny Gat',
        tags: new Set(["humorous", "fiction", "saints row", "video game",])
    }, {
        quote: "You're like the crazy head-butting uncle I never had.",
        author: "Tali'Zorah",
        tags: new Set(["humorous", "fiction", "mass effect", "video game",])
    }, {
        quote: "I don't trust anyone who makes more than I do.",
        author: "Jeff 'Joker' Moreau",
        tags: new Set(["humorous", "fiction", "mass effect", "video game", "jeff 'joker' moreau"])
    }, {
        quote: "Okay, Shepard, glad you're back, but keep an eye out on that last one. We can only hold so much crazy.",
        author: "Jeff 'Joker' Moreau",
        tags: new Set(["humorous", "fiction", "mass effect", "video game", "jeff 'joker' moreau"])
    }, {
        quote: 'So, Commander, even your Asari are trained killers? You get everyone at the same store or something?',
        author: "Jeff 'Joker' Moreau",
        tags: new Set(["humorous", "fiction", "mass effect", "video game", "jeff 'joker' moreau"])
    }, {
        quote: 'Broadcasting orders over loudspeakers. Charming.',
        author: 'Miranda Lawson',
        tags: new Set(["humorous", "fiction", "mass effect", "video game",])
    }, {
        quote: "We can disobey suicidal orders? Why wasn't I told?",
        author: 'Garrus Vakarian',
        tags: new Set(["humorous", "fiction", "mass effect", "video game",])
    }, {
        quote: "Have ruled out artificially intelligent virus... Unless it's very intelligent. And toying with me. Hmm. Tests..",
        author: 'Mordin Solus',
        tags: new Set(["humorous", "fiction", "nerdy", "mass effect", "video game",])
    }, {
        quote: 'Rage is one hell of an anesthetic.',
        author: 'Zaeed Masani',
        tags: new Set(["humorous", "fiction", "anti-hero", "mass effect", "video game",])
    }, {
        quote: "Don't worry, Shepard, I only forget to recycle the Normandy's oxygen when I've discovered something truly interesting.",
        author: 'EDI',
        tags: new Set(["humorous", "fiction", "nerdy", "mass effect", "video game",])
    }, {
        quote: 'It is our basic human right to be screw-ups. This civilization was founded on screw-ups and that makes me proud.',
        author: 'Gary King',
        tags: new Set(["humorous", "fiction", "existential humor"])
    }, {
        quote: "You know, I have one simple request, and that is to have sharks with frickin' laser beams attached to their heads!",
        author: 'Dr. Evil',
        tags: new Set(["humorous", "fiction", "villain"])
    }, {
        quote: 'There are only two kinds of languages: the ones people complain about and the ones nobody uses.',
        author: 'Bjarne Stroustrup',
        tags: new Set(["humorous", "non-fiction", "nerdy", "programming"])
    }, {
        quote: 'The market can remain irrational longer than you can stay solvent.',
        author: 'John Maynard Keynes',
        tags: new Set(["humorous", "non-fiction", "economic"])
    }, {
        quote: 'You know, you drive almost slow enough to drive Miss Daisy.',
        author: 'Mike Lowry',
        tags: new Set(["humorous", "fiction", "buddy cop"])
    }, {
        quote: 'Snakes. Why did it have to be snakes?',
        author: 'Indiana Jones',
        tags: new Set(["humorous", "fiction"])
    }, {
        quote: "Damned alligator just popped up, cut me down in my prime. He got me, but I tore one of that bastard's eyes out though.",
        author: 'Chubbs',
        tags: new Set(["humorous", "fiction"])
    }, {
        quote: "It's definitely not a good time to be a Nazi.",
        author: 'Yorki',
        tags: new Set(["humorous", "fiction"])
    }, {
        quote: 'Enjoy the attention, kid. Not everyone is lucky enough to look stupid.',
        author: 'Rosie',
        tags: new Set(["humorous", "fiction"])
    }, {
        quote: "Our only friends are the Japanese. And just between you and me, they don't look very Aryan.",
        author: 'Yorki',
        tags: new Set(["humorous", "fiction"])
    }, {
        quote: 'Can I get you a ladder? So you can get off my back.',
        author: 'Warden',
        tags: new Set(["humorous", "fiction", "dragon age", "video game",])
    }, {
        quote: "Someday, I'd like to go one week without meeting an insane mage. Just one week.",
        author: 'Hawke',
        tags: new Set(["humorous", "fiction", "dragon age", "video game",])
    }, {
        quote: "I don't think 'sense' is really my strong suit.",
        author: 'Hawke',
        tags: new Set(["humorous", "fiction", "dragon age", "video game",])
    }, {
        quote: 'You should pay someone else. Like me. I like being paid.',
        author: 'Hawke',
        tags: new Set(["humorous", "fiction", "dragon age", "video game",])
    }, {
        quote: 'I have an excellent sense of dramatic timing. And good hair.',
        author: 'Hawke',
        tags: new Set(["humorous", "fiction", "dragon age", "video game",])
    }, {
        quote: 'Oh, look—a dragon. What a perfect way to ruin our day.',
        author: 'Dorian Pavus',
        tags: new Set(["humorous", "fiction", "nerdy", "dragon age", "video game",])
    }, {
        quote: "We're going to get lost and starve to death, aren't we? A glorious end for the Inquisition.",
        author: 'Dorian Pavus',
        tags: new Set(["humorous", "fiction", "dragon age", "video game",])
    }, {
        quote: "I am serious. And don't call me Shirley.",
        author: 'Dr. Rumack',
        tags: new Set(["humorous", "fiction", "airplane", "leslie nielsen"])
    }, {
        quote: 'House blowing up builds character.',
        author: 'Deadpool',
        tags: new Set(["humorous", "fiction", "anti-hero"])
    }, {
        quote: "It's the first time I've ever seen you look ugly. And that makes me kind of happy.",
        author: 'Annie Walker',
        tags: new Set(["humorous", "fiction"])
    }, {
        quote: "It's not a man purse. It's called a satchel. Indiana Jones wears one.",
        author: 'Alan Garner',
        tags: new Set(["humorous", "fiction"])
    }, {
        quote: "Don't point that gun at him. He's an unpaid intern.",
        author: 'Steve Zissou',
        tags: new Set(["humorous", "fiction", "leslie nielsen"])
    }, {
        quote: 'Legen ..... wait for it .......  ndary!',
        author: 'Barney Stinson',
        tags: new Set(["humorous", "fiction", "how i met your mother", "tv series",])
    }, {
        quote: 'A lie is just a great story that someone ruined with the truth.',
        author: 'Barney Stinson',
        tags: new Set(["humorous", "fiction", "how i met your mother", "tv series",])
    }, {
        quote: 'The best I can give you is a fake smile and dead eyes.',
        author: 'Robin Scherbatsky',
        tags: new Set(["humorous", "fiction", "how i met your mother", "tv series",])
    }, {
        quote: 'You find me offensive, I find you offensive. Shit, this is the same verse, I just did this. When am I gonna come to my good senses? Probably the day Bush comes to my defences.',
        author: 'Eminem',
        tags: new Set(["humorous", "non-fiction", "eminem", "song lyrics"])
    }, {
        quote: 'Conner, for the last time, Thirty Seconds To Mars is the name of a band, not a fact.',
        author: 'Harry',
        tags: new Set(["humorous", "fiction"])
    }, {
        quote: "Stop focussing on Kim and think about you for a second. Now ain't that depressing?",
        author: 'Katt Williams',
        tags: new Set(["humorous", "non-fiction", "diss"])
    }, {
        quote: "I'm too young to die and too old to eat off the kids' menu. What a stupid age I am!",
        author: 'Jason Mendoza',
        tags: new Set(["humorous", "fiction", "the good place", "tv series", "jason mendoza"])
    }, {
        quote: 'Well, my year started a year ago',
        author: 'Jason Mendoza',
        tags: new Set(["humorous", "fiction", "the good place", "tv series", "jason mendoza"])
    }, {
        quote: 'Any time I had a problem, I threw a Molotov cocktail and boom! Right away, I had a different problem.',
        author: 'Jason Mendoza',
        tags: new Set(["humorous", "fiction", "the good place", "tv series", "jason mendoza"])
    }, {
        quote: "I'm So Chinese, I'm An Economics Professor With Lactose Intolerance",
        author: 'Rachel Chu',
        tags: new Set(["humorous", "fiction"])
    }, {
        quote: "I Was Never One To Hold A Grudge, Jeffrey. My Father Held Grudges. I'll Always Hate Him For That.",
        author: 'Pierce Hawthorne',
        tags: new Set(["humorous", "fiction"])
    }, {
        quote: 'Unless I can figure out a compelling reason to keep you here, you will spend eternity with murderers, and arsonists, and people who take off their shoes and socks on commercial airlines.',
        author: 'Michael',
        tags: new Set(["humorous", "fiction", "the good place", "tv series",])
    }, {
        quote: "You know, I haven't been this upset since my good friend Taylor was rudely upstaged by my other friend, Kanye, who was defending my best friend, Beyoncé.",
        author: 'Tahani Al-Jamil',
        tags: new Set(["humorous", "fiction", "the good place", "tv series",])
    }, {
        quote: 'How Dare She Steal The Identity I Stole?',
        author: 'Eleanor Shellstrop',
        tags: new Set(["humorous", "fiction", "the good place", "tv series",])
    }, {
        quote: `In the words of one of my friends: "Ya basic". It's a human insult. You're devastated right now.`,
        author: 'Michael',
        tags: new Set(["humorous", "fiction", "the good place", "tv series",])
    }, {
        quote: "If I could only use this power for good I wouldn't, not even if I could.",
        author: 'Eminem',
        tags: new Set(["humorous", "eminem", "song lyrics", "non-fiction"])
    }, {
        quote: "Britney Spears has shoulders like a man. I can say that and you'll laugh because there's a puppet on my hand",
        author: 'Eminem',
        tags: new Set(["humorous", "eminem", "song lyrics"])
    }, {
        quote: "Even though football is life, football is also death. And sometimes football is football too. But mostly football is life!",
        author: "Dani Rojas",
        tags: new Set(["humorous", "ted lasso"])
    }, {
        quote: "I think if we spent the time we spend thinking about not spending money, spent that time on spending money, then it'd be time well spent.",
        author: "Darius",
        tags: new Set(["humorous", "fiction", "atlanta"])
    }, {
        quote: "Stunting's a kind of a trap. We should probably make a little bit more money before we start showing it off.",
        author: "Earnest 'Earn' Marks",
        tags: new Set(["humorous", "fiction", "atlanta"])
    }, {
        quote: "I would say nice to meet you but I don't believe in time as a concept. So I'll just say \"We always met\"",
        author: "Darius",
        tags: new Set(["humorous", "fiction", "atlanta"])
    }, {
        quote: "I always thought tea was going to taste like hot brown water. And do you know what? I was right.",
        author: "Ted Lasso",
        tags: new Set(["humorous", "fiction", "ted lasso"])
    }, {
        quote: "You could fill two internets with what I don't know about football.",
        author: "Ted Lasso",
        tags: new Set(["humorous", "fiction", "ted lasso"])
    }, {
        quote: "I'm sort of famous for being almost famous.",
        author: "Keeley Jones",
        tags: new Set(["humorous", "fiction", "ted lasso", "tv series"])
    }, {
        quote: "Old people are so wise. They're like tall Yodas.",
        author: "Jamie Tartt",
        tags: new Set(["humorous", "fiction", "ted lasso"])
    }, {
        quote: "I don't drink coffee. My mother always says I was born caffeinated.",
        author: "Dani Rojas",
        tags: new Set(["humorous", "fiction", "ted lasso"])
    }, {
        quote: "I was bitten by a king cobra and after five days of agonizing pain, the cobra died",
        author: "Chuck Norris",
        tags: new Set(["humorous", "fiction"])
    }, {
        quote: "Nothing goes over my head. My reflexes are too fast. I would catch it.",
        author: "Drax",
        tags: new Set(["humorous", "fiction", "marvel"])
    }, {
        quote: "When you're ugly and someone loves you, you know they love you for who you are.",
        author: "Drax",
        tags: new Set(["humorous", "fiction", "marvel"])
    }, {
        quote: "Can we put the bickering on hold until after we survive this massive space battle.",
        author: "Gamora",
        tags: new Set(["humorous", "fiction", "marvel"])
    }, {
        quote: "Common sense is not so common",
        author: "Voltaire",
        tags: new Set(["humorous", "non-fiction"])
    }, {
        quote: "Never spend 6 minutes doing something by hand when you can spend 6 hours failing to automate it.",
        author: "Zhuowei Zhang",
        tags: new Set(["humorous", "non-fiction", "nerdy", "programming"])
    }, {
        quote: "Never put off till tomorrow, what you can do the day after tomorrow.",
        author: "Mark Twain",
        tags: new Set(["humorous", "existential humor", "non-fiction", "mark twain"])
    }, {
        quote: "The only thing to do with good advice is pass it on. It is never any use to oneself.",
        author: "Oscar Wilde",
        tags: new Set(["humorous", "existential humor", "non-fiction", "oscar wilde"])
    }, {
        quote: "Some cause happiness wherever they go; others whenever they go.",
        author: "Oscar Wilde",
        tags: new Set(["humorous", "existential humor", "non-fiction", "oscar wilde"])
    }, {
        quote: "The world is a stage, but the play is badly cast.",
        author: "Oscar Wilde",
        tags: new Set(["humorous", "existential humor", "non-fiction", "oscar wilde"])
    }, {
        quote: "I don't want to go to heaven. None of my friends are there.",
        author: "Oscar Wilde",
        tags: new Set(["humorous", "existential humor", "non-fiction", "oscar wilde"])
    }, {
        quote: "Classic - A book people praise and don't read.",
        author: "Mark Twain",
        tags: new Set(["humorous", "existential humor", "non-fiction", "mark twain"])
    }, {
        quote: "Never argue with idiots, they will drag you down to their level and beat you with experience.",
        author: "Mark Twain",
        tags: new Set(["humorous", "mark twain", "existential humor", "non-fiction"])
    }, {
        quote: "Politicians and diapers must be changed often, and for the same reason.",
        author: "Mark Twain",
        tags: new Set(["humorous", "mark twain", "non-fiction", "mark twain"])
    }, {
        quote: "Nothing travels faster than the speed of light with the possible exception of bad news, which obeys its own special laws.",
        author: "Douglas Adams",
        tags: new Set(["humorous", "non-fiction", "douglas adams"])
    }, {
        quote: "I love deadlines. I love the whooshing noise they make as they go by.",
        author: "Douglas Adams",
        tags: new Set(["humorous", "non-fiction", "douglas adams"])
    }, {
        quote: "In the beginning the Universe was created. This has made a lot of people very angry and been widely regarded as a bad move.",
        author: "Douglas Adams",
        tags: new Set(["humorous", "non-fiction", "douglas adams", "existential"])
    }, {
        quote: "A common mistake that people make when trying to design something completely foolproof is to underestimate the ingenuity of fools.",
        author: "Douglas Adams",
        tags: new Set(["humorous", "non-fiction", "douglas adams"])
    }, {
        quote: "What can be asserted without evidence can be dismissed without evidence.",
        author: "Christopher Hitchens",
        tags: new Set(["humorous", "non-fiction"])
    }, {
        quote: "The real problem is not whether machines think, but whether men do.",
        author: "B.F Skinner",
        tags: new Set(["humorous", "non-fiction", "nerdy"])
    }, {
        quote: "It has been said that democracy is the worst form of government except all the others that have been tried",
        author: "Winston Churchill",
        tags: new Set(["humorous", "non-fiction", "existential"])
    }, {
        quote: "You can get more of what you want with a kind word and a gun than you can with just a kind word",
        author: "Al Capone",
        tags: new Set(["humorous", "non-fiction", "villain", "dark"])
    }, {
        quote: "People can have the Model T in any color - so long as it's black",
        author: "Henry Ford",
        tags: new Set(["humorous", "non-fiction", "economic"])
    }, {
        quote: "Everything in life is somewhere else, and you get there in a car.",
        author: "E.B White",
        tags: new Set(["humorous", "non-fiction"])
    }, {
        quote: "When I give food to the poor, they call me a saint. When I ask why the poor have no food, they call me a communist",
        author: "Dom Helder Camara",
        tags: new Set(["humorous", "non-fiction", "political"])
    }, {
        quote: "Never trust a computer you can't throw out a window.",
        author: "Steve Wozniak",
        tags: new Set(["humorous", "non-fiction", "nerdy"])
    }, {
        quote: "Tonight, instead of discussing the existence of or non-existence of God, they have decided to fight for it.",
        author: "Monty Python",
        tags: new Set(["humorous", "fiction", "religion", "monty python"])
    }, {
        quote: "There are a great many people in the country today, who through no fault of their own, are sane.",
        author: "Rev. Artuhur Belling Graham Chapman",
        tags: new Set(["humorous", "fiction", "monty python"])
    }, {
        quote: "Let's not bicker and argue about who killed who.",
        author: "Monty Python",
        tags: new Set(["humorous", "monty python"])
    }, {
        quote: "Reading is for morons who can't understand pictures.",
        author: "Gareth",
        tags: new Set(["humorous", "fiction", "galavant"])
    }, {
        quote: "I banished the king so technically I am the true King of Valencia, and it would *really* mean a lot to me if I was treated as such.",
        author: "Gareth",
        tags: new Set(["humorous", "fiction", "galavant"])
    }, {
        quote: 'Your moment of glory will come, young Galavant. Be patient, be ready, and also, never get married.',
        author: "Arnold",
        tags: new Set(["humorous", "fiction", "galavant"])
    }, {
        quote: "You won't burn in hell, but be nice anyways.",
        author: "Ricky Gervais",
        tags: new Set(["humorous", "non-fiction", "religion"])
    }, {
        quote: "While I subscribe to the many worlds theory which posits the existence of infinite Sheldons in infinite universes - I assure you that in none of them am I dancing",
        author: "Sheldon Cooper",
        tags: new Set(["humorous", "fiction", "nerdy"])
    }, {
        quote: "I found the grinch to be a relatable, engaging character, and I was really with him until he succumbed to social convention and returned the presents and saved Christmas. What a buzzkill that was",
        author: "Sheldon Cooper",
        tags: new Set(["humorous", "fiction", "the big bang theory", "tv series", "sheldon cooper"])
    }, {
        quote: "One cries because one is sad. For example, I cry because others are stupid and it makes me sad",
        author: "Sheldon Cooper",
        tags: new Set(["humorous", "fiction", "the big bang theory", "tv series", "sheldon cooper"])
    }, {
        quote: "As my mom used to say, 'When you're doing a puzzle, it's like you've got a thousand friends.' She was full of fun lies like that.",
        author: "Amy Farrah Fowler",
        tags: new Set(["humorous", "fiction", "the big bang theory", "tv series"])
    }, {
        quote: "I don't want to stand in the way of your happiness. So, I will condemn you internally while maintaining an outward appearance of acceptance",
        author: "Sheldon Cooper",
        tags: new Set(["humorous", "fiction", "the big bang theory", "tv series", "sheldon cooper"])
    }, {
        quote: "Make the plan, execute the plan, expect the plan to go off the rails, throw away the plan",
        author: "Leonard Snart",
        tags: new Set(["humorous", "fiction"])
    }, {
        quote: "We know how to case banks. We're practically bankers.",
        author: "Mick Rory",
        tags: new Set(["humorous", "fiction", "villain", "legends of tomorrow"])
    }, {
        quote: "The problem with the French is that they don't have a word for entrepreneur",
        author: "George W. Bush",
        tags: new Set(["humorous", "non-fiction", "political"])
    }, {
        quote: "The problem with Scotland is that it's full of Scots.",
        author: "King Edward 'Longshanks'",
        tags: new Set(["humorous", "fiction", "political"])
    }, {
        quote: "Maybe that's what family is. The people you don't mind being annoyed by.",
        author: "Sara Lance",
        tags: new Set(["humorous", "fiction", "legends of tomorrow", "tv series", "hero"])
    }, {
        quote: "I'm already a blind, time-travelling paragon who can see the future, so might as well just add wannabe god to the list.",
        author: "Sara Lance",
        tags: new Set(["humorous", "fiction", "legends of tomorrow", "tv series", "hero"])
    }, {
        quote: "Are you a professional moron or just a gifted amateur?",
        author: "C.J",
        tags: new Set(["humorous", "fiction"])
    }, {
        quote: "I'm a well dressed maniac",
        author: "C.J",
        tags: new Set(["humorous", "fiction"])
    }, {
        quote: "Think of how stupid the average person is, then realize half of them are dumber than that.",
        author: "George Carlin",
        tags: new Set(["humorous", "non-fiction", "existential humor"])
    }, {
        quote: "It wasn't a lie it was alternative facts.",
        author: "Kellyanne Conway",
        tags: new Set(["humorous", "non-fiction", "political"])
    }, {
        quote: "All your life the world has been trying to make you less of a man. Light beer. Veggie burgers. Automatic transmission",
        author: "Johnny Lawrence",
        tags: new Set(["humorous", "fiction"])
    }, {
        quote: "She marries this guy named Calvert, they move to Cedar Rapids. Now Calvert's dead and from what I hear Cedar Rapids is dead",
        author: "Lewis Bodine",
        tags: new Set(["humorous", "fiction", "movie"])
    }, {
        quote: "Okay, so she's a very old goddamned liar. I've done the background on this woman all the way to the twenties when she was working as an actress. An actress! There's your first clue, Sherlock",
        author: "Lewis Bodine",
        tags: new Set(["humorous", "fiction", "movie"])
    }, {
        quote: "Rugby is a good occasion for keeping thirty bullies far from the centre of the city.",
        author: "Oscar Wilde",
        tags: new Set(["humorous", "fiction", "oscar wilde"])
    }, {
        quote: "Golf - a gentleman's game played by gentlemen. Rugby - a thug's game played by gentlemen. Soccer - a gentleman's game played by thugs. Rugby League - a thug's game played by thugs.",
        author: "Unknown",
        tags: new Set(["humorous", "non-fiction"])
    }, {
        quote: "People say, 'Since you got rich and famous, you've become insufferable.' I say, 'That's not true. I've always been insufferable.",
        author: "Shannon Sharpe",
        tags: new Set(["humorous", "non-fiction"])
    }, {
        quote: "You're only great if you win. I mean, Alexander wasn't Alexander the Mediocre or Alexander the Average. He was Alexander the Great, and there's a reason for it.",
        author: "Shannon Sharpe",
        tags: new Set(["humorous", "non-fiction"])
    }, {
        quote: "The process of getting old is a question of mind over matter: If you don't mind, it doesn't matter",
        author: "Mark Twain",
        tags: new Set(["humorous", "non-fiction", "mark twain"])
    }, {
        quote: "In this world nothing can be said to be certain, except death and taxes.",
        author: "Benjamin Franklin",
        tags: new Set(["humorous", "non-fiction", "existential humor"])
    }, {
        quote: "The ancient Oracle said that I was the wisest of all the Greeks. It is because I alone, of all the Greeks, know that I know nothing.",
        author: "Socrates",
        tags: new Set(["humorous", "non-fiction", "existential humor"])
    }, {
        quote: "As it turns out, Mount Kilimanjaro is not wi-fi enabled, so I had to spend two weeks in Tanzania talking to the people in my trip.",
        author: "Nancy Bonds",
        tags: new Set(["humorous", "non-fiction"])
    }, {
        quote: "I am fond of pigs. Dogs look up to us. Cats look down on us. Pigs treat us as equals.",
        author: "Winston Churchill",
        tags: new Set(["humorous", "non-fiction"])
    }, {
        quote: "I don't believe in astrology; I'm a Sagittarius and we're skeptical.",
        author: "Arthur C. Clarke",
        tags: new Set(["humorous", "non-fiction"])
    }, {
        quote: "I shot an arrow into the air. It fell to earth, I knew not where.",
        author: "Henry Wadsworth Longfellow",
        tags: new Set(["humorous", "non-fiction"])
    }, {
        quote: "Writing is easy. All you have to do is cross out the wrong words.",
        author: "Mark Twain",
        tags: new Set(["humorous", "non-fiction", "mark twain"])
    }, {
        quote: "Don't reinvent the wheel, just realign it.",
        author: "Anthony D'Angelo",
        tags: new Set(["humorous", "non-fiction"])
    }, {
        quote: "Money, if it does not bring you happiness, will at least help you be miserable in comfort.",
        author: "Helen Gurley Brown",
        tags: new Set(["humorous", "non-fiction", "existential humor"])
    }, {
        quote: "A man on a horse is spiritually as well as physically bigger than a man on foot.",
        author: "John Steinbeck",
        tags: new Set(["humorous", "non-fiction"])
    }, {
        quote: "The four building blocks of the universe are fire, water, gravel and vinyl",
        author: "Dave Barry",
        tags: new Set(["humorous", "non-fiction"])
    }, {
        quote: "Normal people believe that if it ain't broke, don't fix it. Engineers believe that if it ain't broke, it doesn't have enough features yet.",
        author: "Scott Adams",
        tags: new Set(["humorous", "non-fiction", "nerdy"])
    }, {
        quote: "If debugging is the process of removing software bugs, then programming must be the process of putting them in",
        author: "Edsger Dijkstra",
        tags: new Set(["humorous", "non-fiction", "nerdy", "programming"])
    }, {
        quote: "There is no easy way to train an apprentice. My two tools are example and nagging",
        author: "Lemony Snicket",
        tags: new Set(["humorous", "fiction"])
    }, {
        quote: "If you owe the bank $100 that's your problem. If you owe the bank $100 million, that's the bank's problem",
        author: "J. Paul Getty",
        tags: new Set(["humorous", "non-fiction", "economic"])
    }, {
        quote: "I saw a bank that said '24-Hour Banking,' but I didn't have that much time.",
        author: "Steven Wright",
        tags: new Set(["humorous", "non-fiction", "wordplay"])
    }, {
        quote: "Astronomy's much more fun when you're not an astronomer",
        author: "Brian May",
        tags: new Set(["humorous", "non-fiction", "nerdy"])
    }, {
        quote: "Apart from the sanitation, the medicine, education, wine, public order, roads, the fresh water system, and public health … what have the Romans ever done for us?",
        author: "Graham Chapman",
        tags: new Set(["humorous", "non-fiction"])
    }, {
        quote: "Never criticize a rifleman until you have walked a mile in his shoes. That way, he'll be barefoot and you'll be out of range.",
        author: "The 2nd Target Company",
        tags: new Set(["humorous", "motto"])
    }, {
        quote: "If you can walk away from a landing, it's a good landing. If you use the airplane the next day, it's an outstanding landing",
        author: "Chuck Yeager",
        tags: new Set(["humorous", "non-fiction"])
    }, {
        quote: "If it weren't for electricity, we'd all be watching television by candlelight.",
        author: "George Gobel",
        tags: new Set(["humorous", "non-fiction"])
    }, {
        quote: "Benjamin Franklin may have discovered electricity, but it was the man who invented the meter who made the money.",
        author: "Earl Wilson",
        tags: new Set(["humorous", "non-fiction", "existential humor", "economic"])
    }, {
        quote: "Radio is the theater of the mind; television is the theater of the mindless.",
        author: "Steve Allen",
        tags: new Set(["humorous", "non-fiction"])
    }, {
        quote: "Chemists do not usually stutter. It would be very awkward if they did, seeing that they have at times to get out such words as methylethylamylophenylium.",
        author: "Sir William Crookes",
        tags: new Set(["humorous", "non-fiction", "nerdy"])
    }, {
        quote: "If God had really intended men to fly, He'd make it easier to get to the airport.",
        author: "George Winters",
        tags: new Set(["humorous", "non-fiction"])
    }, {
        quote: "To err is human, but to really foul things up you need a computer.",
        author: "Paul R. Ehrlich",
        tags: new Set(["humorous", "non-fiction", "nerdy"])
    }, {
        quote: "The good thing about computers is that they do what you tell them to do. The bad thing is that they do what you tell them to do.",
        author: "Ted Nelson",
        tags: new Set(["humorous", "non-fiction", "nerdy"])
    }, {
        quote: "The single biggest problem in communication is the illusion that it has taken place.",
        author: "Geroge Bernard Shaw",
        tags: new Set(["humorous", "non-fiction", "existential humor"])
    }, {
        quote: "I've lived through some terrible things in my life, some of which actually happened.",
        author: "Mark Twain",
        tags: new Set(["humorous", "non-fiction", "mark twain"])
    }, {
        quote: "I'm the most humble person you'll ever meet",
        author: "Donald Trump",
        tags: new Set(["humorous", "non-fiction", "political"])
    }, {
        quote: "Well, well, well. If it isn't the consequences of my own actions",
        author: "geraldinreverse",
        tags: new Set(["humorous", "non-fiction", "existential humor", "social media"])
    }, {
        quote: "Doing business without advertising is like winking at a girl in the dark. You know what you are doing but nodbody else does.",
        author: "Steuart Henderson Britt",
        tags: new Set(["humorous", "non-fiction", "economic"])
    }, {
        quote: "Reflect that whatever misfortune is your lot, it could only be worse in Milwaukee",
        author: "National Lampoon's Deteriorata",
        tags: new Set(["humorous", "fiction", "dry humor"])
    }, {
        quote: "Two wrongs don't make a right, but three lefts do",
        author: "Harold A. Lerch",
        tags: new Set(["humorous", "non-fiction", "wordplay"])
    }, {
        quote: "If you're not cheating, you're not trying.",
        author: "Eddie Guerrero",
        tags: new Set(["humorous", "fiction", "villain"])
    }, {
        quote: "Out on the town having the time of my life with a bunch of friends. They're all just out of frame, laughing too.",
        author: "Nathan Fielder",
        tags: new Set(["humorous", "non-fiction", "self-deprecating"])
    }, {
        quote: "There is no sunrise so beautiful that it is worth waking me up to see it.",
        author: "Mindy Kaling",
        tags: new Set(["humorous", "non-fiction"])
    }, {
        quote: "Do not take life too seriously. You will never get out of it alive.",
        author: "Elbet Hubbard",
        tags: new Set(["humorous", "non-fiction", "existential humor", "dark"])
    }, {
        quote: "Had I known that you'd be so willing to sacrifice yourself to save the world I wouldn't have tried to kill you.",
        author: "Matt Miller",
        tags: new Set(["humorous", "anti-hero", "saints row", "video game", "fiction"])
    }, {
        quote: "Sometimes I hate being right.",
        author: "Chrisjen Avasarala",
        tags: new Set(["humorous", "fiction", "tv series"])
    }, {
        quote: "I want to die peacefully in my sleep like my grandfather, not screaming in terror like his passengers.",
        author: "Jack Handey",
        tags: new Set(["humorous", "non-fiction", "dark"])
    }, {
        quote: "I'll have what Dr.V is having. The exact same order. If he has a fly in his thing I want a fly in mine but put the fly on the side coz I don't eat no flies. They walk on crap",
        author: "Sheriff Mike Thompson",
        tags: new Set(["humorous", "fiction", "tv series"])
    }, {
        quote: "To iterate is human, to recurse divine.",
        author: "Peter Deutsh",
        tags: new Set(["humorous", "non-fiction", "nerdy", "programming"])
    }, {
        quote: "Bitcoin is everything you don't understand about money, combined with everything you don't understand about computers.",
        author: "John Oliver",
        tags: new Set(["humorous", "non-fiction", "nerdy", "tv series"])
    }, {
        quote: "Ladies if you follow these instructions exactly you might be able to pull you a rapper, NBA player, man, at least a dude with a car.",
        author: "Kanye West",
        tags: new Set(["humorous", "non-fiction", "song lyrics"])
    }, {
        quote: "He's spending a year dead for tax reasons.",
        author: "Douglas Adams",
        tags: new Set(["humorous", "non-fiction", "economic", "douglas adams"])
    }, {
        quote: "If I were not an atheist, I think I would have to be a Catholic because if it wasn't the forces of natural selection that designed fish, it must have been an Italian.",
        author: "Douglas Adams",
        tags: new Set(["humorous", "non-fiction", "douglas adams"])
    }, {
        quote: "There is a feeling which persists in England that making a sandwich interesting, attractive or pleasant to eat is something sinful that only foreigners do.",
        author: "Douglas Adams",
        tags: new Set(["humorous", "douglas adams"])
    }, {
        quote: "Music to drown by. Now I know I'm in first class",
        author: "Tommy Ryan",
        tags: new Set(["humorous", "fiction", "dark", "existential humor", "movie"])
    }, {
        quote: "You know it's a law of nature. Nothing good ever happens in Long Island",
        author: "Charles Haden Savage",
        tags: new Set(["humorous", "fiction", "tv series", "only murders in the building", "tv series"])
    }, {
        quote: "Sometimes a second chance is just another chance to get it wrong.",
        author: "Cinda Canning",
        tags: new Set(["humorous", "fiction", "only murders in the building", "tv series"])
    }, {
        quote: "If you want to become a millionaire, start with a billion dollars and launch a new airline",
        author: "Richard Branson",
        tags: new Set(["humorous", "non-fiction", "economic"])
    }, {
        quote: "If I lacked self-awareness, I think I'd know",
        author: "Britta Perry",
        tags: new Set(["humorous", "fiction", "community", "tv series", "wordplay"])
    }, {
        quote: "The best phone call is a text. The second best phone call is an email and the third best is two traded voice mails.",
        author: "John Oliver",
        tags: new Set(["humorous", "non-fiction", "tv series"])
    }, {
        quote: "This is the day you will always remember as the day you almost caught Captain Jack Sparrow.",
        author: "Jack Sparrow",
        tags: new Set(["humorous", "fiction", "movie"])
    }, {
        quote: "I'm dishonest, and a dishonest man you can always trust to be dishonest. Honestly. It's the honest ones you want to watch out for, because you can never predict when they're going to do something incredibly stupid.",
        author: "Jack Sparrow",
        tags: new Set(["humorous", "fiction", "movie"])
    }, {
        quote: `Some people, when confronted with a problem, think "I know, I'll use regular expressions." Now they have two problems.`,
        author: "Jamie Zawinski",
        tags: new Set(["humorous", "non-fiction", "nerdy", "programming"])
    }, {
        quote: "C makes it easy to shoot yourself in the foot; C++ makes it harder, but when you do it blows your whole leg off",
        author: "Bjarne Stroustrup",
        tags: new Set(["humorous", "non-fiction", "nerdy", "programming"])
    }, {
        quote: "A turbo is god's way of saying there isn't enough cylinders",
        author: "The American",
        tags: new Set(["humorous", "non-fiction", "nerdy", "tv series", "top gear"])
    }, {
        quote: "The strength of JavaScript is that you can do anything. The weakness is that you will.",
        author: "Reg Braithwaite",
        tags: new Set(["humorous", "non-fiction", "nerdy", "programming"])
    }, {
        quote: "One morning I shot an elephant in my pajamas. How he got in my pajamas, I don't know.",
        author: "Captain Spaulding",
        tags: new Set(["humorous", "surreal humor", "fiction"])
    }, {
        quote: "It depends on what the meaning of 'is' is.",
        author: "Bill Clinton",
        tags: new Set(["humorous", "non-fiction", "political"])
    }, {
        quote: "For every complex problem there is an answer that is clear, simple, and wrong.",
        author: "H.L. Mencken",
        tags: new Set(["humorous", "non-fiction", "nerdy"])
    }, {
        quote: "I feel bad for our country, but this is tremendous content.",
        author: "Darren Rovell",
        tags: new Set(["humorous", "non-fiction", "social media"])
    }, {
        quote: 'issuing correction on a previous post of mine, regarding the terror group ISIL. you do not, under any circumstances, "gotta give it to them"',
        author: "dril",
        tags: new Set(["humorous", "non-fiction", "social media"])
    }, {
        quote: "im not owned! im not owned!!, i continue to insist as i slowly shrink and transform into a corn cob",
        author: "dril",
        tags: new Set(["humorous", "non-fiction", "surreal humor", "social media"])
    }, {
        quote: "and another thing: im not mad. please dont put in the newspaper that i got mad",
        author: "dril",
        tags: new Set(["humorous", "non-fiction", "social media"])
    }, {
        quote: "It is better to remain silent and be thought a fool than to talk and remove all doubt.",
        author: "unknown",
        tags: new Set(["humorous", "non-fiction", "existential humor"])
    }, {
        quote: "Why are you the way that you are? Honestly, every time I try to do something fun or exciting you make it not that way.",
        author: "Michael Scott",
        tags: new Set(["humorous", "fiction", "tv series", "the office"])
    }, {
        quote: "Premature optimization is the root of all evil.",
        author: "Donald Knuth",
        tags: new Set(["humorous", "non-fiction", "nerdy", "programming"])
    }, {
        quote: "Don't take it so personally, okay? I don't like most people. He's in the vast majority.",
        author: "Jonathan Byers",
        tags: new Set(["humorous", "fiction", "stranger things", "tv series"])
    }, {
        quote: "Okay it's official. I'm never having kids.",
        author: "Dustin Henderson",
        tags: new Set(["humorous", "fiction", "stranger things", "tv series"])
    }, {
        quote: "Flowers are for two things: dead people and dead marriages",
        author: "Barbara",
        tags: new Set(["humorous", 'dark', "existential humor", "ted lasso", "tv series"])
    }, {
        quote: "Stand on the ashes of a trillion dead souls and ask the ghosts if honor matters. The silence is your answer",
        author: "Javik",
        tags: new Set(["fiction", "dark", "anti-hero", "mass effect", "video game",])
    }, {
        quote: "Beg that I succeed, for I have seen the throne of the gods, and it was empty.",
        author: "Corypheus",
        tags: new Set(["fiction", "villain", "dragon age", "video game",])
    }, {
        quote: "Rudimentary creatures of blood and flesh. You touch my mind, fumbling in ignorance, incapable of understanding.",
        author: "Sovereign",
        tags: new Set(["fiction", "villain", "mass effect", "video game",])
    }, {
        quote: "My kind transcends your very understanding.",
        author: "Sovereign",
        tags: new Set(["fiction", "villain", "mass effect", "video game",])
    }, {
        quote: "The realm? It's the 1000 blades of Aegon's enemies. A story we agree to tell each other over and over again until we forget it's a lie.",
        author: "Petyr 'Little Finger' Baelish",
        tags: new Set(["fiction", "villain", "game of thrones", "tv series"])
    }, {
        quote: "Look at you, hacker: a pathetic creature of meat and bone, panting and sweating as you run through my corridors. How can you challenge a perfect, immortal machine?",
        author: "SHODAN",
        tags: new Set(["fiction", "nerdy", "villain", "video game"])
    }, {
        quote: "Here Come The Test Results: 'You Are A Horrible Person.' That's What It Says, 'A Horrible Person.' We Weren't Even Testing For That.",
        author: "GlaDOS",
        tags: new Set(["humorous", "fiction", "nerdy", "villain", "video game"])
    }, {
        quote: "You exist because we allow it and you will end because we demand it.",
        author: "Sovereign",
        tags: new Set(["fiction", "villain", "mass effect", "video game",])
    }, {
        quote: "Do not mire yourself in petty revolt. Do not sacrifice everything for the sake of petty freedoms",
        author: "Saren",
        tags: new Set(["fiction", "villain", "anti-hero", "mass effect", "video game",])
    }, {
        quote: "Is submission not preferable to extinction.",
        author: "Saren",
        tags: new Set(["fiction", "villain", "anti-hero", "mass effect", "video game",])
    }, {
        quote: "Organic life is nothing but a genetic mutation, an accident. Your lives are measured in years and decades. You whither and die. We are eternal, the pinnacle of evolution and existence. Before us you are nothing. Your extinction is inevitable. We are the end of everything.",
        author: "Sovereign",
        tags: new Set(["fiction", "villain", "mass effect", "video game"])
    }, {
        quote: "It takes a strong man to deny what's right in front of him. And if the truth is undeniable, you create your own.",
        author: "Col. John Konrad",
        tags: new Set(["fiction", "video game", "villain"])
    }, {
        quote: "You either die a hero or you live long enough to see yourself become the villain",
        author: "Harvey Dent",
        tags: new Set(["fiction", "movie", "anti-hero"])
    }, {
        quote: "I am altering the deal. Pray I don't alter it further",
        author: "Darth Vader",
        tags: new Set(["fiction", "movie", "villain", "vader", "star wars"])
    }, {
        quote: "He's clumsy as he is stupid",
        author: "Darth Vader",
        tags: new Set(["fiction", "movie", "villain", "humorous", "vader", "star wars"])
    }, {
        quote: "Be careful not to choke on your aspirations",
        author: "Darth Vader",
        tags: new Set(["fiction", "movie", "villain", "humorous", "star wars", "vader"])
    }, {
        quote: "I find your lack of faith disturbing",
        author: "Darth Vader",
        tags: new Set(["fiction", "movie", "villain", "humorous", "star wars", "vader"])
    }, {
        quote: "When the snows fall and the white winds blow, the lone wolf dies but the pack survives",
        author: "Ned Stark",
        tags: new Set(["fiction", "inspiring", "tv series", "hero", "game of thrones"])
    }, {
        quote: "Fear cuts deeper than swords",
        author: "Arya Stark", 
        tags: new Set(["fiction", "inspiring", "tv series", "hero", "game of thrones"])
    }, {
        quote: "I'm not going to stop the wheel. I'm going to break it.",
        author: "Daenerys Targaryen",
        tags: new Set(["anti-hero", "tv series", "game of thrones", "fiction"])
    }, {
        quote: "Get some rest dear, you look appalling",
        author: "Lady Olenna Tyrell",
        tags: new Set(["fiction", "tv series", "game of thrones", "humorous", "insult"])
    }, {
        quote: "Why is it that one man builds a wall, the next man immediately needs to know what's on the other side",
        author: "Tyrion Lannister",
        tags: new Set(["fiction", "tv series", "game of thrones", "humorous"])
    }, {
        quote: "When you play the game of thrones you either win or you die. There is no middleground.",
        author: "Cersei Lannister", 
        tags: new Set(["fiction", "anti-hero", "tv series", "game of thrones"])
    }, {
        quote: "Chaos isn't a pit. Chaos is a ladder. Many who try to climb it fail and never get to try it again. The fall breaks them. And some are given a chance to climb. They refuse. They cling to the realm or the gods or love. Illusions. Only the ladder is real. The climb is all there is.",
        author: "Petyr 'Little Finger' Baelish",
        tags: new Set(["fiction", "anti-hero", "tv series", "game of thrones"])
    }, {
        quote: "Salvation comes with a cost. Judge us not by our means, but what we seek to accomplish.",
        author: "Illusive Man",
        tags: new Set(["fiction", "anti-hero", "mass effect", "video game"])
    }, {
        quote: "They say that great beasts once roamed this world, as big as mountains, yet all that's left of them is bone and amber. Time undoes even the mightiest of creatures. Just look what it's done to you. One day you will perish. You will lie with the rest of your kind in the dirt, your dreams forgotten, your horrors faced. Your bones will turn to sand, and upon that sand a new god will walk. One that will never die. Because this world doesn't belong to you, or the people that came before. It belongs to someone who is yet to come.",
        author: "Dolores Abernathy",
        tags: new Set(["fiction", "villain", "tv series"])
    }, {
        quote: "Winning doesn't mean anything unless someone else loses",
        author: "Man in Black",
        tags: new Set(["fiction", "villain", "tv series"])
    }, {
        quote: "Remember Before When I Was Talking About Smelly Garbage Standing Around Being Useless? That Was A Metaphor. I Was Actually Talking About You.",
        author: "GlaDOS",
        tags: new Set(["fiction", "video game", "villain", "humorous", "portal", "insult"])
    }, {
        quote: "It's Right Here In Your File: On Other People, It Looks Fine. But Right Here A Scientist Has Noted That On You It Looks Stupid",
        author: "GlaDOS", 
        tags: new Set(["fiction", "video game", "villain", "humorous", "portal", "insult"])
    }, {
        quote: "If You Become Light Headed From Thirst, Feel Free To Pass Out.",
        author: "GlaDOS", 
        tags: new Set(["fiction", "video game", "villain", "humorous", "portal"])
    }, {
        quote: "I'm Afraid You're About To Become The Immediate Past President Of The Being Alive Club.",
        author: "GlaDOS", 
        tags: new Set(["fiction", "video game", "villain", "humorous", "portal"])
    }, {
        quote: "It's So Much Easier To See The World In Black And White. Gray? I Don't Know What To Do With Gray...",
        author: "Garrus Vakarian",
        tags: new Set(["fiction", "video game", "hero", "mass effect"])
    }, {
        quote: "Ah, that's the thing about Sara Lance, she never stays dead for very long.",
        author: "Damien Darhk",
        tags: new Set(["fiction", "humorous", "legends of tomorrow"])
    }, {
        quote: "I don't make mistakes. I'm not “just like the rest of you.” I'm stronger. I'm smarter. I'm better. I am better.",
        author: "Homelander",
        tags: new Set(["villain", "fiction", "the boys", "tv series"])
    }, {
        quote: "If you want to make enemies, try to change something",
        author: "Adam Jensen",
        tags: new Set(["hero", "video game", "fiction"])
    }, {
        quote: "For the first time in history we have a chance to steal fire from the gods. To turn away from it now - to stop pursing a future in which technology and biology combine leading to the promise of a singularity - would mean to deny the very essence of who we are. No doubt the road to get there will be bumpy, hurting some people along the way. But won't achieving the dream be worth it? We can become the gods we've always been striving to be. We might as well get good at it",
        author: "Adam Jensen",
        tags: new Set(["hero", "video game", "fiction", "nerdy"])
    }, {
        quote: "It's in our nature to want to rise above our limits. Think about it. we were cold, so we harnessed fire, we were weak so we invented tools. Every time we met an obstacle we used creativity and ingenuity to overcome it. The cycle is inevitable",
        author: "Adam Jensen",
        tags: new Set(["hero", "video game", "fiction", "nerdy"])
    }, {
        quote: "Technology offers us strength, strength enables dominance, and dominance paves the way for abuse. Using technology to become something more than we are risks losing our ability to love, aspire or make moral choices - the very things that make us Human. It also risks giving some men the power to make others what they choose - regardless of the cost to human dignity",
        author: "Adam Jensen",
        tags: new Set(["hero", "video game", "fiction", "nerdy"])
    }, {
        quote: "Technological progress is like an axe in the hand of a pathological criminal",
        author: "Albert Einstein",
        tags: new Set(["non-fiction", "nerdy"])
    }, {
        quote: "When life gives you lemons, don't make lemonade. Make life take the lemons back! Get mad! I don't want your damn lemons! What am I supposed to do with these?! Demand to see life's manager! Make life rue the day it thought it could give Cave Johnson lemons! Do you know who I am?! I'm the man who's gonna burn your house down! With the lemons! I'm gonna get my engineers to invent a combustible lemon that burns your house down!",
        author: "Cave Johnson",
        tags: new Set(["fiction", "video game", "humorous", "portal"])
    }, {
        quote: "What is a man but the sum of his memories? We are the stories we live! The tales we tell ourselves!",
        author: "Clay Kaczmarek",
        tags: new Set(["fiction", "video game", "philosophical"])
    }, {
        quote: "They say ambition is an unattractive trait in a woman.You know what I find really unattractive? Waiting around for something to happen. Staring out a window, thinking the life you should be living is out there somewhere but not being willing to open the door and go get it. Even if someone tells you you can't. Being a coward is only cute in the Wizard of Oz.",
        author: "Miriam 'Midge' Maisel",
        tags: new Set(['fiction', 'tv series', 'inspiring', 'motivational'])
    }, {
        quote: "Never half-ass 2 things. Whole-ass 1 thing",
        author: "Ron Swanson",
        tags: new Set(["fiction", "tv series", "humorous"])
    }, {
        quote: "Debugging is like being the detective in a crime movie where you are also the murderer",
        author: "Filipe Fortes",
        tags: new Set(["humorous", "non-fiction", "nerdy", "programming"])
    }, {
        quote: "Uh, we actually took care of the end of the world last week.",
        author: 'Cliff Steele',
        tags: new Set(['humorous', 'fiction', 'tv series', 'doom patrol'])
    }, {
        quote: "If Tetris has taught me anything, it's that errors pile up and achievements disappear.",
        author: "Unknown",
        tags: new Set(['humorous', 'existential humor', 'nerdy'])
    }, {
        quote: "Con men leave their marks angry. Con artists leave them smiling.",
        author: "Rolan Quarn",
        tags: new Set(['humorous', 'video game', 'fiction'])
    }, {
        quote: `The most astounding fact is the knowledge, that the atoms that comprise life on Earth - the atoms that make up the human body - are traceable to the crucibles that cooked light elements into heavy elements in their core, under extreme temperatures and pressures. These stars, the high mass ones among them, went unstable in their later years. They collapsed and then exploded, scattering their enriched guts across the galaxy: guts made of Carbon, Nitrogen, Oxygen, and all of the fundamental ingredients of life itself. These ingredients become parts of gas clouds that condense, collapse, form the next generation of solar systems - stars with orbiting planets - and those planets now have the ingredients for life itself. So that when I look up at the night sky and I know that, yes, we are part of this universe, we are in this universe, but perhaps more important than both of those facts is that the universe is in us. When I reflect on that fact, I look up, many people feel small - 'cause they're small and the universe is big - but I feel big. because, my atoms came from those stars. There's a level of connectivity. That's really what you want in life. You want to feel connected, want to feel relevant. You want to feel like you're a participant in the goings on of activities and events around you. That's precisely what we are, just by being alive`,
        author: "Neil DeGrasse Tyson",
        tags: new Set(["inspiring", "philosophical", "nerdy", "non-fiction"])        
    }, {
        quote: "Technically we only came to get Jane's longevity back but we probably would have tried to save you if there was time.",
        author: "Cliff Steele",
        tags: new Set(['humorous', 'fiction', 'tv series', 'doom patrol'])
    }
]