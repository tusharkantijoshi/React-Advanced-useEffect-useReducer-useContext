<!--
! module content
* 1. working with side effects
* 2. managing complex state with reducers
* 3. managing component ide state with context

! what is effect or side effect ?
? Main Job of React:
* Render UI
* React to user input
* Evaluate and Render JSX
* Manage State and Props
* React to Events and Input
* Re-evaluate Component upon State and Props Changes

* A component is just a function therefore it's executed top to bottom and everything in that function in the end deals with bringing something onto the screen and/or with reacting to user input to clicks and so on. But everything we have in this component function is concerned with bringing something onto the screen.

* Now, therefore side effects are everything else that might be happening in your application.
e.g.
* Store data in browser storage
* send HTTP Requests to backend servers
* Set and manage timers

* These tasks are all not related to bringing something onto the screen. At least not directly. Of course you might be sending a Http request to draw something onto the screen once you got the response, but sending the request itself and handling potential errors that's not something you need React for. So these are therefore tasks which must happen outside of the normal component evaluation. So outside of your normal component function.

* Because the component function are re-executed by React automatically whenever the state in this component function changes and if compared to the previous result it should go to the real Dom and make some changes there.

! Why effects don't go inside component's function ?
* If we would use effect inside of the component functions e.g. send a Http request, Then we would send this request whenever this function re-runs (whenever this state changes) and you might even create an infinite loop. Because you would send the request whenever the function re-runs. And in response to the request you change some state which triggers this function again. So therefore such side effects should not go directly into this component function because that would most likely create bugs, infinite loops or simply send too many Http requests.

* Therefore we'll have a better tool for handling side effects and that's a special React Hook which we can use. The useEffect()Hook. The useEffect()Hook is simply another built in Hook.

* The useEffect()Hook is called with two arguments with two parameters. The first argument is a function that should be executed after every component evaluation if the specified dependencies changed. And the specified dependencies are the second argument that you pass in. That's an array full of dependencies and whenever such a dependency changes that first function will re-run.

* Therefore in that first function you can put any side effect code and that code will then only execute when the dependencies specified by you changed and not when the component re-renders. So only when your dependencies changed.

! useReducer()
* useReducer is another built in Hook and it will help us with state management. So it's a bit like useState, but actually with more capabilities and especially useful for more complex state.

* useReducer is then an alternative to useState. So it's a replacement, if you need a more powerful state management.

* const [state, dispatch] = useReducer(reducer, initialState, defaultState )
state - variable to be changed in future
dispatch - a function that can be used to change the state of the variable
reducer - a function that is automatically triggered, it receives the latest state and returns the updated state

-->
