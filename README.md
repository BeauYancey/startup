# Startup
CS 260 Startup Application

## Elevator Pitch

### Do More - Startup
Do More is an web application designed to help you achieve your goals and build habits. The app helps you track your progress and encourages you to follow through on your goals by reporting on your progress. The app reminds you to celebrate your victories by displaying your streak. You can also share your streaks with the friends you connect with on the app.

## Sketches
![startup sketch](images/sketches.png)


## Important things to remember
##### My IP Address:  
```
3.141.183.154
```
##### SSH into my server:
```
ssh -i [key pair file] ubuntu@3.141.183.154
```
##### My Domain Name:
```
byancey.click
```
##### Deploy Changes
```
./deployWebsite -k [key pair file] -h byancey.click -s [simon/startup]
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
