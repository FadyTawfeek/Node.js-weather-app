const port = process.env.PORT || 3000
const path = require('path')
//console.log(__dirname) //prints the absolute path of the folder this file is in
// console.log(__filename) //prints the absolute path of this file

const express = require('express')
const app = express()
const hbs = require('hbs')

const geoCode = require ('./utils/geocode')
const forecast = require ('./utils/forecast')

const publicDirectoryPath = path.join(__dirname, '../public') //this gets the directory we want for html pages
app.set('view engine', 'hbs') //set handlebars to make dynamic templates
app.use(express.static(publicDirectoryPath)) //this is for organizing the html pages!

const viewsPath = path.join(__dirname, '../templates/views') // these 2 lines of code are used if i want customize my views folder that has hbs files
app.set('views', viewsPath) // to be in different location like templates folder/ views folder for example

const partialsPath = path.join(__dirname, '../templates/partials') // these 2 lines of code are used if i want customize my partials folder that has hbs partial files
hbs.registerPartials(partialsPath) // to be in different location like templates folder/ partials folder for example



// the command in termina: nodemon app.js -e js, hbs : makes the server restarts with every change that happens even in js and hbs files




app.get('', (req, res) => {
    res.render('index', {
        title: 'About',
        name: 'fady'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'fady'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'fady'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must enter an address'
        })
    }

    geoCode(req.query.address, (error, {latitude: lat, longitude: long, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(lat, long, (error, {summary, temperature, rainProbability} = {}) => {
            if (error) {
                return res.send({error})
            }
            res.send({ address_entered: req.query.address,
                location,
                summary,
                temperature,
                rainProbability})
        })   
    })
})

app.get('/help/*', (req, res) => { // this is where we set the 404 error message when the user has a link of a page that is not present like /uwkfbsa, and it must be at the end
    res.render('error', {
        title: 'Error 404',
        errorMsg: 'help page is not found'
    })
})

app.get('*', (req, res) => { // this is where we set the 404 error message when the user has a link of a page that is not present like /uwkfbsa, and it must be at the end
    res.render('error', {
        title: 'Error 404',
        errorMsg: 'page is not found btw'
    })
})



app.listen(port, () => {
    console.log('server is running on port ' + port)
})

// make a .gitignore file in the root directory of the project, and in the file type the folder or file name we do not want git to upload like the node_modules/ folder
// we start git with git init in the root directory of the project
// git add moves files or folders from being untracked or unstaged to the staging area, we can add complete folders like git add src/ or git add . which adds all files to the staging area
// then after git add, we move files and folders to being committed by git commit -m "our "added some stuff"
// git status make us see the status of all stages

// one time stuff per windows (probably):
// after that, create a hidden .ssh folder in the root directory, then open a git bash and type: ls -a -l /c/"My PC"/"oulu 2019-2020"/"Everything else"/"NodeJs course"/web-server/.ssh
// then type: ssh-keygen -t rsa -b 4096 -C "fady.tawfeek@student.oulu.fi", then additional 3 enter buttons, then type: ls -a -l ~/.ssh
// then type: eval $(ssh-agent -s), then: ssh-add ~/.ssh/id_rsa
// then in vs terminal type: cat ~/.ssh/id_rsa.pub, then take this long text
// next go to settings in github then SSH and GPG keys, then New SSH key, title could be: Home laptop, paste the long text to the key field, then click add
// to make sure everything is working, in git bash type: ssh -T git@github.com, then type: yes


// next: open github, add a new repository, then in vs terminal in the root directory type: git remote add origin https://github.com/FadyTawfeek/Node.js-weather-app.git
// then in vs terminal type: git push -u origin master, we will use that every time we want to push changes to github



//for heroku:
// in vs terminal type: heroku keys:add, then y, then heroku create heroku_unique_name_of_project, then we want to tell heroku to start our app from app.js
// to do that, we open package.json and in scripts we delete the one already there and add: "start": "node src/app.js", this will also enable us to start the app in vs code by typing in vs terminal: npm run start
// then we need to change the port 3000 to one that changes with time, to do that, in app.js we add: const port = process.env.PORT || 3000, and then in app.listen we change 3000 to the variable port
// and then in the javascript client side app.js remove 'http://localhost:3000' from the fetch command, then we want to update the changes to github again by add and commit as normal












