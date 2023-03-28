## [Do More - Startup](startup.byancey.click)
Do More is an web application designed to help you achieve your goals and build habits. The app helps you track your progress and encourages you to follow through on your goals by reporting on your progress. The app reminds you to celebrate your victories by displaying your streak. You can also share your streaks with the friends you connect with on the app.

### Next Steps
+ Add Database
+ Add Authentication
+ Add WebSockets

## Important things to remember
##### My IP Address:  
```
3.141.183.154
```
##### SSH into my server:
```
ssh -i [key pair file] ubuntu@byancey.click
```
##### Deploy Changes
```
./deployFiles -k [key pair file] -h byancey.click -s [simon/startup]
```

## HTML Notes
+ HyperText Markup Language  
+ Some tags don't need an opener and a closer, one tag such as `<br/>` is sufficient
+ Always start with `<!DOCTYPE html>` and `<html lang="en"> ... </html>`

## CSS Notes
+ Elements are styled with `elementname {}`
+ Classes are styled with `.classname {}`
+ Ids are styled with `#idname {}`
+ Pseudo-classes are styled with `selector:pseudo-class {}` such as `a:hover {}` or `.checkbox:checked {}`
+ Animations are created using the following syntax:
```
selector {
  animation: name duration infinite?;
}

@keyframes name {
  from {
    initial conditions;
  }
  50% {
    conditions in the middle;
    does not need to be 50%;
    can have more than one of these;
  }
  to {
    final conditions;
  }
}
```
+ Variables are declared with `--variable-name: value`
+ Valiables are accessed with `var(--variable-name)`

## Bootstrap Framework
+ Pull in css files with a `<link rel="stylesheet" href="____"/>` element
+ Pull in Javascript files with a `<script src="____"></script>` element
+ Most bootstrap styles are contained in classes which can be space separated 
  + `<button class="btn btn-primary>` inherits style from both classes
+ Bootstrap styles can be overriden by adding styling to their pre-defined classes in your own file

## Javascript Notes
+ Variables are declared with `let var = val` or `const var = val`
+ Functions are declared with `function name(parameters) { ... }`
+ Anonymous functions can be declared inline with `(parameters) => return val`
  + Arrow functions `() => return` can reference their creation scope after they pass out of that scope
+ `for (x in iter)` iterates through indices of the iterable
+ `for (x of iter)` iterates through values of the iterable
+ Javascript objects are similar to python dictionaries, they consist of key-value pairs
+ Javascript executes in a single thread
  + One computation can stop the execution of the entire file if it takes too long.
  + Promieses are executed asynchronously
  + `const p = Promise((resolve, reject) => { *when to resolve and when to reject* })`
  + `p.then( *what to do if it resolves* ).catch( *what to do if it rejects* ).finally( *what to do every time* )`
  + Promises can also be executed in an `async` function with the `await` keyword

## Manipulating the DOM
+ DOM: Document Object Model
+ Tree structure of the HTML
+ Javascript has access to the DOM with the `document` variable
+ Search the DOM for HTML elements with `document.querySelector(selector)` or `document.querySelectorAll(selector)` or `document.getElementById(id)`
+ Add child elements with `createElement(tag)` then `parentElement.appendChild(newElement)`
+ Change/add elemnt text with `element.textContent = 'new text'`
+ `element.innerHTML = <tag>...</tag>` is discouraged, if adding user input this way, it could change he DOM in unexpected, potnetially malicious ways.

## Database Notes
+ Mongo account can have multiple databases
+ Database can have multiple collections
+ Do not include credentials in the code.
  + Write them as environment vairables and use `process.env.VARIABLENAME` to access them
+ `insertOne(object)` to insert a document to a collection
+ `deleteOne(query-object)` to delete a doccument from a collection -- deletes the first document that matches the query
+ Start with this
```
const {MongoClient} = require('mongodb')  
const client = new MongoClient(url)  
const database = client.db(database)  
const collection = database.collection(collection)
```

## Notes from Simon
+ In the HTML, adding an `onclick="function()"` to a tag makes it so a function executes when the element is clicked
+ Break the Javascript up into a lot of small functions, test regularly
+ localStorage keeps information about a website cached to the browser
  + Does not carry across different browsers
+ `window.location.href = "filename.html"` will redirect the user to a new page
  + probably best to use this with `onclick = "function()"`
+ Javascript needs to loaded at the end of the html file if it is going to manipulate the DOM, otherwise, the header is fine.
+ Node/Express creates a server.
  + `npm init -y`, then `npm install express`
+ Middleware executes in order, the `next` parameter is required to continue to the next middleware object
  + Without it, there is an implicit break statement
+ The cookie parser is used to keep people logged in
  + Each user has an assigned token that is sent back in a cookie
  + Cookies get deleted when a user logs out
+ Login/account creation functions get and post apis
+ Passwords are hashed before entering them into the databse to protect privacy

## Notes from Startup
+ Javascript is a front-end language
  + It can't run while the website isn't open.
  + Updating the streak every day is not as simple as it sounds
+ It's better to write a lot of small functions that reference each other instead og one big complex function
+ There is probably a better way to iterate through the goals object, look into that
+ The friends page needs a database to work
+ After creating a new DOM element:
  + add classes with `el.classList.add('class-name', 'another-class-name')`
  + add style with `el.style.propertyName = value`
  + check a box with `checkboxEl.checked = true`
  + set other attributes (like id) with `el.setAttribute('attribute', 'value')`
