## [Do More - Startup](startup.byancey.click)
Do More is an web application designed to help you achieve your goals and build habits. The app helps you track your progress and encourages you to follow through on your goals by reporting on your progress. The app reminds you to celebrate your victories by displaying your streak. You can also share your streaks with the friends you connect with on the app.

### Next Steps
+ Fix arrows on accordion objects
  + They currently point up upon opening the website, they should point down if the accordino is collapsed
+ Add `@media` tags in CSS
+ Maybe change color scheme???
+ Add user interface with Javascript

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
