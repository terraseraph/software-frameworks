// import HelloWorldNPM from 'hello-world-npm';
const HelloWorldNPM = require("hello-world-npm")
/**
 * Task 1
 */
console.log("Hello World, Node.js!")


/**
 * Task 2
 */
var myString = "Hello@World, Node.js Stringsss"
var badWord = "bad word"
var mistype = "Spwlling"


/**
 * Task 3
 */
myString = myString.replace("@", " ")
myString = myString.replace("sss", "s")
console.log("task 3: ", myString)

/**
 * Task 4
 */
if (badWord){
    badWord = "****"
}
console.log("task 4: ", badWord)

/**
 * Task 5
 */
console.log("task 5: ",HelloWorldNPM.helloWorld());