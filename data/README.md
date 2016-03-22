explanation of data file
======
How to modify [data.json](https://github.com/briznad/cafebeit/blob/gh-pages/data/data.json) in order to change the info shown on the website.
## example data file
```
{
	"name" : "Cafe Beit",
	"photo" : {
		"file" : "cortado-pour.png",
		"attribution" : {
			"name" : "Jane Doe",
			"url" : "http://bradmallow.com",
            "email" : "jane.doe@example.com"
		}
	},
	"address" : {
		"streetAddress" : "158 Bedford Ave",
		"addressLocality" : "Brooklyn",
		"addressRegion" : "NY",
		"postalCode" : "11211"
	},
	"hours" : ["Mo,Tu,We,Th,Fr 07:00-19:00", "Sa,Su 08:00-20:00"],
	"email" : "cafebeit@gmail.com",
	"description" : [
		"Cardigan banh mi pabst, trust fund ethical artisan lumbersexual gluten-free schlitz VHS raw denim man braid. Wolf keffiyeh synth church-key. Viral church-key bitters mustache literally celiac. Chillwave williamsburg fap wolf tumblr austin. Pug keffiyeh lo-fi paleo hoodie synth, pickled hella vinyl williamsburg hammock. Ugh locavore jean shorts tofu lo-fi. Brooklyn slow-carb ramps, tattooed cardigan truffaut sriracha austin bitters.",
		"Distillery brooklyn bushwick trust fund farm-to-table selfies health goth, artisan franzen bespoke beard. Farm-to-table retro cliche, master cleanse quinoa beard authentic slow-carb 90's butcher. Hammock kombucha tote bag, man bun kale chips microdosing street art seitan letterpress next level wayfarers gastropub farm-to-table."
	]
}
```
## brief explanation of the file & format
The [data.json](https://github.com/briznad/cafebeit/blob/gh-pages/data/data.json) file is used to store the data that shows up on the website. Any changes saved to this file will show up on the website in a short ammount of time (a couple minutes max). The file is formatted according to the [JSON](http://www.json.org/) standard (if you check out the previous link you'll see a bunch of technical jargon and confusing graphs, so I'd advise against it). The short explanation is that JSON is a way to format information so that it's decently easy for a human to read while still being structured enough for a computer to make sense of. By doing little things, like putting all text inside double quotes (`"`) and lists of information inside brackets (`[…]`), we can bridge that comminucation gap between man and machine. Holy shit, that's rad! **The takeaway is** that a bit of caution should be exercised when manually updating JSON, since small mistakes, like forgetting to add a closing double quote at the end of a sentence, can break the website. Luckily we're using GitHub to back up our data, so even if something goes wrong it is backed up, bust still.
## sections of the data file
- `"name"`
This is a string with the name of the cafe. This should never change from "Cafe Beit" unless you rename the cafe.
- `"photo"`
This is an object with 2 possible members:
 - `"file"`
This is the filename of the main image. The file referenced here must exist within the [images](https://github.com/briznad/cafebeit/tree/gh-pages/assets/images) folder.
 - `"attribution"` [optional]
This is an object that allows you to give the photographer credit for the photo. It consists of a name which will optionally link to either a url or email. If both are present the url takes precedence.
- `"description"` [optional]
This is a list of paragraphs. It's important that each paragraph be entered within enclosing double quotes and separated by a comma:
```
"description" : [
	"Paragraph 1. Very Interesting!",
	"Paragraph 2. A must-read!",
	"Paragraph 3. Oh god! Is there anything else on my kindle?!"
]
```
