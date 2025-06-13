# Family Progressive Web Application

This is a closed application to track me and my family's daily life. It is a diverse app that features a wourkout maker/tracker, weekly grocery list and info about our daily tasks.

# Template

Created with Vite.

# Technologies used
- React with TypeScript
- React Router
- Bootsrap {@latest}
- Firebase Realtime Database
- Firebase Authentication

# Log 1 (25.06.04)

Project set up is complete. So far, the main Routing is done. Created and added .favicon files in 4 different sizes.

# Log 2 (25.06.04)

Done set up routing with Layout and conditionally rendering a Log-in page whether the user is logged in or not. Layout only shows when user is logged in.

# Log 3 (25.06.05)

Came upon a majority of bugs regarding the conditional log-in page rendering. Refactored code, deleted doubling of BrowserRouter and AuthProvider. Re-wrote AuthProvider "children" logic. Now its back to working order.

# Log 4 (25.06.05)

Header and Footer component made, now testing on mobile.

# Log 5 (25.06.10)

New UI component to keep track of daily tasks. Pulled in database from firebase and re-made functions to display and modify data on the DB.

# Log 5 (25.06.11)

Fully functional "To-do" component. You can modify, delete and mark tasks as completed. They all write on server data, so others can see it as well in the family. Going forward, im thinking of refactoring and putting each functionality in it's own component, so the code becomes less crowded and more reusable.

# Log 6 (25.06.13)

Refactored a lot of code for better readability and reusability. Code is still a mess sadly. Created context for calendar to avoid prop drilling.